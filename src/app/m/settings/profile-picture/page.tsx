import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {ProfilePicturePageContent} from "@/components/settings/profile-picture";

export default function ProfilePicture() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <ProfilePicturePageContent />
        </Suspense>
    )
}