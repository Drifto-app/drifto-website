import {Suspense} from "react";
import {Loader} from "@/components/ui/loader";
import {UserEventsPageContent} from "@/components/user/user-events-page";

export default function UserEventsPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <UserEventsPageContent />
        </Suspense>
    )
}