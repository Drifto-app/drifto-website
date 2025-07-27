"use strict"

import * as React from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface SingleEventFooterProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    activeScreen: string;
}

export const SingleEventFooter = ({
    event, activeScreen, className, ...props
}: SingleEventFooterProps) => {
    const router = useRouter();

    const [price, setPrice] = useState<string>("5000");

    useEffect(() => {
        const newPrice: number = event.tickets.reduce((min: number, ticket: { price: number; }) => {
            return ticket.price < min ? ticket.price : min;
        }, Infinity);

        if(newPrice === 0) {
            setPrice("Free");
        }else {
            setPrice(newPrice.toString());
        }
    }, [price])

    return(
        <div className={cn(
            "fixed inset-x-0 bottom-0 z-50 bg-white border-t border-neutral-200",
            "safe-area-inset-bottom",
            className
        )} {...props}>
            <div className="w-full flex flex-row items-center justify-between px-6 py-3">
                <div>
                    <p className="text-xs text-neutral-600">Starting:</p>
                    <h3 className="font-bold text-xl">{price}</h3>
                </div>
                <Button className="rounded-full px-5 py-6" onClick={() => {router.push(`/orders/m/${event.id}`)}}>
                    Get Tickets
                </Button>
            </div>
        </div>
    )
}