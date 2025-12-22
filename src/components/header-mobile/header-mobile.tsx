"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import { IoSearchSharp } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';

interface HeaderMobileProps extends React.ComponentProps<"div"> {
    activeScreen: string;
    location: string | null;
    setLocation: (location: string) => void;
}

const FOLLOW_UP_LINES = [
    'Experiences',
    'Events',
    'People',
    'Places',
    'Trips',
    'Adventures',
    'Food & Drink',
    'Wellness',
    'Outdoors',
    'Nightlife',
    'Workshops',
    'Meetups',
    'Communities',
];

export const HeaderMobile = ({
    activeScreen,
    className,
    location,
    setLocation,
    ...props
}: HeaderMobileProps) => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [lineIndex, setLineIndex] = useState(0);

    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        const interval = setInterval(() => {
            setLineIndex((prevIndex) => (prevIndex + 1) % FOLLOW_UP_LINES.length);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const handleSearchClick = () => {
        router.push(`/m/search?prev=${encodeURIComponent(pathname + "?" + searchParams)}`);
    };

    const handleLocationClick = () => {
        router.push(`/m/location?prev=${encodeURIComponent(pathname + "?" + searchParams)}`);
    };

    return (
        <div
            className={cn(
                "w-full flex flex-col items-center justify-center py-4 z-100",
                className,
                activeScreen !== "events" ? "hidden" : ""
            )}
            {...props}
        >
            <div className={cn(
                "w-full flex items-center",
                isAuthenticated ? "justify-center" : "justify-between px-6 pb-6"
            )}>
                <div
                    className={cn(
                        "rounded-full shadow-none border-none text-neutral-700 text-center font-black capitalize text-sm",
                        isAuthenticated ? "w-90 mb-3" : ""
                    )}
                    onClick={handleLocationClick}
                >
                    {location || "Choose your location"}
                </div>

                {!isAuthenticated &&
                    <Button
                        className="bg-blue-800 font-semibold py-5 px-6"
                        onClick={() => {
                            router.push(`/login`);
                        }}
                    >
                        Sign in
                    </Button>}
            </div>

            <div
                className="w-9/10 max-w-xl flex flex-row items-center border rounded-full px-4 py-4 shadow-xl"
                onClick={handleSearchClick}
            >
                <IoSearchSharp size={20} />
                <div className="flex flex-col justify-center pl-4 h-full w-full mr-8">
                    <div className="h-5 overflow-hidden">
                        <span
                            key={lineIndex}
                            className="block text-center text-sm font-semibold text-neutral-600 slide-up-animation truncate"
                        >
                            {FOLLOW_UP_LINES[lineIndex]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};