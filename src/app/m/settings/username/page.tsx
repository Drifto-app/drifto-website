import {Suspense} from "react";
import {Loader} from "@/components/ui/loader";
import {UsernamePageContent} from "@/components/settings/username";

export default function UsernamePage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <UsernamePageContent />
        </Suspense>
    )
}