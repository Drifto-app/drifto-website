"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import { IoSearchSharp } from "react-icons/io5";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";

interface HeaderMobileProps extends React.ComponentProps<"div"> {
    activeScreen: string;
    location: string | null;
    setLocation: (location: string) => void;
}

const FOLLOW_UP_LINES = [
    "To unforgettable memories.",
    "To cozy corners and quiet company.",
    "To moments that last forever.",
    "To finding your place in the moment.",
    "To a street food crawl.",
    "To your next new crew.",
    "To viral-worthy moments.",
    "To an unforgettable vibe.",
    "To paint and sip magic.",
    "To the rhythm of the roam.",
    "To beats under the stars.",
    "To hidden city gems.",
    "To making everywhere feel alive.",
    "To your spontaneous side.",
    "To nights you'll never forget.",
    "To sunrise hikes and new friends.",
    "To flavors you've never tasted.",
    "To your next wild story.",
    "To dancing without limits.",
    "To showing up loud, bold, and you.",
    "To secret spots and good vibes.",
    "To memories you didnt plan.",
    "To laughter in new places.",
    "To journeys without maps.",
    "To the thrill of now.",
    "To the stories that only happen once.",
    "To strangers who become friends.",
    "To rooftop sunsets and rooftop talks.",
    "To neon lights and midnight walks.",
    "To the spark of something unexpected.",
    "To the freedom of just showing up.",
    "To the places you didnt know you needed.",
    "To epic group selfies and unfiltered fun.",
    "To the rhythm of the city.",
    "To curiosity leading the way.",
    'To that "why not?" energy.',
    "To the night that turned into a legend.",
    "To soul-refreshing getaways.",
    "To dancing in the rain.",
    "To backyard bonfires and deep convos.",
    "To the magic between the plans.",
    "To exploring like a local.",
    "To vibes that feel like home.",
    "To that one unforgettable moment.",
    "To the spark that started with a yes.",
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

    React.useEffect(() => {
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
            {location !== null && (
                <div
                    className="h-full w-90 rounded-full shadow-none border-none text-neutral-700 text-center font-black mb-3 capitalize te"
                    onClick={handleLocationClick}
                >
                    {location || "No location"}
                </div>
            )}
            <div
                className="w-9/10 max-w-xl flex flex-row items-center border rounded-full px-4 py-3 shadow-md"
                onClick={handleSearchClick}
            >
                <IoSearchSharp size={25} />
                <div className="flex flex-col justify-center pl-4 h-full w-full">
                    <span className="text-black font-black text-lg">Search here</span>
                    <div className="h-5 overflow-hidden">
              <span
                  key={lineIndex}
                  className="block text-sm text-neutral-600 slide-up-animation truncate"
              >
                {FOLLOW_UP_LINES[lineIndex]}
              </span>
                    </div>
                </div>
            </div>
        </div>
    );
};