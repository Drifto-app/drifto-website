import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {EditProfilePageContent} from "@/components/settings/edit-profile";

export default function EditProfilePage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <EditProfilePageContent />
        </Suspense>
    )
}