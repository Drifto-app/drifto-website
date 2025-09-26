import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {DeleteAccountPageContent} from "@/components/settings/delete-account";

export default function DeleteAccountPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <DeleteAccountPageContent />
        </Suspense>
    )
}