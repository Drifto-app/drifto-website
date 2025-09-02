import { create } from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {api, authApi} from "@/lib/axios";
import {toast} from "react-toastify";
import {showTopToast} from "@/components/toast/toast-util";

interface EventTagsState {
    // State
    tags: any[];
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;

    // Actions
    fetchTags: () => Promise<void>;
    setTags: (tags: any[]) => void;
    clearTags: () => void;
    getTagById: (id: string) => {[key: string]: any} | undefined;
    getTagsByName: (names: string[]) => any[];
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useEventTagsStore = create<EventTagsState>()(
    persist(
        (set, get) => ({
            // Initial state
            tags: [],
            isLoading: false,
            error: null,
            lastFetched: null,

            // Fetch tags from API
            fetchTags: async () => {
                const { lastFetched, isLoading } = get();
                const now = Date.now();

                // Prevent multiple simultaneous requests
                if (isLoading) {
                    return;
                }

                // Check if we have cached data that's still fresh
                if (lastFetched && (now - lastFetched) > CACHE_DURATION) {
                    return;
                }

                set({ isLoading: true, error: null });

                try {
                    const response = await authApi.get("/event/tags");

                    if (!response.data.status) {
                        const errorMsg = response.data.description || 'Failed to fetch tags';
                        set({
                            error: errorMsg
                        });
                        showTopToast("error", errorMsg);
                        return;
                    }

                    const result = response.data.data;

                    if (!result || !Array.isArray(result)) {
                        const errorMsg = 'Invalid tags data received';
                        set({
                            error: errorMsg
                        });
                        showTopToast("error", errorMsg);
                        return;
                    }

                    set({
                        tags: result,
                        error: null,
                        lastFetched: now,
                    });


                } catch (error) {
                    console.error('Failed to fetch event tags:', error);

                    const errorMessage = 'Unknown error occurred';

                    set({
                        error: errorMessage,
                    });

                    showTopToast("error", errorMessage);
                } finally {
                    set({
                        isLoading: false,
                    })
                }
            },

            // Set tags manually (useful for testing or manual updates)
            setTags: (tags) => {
                set({ tags, lastFetched: Date.now() });
            },

            // Clear all tags
            clearTags: () => {
                set({ tags: [], lastFetched: null, error: null });
            },

            // Get a specific tag by ID
            getTagById: (id) => {
                const { tags } = get();
                return tags.find(tag => tag.id === id);
            },

            // Get multiple tags by their names
            getTagsByName: (names) => {
                const { tags } = get();
                return tags.filter(tag =>
                    names.some(name =>
                        tag.name.toLowerCase() === name.toLowerCase()
                    )
                );
            },

            // Set error state
            setError: (error) => {
                set({ error });
            },

            // Set loading state
            setLoading: (isLoading) => {
                set({ isLoading });
            },
        }),
        {
            name: 'event-tags-store',
        }
    )
);

// Selector hooks for better performance and avoiding unnecessary re-renders
export const useEventTags = () => useEventTagsStore(state => state.tags);
export const useEventTagsLoading = () => useEventTagsStore(state => state.isLoading);
export const useEventTagsError = () => useEventTagsStore(state => state.error);
export const useEventTagsLastFetched = () => useEventTagsStore(state => state.lastFetched);

// Helper hook for getting specific tags
export const useEventTag = (id: string) =>
    useEventTagsStore(state => state.getTagById(id));

// Export store actions for use in components
export const eventTagsActions = {
    fetchTags: () => useEventTagsStore.getState().fetchTags(),
    setTags: (tags: any[]) => useEventTagsStore.getState().setTags(tags),
    clearTags: () => useEventTagsStore.getState().clearTags(),
    getTagById: (id: string) => useEventTagsStore.getState().getTagById(id),
    getTagsByName: (names: string[]) => useEventTagsStore.getState().getTagsByName(names)
};