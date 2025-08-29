"use client"

import * as React from "react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {FaArrowLeft} from "react-icons/fa";
import {CiCalendarDate} from "react-icons/ci";
import {MdOutlineDateRange} from "react-icons/md";

interface OrderContentProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    prev: string | null;
}

export const OrderContent = ({
    prev, event, className, ...props
}: OrderContentProps) => {
    const router = useRouter();

    const handleBackClick = () => {
        router.push(prev != null ? prev : "/");
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
            <div className="flex flex-row items-center px-4">
                <div className="flex flex-row items-center px-4 py-4 w-full gap-4 rounded-md border-neutral-300 border-1 mt-4">
                    <MdOutlineDateRange size={45} className="text-green-500" />
                    <p className="text-neutral-500 font-medium">Need to cancel? Do so before the event starts for a refund (10% fee applies).</p>
                </div>
            </div>
        </div>
    )
}