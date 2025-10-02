import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {WalletWithdrawalPageContent} from "@/components/wallet/withdraw-page-content";

export default function WalletWithdrawPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <WalletWithdrawalPageContent />
        </Suspense>
    )
}