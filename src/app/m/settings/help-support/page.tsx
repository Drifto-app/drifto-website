import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import {HelpSupportPageContent} from "@/components/settings/help-support";


export default function HelpSupportPage() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            }
        >
            <HelpSupportPageContent />
        </Suspense>
    );
}