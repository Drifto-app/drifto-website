import * as React from "react";
import {cn} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FaArrowLeft} from "react-icons/fa";
import {MdOutlineDateRange} from "react-icons/md";
import {FiBell} from "react-icons/fi";

interface PaymentContentProps extends React.ComponentProps<"div"> {
    order: {[key: string]: any};
    orderContent: {[key: string]: any};
    prev: string | null;
}

export const PaymentContent = ({
    order,orderContent, prev, className, ...props
}: PaymentContentProps) => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleBackClick = () => {
        router.push(prev != null ? prev : "/");
    }

    return (
        <div
            className={cn(
                "w-full flex flex-col items-center justify-center",
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
                        Payment Method
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col items-center px-4 gap-4">
                <div className="flex flex-row items-center px-4 py-4 w-full gap-4 rounded-md border-neutral-300 border-1 mt-4">
                    <FiBell size={30} className="text-green-500" />
                    <p className="text-neutral-500 font-medium text-lg">Want to pay differently? Just reselect ticket first</p>
                </div>
                <div className="w-full flex flex-col items-center px-4 py-5 gap-4 border-neutral-300 border-1 rounded-md">
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
            </div>
        </div>
    )
}