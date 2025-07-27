"use client"

import {useState} from "react";
import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {ScreenProvider} from "@/components/screen/screen-provider";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventDetails} from "@/components/event-page/details";
import {SingleEventFooter} from "@/components/event-page/footer";
import * as React from "react";
import {cn} from "@/lib/utils";

interface SingleEventHeaderProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
}

export default function EventSinglePage(
    {event, className, ...props}: SingleEventHeaderProps
) {
    const [activeScreen, setActiveScreen] = useState<string>("details");

    if (activeScreen === "map") {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className={cn(
                        "w-full bg-neutral-100",
                        className
                    )} {...props}>
                        <SingleEventHeader event={event} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
                        <div>map</div>
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    if (activeScreen === "reviews") {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className={cn(
                        "w-full bg-neutral-100",
                        className
                    )} {...props}>
                        <SingleEventHeader event={event} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
                        <div>reviews</div>
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    if (activeScreen === "related") {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className={cn(
                        "w-full bg-neutral-100",
                        className
                    )} {...props}>
                        <SingleEventHeader event={event} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
                        <div>related</div>
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    return(
        <ProtectedRoute>
            <ScreenProvider>
                <div className={cn(
                    "w-full bg-neutral-100",
                    className
                )} {...props}>
                    <SingleEventHeader event={event} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
                    <SingleEventDetails event={event}/>
                    <SingleEventFooter event={event} activeScreen={activeScreen} />
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    )
}