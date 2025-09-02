"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useSpotGradient} from "@/lib/util";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label";
import {toast} from "react-toastify";
import {authApi} from "@/lib/axios";
import {showTopToast} from "@/components/toast/toast-util";

interface SingleEventFooterProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    setActiveScreen?: (activeScreen: string) => void;
    isCoHost?: boolean;
    setLoading?: (state: boolean) => void;
    currentPathUrl?: string;
}

export const SingleEventFooter = ({
    currentPathUrl, event, isCoHost, setLoading, setActiveScreen, className, ...props
}: SingleEventFooterProps) => {
    const router = useRouter();

    const [price, setPrice] = useState<string>("5000");

    const gradient = useSpotGradient(event.eventTheme)
    const style = event.eventTheme
        ? {
            backgroundImage: gradient
        }
        : undefined;

    const handleEventDelete = async () => {
        setLoading!(true);

        try {
            await authApi.delete(`/event/${event.id}`);

            setLoading!(false);

            router.push("/?screen=plans");
        }catch (err: any) {
            showTopToast("error", err.message || "Error deleting event");
            setLoading!(false);
        }
    }

    useEffect(() => {
        const newPrice: number = event.tickets.reduce((min: number, ticket: { price: number; }) => {
            return ticket.price < min ? ticket.price : min;
        }, Infinity);

        if(newPrice === 0) {
            setPrice("Free");
        }else {
            setPrice(newPrice.toFixed(2).toString());
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
                <div className="w-[80%] flex flex-row items-center justify-between sm:px-6 py-3">
                    <Button
                        className="border-neutral-950 rounded-full px-12 py-7 text-md font-semibold cursor-pointer"
                        onClick={() => setActiveScreen!("edit")}
                        disabled={new Date(event.stopTime) < new Date(Date.now())}
                    >
                        Edit
                    </Button>
                    {new Date(event.stopTime) > new Date(Date.now()) && event.hostCollaborationStatus === "HOST"
                    ? <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="border-neutral-950 rounded-full px-12 py-7 text-md font-semibold cursor-pointer"
                                >
                                    Delete
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-full flex flex-col gap-6">
                                <DialogHeader>
                                    <DialogTitle className="text-xl">Delete Event</DialogTitle>
                                    <DialogDescription className="text-md">
                                        Are you sure you want to delete this event? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="w-full flex flex-row sm:justify-between justify-between px-4 sm:px-20">
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary" className="text-xl bg-neutral-300 py-6 px-8 font-semibold">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="button" variant="secondary" className="text-xl py-6 px-8 bg-red-500 text-white font-semibold" onClick={handleEventDelete}>
                                        Confirm
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog> :
                    null
                    }


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
                <Button className="rounded-full px-5 py-6" onClick={() => {router.push(`/m/order/${event.id}?prev=${encodeURIComponent(currentPathUrl!)}`)}}>
                    Get Tickets
                </Button>
            </div>
        </div>
    )
}