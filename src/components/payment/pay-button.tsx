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
    paymentType?: "card" | "ussd" | "qr" | "bank_transfer" | "apple_pay" | "mobile_money" | "eft" | "bank";
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

        const param = {
            key: process.env.NEXT_PUBLIC_PAYSTACK_PK!,
            amount: Math.round(amount * 100),
            currency: 'NGN',
            email,
            channels: [paymentType ?? "card"],
            reference,
            // split_code: process.env.NEXT_PUBLIC_PAYSTACK_SPLITCODE!,
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
            onError: () => {
                if (onError) onError();
            },
            onClose: () => {
                if (onClose) onClose();
            }
        }


        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        paystack.newTransaction(param);
    }, [amount, email, reference]);

    return (
        <Button
            className={cn(
                "bg-blue-800 hover:bg-blue-800 text-white font-bold py-8 w-full text-md",
                className,
            )}
            {...props}
            onClick={handleClick}
        >
            Continue
        </Button>
    )
}