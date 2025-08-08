'use client';

import {createContext, ReactNode, useEffect} from "react";
import {eventTagsActions, useEventTagsStore} from "@/store/event-tag-store";

const EventTagsContext = createContext<null>(null);

interface EventTagsProviderProps {
    children: ReactNode;
}

export function EventTagsProvider({ children }: EventTagsProviderProps) {

    useEffect(() => {
        console.log('EventTagsProvider: Starting to fetch tags...');

        eventTagsActions.fetchTags();

    }, []); // Empty dependency array - only run once

    return (
        <EventTagsContext.Provider value={null}>
            {children}
        </EventTagsContext.Provider>
    );
}