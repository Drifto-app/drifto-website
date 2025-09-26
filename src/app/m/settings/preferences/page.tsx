import {Loader} from "@/components/ui/loader";
import { Suspense } from "react";
import {UserPreferencesPageContent} from "@/components/settings/preferences";

export default function PreferencesPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <UserPreferencesPageContent />
        </Suspense>
    )
}