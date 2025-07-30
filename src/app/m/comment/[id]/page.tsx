"use client"

import {useParams, usePathname, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/axios";
import {toast} from "react-toastify";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {ScreenProvider} from "@/components/screen/screen-provider";
import {Loader} from "@/components/ui/loader";
import SingleEventHostPage from "@/components/event-page/event-single-host-page";
import EventSinglePage from "@/components/event-page/event-single-page";
import * as React from "react";
import CommentManagePage from "@/components/comment/comment-manage";

export default function CommentPage() {
    const { id } = useParams();

    const queryParams = useSearchParams();
    const prev = queryParams.get("prev");
    const type = queryParams.get("type");

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [comments, setComments] = useState<[{[key: string]: any}]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);

            try {
                const response = await authApi.get(`/comment/entity/${id}`, {
                    params: {commentType: type}
                });
                setComments(response.data.data.data);

                console.log(response.data.data.data);
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

    if(error) {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full h-screen flex flex-col items-center justify-center">
                        <h2>Unable to load comments</h2>
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    if(!type) {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full h-screen flex flex-col items-center justify-center">
                        <div className="bg-red-500">Comment type is not present</div>
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }


    return(
        <ProtectedRoute>
            <ScreenProvider>
                <div className="w-full">
                    <CommentManagePage comments={comments} prev={prev} type={type!} currentPathUrl={pathname + "?" + searchParams} error={error}/>
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
}