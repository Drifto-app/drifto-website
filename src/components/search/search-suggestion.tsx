"use client"

import {useState, useEffect} from "react";
import {useRecentSearchStore} from "@/store/recent-search-store";
import {RecentSearchCard, SuggestionEventCard} from "@/components/search/search-card";
import * as React from "react";
import {authApi} from "@/lib/axios";
import {useAuthStore} from "@/store/auth-store";
import {LoaderSmall} from "@/components/ui/loader";

interface SuggestionCategory {
    value: string | null;
    label: string;
}


interface CategoryEvents {
    events: any[];
    loading: boolean;
    error: string | null;
}

const suggestionItems: SuggestionCategory[] = [
    { value: "music", label: "Music & Concerts" },
    { value: "sports", label: "Sports" },
    { value: "art & culture", label: "Art & Culture" },
    { value: "business & talks", label: "Business & Talks" },
    { value: "fashion", label: "Fashion" },
    { value: "fitness", label: "Fitness" },
    { value: "food & drinks", label: "Food & Drinks" },
    { value: "learning", label: "Learning" },
    { value: "nightlife", label: "Nightlife" },
    { value: "tech", label: "Tech" },
    { value: "gaming", label: "Games" },
    { value: "volunteering", label: "Volunteering" },
];

export const SearchSuggestion = () => {
    const {user} = useAuthStore();
    const {searches, deleteSearch} = useRecentSearchStore()

    const [isSearchShow, setIsSearchShow] = useState<boolean>(true)
    const [categoryEvents, setCategoryEvents] = useState<{[key: string]: CategoryEvents}>({})

    // Initialize loading states for all categories
    useEffect(() => {
        const initialState: {[key: string]: CategoryEvents} = {};
        suggestionItems.forEach(category => {
            if (category.value) {
                initialState[category.value] = {
                    events: [],
                    loading: true,
                    error: null
                };
            }
        });
        setCategoryEvents(initialState);
    }, []);

    // Fetch events for a specific category
    const fetchCategoryEvents = async (category: string) => {
        try {
            const params: {[key: string]: string | number} = {
                pageSize: 15,
                pageNumber: 1,
                eventTag: category
            };

            if(user?.city) {
                params.location = user.city;
            }

            const response = await authApi.get("/feed/event", { params });

            setCategoryEvents(prev => ({
                ...prev,
                [category]: {
                    events: response.data?.data.data || [],
                    loading: false,
                    error: null
                }
            }));
        } catch (error: any) {
            setCategoryEvents(prev => ({
                ...prev,
                [category]: {
                    events: [],
                    loading: false,
                    error: 'Failed to fetch events'
                }
            }));
        }
    };

    // Fetch events for all categories on mount (non-blocking)
    useEffect(() => {
        suggestionItems.forEach(category => {
            if (category.value) {
                // Use setTimeout to make the API calls non-blocking
                setTimeout(() => {
                    fetchCategoryEvents(category.value!);
                }, 0);
            }
        });
    }, []);

    const renderCategorySection = (category: SuggestionCategory) => {
        if (!category.value) return null;

        const categoryData = categoryEvents[category.value];

        return (
            <div key={category.value} className="flex flex-col w-full gap-3">
                <h3 className="font-semibold text-md">{category.label}</h3>

                {categoryData?.loading ? (
                    <div className="flex justify-center py-4">
                        <LoaderSmall />
                    </div>
                ) : categoryData?.error ? (
                    <div className="text-red-500 text-sm py-2">
                        Failed to load {category.label.toLowerCase()} events
                    </div>
                ) : (
                    <div className="grid grid-row-1 gap-3">
                        <div className="grid grid-rows-1 gap-3">
                            <div className="w-full overflow-x-auto no-scrollbar">
                                <div className="flex gap-2">
                                    {categoryData?.events.map((event) => (
                                        <div key={event.id} className="flex-none">
                                            <SuggestionEventCard event={event} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Show "No events" message if no events found */}
                        {categoryData?.events?.length === 0 && (
                            <div className="col-span-2 text-center text-gray-500 py-4">
                                No {category.label.toLowerCase()} events found
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full flex-1 pb-15">
            <div className="flex flex-col w-full px-4 pt-3 gap-4">
                <div className="flex w-full justify-between items-center">
                    <p className="font-bold text-lg">Recent Search</p>
                    <p className="text-blue-800 font-medium cursor-pointer" onClick={() => setIsSearchShow(!isSearchShow)}>
                        {!isSearchShow ? "Show" : "Hide"}
                    </p>
                </div>
                <div className="flex flex-col w-full gap-2">
                    {
                        isSearchShow
                            ? searches.map(item => (
                                <RecentSearchCard searchItem={item} key={item.id} removeSearch={deleteSearch} />
                            ))
                            : null
                    }
                </div>

                <div className="flex flex-col w-full gap-6">
                    <p className="font-bold text-lg">Hot Picks</p>
                    {suggestionItems.map(category => renderCategorySection(category))}
                </div>
            </div>
        </div>
    )
}