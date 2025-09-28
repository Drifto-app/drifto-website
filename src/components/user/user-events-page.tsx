"use client"

import {ScreenProvider} from "@/components/screen/screen-provider";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {ComponentProps, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FaArrowLeft} from "react-icons/fa";
import * as React from "react";
import {useAuthStore} from "@/store/auth-store";
import {authApi} from "@/lib/axios";
import {MdErrorOutline} from "react-icons/md";
import {Loader} from "@/components/ui/loader";
import {UserEvents} from "@/components/user/user-events";
import {cn} from "@/lib/utils";

export const UserEventsPageContent = () =>  {
    const searchParams = useSearchParams();
    const prev = searchParams.get("prev")
    const eventId = searchParams.get("id")

    return (
        <ProtectedRoute>
            <ScreenProvider>
                <UserEventsContent prev={prev}  eventId={eventId} />
            </ScreenProvider>
        </ProtectedRoute>
    )
}

interface UserEventsContentProps extends ComponentProps<"div"> {
    prev: string | null;
    eventId: string | null;
}

const UserEventsContent = ({
    prev, eventId, className, ...props
}: UserEventsContentProps) => {
    const router = useRouter();
    const {user} =  useAuthStore();

    const [eventUser, setEventUser] = useState<{[key: string]: any}>(user!);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) {
            return
        }

        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await authApi.get(`/user/lookup/${eventId}`)
                setEventUser(response.data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [eventId]);


    const handleBackClick = () => {
        router.push(prev ?? "/m/settings");
    };

    if(error) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex justify-center items-center gap-2">
                    <MdErrorOutline size={30} className="text-red-500" />
                    <p className="font-semibold text-lg">No User found</p>
                </div>
            </div>
        )
    }

    if(loading) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <Loader className="h-10 w-10"/>
            </div>
        )
    }

    return (
        <div
            className={cn(
                "w-full hin-h-[100dvh]",
                className
            )}
            {...props}
        >
            <div className={"w-full border-b-1 border-b-neutral-300 flex flex-col gap-3 h-20 justify-center"}>
                <div className="flex flex-row items-center px-8">
                    <FaArrowLeft
                        size={20}
                        onClick={handleBackClick}
                        className="cursor-pointer hover:text-neutral-700 transition-colors"
                    />
                    <p className="font-semibold text-neutral-950 text-md w-full text-center capitalize truncate ml-4">
                        {eventUser?.username}
                    </p>
                </div>
            </div>
            <UserEvents user={eventUser} isForUser={!eventId} />
        </div>
    )
}