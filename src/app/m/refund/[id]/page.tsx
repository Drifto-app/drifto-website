import RefundPageComponent from "@/components/refund/refund-page";
import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";

export default function RefundTicketPage() {

  return (
      <div className="w-full">
        <RefundPageComponent />
      </div>
  )
}