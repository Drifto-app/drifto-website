"use client"

import {ScreenProvider} from "@/components/screen/screen-provider";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {LocationChangeContent} from "@/components/location-change/location-change-content";
import {useSearchParams} from "next/navigation";

export default function LocationChangePage() {
    const searchParams = useSearchParams();

    const prev = searchParams.get("prev");

    return (
        <ProtectedRoute>
            <ScreenProvider>
                <div className="w-full">
                    <LocationChangeContent prev={prev!} />
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
}