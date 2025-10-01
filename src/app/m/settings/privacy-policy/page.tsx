import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { PrivacyPageContent } from "@/components/settings/privacy-policy";


export default function PrivacyPoliciesPage() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            }
        >
            <PrivacyPageContent />
        </Suspense>
    );
}