"use client"

import RefundPageComponent from "@/components/refund/refund-page";
import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {ScreenProvider} from "@/components/screen/screen-provider";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";

export default function RefundTicketPage() {

  return (
      <ProtectedRoute>
          <ScreenProvider>
              <div className="w-full">
                  <RefundPageComponent />
              </div>
          </ScreenProvider>
      </ProtectedRoute>
  )
}