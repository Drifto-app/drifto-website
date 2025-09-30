import {Loader} from "@/components/ui/loader";
import { Suspense } from "react";
import {PaymentSettingsPageContent} from "@/components/settings/payment-method";

export default function PaymentMethodPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <PaymentSettingsPageContent />
        </Suspense>
    )
}