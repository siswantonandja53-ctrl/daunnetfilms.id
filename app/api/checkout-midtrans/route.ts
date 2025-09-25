/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/auth";
import { db } from "@/db";
import { users, payments, courses } from "@/db/schema";
import { eq } from "drizzle-orm";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("[checkout-midtrans] Request body:", body);

        const { name, email, whatsapp, amount = 350000, courseId = 1 } = body;

        // Get or create user
        const user = await getOrCreateUser();
        if (!user) {
            return NextResponse.json({ error: "User authentication required." }, { status: 401 });
        }

        // Update user's phoneNumber in DB if phone is different
        try {
            if (whatsapp && user.phoneNumber !== whatsapp) {
                await db.update(users)
                    .set({ phoneNumber: whatsapp, updatedAt: new Date() })
                    .where(eq(users.id, user.id));
            }
        } catch (e) {
            console.warn("[checkout-midtrans] Could not update user phoneNumber:", e);
        }

        if (!name || !email || !whatsapp) {
            return NextResponse.json({ error: "Semua data wajib diisi." }, { status: 400 });
        }

        // Prepare Midtrans payload (simple, for course checkout)
        const order_id = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const gross_amount = amount;
        const item_details = [
            {
                id: "course-advance",
                price: gross_amount,
                quantity: 1,
                name: "Kelas ADVANCE Daunnet Cinema School",
            },
        ];
        const customer_details = {
            first_name: name,
            last_name: "",
            email,
            phone: whatsapp,
        };
        const midtransPayload = {
            transaction_details: {
                order_id,
                gross_amount,
            },
            item_details,
            customer_details,
            credit_card: { secure: true },
        };

        // Midtrans API call (SANDBOX for dev, change to app.midtrans.com for prod)
        const authHeader =
            "Basic " + Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64");
        const response = await fetch(
            // "https://app.midtrans.com/snap/v1/transactions",
            "https://app.sandbox.midtrans.com/snap/v1/transactions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },
                body: JSON.stringify(midtransPayload),
            }
        );
        const data = await response.json();
        console.log("[checkout-midtrans] Midtrans response status:", response.status);
        console.log("[checkout-midtrans] Midtrans response data:", data);
        
        if (!response.ok) {
            return NextResponse.json({ error: data }, { status: response.status });
        }

        // Create payment record in database
        try {
            await db.insert(payments).values({
                userId: user.id,
                courseId: courseId,
                orderId: order_id,
                snapToken: data.token,
                amount: gross_amount,
                status: 'pending',
                midtransResponse: JSON.stringify(data),
            });
            console.log("[checkout-midtrans] Payment record created successfully");
        } catch (dbError) {
            console.error("[checkout-midtrans] Failed to create payment record:", dbError);
            // Continue anyway, as Midtrans transaction was successful
        }

        // Return snapToken and order_id
        return NextResponse.json({ snapToken: data.token, order_id });
    } catch (error: any) {
        console.error("[checkout-midtrans] Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
