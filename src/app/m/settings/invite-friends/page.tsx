import { InviteFriendsPageContent } from "@/components/settings/invite-friends";
import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";

export default function InviteFriendsPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <InviteFriendsPageContent />
        </Suspense>
    )
}