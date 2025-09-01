"use client"

import * as React from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";
import {FaArrowLeft} from "react-icons/fa";
import {MdOutlineDateRange} from "react-icons/md";
import {OrderItem} from "@/components/order/order-item";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "react-toastify";
import {LoaderSmall} from "@/components/ui/loader";
import {authApi} from "@/lib/axios";
import {OrderSuccessDetails} from "@/components/order/order-sucess";

interface OrderContentProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    prev: string | null;
}

type OrderLine = {
    ticket: { [key: string]: any };
    quantity: number;
};

export const OrderContent = ({
    prev, event, className, ...props
}: OrderContentProps) => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [isOrderSucessful, setIsOrderSucessful] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [orderItems, setOrderItems] = useState<OrderLine[]>([]);

    const handleBackClick = () => {
        router.push(prev != null ? prev : "/");
    }

    const handleOrderItemChange = (ticketId: string, quantity: number) => {
       const eventTicket = event.tickets.find((ticket: {[key: string]: any}) => ticket.id === ticketId);
       if (!eventTicket) return

       setOrderItems((prev) => {
           const itemIndex = prev.findIndex((line) => line.ticket.id === ticketId)
           let newItems: OrderLine[]

           if(quantity <= 0 ){
               newItems = itemIndex === -1 ? prev : [...prev.slice(0, itemIndex), ...prev.slice(itemIndex + 1)]
           } else if(itemIndex === -1) {
               newItems = [...prev, {ticket: eventTicket, quantity}]
           } else {
               newItems = [...prev]
               newItems[itemIndex] = {...newItems[itemIndex], ticket: eventTicket, quantity}
           }

           const newTotal = newItems.reduce((sum, item) => sum + item.quantity, 0)
           setTotal(newTotal)

           const newTotalAmount = newItems.reduce((sum, item) => sum + item.quantity * item.ticket.price, 0)
           setTotalAmount(newTotalAmount)

           return newItems
       })
    }

    const handleOrderSubmit = async () => {
        if(total <= 0) return

        setLoading(true);

        const param: {[key: string]: any} = {
            receiveUpdateOnEvent: true,
            eventId: event.id,
            ticketRequests: []
        }
        for(const item of orderItems) {
            param.ticketRequests = [...param.ticketRequests, {
                ticketId: item.ticket.id,
                quantity: item.quantity,
            }];

        }

        try {
            const response = await authApi.post("/order", param);
            setLoading(false);

            if(!response.data.data.completed) {
                router.push(`/m/payment/${response.data.data.orderId}?prev=${encodeURIComponent(pathname + "?" + searchParams)}`);
            } else {
                setIsOrderSucessful(true);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    if(isOrderSucessful) {
        return (
            <OrderSuccessDetails />
        )
    }

    return (
        <div className={cn(
            "w-full flex flex-col items-center justify-center",
            className
        )} {...props}>
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
                        {event.title}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center px-4">
                <div className="flex flex-row items-center px-4 py-4 w-full gap-4 rounded-md border-neutral-300 border-1 mt-4">
                    <MdOutlineDateRange size={45} className="text-green-500" />
                    <p className="text-neutral-500 font-medium">Need to cancel? Do so before the event starts for a refund (10% fee applies).</p>
                </div>
                <div className="flex flex-col items-center gap-4 w-full pt-4">
                    {event.tickets.map((item: {[key: string]: any}) => (
                        <OrderItem key={item.id} ticket={item} onChangeChange={handleOrderItemChange} />
                    ))}
                </div>
            </div>
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 w-full">
                <div className="w-full flex flex-row justify-between items-center px-6 py-4">
                    <div>
                        <p className="text-neutral-500 text-base">Total</p>
                        <p className="font-bold text-2xl">{total}</p>
                    </div>
                    <Button
                        className="text-lg px-6 py-7 rounded-lg"
                        onClick={handleOrderSubmit}
                        disabled={total <= 0 || loading}
                    >
                        {!loading ? (
                            totalAmount ? "Get ₦ " + totalAmount : "Get Free"
                        ) : <LoaderSmall />}
                    </Button>
                </div>
            </div>
        </div>
    )
}