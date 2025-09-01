import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import LocationPageContent from "@/components/location-change/location-page";

export default function LocationChangePage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <LocationPageContent />
        </Suspense>
    )
}