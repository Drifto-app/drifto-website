"use client"

import {useState} from "react";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventDetails} from "@/components/event-page/details";
import {SingleEventFooter} from "@/components/event-page/footer";
import * as React from "react";
import {cn} from "@/lib/utils";
import {useSpotGradient} from "@/lib/util";
import {SingleEventMap} from "@/components/event-page/event-map";
import {useRouter, useSearchParams} from "next/navigation";

interface SingleEventProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    prev: string | null;
}


export default function EventSinglePage(
    {event, prev, className, ...props}: SingleEventProps
) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const screen = searchParams.get("screen");

    const [activeScreen, setActiveScreen] = useState<string>(screen ?? "details");

    const gradient = useSpotGradient(event.eventTheme)
    const style = event.eventTheme
        ? {
            backgroundImage: gradient
        }
        : undefined;

    const handleScreen = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("screen", value);
        router.replace(`?${params.toString()}`);

        setActiveScreen(value);
    }

    const renderScreen = () => {
        switch (activeScreen) {
            case "map":
                return (
                    <SingleEventMap event={event} style={style} />
                )
            case "reviews":
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
                        <div>reviews</div>
                    </div>
                )
            case "related":
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
                        <div>related</div>
                    </div>
                )
            default:
                return(
                    <>
                        <SingleEventDetails isCoHost={false} event={event}/>
                        <SingleEventFooter  isCoHost={false} event={event} />
                    </>
                )
        }
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
            <SingleEventHeader isCoHost={false} prev={prev} event={event} activeScreen={activeScreen} setActiveScreen={handleScreen} />
            {renderScreen()}
        </div>
    )
}