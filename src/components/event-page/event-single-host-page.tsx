import * as React from "react";
import {cn} from "@/lib/utils";
import {useSpotGradient} from "@/lib/util";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventDetails} from "@/components/event-page/details";
import {SingleEventFooter} from "@/components/event-page/footer";
import {useState} from "react";
import CommentManagePage from "@/components/comment/comment-manage";
import { useNavigationHistory } from "@/hooks/use-navigation-history";
import {EventEarnings} from "@/components/event-page/event-earnings";
import {EventEdit} from "@/components/event-page/event-edit";
import {FindAttendees} from "@/components/event-page/find-attendees";

interface SingleEventHostPageProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    prev: string | null;
    setLoading: (state: boolean) => void;
    setEvent: (event: {[key: string]: any}) => void;
}

export default function SingleEventHostPage(
    {event, prev, setEvent, setLoading, className, ...props}: SingleEventHostPageProps
) {
    const {
        navigateTo,
        goBack,
        getCurrentScreen,
        canGoBack,
        resetToScreen,
    } = useNavigationHistory('details');

    const currentScreen = getCurrentScreen();
    const activeScreen = currentScreen.screen;

    const gradient = useSpotGradient(event.eventTheme);
    const style = event.eventTheme
        ? {
            backgroundImage: gradient
        }
        : undefined;

    const setActiveScreen = (screen: string, title?: string) => {
        // Define screen titles
        const screenTitles: Record<string, string> = {
            'likes': 'Event Likes',
            'tickets': 'Ticket Sales',
            'event-earnings': 'Event Earnings',
            'edit': 'Edit Event',
            'delete': 'Delete Event',
            'co-host-manage': 'Manage Co-Host',
            'host-invites': 'Host Invites'
        };

        const screenTitle = title || screenTitles[screen] || 'Manage Event';
        navigateTo(screen, screenTitle);
    };

    const handleBackClick = () => {
        if (canGoBack()) {
            goBack();
        } else {
            // If no history, go to the original prev route
            if (typeof window !== 'undefined') {
                window.history.back();
            }
        }
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
                    <EventEdit event={event} setEvent={setEvent} setMainActiveScreen={setActiveScreen} />
                );

            case 'co-host-manage':
                return (
                    <div className="w-full min-h-[85vh] px-4">
                        <div className="w-full flex flex-col gap-4">
                            <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                                Manage Co-Host
                            </h1>
                            {/* Add your co-host management component here */}
                        </div>
                    </div>
                );

            case 'host-invites':
                return (
                    <div className="w-full min-h-[85vh] px-4">
                        <div className="w-full flex flex-col gap-4">
                            <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                                Host Invites
                            </h1>
                            {/* Add your host invites component here */}
                        </div>
                    </div>
                );

            default:
                return (
                    <>
                        <SingleEventDetails
                            isCoHost={true}
                            event={event}
                            setActiveScreen={setActiveScreen}
                        />
                        <SingleEventFooter
                            isCoHost={true}
                            event={event}
                            setActiveScreen={setActiveScreen}
                            setLoading={setLoading}
                        />
                    </>
                );
        }
    };

    return (
        <div
            className={cn(
                "w-full",
                className,
                event.eventTheme !== null ? "" : "bg-neutral-100",
            )}
            style={style}
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