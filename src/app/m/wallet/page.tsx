import {Suspense} from "react";
import {Loader} from "@/components/ui/loader";
import {WalletPageContent} from "@/components/wallet/wallet-page-content";

export default function WalletPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <WalletPageContent />
        </Suspense>
    )
}