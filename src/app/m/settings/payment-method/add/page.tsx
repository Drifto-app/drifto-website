import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {AddPaymentInfoPageContent} from "@/components/settings/payment-method-add";

export default function PaymentMethodAddPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <AddPaymentInfoPageContent />
        </Suspense>
    )
}