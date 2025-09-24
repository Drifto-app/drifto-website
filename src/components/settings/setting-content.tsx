"use client"

import {ComponentProps} from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {FaArrowLeft} from "react-icons/fa";
import * as React from "react";
import {LogoutButton} from "@/components/settings/logout-button";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";

interface SettingContentProps extends ComponentProps<"div"> {
    prev: string | null;
    currentPathUrl: string;
}

export const SettingContent = ({
    prev, currentPathUrl, className, ...props
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
                <div className="w-full flex flex-row items-center pl-4 py-4 shadow-2xl rounded-lg" onClick={() => router.push(`/m/event-create?prev=${encodeURIComponent(currentPathUrl)}`)}>
                    <span className="max-w-[60%] flex flex-col gap-1">
                        <h4 className="font-bold text-lg">Become a Drifto Host</h4>
                        <p className="text-neutral-600 leading-tight">Share what you love. Create moments that matter and get paid.</p>
                    </span>
                    <span className="w-[40%] h-32 flex flex-row items-center relative">
                        <Image
                            src={"/settings-info.jpg"}
                            alt={"Become a host"}
                            fill
                            className="object-contain"
                            loading="eager"
                        />
                    </span>
                </div>
                <LogoutButton />
            </div>
        </div>
    )
}