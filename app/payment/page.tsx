/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle } from "react-feather";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import Price from "@/components/Price";

function PaymentFinishPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");
    const [dbStatus, setDbStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState<any>(null);

    useEffect(() => {
        if (!orderId) return;
        setLoading(true);

        // Update and fetch status
        axios.post("/api/update-payment-status", { order_id: orderId })
            .then(res => {
                setDbStatus(res.data.appStatus ?? null);
            })
            .catch(() => setDbStatus(null));

        // Fetch order details
        axios.post("/api/order-details", { order_id: orderId })
            .then(res => setOrderDetails(res.data))
            .catch(() => setOrderDetails(null))
            .finally(() => setLoading(false));
    }, [orderId]);

    const transactionStatus = dbStatus || searchParams.get("transaction_status");
    const statusCode = searchParams.get("status_code");
    const isSuccess = transactionStatus === "settlement" || transactionStatus === "capture" || transactionStatus === "PAID";

    return (
        <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br bg-semi-white py-24">
            <div className="bg-semi-white rounded-3xl shadow-2xl p-10 w-full max-w-lg text-center border-2 border-mooi-orange/20">
                <div className="flex flex-col items-center mb-8">
                    {isSuccess ? (
                        <CheckCircle className="w-20 h-20 text-mooi-orange mb-3" />
                    ) : (
                        <AlertCircle className="w-20 h-20 text-yellow-500 mb-3" />
                    )}
                    <h1 className="text-3xl font-danegren text-mooi-orange mb-2">
                        {isSuccess ? "Payment Successful!" : "Payment Status"}
                    </h1>
                    <p className="text-primary-blue mb-4 font-plus-jakarta-sans">
                        {isSuccess
                            ? "Thank you for your payment. Your order is being processed."
                            : "Your payment status is shown below."}
                    </p>
                </div>
                <div className="space-y-3 text-left text-base font-plus-jakarta-sans">
                    {orderDetails && (
                        <>
                            <div>
                                <span className="font-semibold text-mooi-orange">Order ID:</span>{" "}
                                <span className="text-primary-blue">{orderId}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-mooi-orange">Status Code:</span>{" "}
                                <span className="text-primary-blue">{statusCode}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-mooi-orange">Transaction Status:</span>{" "}
                                {loading ? (
                                    <span className="text-gray-400 font-semibold">Checking...</span>
                                ) : (
                                    <span className={isSuccess ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>
                                        {transactionStatus}
                                    </span>
                                )}
                            </div>
                            <div>
                                <span className="font-semibold text-mooi-orange">Order Amount:</span>{" "}
                                <span className="text-primary-blue">
                                    {orderDetails.order?.total_price / 1000 || 0}
                                </span>
                            </div>
                            <div>
                                <span className="font-semibold text-mooi-orange">Order Items:</span>
                                <ul className="ml-4 list-disc">
                                    {orderDetails.items?.map((item: any) => (
                                        <li key={item.id} className="text-primary-blue">
                                            {item.quantity} x {item.productSlug || item.contentfulVariantId} @ {item.priceAtPurchase || 0}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
                <Link
                    className="mt-8 inline-block w-full"
                    href="/my-account/history"
                >
                    <Button className="bg-mooi-orange hover:bg-primary-blue text-semi-white font-bold text-lg py-3 rounded-full font-danegren tracking-wide shadow-lg transition-colors w-full">
                        View Order History
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentFinishPage />
        </Suspense>
    );
}