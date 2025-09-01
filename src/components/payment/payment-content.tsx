"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FaArrowLeft} from "react-icons/fa";
import {FiBell, FiPhone} from "react-icons/fi";
import {IoCardOutline} from "react-icons/io5";
import {TbArrowsLeftRight} from "react-icons/tb";
import {AiOutlineQrcode} from "react-icons/ai";
import {BsBank} from "react-icons/bs";
import {useMemo, useState} from "react";
import {PayButton} from "@/components/payment/pay-button";
import {useAuthStore} from "@/store/auth-store";
import {OrderSuccessDetails} from "@/components/order/order-sucess";

interface PaymentContentProps extends React.ComponentProps<"div"> {
    order: {[key: string]: any};
    orderContent: {[key: string]: any};
    prev: string | null;
}

interface PaymentOptions {
    title: string;
    icon: React.ReactNode,
    value: string;
    header: string
}

const paymentsOptions: PaymentOptions[] = [
    {title: "Pay with Card", icon: <IoCardOutline size={30} className="text-blue-800" />, value: "card", header: "Card Payment"},
    {title: "Pay with Bank Transfer", icon: <TbArrowsLeftRight size={30} className="text-blue-800" />, value: "bank_transfer", header: "Bank Transfer Payment"},
    {title: "Pay with USSD", icon: <FiPhone size={30} className="text-blue-800" />, value: "ussd", header: "USSD Payment"},
    {title: "Pay with Bank", icon: <BsBank size={30} className="text-blue-800" />, value: "bank", header: "Bank Account Payment"},
]

export const PaymentContent = ({
    order, orderContent, prev, className, ...props
}: PaymentContentProps) => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const {user} = useAuthStore()

    const [activeScreen, setActiveScreen] = useState<string>("payment");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const optionByValue = useMemo<Record<string, PaymentOptions>>(
        () => Object.fromEntries(paymentsOptions.map(o => [o.value, o])) as Record<string, PaymentOptions>,
        []
    );

    const title: string =
        activeScreen === "payment"
            ? "Payment Method"
            : optionByValue[activeScreen]?.header ?? "Payment Method";

    const handleBackClick = () => {
        if(activeScreen !== "payment") {
            setActiveScreen("payment");
        } else {
            router.push(prev != null ? prev : "/");
        }
    }

    if(isSuccess) {
        return (
            <OrderSuccessDetails />
        )
    }

    const rederPayButton = (buttonValue: string, paymentType: "card" | "bank" | "ussd" | "qr" | "bank_transfer") => {
        return (
            <PayButton
                email={user?.email}
                amount={order.totalAmount}
                reference={order.paymentReference}
                displayString={buttonValue}
                paymentType={paymentType}
                onSuccess={() => setIsSuccess(true)}
                onError={() => setActiveScreen("payment")}
                onClose={() => setActiveScreen("payment")}
            />
        )
    }

    const render = () => {
        switch (activeScreen) {
            case "card":
                return (
                    <div className="w-full flex flex-col gap-4 px-4 pt-4">
                        <h2 className="font-bold text-xl">Order Summary</h2>
                        <div className="w-full flex justify-between text-xl font-medium">
                            <p>Total:</p>
                            <p>₦ {orderContent.totalPrice}</p>
                        </div>
                        {rederPayButton("Pay with Card", "card")}
                    </div>
                )
            case "bank_transfer":
                return (
                    <div className="w-full flex flex-col gap-4 px-4 pt-4">
                        <p className="text-lg">Please complete bank transfer for order with ID: {orderContent.id}</p>
                        <div className="w-full flex justify-between text-xl font-medium">
                            <p>Total:</p>
                            <p>₦ {orderContent.totalPrice}</p>
                        </div>
                        {rederPayButton("Initiate Bank Transfer", "bank_transfer")}
                    </div>
                )
            case "ussd":
                return (
                    <div className="w-full flex flex-col gap-4 px-4 pt-4">
                        <p className="text-lg">Please complete bank transfer for order with ID: {orderContent.id}</p>
                        <div className="w-full flex justify-between text-xl font-medium">
                            <p>Total:</p>
                            <p>₦ {orderContent.totalPrice}</p>
                        </div>
                        <p>Dial the USSD code provide to proceed with payment</p>
                        {rederPayButton("Initiate USSD Payment", "ussd")}
                    </div>
                )
            case "qr":
                return (
                    <div className="w-full flex flex-col gap-4 px-4 pt-4">
                        <h2 className="font-bold text-xl">Order Summary</h2>
                        <div className="w-full flex justify-between text-xl font-medium">
                            <p>Total:</p>
                            <p>₦ {orderContent.totalPrice}</p>
                        </div>
                        {rederPayButton("Pay with QR Code", "qr")}
                    </div>
                )
            case "bank":
                return (
                    <div className="w-full flex flex-col gap-4 px-4 pt-4">
                        <h2 className="font-bold text-xl">Order Summary</h2>
                        <div className="w-full flex justify-between text-xl font-medium">
                            <p>Total:</p>
                            <p>₦ {orderContent.totalPrice}</p>
                        </div>
                        {rederPayButton("Pay with Bank", "bank")}
                    </div>
                )
            default:
                return (
                    <div className="w-full flex flex-col items-center px-4 gap-4 pt-4">
                        {/*<div className="flex flex-row items-center px-4 py-4 w-full gap-4 rounded-md border-neutral-300 border-1">*/}
                        {/*    <FiBell size={30} className="text-green-500" />*/}
                        {/*    <p className="text-neutral-500 font-medium text-lg">Want to pay differently? Just reselect ticket first</p>*/}
                        {/*</div>*/}
                        <div className="w-full flex flex-col items-center px-4 py-4 gap-4 border-neutral-300 border-1 rounded-md">
                            <h3 className="w-full text-left font-bold text-xl">
                                Order Summary
                            </h3>
                            {orderContent.orderItems.map((item: {[key: string]: any}) => (
                                <p key={item.ticketId} className="w-full capitalize text-neutral-500 text-lg">
                                    {item.ticketName} - Quantity: {item.amount}
                                </p>
                            ))}
                            <div className="w-full flex justify-between text-xl font-bold border-t-1 border-neutral-200 pt-4">
                                <p>Total:</p>
                                <p>₦ {orderContent.totalPrice}</p>
                            </div>
                        </div>
                        {paymentsOptions.map((item: PaymentOptions, index: number) => (
                            <div
                                key={index}
                                className="w-full flex flex-row justify-start gap-6 border-1 border-neutral-200 p-4 rounded-md"
                                onClick={() => {
                                    setActiveScreen(item.value)
                                }}
                            >
                                {item.icon}
                                <span className="text-md font-semibold">{item.title}</span>
                            </div>
                        ))}
                    </div>
                )
        }
    }

    return (
        <div
            className={cn(
                "w-full flex flex-col items-center",
                className
            )}
            {...props}
        >
            <div className={cn(
                "w-full border-b-1 border-b-neutral-300 flex flex-col gap-3 h-20 justify-center",
                className
            )} {...props}>
                <div className="flex flex-row items-center px-8">
                    <FaArrowLeft
                        size={20}
                        onClick={handleBackClick}
                        className="cursor-pointer hover:text-neutral-700 transition-colors"
                    />
                    <p className="font-semibold text-neutral-950 text-md w-full text-center capitalize truncate ml-4">
                        {title}
                    </p>
                </div>
            </div>
            {render()}
        </div>
    )
}