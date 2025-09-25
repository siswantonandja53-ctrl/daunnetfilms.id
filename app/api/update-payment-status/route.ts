import { NextRequest, NextResponse } from "next/server";
import { db } from '@/db';
import { payments, enrollments } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY; // Use server key, not public

// Map Midtrans status to your app status
function mapMidtransStatus(status: string): string {
    if (status === "settlement" || status === "capture") return "settlement";
    if (status === "pending") return "pending";
    if (status === "expire") return "expire";
    if (status === "cancel") return "cancel";
    if (status === "deny") return "deny";
    if (status === "refund" || status === "partial_refund") return "refund";
    return status;
}

export async function POST(req: NextRequest) {
    try {
        const { order_id } = await req.json();
        if (!order_id) {
            return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
        }

        // Get status from Midtrans
        const midtransRes = await fetch(
            `https://api.midtrans.com/v2/${order_id}/status`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64"),
                },
            }
        );
        const data = await midtransRes.json();

        const transactionStatus = data.transaction_status;
        const grossAmount = parseInt(data.gross_amount, 10);

        // Map to your app status
        const appStatus = mapMidtransStatus(transactionStatus);

        // Find the payment by orderId
        const existingPayment = await db.select().from(payments).where(eq(payments.orderId, order_id)).execute();

        if (!existingPayment.length) {
            return NextResponse.json({ status: 404, error: 'Payment not found' });
        }

        const payment = existingPayment[0];

        // Update payment record
        await db.update(payments).set({
            status: appStatus,
            amount: grossAmount,
            midtransResponse: JSON.stringify(data),
            updatedAt: new Date(),
        }).where(eq(payments.id, payment.id)).returning().execute();

        // If payment is successful, create enrollment record
        if (appStatus === 'settlement' && payment.courseId) {
            try {
                // Check if enrollment already exists
                const existingEnrollment = await db
                    .select()
                    .from(enrollments)
                    .where(
                        and(
                            eq(enrollments.userId, payment.userId),
                            eq(enrollments.courseId, payment.courseId)
                        )
                    )
                    .limit(1)
                    .execute();

                if (!existingEnrollment.length) {
                    await db.insert(enrollments).values({
                        userId: payment.userId,
                        courseId: payment.courseId,
                    }).execute();
                    console.log(`Created enrollment for user ${payment.userId} in course ${payment.courseId}`);
                }
            } catch (enrollmentError) {
                console.error('Error creating enrollment:', enrollmentError);
                // Don't fail the payment update if enrollment creation fails
            }
        }

        return NextResponse.json({ status: 'Updated', appStatus, data });
    } catch (error) {
        console.error('Error updating payment status:', error);
        return NextResponse.json({ status: 500, error: 'Internal Server Error' });
    }
}