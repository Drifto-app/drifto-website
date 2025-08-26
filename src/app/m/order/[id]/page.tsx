"use client"

import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {ScreenProvider} from "@/components/screen/screen-provider";

export default function OrderPage() {

    return (
        <ProtectedRoute>
            <ScreenProvider>
                <div className="w-full">
                    Order
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
}