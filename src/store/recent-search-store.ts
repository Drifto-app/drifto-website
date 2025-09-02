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
            searches: [],
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
                        type: type
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