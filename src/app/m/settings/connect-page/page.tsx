import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import {ConnectPageContent} from "@/components/settings/connect-page";


export default function ConnectPage() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            }
        >
            <ConnectPageContent />
        </Suspense>
    );
}