import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";
import {NamePageContent} from "@/components/settings/name-edit";

export default function Username() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <NamePageContent />
        </Suspense>
    )
}