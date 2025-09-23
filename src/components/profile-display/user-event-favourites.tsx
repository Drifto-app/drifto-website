"use client"

import {ComponentProps, useCallback, useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {authApi} from "@/lib/axios";
import {showTopToast} from "@/components/toast/toast-util";
import {Loader} from "@/components/ui/loader";
import * as React from "react";
import {EventFavouriteCard} from "@/components/profile-display/event-favourite-card";

interface UserEventFavouritesProps extends ComponentProps<"div"> {}

export const UserEventFavourites = ({
    className, ...props
}: UserEventFavouritesProps) => {

    const [events, setEvents] = useState<Array<{[key: string]: any}>>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const queuedRef = useRef(false);
    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(1);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const scrollRootRef = useRef<HTMLDivElement | null>(null);

    const loadEvents = useCallback(
        async (reset: boolean = false) => {
            if (loadingRef.current || (!reset && !hasMoreRef.current)) return;

            loadingRef.current = true;
            setLoading(true);
            setError(null);

            try {
                const currentPage = reset ? 1 : pageRef.current;

                const params: { [key: string]: string | number } = {
                    pageSize: 10,
                    pageNumber: currentPage,
                    reactionType: "EVENT"
                };

                const response = await authApi.get(`/reaction/user`, { params });

                const newPosts = response.data.data.data as Array<Record<string, any>>;

                if (reset) {
                    setEvents(newPosts);
                    pageRef.current = 2;
                    setHasMore(true);
                    hasMoreRef.current = true;
                } else {
                    setEvents((prev) => [...prev, ...newPosts]);
                    pageRef.current = currentPage + 1;
                }

                const isLast = response.data.data.isLast;
                setHasMore(!isLast);
                hasMoreRef.current = !isLast;
            } catch (err: any) {
                showTopToast("error", err.message || "Error loading comments");
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
                loadingRef.current = false;
            }
        },
        []
    );

    useEffect(() => {
        setEvents([]);
        setHasMore(true);
        pageRef.current = 1;
        hasMoreRef.current = true;
        setError(null);
        loadEvents(true);
    }, [loadEvents]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry.isIntersecting) return;

                if (loadingRef.current) {
                    queuedRef.current = true;
                    return;
                }

                if (hasMoreRef.current && !error) loadEvents();
            },
            {
                root: scrollRootRef.current ?? null,
                rootMargin: "80px",
                threshold: 0,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadEvents, error]);

    useEffect(() => {
        if (!loading && queuedRef.current && hasMoreRef.current && !error) {
            queuedRef.current = false;
            loadEvents();
        }
    }, [loading, error, loadEvents]);

    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 flex-1 pt-4 overflow-y-auto no-scrollbar pb-10",
                className,
            )}
            {...props}
            ref={scrollRootRef}
            style={{ maxHeight: "calc(100dvh - 80px)" }}
        >

            <div className="grid grid-cols-2 gap-20">
                {events.map((event) => (
                    <EventFavouriteCard eventContent={event.eventPlaceHolder} key={event.eventPlaceHolder.eventId} />
                ))}
            </div>

            <div ref={sentinelRef} aria-hidden className="h-1" />

            {loading && (
                <div className="flex justify-center py-4">
                    <Loader className="h-8 w-8"/>
                </div>
            )}

        </div>
    )
}