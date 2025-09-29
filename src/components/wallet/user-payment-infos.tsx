"use client"

import * as React from "react";
import {ComponentProps, useCallback, useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {Loader} from "@/components/ui/loader";
import {showTopToast} from "@/components/toast/toast-util";
import {authApi} from "@/lib/axios";
import {CiUser} from "react-icons/ci";
import {FaUser} from "react-icons/fa";

interface UserPaymentInfoProps extends ComponentProps<"div"> {
    onAccountsLoad?: (paymentInfos: Array<Record<string, any>>) => void;
    detailsType?: string;
    maxHeight?: string;
    paymentInfo?: Record<string, any> | null;
    setPaymentInfo: (paymentInfo: Record<string, any> | null) => void;
}

export const UserPaymentInfo = ({
      onAccountsLoad, detailsType = "BANK_ACCOUNT_DETAILS", maxHeight = "500px", paymentInfo, setPaymentInfo, className, ...props
}: UserPaymentInfoProps) => {
    const [paymentInfos, setPaymentInfos] = useState<Array<Record<string, any>>>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isPaymentInfoLoading, setIsPaymentInfo] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(1);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const scrollRootRef = useRef<HTMLDivElement | null>(null);

    const loadAccounts = useCallback(
        async (reset: boolean = false) => {
            if (loadingRef.current || (!reset && !hasMoreRef.current)) return;

            loadingRef.current = true;
            setIsPaymentInfo(true);
            setError(null);

            try {
                const currentPage = reset ? 1 : pageRef.current;

                const params: { [key: string]: string | number } = {
                    pageSize: 10,
                    pageNumber: currentPage,
                    detailsType,
                };

                const response = await authApi.get("/paymentInfo/user", {params})

                const newAccounts = response.data.data.data as Array<Record<string, any>>;

                if (reset) {
                    setPaymentInfos(newAccounts);
                    pageRef.current = 2;
                    setHasMore(true);
                    hasMoreRef.current = true;
                } else {
                    setPaymentInfos((prev) => [...prev, ...newAccounts]);
                    pageRef.current = currentPage + 1;
                }

                const isLast = response.data.data.isLast;
                setHasMore(!isLast);
                hasMoreRef.current = !isLast;

                // Notify parent component of loaded paymentInfos
                if (onAccountsLoad) {
                    onAccountsLoad(reset ? newAccounts : [...paymentInfos, ...newAccounts]);
                }
            } catch (err: any) {
                showTopToast("error", err.message || "Error loading paymentInfos");
                setError(err.message || "Unknown error");
            } finally {
                setIsPaymentInfo(false);
                loadingRef.current = false;
            }
        },
        [detailsType, onAccountsLoad]
    );

    useEffect(() => {
        setPaymentInfos([]);
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
                "w-full flex flex-col gap-2 overflow-y-auto no-scrollbar",
                className
            )}
            ref={scrollRootRef}
            style={{ maxHeight }}
            {...props}
        >
            {paymentInfos.map((info) => (
                <span
                    key={info.id}
                    className={cn(
                        "px-4 py-4 border-2 rounded-lg w-full flex gap-2 items-center",
                        paymentInfo?.id === info.id ? "border-blue-800" : "border-neutral-400"
                    )}

                    onClick={() => {
                        if(paymentInfo?.id === info.id) {
                            setPaymentInfo(null)
                            return;
                        }
                        setPaymentInfo(info)
                    }}
                >
                      <span className="flex-shrink-0 bg-neutral-600 h-8 w-8 rounded-full flex items-center justify-center overflow-hidden">
                        <FaUser className="text-white w-4 h-4" />
                      </span>
                    <span className={cn(
                        "flex flex-col font-semibold",
                    )}>
                        <p className={cn(
                            paymentInfo?.id === info.id ? "text-blue-800" : "text-neutral-600 line-clamp-3"
                        )}>{`${info.accountNumber} (${info.bankName})`}</p>
                        <p className="text-neutral-400 text-sm">{info.accountName}</p>
                    </span>
                </span>
            ))}

            <span ref={sentinelRef} aria-hidden className="h-1" />

            {isPaymentInfoLoading && (
                <span className="flex justify-center py-4">
                    <Loader className="h-8 w-8"/>
                </span>
            )}

            {error && !isPaymentInfoLoading && (
                <p className="text-red-600 text-sm text-center py-4">{error}</p>
            )}
        </div>
    );
};