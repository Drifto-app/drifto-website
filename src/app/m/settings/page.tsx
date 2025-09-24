import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import SettingsPageContent from "@/components/settings/settings-page";

export default function SettingsPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <SettingsPageContent />
        </Suspense>
    )
}