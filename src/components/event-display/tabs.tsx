"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import {EventItem} from "@/components/event-display/event-display";

const tabBase =
    "flex flex-col items-center border-b-2 cursor-pointer px-4 transition-all";
const tabActive = "text-neutral-900 border-neutral-900 pb-2";
const tabInactive = "text-neutral-400 hover:text-neutral-900 border-transparent pb-0";



export function Tabs({
    active, onClick, eventItems
}: {
    active: string | null;
    onClick?: (v: string | null) => void;
    eventItems: EventItem[];
}) {
    return (
        <ul className="flex flex-row flex-nowrap w-full gap-1 overflow-x-auto px-4 no-scrollbar group-transition-all]:">
            {eventItems.map((item) => (
                <li key={item.value ?? "explore"} className="flex-shrink-0">
                    <div
                        onClick={() => onClick?.(item.value)}
                        className={cn(
                            tabBase,
                            active === item.value ? tabActive : tabInactive
                        )}
                    >
                        {item.icon}
                        <span className={
                            cn(
                                "mt-1 whitespace-nowrap",
                                active !== item.value ? "text-sm" : "text-[15px]",
                            )
                        }>{item.label}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}
