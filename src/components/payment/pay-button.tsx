"use client"

import * as React from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useCallback} from "react";

interface PayButtonProps extends React.ComponentProps<"button">{
    email: string,
    amount: number,
    reference: string,
    displayString?: string;
    paymentType?: "card" | "bank" | "ussd" | "qr" | "bank_transfer";
    onSuccess?: () => void,
    onError?: () => void,
    onClose?: () => void,
}

export const PayButton = ({
    email, amount, reference, onError, onSuccess, onClose, displayString, paymentType, className, ...props
                          }: PayButtonProps) => {
    const handleClick = useCallback(async () => {
        if (typeof window === 'undefined') return;

        const PaystackPopClass = (await import("@paystack/inline-js")).default;
        const paystack = new PaystackPopClass();

        const param: {[key: string]: any} = {
            key: process.env.NEXT_PUBLIC_PAYSTACK_PK!,
            amount: Math.round(amount * 100),
            email,
            channels: [paymentType ?? "card"],
            reference,
            onSuccess: (success) => {
                if (onSuccess) onSuccess();
            },
            onError: (error) => {
                if (onError) onError();
            },
            onClose: () => {
                if (onClose) onClose();
            }
        }

        paystack.newTransaction(param);
    }, [amount, email, reference]);

    return (
        <Button
            className={cn(
                "bg-neutral-950 text-white font-bold py-8 w-full text-md",
                className,
            )}
            {...props}
            onClick={handleClick}
        >
            {displayString ?? "Pay"}
        </Button>
    )
}