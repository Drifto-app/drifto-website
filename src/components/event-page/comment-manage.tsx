"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/axios";
import {toast} from "react-toastify";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {ScreenProvider} from "@/components/screen/screen-provider";
import {Loader} from "@/components/ui/loader";

interface CommentManageProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
}

export default function CommentManagePage(
    {event, className, ...props}: CommentManageProps
) {
    const [comments, setComments] = React.useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await authApi.get(`/comment/entity/${event.id}`, {
                    params: {commentType: "EVENT"}
                });
                setComments(response.data.data);

                console.log(comments)
            } catch (err: any) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [event]);

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
        <div className={cn(
            "w-full min-h-[85vh] px-4",
            className
        )} {...props}>
            <div className="w-full flex flex-col gap-4">
                <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                    Event Comments ({event.totalComments})
                </h1>
            </div>
        </div>
    )
}