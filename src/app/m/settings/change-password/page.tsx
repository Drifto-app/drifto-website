import {Suspense} from "react";
import {Loader} from "@/components/ui/loader";
import {PasswordPageContent} from "@/components/settings/change-password";

export default function ChangePasswordPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <PasswordPageContent />
        </Suspense>
    )
}