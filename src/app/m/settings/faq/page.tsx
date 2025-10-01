import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { FaqPageContent } from "@/components/settings/faq";


export default function FaqPage() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            }
        >
            <FaqPageContent />
        </Suspense>
    );
}