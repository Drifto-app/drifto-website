"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {EventSingleContent, EventSingleContentText} from "@/components/ui/content";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/axios";
import {Loader} from "@/components/ui/loader";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button";
import DoughnutChart from "@/components/ui/doughnut-chart";

interface EventEarningsProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
}

export const EventEarnings = ({
    event, className, ...props
}: EventEarningsProps) => {
    const [eventEarnings, setEventEarnings] = useState<{[key: string]: any}>({});
    const [isShow, setShow] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoadEventEarnings = async () => {
        setLoading(true);

        try {
            const response = await authApi.get(
                `/event/${event.id}/earnings`
            )

            console.log(response.data.data)
            console.log(event)

            setError(null);
            setEventEarnings(response.data.data);
        } catch (err: any) {
            setError(err.message || "Unable to load event earnings");
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        if(!event) return;

        handleLoadEventEarnings()
    }, [event])

    if(error) {
       return (
           <div className={cn(
               "w-full px-4 flex items-center justify-center",
               className
           )} {...props}>
               <p className="text-lg text-neutral-500">
                   Unable to load event earnings
               </p>
           </div>
       )
    }

    if(loading) {
        return (
            <div className="w-full flex-1 flex flex-col items-center justify-center">
                <Loader className="h-10 w-10"/>
            </div>
        )
    }

    return(
        <div className={cn(
            "w-full px-4 pt-5 pb-15",
            className
        )} {...props}>
            <div className="w-full flex flex-col items-center gap-6">
                <EventSingleContentText isLine={false} headText={"Total Earnings"} className="shadow-xl gap-6">
                    <div className="flex flex-row justify-between items-center w-full">
                        <p className="text-2xl font-semibold">
                            {
                                isShow
                                    ? eventEarnings.totalEarnings?.toFixed(2)
                                    : "****"
                            }
                        </p>
                        <div className="px-2 cursor-pointer text-neutral-500" onClick={() => setShow(!isShow)}>
                            {isShow
                                ?<FaEyeSlash size={20} />
                                : <FaEye size={20} />}
                        </div>
                    </div>
                </EventSingleContentText>
                <div className="w-full flex flex-row items-center justify-between px-6">
                    <p className="font-medium text-md">Payout Status:</p>
                    <p className="text-neutral-500 font-semibold">
                        {eventEarnings.payoutStatus?.replace(/_/g, ' ')}
                    </p>
                </div>
                <EventSingleContentText isLine={false} headText={"Net Earnings"} className="shadow-xl gap-6 items-start">
                    <p className="text-xl font-semibold">
                        {
                            isShow
                                ? eventEarnings.netEarnings?.toFixed(2)
                                : "****"
                        }
                    </p>
                </EventSingleContentText>
                <EventSingleContentText isLine={false} headText={"Platform Fee"} className="shadow-xl gap-6 items-start">
                    <p className="text-lg font-semibold">
                        {eventEarnings.driftoPercentage}%
                    </p>
                </EventSingleContentText>
                <EventSingleContentText isLine={false} headText={"Total Tickets Sold"} className="shadow-xl gap-6 items-start">
                    <p className="text-lg font-semibold">
                        {eventEarnings.totalTicketsSold}
                    </p>
                </EventSingleContentText>
                <EventSingleContentText isLine={false} headText={"Total Tickets"} className="shadow-xl gap-6 items-start">
                    <p className="text-lg font-semibold">
                        {eventEarnings.totalTickets}
                    </p>
                </EventSingleContentText>


                <Drawer>
                    <DrawerTrigger asChild>
                        <p className="font-bold py-2 underline text-blue-800 cursor-pointer w-full text-center">
                            See more info on Tickets
                        </p>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Ticket Details</DrawerTitle>
                                {/*<DrawerDescription>Set your daily activity goal.</DrawerDescription>*/}
                            </DrawerHeader>
                            <div className="flex flex-col gap-6 pb-10 px-6">
                                {event.tickets.map((ticket: {[key: string]: any}) => (
                                    <EventSingleContent className="shadow-lg border-1" key={ticket.id}>
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <div className="flex flex-row gap-2 items-center">
                                                <DoughnutChart total={ticket.totalQuantity} used={ticket.purchasedQuantity} />
                                                <p className="capitalize font-semibold text-md text-neutral-500">
                                                    {ticket.title}: {ticket.purchasedQuantity}/{ticket.totalQuantity}
                                                </p>
                                            </div>
                                            <p className="font-semibold">{ticket.price.toFixed(2)}</p>
                                        </div>
                                    </EventSingleContent>
                                    ))}
                            </div>
                            <DrawerFooter>
                                {/*<DrawerClose asChild>*/}
                                {/*    <Button variant="outline">Cancel</Button>*/}
                                {/*</DrawerClose>*/}
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>

                <div className="text-red-600 font-semibold underline w-full text-center py-2 cursor-pointer">
                    Report Event
                </div>
            </div>
        </div>
    )
}