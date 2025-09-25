"use client";
import { authApi } from "@/lib/axios";
import { UserCircle, AlertCircle, Loader2 } from "lucide-react";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {ScreenProvider} from "@/components/screen/screen-provider";

// Types
interface Ticket {
    id: string;
    ticketName: string;
    ticketReference: string;
    paid: boolean;
}

interface Bank {
    accountName: string;
    accountNumber: string;
    bankName: string;
    id: string;
    bankCode: string;
}

interface RefundRequest {
    userTicketReference: string;
    accountNumber: string;
    bankCode: string;
    bankName: string;
}

interface LoadingState {
    tickets: boolean;
    banks: boolean;
    refund: boolean;
}

interface ErrorState {
    tickets: string | null;
    banks: string | null;
    refund: string | null;
}

export default function RefundPageComponent() {
    const { id } = useParams();
    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const prev = searchParams.get("prev")

    // State management
    const [bankDetails, setBankDetails] = useState<Bank[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
    const [selectedBank, setSelectedBank] = useState<Bank | undefined>();

    const [loading, setLoading] = useState<LoadingState>({
        tickets: false,
        banks: false,
        refund: false,
    });

    const [errors, setErrors] = useState<ErrorState>({
        tickets: null,
        banks: null,
        refund: null,
    });

    // API calls
    const fetchTickets = useCallback(async () => {
        if (!id) return;

        setLoading((prev) => ({ ...prev, tickets: true }));
        setErrors((prev) => ({ ...prev, tickets: null }));

        try {
            const response = await authApi.get(`/userTicket/plan/ticket/${id}`, {
                params: { pageNumber: 1, pageSize: 10 },
            });

            const data = response.data?.data?.data || [];
            setTickets(data);
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "Failed to fetch tickets";
            setErrors((prev) => ({ ...prev, tickets: errorMessage }));
            console.error("Error fetching tickets:", error);
        } finally {
            setLoading((prev) => ({ ...prev, tickets: false }));
        }
    }, [id]);

    const fetchPaymentInfo = useCallback(async () => {
        setLoading((prev) => ({ ...prev, banks: true }));
        setErrors((prev) => ({ ...prev, banks: null }));

        try {
            const response = await authApi.get("/paymentInfo/user", {
                params: {
                    pageNumber: 1,
                    pageSize: 10,
                    detailsType: "BANK_ACCOUNT_DETAILS",
                },
            });

            const data = response.data?.data?.data || [];
            setBankDetails(data);
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "Failed to fetch bank details";
            setErrors((prev) => ({ ...prev, banks: errorMessage }));
            console.error("Error fetching bank details:", error);
        } finally {
            setLoading((prev) => ({ ...prev, banks: false }));
        }
    }, []);

    const handleRefundTicket = useCallback(
        async (refundData: RefundRequest) => {
            setLoading((prev) => ({ ...prev, refund: true }));
            setErrors((prev) => ({ ...prev, refund: null }));

            try {
                await authApi.post("refund/userTicket", refundData);
                router.push("/?screen=plans");
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.message || "Failed to process refund";
                setErrors((prev) => ({ ...prev, refund: errorMessage }));
                console.error("Error processing refund:", error);
            } finally {
                setLoading((prev) => ({ ...prev, refund: false }));
            }
        },
        [router]
    );

    // Event handlers
    const handleTicketSelect = useCallback((ticket: Ticket) => {
        setSelectedTicket((prev) => (prev?.id === ticket.id ? undefined : ticket));
    }, []);

    const handleBankSelect = useCallback((bank: Bank) => {
        setSelectedBank((prev) => (prev?.id === bank.id ? undefined : bank));
    }, []);

    const handleConfirmRefund = useCallback(() => {
        if (!selectedTicket) return;

        const refundData: RefundRequest = {
            userTicketReference: selectedTicket.ticketReference,
            accountNumber: selectedBank?.accountNumber || "",
            bankCode: selectedBank?.bankCode || "",
            bankName: selectedBank?.bankName || "",
        };

        handleRefundTicket(refundData);
    }, [selectedTicket, selectedBank, handleRefundTicket]);

    // Effects
    useEffect(() => {
        fetchTickets();
        fetchPaymentInfo();
    }, [fetchTickets, fetchPaymentInfo]);

    // Computed values
    const shouldShowBankSelection =
        selectedTicket?.paid === true || selectedTicket === undefined;
    const isConfirmDisabled =
        !selectedTicket || loading.refund || (selectedTicket.paid && !selectedBank);

    return (
        <ProtectedRoute>
            <ScreenProvider>
                <div className="min-h-screen bg-gray-50">
                    <RefundHeader title="Request Refund" prev={prev} />

                    <main className="p-4 pb-24">
                        {/* Instructions */}
                        <div className="mb-8">
                            <h1 className="text-lg font-semibold mb-2">
                                Select the ticket you want a refund for
                            </h1>
                            <p className="text-base text-gray-600">
                                Select the ticket you want a refund for. You can select only one
                                ticket at a time.
                            </p>
                        </div>

                        {/* Error Display */}
                        {errors.refund && (
                            <ErrorMessage
                                message={errors.refund}
                                onDismiss={() => setErrors((prev) => ({ ...prev, refund: null }))}
                            />
                        )}

                        {/* Tickets Section */}
                        <section className="mb-8">
                            {loading.tickets ? (
                                <LoadingSpinner message="Loading tickets..." />
                            ) : errors.tickets ? (
                                <ErrorMessage message={errors.tickets} onRetry={fetchTickets} />
                            ) : (
                                <TicketList
                                    tickets={tickets}
                                    selectedTicket={selectedTicket}
                                    onTicketSelect={handleTicketSelect}
                                />
                            )}
                        </section>

                        {/* Bank Selection Section */}
                        {shouldShowBankSelection && (
                            <section>
                                <h2 className="text-xl font-bold mb-4">Account</h2>

                                {loading.banks ? (
                                    <LoadingSpinner message="Loading bank details..." />
                                ) : errors.banks ? (
                                    <ErrorMessage message={errors.banks} onRetry={fetchPaymentInfo} />
                                ) : (
                                    <BankList
                                        banks={bankDetails}
                                        selectedBank={selectedBank}
                                        onBankSelect={handleBankSelect}
                                    />
                                )}
                            </section>
                        )}

                        <section className="w-full flex justify-center py-6">
                            <div
                                onClick={() => router.push(`/m/settings/account/add?prev=${encodeURIComponent(pathname + "?" + searchParams)}`)}
                                className="text-blue-800 hover:text-blue-800 font-medium transition-colors"
                            >
                                Add Account
                            </div>
                        </section>

                    </main>

                    {/* Confirm Button */}
                    <div className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-white p-4 flex justify-center">
                        <button
                            disabled={isConfirmDisabled}
                            onClick={handleConfirmRefund}
                            className="w-10/12 flex items-center justify-center gap-2 p-3 rounded-md disabled:bg-neutral-600 disabled:cursor-not-allowed text-white bg-blue-800 hover:bg-blue-800 font-bold text-lg transition-colors"
                        >
                            {loading.refund ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processing...
                                </>
                            ) : (
                                "Confirm"
                            )}
                        </button>
                    </div>
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    );
}

// Component: Ticket List
interface TicketListProps {
    tickets: Ticket[];
    selectedTicket: Ticket | undefined;
    onTicketSelect: (ticket: Ticket) => void;
}

const TicketList: React.FC<TicketListProps> = ({
                                                   tickets,
                                                   selectedTicket,
                                                   onTicketSelect,
                                               }) => {
    if (tickets.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No tickets found for this plan.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tickets.map((ticket) => {
                const isSelected = selectedTicket?.id === ticket.id;
                return (
                    <div
                        key={ticket.id}
                        onClick={() => onTicketSelect(ticket)}
                        className={`p-3 text-base font-normal rounded-md border-2 cursor-pointer transition-all hover:shadow-md ${
                            isSelected
                                ? "text-blue-700 border-blue-700 bg-blue-50"
                                : "border-gray-300 hover:border-gray-400"
                        }`}
                    >
                        <span className="font-medium">{ticket.ticketName}</span>
                        {!ticket.paid && (
                            <span className="ml-2 text-sm text-gray-500 font-normal">
                (free)
              </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// Component: Bank List
interface BankListProps {
    banks: Bank[];
    selectedBank: Bank | undefined;
    onBankSelect: (bank: Bank) => void;
}

const BankList: React.FC<BankListProps> = ({
                                               banks,
                                               selectedBank,
                                               onBankSelect,
                                           }) => {
    if (banks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No bank accounts found. Please add a bank account in your profile.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {banks.map((bank) => {
                const isSelected = selectedBank?.id === bank.id;
                return (
                    <div
                        key={bank.id}
                        onClick={() => onBankSelect(bank)}
                        className={`p-3 rounded-md border-2 flex gap-4 cursor-pointer transition-all hover:shadow-md ${
                            isSelected
                                ? "text-blue-900 border-blue-900 bg-blue-50"
                                : "border-gray-300 hover:border-gray-400"
                        }`}
                    >
                        <UserCircle size={50} className="text-gray-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm capitalize truncate">
                                {bank.accountNumber} ({bank.bankName})
                            </p>
                            <p className="text-gray-600 font-light uppercase text-sm truncate">
                                {bank.accountName}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Component: Loading Spinner
interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           message = "Loading...",
                                                       }) => (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <Loader2 className="animate-spin mb-2" size={32} />
        <p>{message}</p>
    </div>
);

// Component: Error Message
interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
                                                       message,
                                                       onRetry,
                                                       onDismiss,
                                                   }) => (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <div className="flex items-start">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="ml-3 flex-1">
                <p className="text-sm text-red-800">{message}</p>
                <div className="mt-2 flex gap-2">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded transition-colors"
                        >
                            Try Again
                        </button>
                    )}
                    {onDismiss && (
                        <button
                            onClick={onDismiss}
                            className="text-xs text-red-600 hover:text-red-800 transition-colors"
                        >
                            Dismiss
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// Component: Refund Header
interface RefundHeaderProps {
    title: string;
    prev: string | null
}

const RefundHeader: React.FC<RefundHeaderProps> = ({ title, prev }) => {
    const router = useRouter();

    return (
        <header className="w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-4 h-16">
                <button
                    onClick={() => router.push(prev || "/?screen=plans")}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Go back"
                >
                    <FaArrowLeft size={16} className="text-gray-700" />
                </button>
                <h1 className="font-semibold text-gray-900 text-lg capitalize truncate flex-1 text-center mx-4">
                    {title}
                </h1>
                <div className="w-8 h-8" /> {/* Spacer for centering */}
            </div>
        </header>
    );
};
