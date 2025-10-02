import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {UpdatePhonePageContent} from "@/components/settings/change-phone";

export default function ChangePhonePage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <UpdatePhonePageContent />
        </Suspense>
    )
}