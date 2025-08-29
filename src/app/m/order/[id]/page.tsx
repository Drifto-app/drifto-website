"use client"

import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {ScreenProvider} from "@/components/screen/screen-provider";
import {OrderContent} from "@/components/order/order-content";
import {useParams, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/axios";
import {MdErrorOutline} from "react-icons/md";
import * as React from "react";
import {Loader} from "@/components/ui/loader";

export default function OrderPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();

    const prev = searchParams.get("prev");

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [event, setEvent] = useState<{[key: string]: any}>({});


    useEffect(() => {
        if (!id) {
            return
        }

        const fetchEvent = async () => {
            try {
                const response = await authApi.get(`/event/${id}`)
                setEvent(response.data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if(error) {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full h-screen flex justify-center items-center">
                        <div className="flex justify-center items-center gap-2">
                            <MdErrorOutline size={30} className="text-red-500" />
                            <p className="font-semibold text-lg">No event found</p>
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
                    <OrderContent event={event} prev={prev} />
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
}