"use strict"

import * as React from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useSpotGradient} from "@/lib/util";

interface SingleEventFooterProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    setActiveScreen?: (activeScreen: string) => void;
    isCoHost?: boolean;
}

export const SingleEventFooter = ({
    event, isCoHost, setActiveScreen, className, ...props
}: SingleEventFooterProps) => {
    const router = useRouter();

    const [price, setPrice] = useState<string>("5000");

    const gradient = useSpotGradient(event.eventTheme)
    const style = event.eventTheme
        ? {
            backgroundImage: gradient
        }
        : undefined;

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

    if(isCoHost) {
        return(
            <div className={cn(
                "fixed inset-x-0 bottom-0 z-60 border-t border-neutral-200",
                "safe-area-inset-bottom flex justify-center",
                event.eventTheme !== null ? "bg-gradient-to-t" : "bg-neutral-100",
                className
            )}
                 style={
                     event.eventTheme
                         ? {
                             backgroundImage: `linear-gradient(to top, ${event.eventTheme[0]}, ${event.eventTheme[1]})`
                         }
                         : undefined
                 }
                 {...props}>
                <div className="w-[80%] flex flex-row items-center justify-between px-6 py-3">
                    <Button
                        className="border-neutral-950 rounded-full px-12 py-7 text-md font-semibold cursor-pointer"
                        onClick={() => setActiveScreen!("edit")} >
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        className="border-neutral-950 rounded-full px-12 py-7 text-md font-semibold cursor-pointer"
                        onClick={() => setActiveScreen!("delete")}>
                        Delete
                    </Button>
                </div>
            </div>
        )
    }

    return(
        <div className={cn(
            "fixed inset-x-0 bottom-0 z-60 border-t border-neutral-200",
            "safe-area-inset-bottom",
            event.eventTheme !== null ? "bg-gradient-to-t" : "bg-neutral-100",
            className
            )}
             style={
                 event.eventTheme
                     ? {
                         backgroundImage: `linear-gradient(to top, ${event.eventTheme[0]}, ${event.eventTheme[1]})`
                     }
                     : undefined
             }
             {...props}>
            <div className="w-full flex flex-row items-center justify-between px-6 py-3">
                <div>
                    <p className="text-xs text-neutral-600">Starting:</p>
                    <h3 className="font-bold text-xl">{price === "Free" ? price : "₦ "+ price}</h3>
                </div>
                <Button className="rounded-full px-5 py-6" onClick={() => {router.push(`/orders/m/${event.id}`)}}>
                    Get Tickets
                </Button>
            </div>
        </div>
    )
}