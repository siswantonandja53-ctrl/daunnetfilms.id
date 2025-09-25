
import { NextRequest, NextResponse } from "next/server";
import { db } from '@/db';
import { payments } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Midtrans notification received:', body);

        const orderId = body.order_id; // This is a string, e.g. order_123456_7890
        const transactionStatus = body.transaction_status;
        const grossAmount = parseInt(body.gross_amount, 10);
        const transactionId = body.transaction_id;
        const userId = body.user_id; // Assuming you have user_id in the payload

        // Find payment by orderId (string)
        const existingPayment = await db.select().from(payments).where(eq(payments.orderId, orderId)).execute();
        console.log('Existing payment lookup:', existingPayment);

        if (existingPayment.length) {
            const updatedPayment = await db.update(payments).set({
                amount: grossAmount,
                status: transactionStatus,
                midtransResponse: JSON.stringify(body),
            }).where(eq(payments.orderId, orderId)).returning().execute();
            console.log('Payment record updated:', updatedPayment);
        } else {
            const newPayment = await db.insert(payments).values({
                userId,
                orderId,
                amount: grossAmount,
                status: transactionStatus,
                midtransResponse: JSON.stringify(body),
            }).returning().execute();
            console.log('Payment record created:', newPayment);
        }

        return NextResponse.json({ status: 'Received', body });
    } catch (error) {
        console.error('Error handling Midtrans webhook:', error);
        return NextResponse.json({ status: 500, error: 'Internal Server Error' });
    }
}