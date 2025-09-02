import { persist } from "zustand/middleware";
import { create } from "zustand";

export interface SearchItem {
    id: string;
    query: { [key: string]: any };
    type: "event" | "user";
    timestamp: number;
}

interface RecentSearchState {
    searches: SearchItem[];
    isLoading: boolean;
}

interface RecentSearchStore extends RecentSearchState {
    addSearch: (query: {[key: string]: any}, type: "event" | "user") => void;
    deleteSearch: (searchId: string) => void;
    deleteAllSearches: () => void;
    setLoading: (loading: boolean) => void;
    clearSearches: () => void;
}

export const useRecentSearchStore = create<RecentSearchStore>()(
    persist(
        (set, get) => ({
            searches: [
                {
                    id: "7edbc5dc-d7af-4225-85f5-0857fccfeefc",
                    query:  {
                        id: "7edbc5dc-d7af-4225-85f5-0857fccfeefc",
                        title: "drifto nights: mystery experience edition",
                        startTime: "2025-10-25T12:00:00Z",
                        eventTitleImage: "https://res.cloudinary.com/dfn3ix1db/image/upload/f_auto,q_auto/v1/drifto/2025-07-19T20:14:31.157331825Z_93302540-0c83-40e8-8697-dffbb84ca85c?_a=DAGAACAWZAA0",
                        city: null,
                        new: false
                    },
                    timestamp: Date.now(),
                    type: "event"
                },
                {
                    id: "9613c854-4834-426c-b8db-574a3ba2ac80",
                    query: {
                        id: "9613c854-4834-426c-b8db-574a3ba2ac80",
                        title: "explore lagos like never before: drifto local hunt",
                        startTime: "2025-11-19T12:00:00Z",
                        eventTitleImage: "https://res.cloudinary.com/dfn3ix1db/image/upload/f_auto,q_auto/v1/drifto/2025-07-19T20:10:31.566279944Z_6aa13920-10cc-4e51-9271-1ac4bbcbc7c3?_a=DAGAACAWZAA0",
                        city: null,
                        new: false
                    },
                    timestamp: Date.now(),
                    type: "event"
                },
                {
                    id: "79c9463b-d169-4a70-9e14-28e857d6b996",
                    query: {
                        "id": "79c9463b-d169-4a70-9e14-28e857d6b996",
                        "username": "drifto",
                        "profileImage": "https://res.cloudinary.com/dfn3ix1db/image/upload/c_fill,f_auto,q_auto,w_512/v1/drifto/2025-07-19T20:06:19.272460702Z_3d224b3d-13ec-4b15-863f-7bdc46362a73?_a=DAGAACAWZAA0",
                        "userVerificationType": "ORGANIZATION_VERIFICATION",
                        "verified": true
                    },
                    timestamp: Date.now(),
                    type: "user"
                }
            ],
            isLoading: false,

            addSearch: (query: {[key: string]: any}, type: "event" | "user") => {
                const currentSearches = get().searches;

                // Check if search already exists
                const existingSearchIndex = currentSearches.findIndex(
                    search => search.query.id === query.id
                );

                if (existingSearchIndex !== -1) {
                    // Update timestamp if search already exists
                    const updatedSearches = [...currentSearches];
                    updatedSearches[existingSearchIndex] = {
                        ...updatedSearches[existingSearchIndex],
                        timestamp: Date.now(),
                    };
                    // Move to front
                    const updatedSearch = updatedSearches.splice(existingSearchIndex, 1)[0];
                    set({ searches: [updatedSearch, ...updatedSearches] });
                } else {
                    // Add new search
                    const newSearch: SearchItem = {
                        id: query.id,
                        query: query,
                        timestamp: Date.now(),
                        type: "event"
                    };

                    // Keep only the most recent 20 searches
                    const updatedSearches = [newSearch, ...currentSearches].slice(0, 20);

                    set({ searches: updatedSearches });
                }
            },

            deleteSearch: (searchId: string) => {
                const currentSearches = get().searches;

                const updatedSearches = currentSearches.filter(
                    search => search.id !== searchId
                );

                set({ searches: updatedSearches });
            },

            deleteAllSearches: () => {
                set({ searches: [] });
            },

            setLoading: (isLoading: boolean) => set({ isLoading }),

            clearSearches: () => set({ searches: [] }),
        }),
        {
            name: 'recent-search-storage',
            partialize: (state) => ({
                searches: state.searches,
            }),
        }
    )
);