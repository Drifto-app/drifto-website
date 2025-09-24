"use client"

import {ComponentProps} from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {FaArrowLeft} from "react-icons/fa";
import * as React from "react";
import {LogoutButton} from "@/components/settings/logout-button";

interface SettingContentProps extends ComponentProps<"div"> {
    prev: string | null;
}

export const SettingContent = ({
    prev, className, ...props
}: SettingContentProps) => {
    const router = useRouter();

    const handleBackClick = () => {
        router.push(prev ?? "/");
    };

    return (
        <div
            className={cn(
                "w-full min-h-[100dvh] flex flex-col",
                className,
            )}
            {...props}
        >
            <div
                className={cn(
                    "w-full border-b border-b-neutral-300 flex flex-col gap-3 justify-center h-20 flex-shrink-0"
                )}
            >
                <div className="flex flex-row items-center px-8">
                    <FaArrowLeft
                        size={20}
                        onClick={handleBackClick}
                        className="cursor-pointer hover:text-neutral-700 transition-colors"
                        aria-label="Go back"
                        role="button"
                        tabIndex={0}
                    />
                    <p className="font-semibold text-neutral-950 text-md w-full text-center capitalize truncate ml-4">
                        Settings
                    </p>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 px-4">
                <LogoutButton />
            </div>
        </div>
    )
}