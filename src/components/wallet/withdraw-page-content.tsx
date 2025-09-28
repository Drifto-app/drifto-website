"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {ScreenProvider} from "@/components/screen/screen-provider";
import * as React from "react";
import {ComponentProps, useCallback, useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {FaArrowLeft} from "react-icons/fa";
import {FiInstagram} from "react-icons/fi";
import {Input} from "@/components/ui/input";
import {TbCurrencyNaira} from "react-icons/tb";
import {Button} from "@/components/ui/button";
import {Loader, LoaderSmall} from "@/components/ui/loader";
import {showTopToast} from "@/components/toast/toast-util";
import {authApi} from "@/lib/axios";

export const WalletWithdrawalPageContent = () => {
    const searchParams = useSearchParams();
    const prev = searchParams.get("prev")

    return (
        <ProtectedRoute>
            <ScreenProvider>
                <WalletTransactionsContent prev={prev} />
            </ScreenProvider>
        </ProtectedRoute>
    )
}

interface WalletWithdrawalContentProps extends ComponentProps<"div"> {
    prev: string | null;
}

export const WalletTransactionsContent = ({
    prev, className, ...props
}: WalletWithdrawalContentProps) => {
    const router = useRouter();

    const [accounts, setAccounts] = useState<Array<{[key: string]: any}>>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isAccountLoading, setIsAccountLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(1);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const scrollRootRef = useRef<HTMLDivElement | null>(null);

    const [amount, setAmount] = useState<string>("0");
    const [inputError, setInputError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);


    const handleBackClick = () => {
        router.push(prev ?? "/m/settings");
    };

    const handlePriceChange = (raw: string) => {
        setInputError(null);

        // Allow only digits and a single decimal point
        let cleaned = raw.replace(/[^0-9.]/g, "");

        // Prevent more than one decimal point
        const parts = cleaned.split(".");
        if (parts.length > 2) {
            cleaned = parts[0] + "." + parts.slice(1).join("");
        }

        // Limit to 2 decimal places if decimal exists
        if (parts.length === 2) {
            cleaned = parts[0] + "." + parts[1].slice(0, 2);
        }

        const numValue = parseFloat(cleaned);

        if (numValue < 100) {
            setInputError("Amount must be ₦100 or more");
        }

        setAmount(cleaned);
    };

    const loadAccounts = useCallback(
        async (reset: boolean = false) => {
            if (loadingRef.current || (!reset && !hasMoreRef.current)) return;

            loadingRef.current = true;
            setIsAccountLoading(true);
            setError(null);

            try {
                const currentPage = reset ? 1 : pageRef.current;

                const params: { [key: string]: string | number } = {
                    pageSize: 10,
                    pageNumber: currentPage,
                    detailsType: "BANK_ACCOUNT_DETAILS",
                };

                const response = await authApi.get("/paymentInfo/user", {params})

                const newAccounts = response.data.data.data as Array<Record<string, any>>;

                if (reset) {
                    setAccounts(newAccounts);
                    pageRef.current = 2;
                    setHasMore(true);
                    hasMoreRef.current = true;
                } else {
                    setAccounts((prev) => [...prev, ...newAccounts]);
                    pageRef.current = currentPage + 1;
                }

                const isLast = response.data.data.isLast;
                setHasMore(!isLast);
                hasMoreRef.current = !isLast;
            } catch (err: any) {
                showTopToast("error", err.message || "Error loading comments");
                setError(err.message || "Unknown error");
            } finally {
                setIsAccountLoading(false);
                loadingRef.current = false;
            }
        },
        []
    );

    useEffect(() => {
        setAccounts([]);
        setHasMore(true);
        pageRef.current = 1;
        hasMoreRef.current = true;
        setError(null);
        loadAccounts(true);
    }, [loadAccounts]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (
                    entry.isIntersecting &&
                    !loadingRef.current &&
                    hasMoreRef.current &&
                    !error
                )  loadAccounts();
            },
            {
                root: scrollRootRef.current ?? null,
                rootMargin: "80px",
                threshold: 0,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadAccounts, error]);

    return (
        <div
            className={cn(
                "w-full min-h-[100dvh] flex flex-col",
                className,
            )}
            {...props}
        >
            <div className="w-full border-b border-b-neutral-300 flex flex-col gap-3 justify-center h-20 flex-shrink-0">
                <div className="flex flex-row items-center px-8">
                    <FaArrowLeft
                        size={20}
                        onClick={handleBackClick}
                        className="cursor-pointer hover:text-neutral-700 transition-colors"
                        aria-label="Go back"
                        role="button"
                        tabIndex={0}
                    />
                    <p className="font-semibold text-neutral-950 text-md w-full text-center capitalize truncate ml-4">
                        Withdrawal
                    </p>
                    <div className="w-5" /> {/* Spacer for centering */}
                </div>
            </div>
            <div className="w-full flex-1 flex flex-col gap-4 items-center justify-between px-4 pt-6 pb-8">
                <div className="w-full flex flex-col gap-4">
                    <h3 className="font-bold text-xl w-full">Enter amount you want to withdraw</h3>
                    <p className="text-neutral-500 w-full leading-tight">Enter an amount of at least 100 Naira. Make sure you have already stored your account number in the payment settings screen so we can deposit the money there.</p>
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center gap-3 px-4 py-2 border border-neutral-300 rounded-lg focus-within:border-blue-600">
                            <TbCurrencyNaira size={25} className="text-neutral-600" />
                            <Input
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => handlePriceChange(e.target.value)}
                                className="border-none shadow-none text-base p-0 w-full"
                            />
                        </div>
                        {inputError && (<p className="text-red-600 text-sm">{inputError}</p>)}
                    </div>
                    <h3 className="font-bold text-xl w-full">Your accounts info</h3>
                    <div
                        className="w-full flex flex-col gap-2 overflow-y-auto no-scrollbar"
                        ref={scrollRootRef}
                        style={{ maxHeight: "500px" }}
                    >
                        {accounts.map((account) => (
                            <span key={account.id}>
                                {account.id}
                            </span>
                        ))}

                        <span ref={sentinelRef} aria-hidden className="h-1" />

                        {isAccountLoading && (
                            <span className="flex justify-center py-4">
                                <Loader className="h-8 w-8"/>
                            </span>
                        )}

                    </div>
                </div>
                <Button
                    className="w-full bg-blue-800 hover:bg-blue-800 py-8 font-semibold text-lg mt-8"
                    disabled={isLoading || !!inputError || !amount || isAccountLoading}
                    // onClick={handleBioUpdate}
                >
                    {isLoading ? <LoaderSmall /> : "Continue"}
                </Button>
            </div>
        </div>
    )
}
