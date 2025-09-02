"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {SearchItem} from "@/store/recent-search-store";
import {IoClose} from "react-icons/io5";
import {ComponentProps} from "react";
import {router} from "next/client";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface RecentSearchCardProps extends React.ComponentProps<"div"> {
    searchItem: SearchItem;
    removeSearch: (id:string) => void;
}

interface SuggestionEventCardProp extends ComponentProps<"div"> {
    event: {[key: string]: any}
}

export const RecentSearchCard = ({
    searchItem, removeSearch,  className, ...props
}: RecentSearchCardProps) => {

    if (searchItem.type === "event") {
        const date = new Date(searchItem.query.startTime);
        const formatedDate = date.toLocaleString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
        const formattedTime = date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        return (
            <div
                className={cn(
                    "flex flex-row items-center px-2 gap-3 justify-between",
                    className
                )}
                {...props}
            >
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center">
                    <AspectRatio ratio={1}>
                        <Image
                            src={searchItem.query.eventTitleImage || "/default.jpeg"}
                            alt={searchItem.query.title}
                            fill
                            className="object-cover rounded-full"
                        />
                    </AspectRatio>
                </div>
                <div className="w-[70%] flex flex-col">
                    <p className="capitalize text-black text-sm font-bold truncate">{searchItem.query.title}</p>
                    <ul className="text-neutral-400 text-sm capitalize flex list-disc gap-5 font-medium truncate">
                        <li className="first:list-none">{searchItem.type}</li>
                        <li>{formatedDate}</li>
                        <li>{formattedTime}</li>
                    </ul>
                </div>
                <div className="p-2" onClick={() => removeSearch(searchItem.id)}>
                    <IoClose size={20} className="text-neutral-400" />
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "flex flex-row items-center px-2 gap-3 justify-between",
                className
            )}
            {...props}
        >
            <div className="relative w-14 h-14 rounded-md flex items-center justify-center">
                <AspectRatio ratio={1}>
                    <Image
                        src={searchItem.query.profileImage || "/default.jpeg"}
                        alt={searchItem.query.username}
                        fill
                        className="object-cover rounded-md"
                    />
                </AspectRatio>
            </div>
            <div className="w-[70%] flex flex-col">
                <p className="capitalize text-black text-sm font-bold truncate">{searchItem.query.username}</p>
                <p className="text-sm capitalize text-neutral-400">{searchItem.type}</p>
            </div>
            <div className="p-2" onClick={() => removeSearch(searchItem.id)}>
                <IoClose size={20} className="text-neutral-400" />
            </div>
        </div>
    )
}

export const SuggestionEventCard = ({
    event, className, ...props
}: SuggestionEventCardProp) => {
    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <div
            className={cn(
                "flex flex-col items-start px-2 gap-2",
                className
            )}
            {...props}

            onClick={() => router.push(`/m/event/${event.id}?prev=${encodeURIComponent(pathname + "?" + searchParams)}`)}
        >
            <div className="relative w-50 flex rounded-md items-center justify-center">
                <AspectRatio ratio={4/3}>
                    <Image
                        src={event.titleImage}
                        alt={event.title}
                        fill
                        className="object-cover rounded-md"
                    />
                </AspectRatio>
                {event.original && (
                    <div className="absolute top-2 left-2 rounded-full bg-white px-2 py-[2px] shadow-md">
                        <span className="text-[10px] font-semibold text-neutral-700 leading-0">
                          Drifto Original
                        </span>
                    </div>
                )}

            </div>
            <div className="w-50 font-bold capitalize line-clamp-2 leading-tight">
                {event.title}
            </div>
        </div>
    )
}

