"use client"

import {useState} from "react";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventDetails} from "@/components/event-page/details";
import {SingleEventFooter} from "@/components/event-page/footer";
import * as React from "react";
import {cn} from "@/lib/utils";
import {useSpotGradient} from "@/lib/util";

interface SingleEventProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    prev: string | null;
}


export default function EventSinglePage(
    {event, prev, className, ...props}: SingleEventProps
) {
    const [activeScreen, setActiveScreen] = useState<string>("details");

    const gradient = useSpotGradient(event.eventTheme)
    const style = event.eventTheme
        ? {
            backgroundImage: gradient
        }
        : undefined;

    if (activeScreen === "map") {
        return (
            <div
                className={cn(
                    "w-full ",
                    className,
                    event.eventTheme !== null ? "" : "bg-neutral-100",
                )}
                style={style}
                {...props}
            >
                <SingleEventHeader isCoHost={false} prev={prev} event={event} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
                <div>map</div>
            </div>
        )
    }

    if (activeScreen === "reviews") {
        return (
            <div
                className={cn(
                    "w-full ",
                    className,
                    event.eventTheme !== null ? "" : "bg-neutral-100",
                )}
                style={style}
                {...props}
            >
                <SingleEventHeader isCoHost={false} event={event} prev={prev} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
                <div>reviews</div>
            </div>
        )
    }

    if (activeScreen === "related") {
        return (
                    <div
                        className={cn(
                            "w-full ",
                            className,
                            event.eventTheme !== null ? "" : "bg-neutral-100",
                        )}
                        style={style}
                        {...props}
                    >
                        <SingleEventHeader isCoHost={false} prev={prev} event={event} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
                        <div>related</div>
                    </div>

        )
    }

    return(
        <div
            className={cn(
                "w-full ",
                className,
                event.eventTheme !== null ? "" : "bg-neutral-100",
            )}
            style={style}
            {...props}
        >
            <SingleEventHeader isCoHost={false} prev={prev} event={event} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            <SingleEventDetails isCoHost={false} event={event}/>
            <SingleEventFooter  isCoHost={false} event={event} />
        </div>
    )
}