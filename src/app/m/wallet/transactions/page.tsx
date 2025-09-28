import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {WalletTransactionsPageContent} from "@/components/wallet/transaction-page-content";

export default function WalletTransactionPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <WalletTransactionsPageContent />
        </Suspense>
    )
}