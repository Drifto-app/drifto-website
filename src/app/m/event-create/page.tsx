import {Suspense} from "react";
import {Loader} from "@/components/ui/loader";
import CreateEventComponent from "@/components/create-event/create-event-component";

export default function CreateEventPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <CreateEventComponent />
        </Suspense>
    )
}