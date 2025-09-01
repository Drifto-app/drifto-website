"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {useSpotGradient} from "@/lib/util";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventDetails} from "@/components/event-page/details";
import {SingleEventFooter} from "@/components/event-page/footer";
import { useNavigationHistory } from "@/hooks/use-navigation-history";
import {EventEarnings} from "@/components/event-page/event-earnings";
import {EventEdit} from "@/components/event-page/event-edit";
import {FindAttendees} from "@/components/event-page/find-attendees";
import {HostInvites} from "@/components/event-page/host-invites";
import {CoHostManage} from "@/components/event-page/co-host-manage";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

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
    const [isInitialized, setIsInitialized] = React.useState(false);

    const urlScreen = searchParams.get("screen");

    // Define screen titles
    const screenTitles: Record<string, string> = {
        'tickets': 'Ticket Sales',
        'event-earnings': 'Event Earnings',
        'edit': 'Edit Event',
        'co-host-manage': 'Manage Co-Host',
        'host-invites': 'Co-Host Invites',
        'details': 'Manage Event'
    };

    const {
        navigateTo,
        goBack,
        getCurrentScreen,
        canGoBack,
        resetToScreen,
    } = useNavigationHistory('details');

    const currentScreen = getCurrentScreen();
    const activeScreen = currentScreen.screen;

    // Initialize navigation history based on URL on first load
    useEffect(() => {
        if (!isInitialized) {
            const initialScreen = urlScreen || 'details';
            const screenTitle = screenTitles[initialScreen] || 'Manage Event';
            resetToScreen(initialScreen, screenTitle);
            setIsInitialized(true);
        }
    }, [urlScreen, isInitialized, resetToScreen, screenTitles]);

    // Sync URL with navigation history when activeScreen changes programmatically
    useEffect(() => {
        if (isInitialized && activeScreen && urlScreen !== activeScreen) {
            const params = new URLSearchParams(searchParams.toString());
            if (activeScreen === 'details') {
                params.delete("screen");
            } else {
                params.set("screen", activeScreen);
            }
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [activeScreen, urlScreen, searchParams, router, isInitialized]);

    const gradient = useSpotGradient(event.eventTheme);
    const style = event.eventTheme
        ? {
            backgroundImage: gradient
        }
        : undefined;

    const setActiveScreen = (screen: string, title?: string) => {
        const screenTitle = title || screenTitles[screen] || 'Manage Event';
        navigateTo(screen, screenTitle);
    };

    const handleBackClick = () => {
        if (canGoBack()) {
            goBack();
        } else {
            // If no history, go to the original prev route or browser back
            if (typeof window !== 'undefined') {
                window.history.back();
                // router.push("/")
            }
        }
    };

    const handleScreen = (value: string, title?: string) => {
        setActiveScreen(value, title);
    };

    // Don't render until initialized to avoid flash
    if (!isInitialized) {
        return null;
    }

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
                "flex flex-col w-full min-h-screen",
                className,
                event.eventTheme !== null ? "" : "bg-neutral-100",
            )}
            style={activeScreen === "details" || activeScreen === "edit" ? style : undefined}
            {...props}
        >
            <SingleEventHeader
                isCoHost={true}
                isCoHostComponent={activeScreen !== 'details'}
                prev={prev}
                event={event}
                title={currentScreen.title || 'Manage Event'}
                onBackClick={handleBackClick}
            />
            {renderScreen()}
        </div>
    );
}