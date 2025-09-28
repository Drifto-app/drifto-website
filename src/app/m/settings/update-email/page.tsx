import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";
import {UpdateEmailPageContent} from "@/components/settings/update-email";

export default function UpdateEmailPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <UpdateEmailPageContent />
        </Suspense>
    )
}