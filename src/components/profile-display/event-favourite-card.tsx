"use client"

import {ComponentProps} from "react";
import {cn} from "@/lib/utils";


interface EventFavouriteCardProps extends ComponentProps<"div"> {
    eventContent: {[key: string]: any};
}

export const EventFavouriteCard = ({
    eventContent, className, ...props
}: EventFavouriteCardProps) => {

    return (
        <div
            className={cn(
                "w-full",
                className,
            )}
            {...props}
        >
            {eventContent.eventId}
        </div>
    )
}