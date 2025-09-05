"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventDetails} from "@/components/event-page/details";
import {SingleEventFooter} from "@/components/event-page/footer";
import {EventEarnings} from "@/components/event-page/event-earnings";
import {EventEdit} from "@/components/event-page/event-edit";
import {FindAttendees} from "@/components/event-page/find-attendees";
import {HostInvites} from "@/components/event-page/host-invites";
import {CoHostManage} from "@/components/event-page/co-host-manage";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";

interface SingleEventHostPageProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    prev: string | null;
    setLoading: (state: boolean) => void;
    setEvent: (event: {[key: string]: any}) => void;
}

export default function SingleEventHostPage(
    {event, prev, setEvent, setLoading, className, ...props}: SingleEventHostPageProps
) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const urlScreen = searchParams.get("screen");
    const [activeScreen, setActiveScreen] = useState<string>(urlScreen ?? "details");
    const [screenTitle, setScreenTitle] = useState<string>("Manage Event");

    useEffect(() => {
        const changeTitle = () => {
            switch (activeScreen) {
                case "event-earnings":
                    setScreenTitle("Event Earnings");
                    break;
                case "tickets":
                    setScreenTitle("Ticket Sales");
                    break;
                case "edit":
                    setScreenTitle("Edit Event");
                    break;
                case "co-host-manage":
                    setScreenTitle("Manage Co-Host");
                    break;
                case "host-invites":
                    setScreenTitle("Co-Host Invites");
                    break;
            }
        }
        changeTitle()
    }, [activeScreen]);

    // const gradient = useSpotGradient(event.eventTheme);
    const containerStyle = useMemo(() => {
        const t = event?.eventTheme as [string, string] | undefined;
        if (!t) return undefined;
        const [c1, c2] = t;
        return { background: `linear-gradient(to bottom, ${c1}, ${c2})` } as const;
    }, [event]);


    const handleBackClick = () => {

        if(activeScreen !== "details") {
            setActiveScreen("details");
        } else {
            router.push(prev ? prev : "/");
        }
    };

    const handleScreen = (value: string, title?: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("screen", value);
        router.replace(`?${params.toString()}`);

        if(title) {
            setScreenTitle(title);
        }else {
            setScreenTitle("");
        }

        setActiveScreen(value);
    };


    // Render different screens based on activeScreen
    const renderScreen = () => {
        switch (activeScreen) {
            case 'tickets':
                return (
                    <FindAttendees event={event} />
                );

            case 'event-earnings':
                return (
                    <EventEarnings event={event} />
                );

            case 'edit':
                return (
                    <EventEdit event={event} setEvent={setEvent} setMainActiveScreen={handleScreen} />
                );

            case 'co-host-manage':
                return (
                    <CoHostManage event={event} />
                );

            case 'host-invites':
                return (
                    <HostInvites event={event} />
                );

            default:
                return (
                    <>
                        <SingleEventDetails
                            isCoHost={true}
                            event={event}
                            setActiveScreen={handleScreen}
                        />
                        <SingleEventFooter
                            isCoHost={true}
                            event={event}
                            setActiveScreen={handleScreen}
                            setLoading={setLoading}
                        />
                    </>
                );
        }
    };

    return (
        <div
            className={cn(
                "flex flex-col w-full min-h-[100dvh]",
                className,
                event.eventTheme !== null ? "" : "bg-neutral-100",
            )}
            style={activeScreen === "details" || activeScreen === "edit" ? containerStyle : undefined}
            {...props}
        >
            <SingleEventHeader
                isCoHost={true}
                isCoHostComponent={activeScreen !== 'details'}
                prev={prev}
                event={event}
                title={screenTitle || 'Manage Event'}
                onBackClick={handleBackClick}
            />
            {renderScreen()}
        </div>
    );
}