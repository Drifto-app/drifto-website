"use client";

import * as React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {IoMdHeartEmpty} from "react-icons/io";
import {FaHeart} from "react-icons/fa";
import {IoTicket} from "react-icons/io5";


interface EventCardProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
}

export const EventCard = ({ event, className, ...props }: EventCardProps) => {
    const dt = new Date(event.startTime);
    const formatted = dt.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return (
        <div className={cn("flex flex-col border-none", className)} {...props}>
            <div className="w-full rounded-lg flex flex-col gap-1">
                <div className="relative w-full max-h-[85vh] overflow-hidden">
                    <Image
                        src={event.titleImage}
                        alt={event.title}
                        width={800} // Or any base width — adjust as needed
                        height={500} // Controls aspect ratio
                        className="w-full h-auto object-cover rounded-lg"
                    />
                    <button className="absolute top-2 right-2 text-white rounded-full bg-neutral-800 p-2 opacity-90" disabled>
                        {event.likedByUser ? <FaHeart size={25} className="text-red-500"/>: <IoMdHeartEmpty size={25}/>}
                    </button>
                </div>
                <h3 className="mt-2 font-semibold text-xl">{event.title}</h3>
                <p className="text-sm text-gray-500 flex flex-row gap-2 items-center">
                    {formatted} at
                    <span className="capitalize font-semibold">{event.city}</span>
                    <span className="flex flex-row gap-1 items-center"><IoTicket size={15}/>{event.numberOfPurchasedTickets}</span>
                </p>
            </div>
            <div className="flex items-center text-xl font-bold">
                {event.attendees}
            </div>
        </div>
    );
}