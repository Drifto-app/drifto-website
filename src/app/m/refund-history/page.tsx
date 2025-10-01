import { RefundHistoryPageContent } from "@/components/refund/refund-history";
import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";

export default function RefundHistoryPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <RefundHistoryPageContent />
        </Suspense>
    )
}