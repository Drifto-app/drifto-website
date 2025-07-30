import * as React from "react";
import {cn} from "@/lib/utils";
import {useSpotGradient} from "@/lib/util";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventDetails} from "@/components/event-page/details";
import {SingleEventFooter} from "@/components/event-page/footer";
import {useState} from "react";
import CommentManagePage from "@/components/comment/comment-manage";
import { useNavigationHistory } from "@/hooks/use-navigation-history";

interface SingleEventHostPageProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    prev: string | null;
}

export default function SingleEventHostPage(
    {event, prev, className, ...props}: SingleEventHostPageProps
) {
    const {
        navigateTo,
        goBack,
        getCurrentScreen,
        canGoBack,
        resetToScreen
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
            'tickets': 'Find Attendees',
            'tickets-analysis': 'Ticket Analytics',
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
            case 'likes':
                return (
                    <div className="w-full min-h-[85vh] px-4">
                        <div className="w-full flex flex-col gap-4">
                            <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                                Event Likes ({event.totalLikes})
                            </h1>
                            {/* Add your likes management component here */}
                        </div>
                    </div>
                );

            case 'tickets':
                return (
                    <div className="w-full min-h-[85vh] px-4">
                        <div className="w-full flex flex-col gap-4">
                            <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                                Find Attendees
                            </h1>
                            {/* Add your ticket search component here */}
                        </div>
                    </div>
                );

            case 'tickets-analysis':
                return (
                    <div className="w-full min-h-[85vh] px-4">
                        <div className="w-full flex flex-col gap-4">
                            <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                                Ticket Analytics
                            </h1>
                            {/* Add your ticket analytics component here */}
                        </div>
                    </div>
                );

            case 'edit':
                return (
                    <div className="w-full min-h-[85vh] px-4">
                        <div className="w-full flex flex-col gap-4">
                            <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                                Edit Event
                            </h1>
                            {/* Add your edit event component here */}
                        </div>
                    </div>
                );

            case 'delete':
                return (
                    <div className="w-full min-h-[85vh] px-4">
                        <div className="w-full flex flex-col gap-4">
                            <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                                Delete Event
                            </h1>
                            {/* Add your delete event component here */}
                        </div>
                    </div>
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
                        />
                    </>
                );
        }
    };

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