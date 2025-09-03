import {Suspense} from "react";
import {Loader} from "@/components/ui/loader";
import SearchContent from "@/components/search/search-content";

export default function SearchPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <SearchContent />
        </Suspense>
    )
}