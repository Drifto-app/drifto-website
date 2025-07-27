"use client"

import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/axios";
import {Loader} from "@/components/ui/loader";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventFooter} from "@/components/event-page/footer";
import {ScreenProvider} from "@/components/screen/screen-provider";
import {SingleEventDetails} from "@/components/event-page/details";
import * as React from "react";
import EventSinglePage from "@/components/event-page/event-single-page";
import {toast} from "react-toastify";

export default function EventPage() {
    const { id } = useParams(); // gets the "id" param from the URL
    const [event, setEvent] = useState<{[key: string]: any}>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
               const response = await authApi.get(`/event/${id}`)
                setEvent(response.data.data);
            } catch (err: any) {
                toast.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

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

    return(
        <ProtectedRoute>
            <ScreenProvider>
                <div className="w-full bg-neutral-100">
                    <EventSinglePage event={event} />
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
}