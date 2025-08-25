"use client";

import * as React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {IoMdHeartEmpty} from "react-icons/io";
import {FaHeart} from "react-icons/fa";
import {IoTicket} from "react-icons/io5";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {authApi} from "@/lib/axios";
import {toast} from "react-toastify";


interface EventCardProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    currentPathUrl: string;
}

export const EventCard = ({ event, currentPathUrl, className, ...props }: EventCardProps) => {
    const router = useRouter();

    const [price, setPrice] = useState<string>("");
    const [isLiked, setIsLiked] = useState<boolean>(event.likedByUser);
    const [isLikedLoading, setIsLikedLoading] = useState<boolean>(false);

    useEffect(() => {
       if(event.tickets) {
           const newPrice: number = event.tickets.reduce((min: number, ticket: { price: number; }) => {
               return ticket.price < min ? ticket.price : min;
           }, Infinity);

           if(newPrice === 0) {
               setPrice("Free");
           }else {
               setPrice(newPrice.toString());
           }
       }
    }, [price])

    const dt = new Date(event.startTime);
    const formatted = dt.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    const handleReaction = async () => {
        if (isLikedLoading) return;

        setIsLikedLoading(true);

        try {
            setIsLiked(!isLiked);
            await authApi.post(`/reaction/react`, {
                reactionType: "EVENT",
                eventId: event.id,
            })
        } catch (err: any) {
            toast.error(err.message);
            setIsLiked(!isLiked);
        } finally {
            setIsLikedLoading(false);
        }
    }

    return (
        <div className={cn("flex flex-col border-none", className)} {...props}>
            <div className="w-full rounded-lg flex flex-col gap-1">
                <div className="relative w-full max-h-[75vh] overflow-hidden">
                    <Image
                        src={event.titleImage}
                        alt={event.title}
                        width={800}
                        height={500}
                        className="w-full h-auto object-cover rounded-lg"
                        style={{ maxHeight: "75vh" }}
                        onClick={() => {
                            router.push(`/m/event/${event.id}?prev=${encodeURIComponent(currentPathUrl)}`)
                        }}
                    />
                    {event.original && <div className="absolute top-4 left-2 rounded-full py-2 px-2 text-xs shadow-md font-semibold bg-white">
                        Drifto Original
                    </div>}
                    <div className="p-3 absolute top-3 right-2 z-1000 h-15 w-15" onClick={handleReaction}>
                        <button className="absolute top-3 right-2 text-white rounded-full bg-neutral-800 p-2 opacity-90 z-90" disabled={isLikedLoading}>
                            {isLiked ? (
                                <FaHeart size={25} className="text-red-500" />
                            ) : (
                                <IoMdHeartEmpty size={25} />
                            )}
                        </button>
                    </div>
                </div>
                <h3 className="mt-2 font-semibold text-xl capitalize">{event.title}</h3>
                <p className="text-sm text-gray-500 flex flex-row gap-2 items-center">
                    {formatted} at
                    <span className="capitalize font-semibold">{event.city}</span>
                    <span className="flex flex-row gap-1 items-center"><IoTicket size={15}/>{event.numberOfPurchasedTickets}</span>
                </p>
            </div>
            {price && <div className="flex items-center text-xl font-bold w-full justify-end mt-2 text-neutral-500">
                {price === "Free" ? price : "₦ "+price}
            </div>}
        </div>
    );
}