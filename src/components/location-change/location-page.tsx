"use client"

import {useSearchParams} from "next/navigation";
import {ScreenProvider} from "@/components/screen/screen-provider";
import {LocationChangeContent} from "@/components/location-change/location-change-content";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";

export default function LocationPageContent () {

    const searchParams = useSearchParams();

    const prev = searchParams.get("prev")

    return (
        <ProtectedRoute>
            <ScreenProvider>
                <div className="w-full">
                    <LocationChangeContent prev={prev}/>
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
};