import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {BioPageContent} from "@/components/settings/bio-edit";


export default function Bio() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <BioPageContent />
        </Suspense>
    )
}