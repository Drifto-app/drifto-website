import RefundPageComponent from "@/components/refund/refund-page";
import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";

export default function RefundTicketPage() {

  return (
  <Suspense fallback={
    <div className="w-full h-screen flex items-center justify-center">
      <Loader />
    </div>
  }>
    <RefundPageComponent />
  </Suspense>
  )
}