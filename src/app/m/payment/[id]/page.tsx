"use client"

import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {ScreenProvider} from "@/components/screen/screen-provider";
import {MdErrorOutline} from "react-icons/md";
import * as React from "react";
import {useEffect, useState} from "react";
import {Loader} from "@/components/ui/loader";
import {useParams, useSearchParams} from "next/navigation";
import {authApi} from "@/lib/axios";
import {PaymentContent} from "@/components/payment/payment-content";

export default function PaymentPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();

    const prev = searchParams.get("prev");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [order, setOrder] = useState<{[key: string]: any}>({});
    const [orderContent, setOrderContent] = useState<{[key: string]: any}>({});

    useEffect(() => {
        if (!id) {
            return
        }

        const fetchOrder = async () => {
            try {
                const response = await authApi.post(`/order/validate/${id}`)
                setOrder(response.data.data);

                const orderResponse = await authApi.get(`/order/${id}`);
                setOrderContent(orderResponse.data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if(error) {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full h-screen flex justify-center items-center">
                        <div className="flex justify-center items-center gap-2">
                            <MdErrorOutline size={30} className="text-red-500" />
                            <p className="font-semibold text-lg">
                                {error || "No order found"}
                            </p>
                        </div>
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    if(loading) {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full h-screen flex flex-col items-center justify-center">
                        <Loader className="h-10 w-10"/>
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    return (
        <ProtectedRoute>
            <ScreenProvider>
                <div className="w-full">
                    <PaymentContent order={order} prev={prev} orderContent={orderContent} />
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
}