'use client';

import {createContext, ReactNode, useEffect} from "react";
import {eventTagsActions, useEventTagsStore} from "@/store/event-tag-store";
import {useAuthStore} from "@/store/auth-store";

const EventTagsContext = createContext<null>(null);

interface EventTagsProviderProps {
    children: ReactNode;
}

export function EventTagsProvider({ children }: EventTagsProviderProps) {

    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if(!isAuthenticated) {
            return;
        }

        eventTagsActions.fetchTags();

    }, [isAuthenticated]); // Empty dependency array - only run once

    return (
        <EventTagsContext.Provider value={null}>
            {children}
        </EventTagsContext.Provider>
    );
}