"use client"

import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {useParams, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/axios";
import {Loader} from "@/components/ui/loader";
import {ScreenProvider} from "@/components/screen/screen-provider";
import * as React from "react";
import EventSinglePage from "@/components/event-page/event-single-page";
import {toast} from "react-toastify";
import SingleEventHostPage from "@/components/event-page/event-single-host-page";

export default function EventPage() {
    const { id } = useParams();

    const queryParams = useSearchParams();
    const prev = queryParams.get("prev");

    const [event, setEvent] = useState<{[key: string]: any}>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [coHost, setCoHost] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
               const response = await authApi.get(`/event/${id}`)
                setEvent(response.data.data);

               if(response.data.data.hostCollaborationStatus != null) {
                   setCoHost(response.data.data.hostCollaborationStatus);
               }
            } catch (err: any) {
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

    if (coHost) {
        return(
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full">
                        <SingleEventHostPage event={event} setEvent={setEvent} prev={prev} setLoading={setLoading} />
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    return(
        <ProtectedRoute>
            <ScreenProvider>
                <div className="w-full">
                    <EventSinglePage event={event} prev={prev} />
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
}