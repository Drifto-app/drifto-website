"use client"

import {useMemo, useState} from "react";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventDetails} from "@/components/event-page/details";
import {SingleEventFooter} from "@/components/event-page/footer";
import * as React from "react";
import {cn} from "@/lib/utils";
import {SingleEventMap} from "@/components/event-page/event-map";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {SingleEventReviews} from "@/components/event-page/event-review";
import {SingleEventRelated} from "@/components/event-page/event-related";

interface SingleEventProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    prev: string | null;
}


export default function EventSinglePage(
    {event, prev, className, ...props}: SingleEventProps
) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const screen = searchParams.get("screen");

    const [activeScreen, setActiveScreen] = useState<string>(screen ?? "details");

    const containerStyle = useMemo(() => {
        const t = event?.eventTheme as [string, string] | undefined;
        if (!t) return undefined;
        const [c1, c2] = t;
        return { background: `linear-gradient(to bottom, ${c1}, ${c2})` } as const;
    }, [event]);

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
                    <SingleEventMap
                        event={event}
                        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                        style={containerStyle}
                    />
                )
            case "reviews":
                return (
                    <SingleEventReviews event={event} style={containerStyle} currentPathUrl={pathname + "?" + searchParams}/>
                )
            case "related":
                return (
                    <SingleEventRelated event={event} style={containerStyle} currentPathUrl={pathname + "?" + searchParams}/>
                )
            default:
                return(
                    <>
                        <SingleEventDetails isCoHost={false} event={event}/>
                        <SingleEventFooter  isCoHost={false} event={event} currentPathUrl={pathname + "?" + searchParams} />
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
            style={containerStyle}
            {...props}
        >
            <SingleEventHeader isCoHost={false} prev={prev} event={event} activeScreen={activeScreen} setActiveScreen={handleScreen} />
            {renderScreen()}
        </div>
    )
}