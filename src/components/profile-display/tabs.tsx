"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {TabType} from "@/components/profile-display/profile-display";


interface TabsProps {
    active: TabType | null;
    onClick?: (value: TabType) => void;
}

interface TabOption {
    label: string;
    value: TabType;
}

const TAB_OPTIONS: TabOption[] = [
    { label: "Profile", value: "profile" },
    { label: "Favourites", value: "favourites" },
];

export function ProfileTabs({ active, onClick }: TabsProps) {
    const handleTabClick = (value: TabType) => {
        onClick?.(value);
    };

    return (
        <ul className="flex flex-row flex-nowrap justify-center w-full gap-6 overflow-x-auto px-4 mt-4 no-scrollbar">
            {TAB_OPTIONS.map((tab) => (
                <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    isActive={active === tab.value}
                    onClick={handleTabClick}
                />
            ))}
        </ul>
    );
}

interface TabProps {
    label: string;
    value: TabType;
    isActive: boolean;
    onClick: (value: TabType) => void;
}

function Tab({ label, value, isActive, onClick }: TabProps) {
    return (
        <li className="flex-shrink-0">
            <div
                onClick={() => onClick(value)}
                className={cn(
                    "flex flex-col items-center border-b-3 cursor-pointer px-4 transition-all gap-1",
                    isActive
                        ? "pb-2 border-b-neutral-800"
                        : "pb-0 opacity-50 border-transparent"
                )}
            >
        <span
            className={cn(
                "mt-1 whitespace-nowrap",
                isActive
                    ? "text-md font-bold text-neutral-700"
                    : "text-[15px] text-neutral-500"
            )}
        >
          {label}
        </span>
            </div>
        </li>
    );
}
