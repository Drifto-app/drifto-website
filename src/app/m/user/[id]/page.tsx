"use client"

import {ScreenProvider} from "@/components/screen/screen-provider";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import * as React from "react";
import {useParams, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {MdErrorOutline} from "react-icons/md";
import {Loader} from "@/components/ui/loader";
import {authApi} from "@/lib/axios";
import {UserContent} from "@/components/user/user-content";

export default function UserPage () {
    const { id } = useParams();
    const searchParams = useSearchParams();

    const prev = searchParams.get("prev");

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<{[key: string]: any}>({});

    useEffect(() => {
        if (!id) {
            return
        }

        const fetchUser = async () => {
            try {
                const response = await authApi.get(`/user/lookup/${id}`)
                setUser(response.data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if(error) {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full h-screen flex justify-center items-center">
                        <div className="flex justify-center items-center gap-2">
                            <MdErrorOutline size={30} className="text-red-500" />
                            <p className="font-semibold text-lg">No User found</p>
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
                    <UserContent prev={prev} user={user} setUser={setUser} />
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
}