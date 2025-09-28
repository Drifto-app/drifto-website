"use client"

import {ComponentProps, ReactNode, useState} from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {FaArrowLeft, FaRegIdBadge, FaRegUser} from "react-icons/fa";
import * as React from "react";
import {LogoutButton} from "@/components/settings/logout-button";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {IoCashOutline, IoDocumentTextOutline} from "react-icons/io5";
import {MdNavigateNext, MdPayment} from "react-icons/md";
import {TbTools} from "react-icons/tb";
import {IoMdHappy} from "react-icons/io";
import {PiAt} from "react-icons/pi";
import {useAuthStore} from "@/store/auth-store";

interface SettingContentProps extends ComponentProps<"div"> {
    prev: string | null;
    currentPathUrl: string;
}

interface SettingsOptionType {
    name: string;
    value: string;
    icon: ReactNode;
    onClickFunction: () => void;
}

export const SettingContent = ({
    prev, currentPathUrl, className, ...props
}: SettingContentProps) => {
    const router = useRouter();
    const {user} = useAuthStore();

    const [activeScreen, setActiveScreen] = useState<string>("settings");

    const settingsOptions: SettingsOptionType[] = [
        {name: "Profile & Preferences", value: "profile", icon: <FaRegUser size={25} />, onClickFunction: () => setActiveScreen("profile")},
        {name: "Host Settings", value: "host-settings", icon: <FaRegIdBadge size={25} />, onClickFunction: () => setActiveScreen("host-settings")},
        {name: "Payment Methods", value: "payment-method", icon: <MdPayment size={25} />, onClickFunction: () => setActiveScreen("payment-method")},
        {name: "My Refunds", value: "refunds", icon: <IoCashOutline size={25} />, onClickFunction: () => setActiveScreen("refunds")},
        {name: "Privacy Policy", value: "privacy-policy", icon: <IoDocumentTextOutline size={25} />, onClickFunction: () => setActiveScreen("privacy-policy")},
        {name: "Help & Support", value: "support", icon: <TbTools size={25} />, onClickFunction: () => setActiveScreen("support")},
        {name: "Invite Friends", value: "invite", icon: <IoMdHappy size={27} />, onClickFunction: () => setActiveScreen("invite")},
        {name: "Connect With Us", value: "connect", icon: <PiAt size={25} />, onClickFunction: () => setActiveScreen("connect")},
    ]

    const handleBackClick = () => {
        if(activeScreen === "settings") {
            router.push(prev ?? "/?screen=profile");
        }

        setActiveScreen("settings");
    };

    const titleText = () => {
        if(activeScreen === "profile") {
            return "Profile & Preferences";
        }

        return "Settings";
    }

    const render = () => {
        switch (activeScreen) {
            case "host-settings":
                return (
                    <div className="flex-1 w-full px-6">
                        <div className="w-full flex flex-col pt-6">
                            <span
                                className="w-full flex justify-between py-4 text-xl font-semibold items-center"
                                onClick={() => router.push(`/m/settings/edit-profile?prev=${encodeURIComponent(currentPathUrl)}`)}
                            >
                                <p>Edit Profile</p>
                                <MdNavigateNext size={30} />
                            </span>
                            <span
                                className="w-full flex justify-between py-4 text-xl font-semibold items-center"
                                onClick={() => router.push(`/m/wallet?prev=${encodeURIComponent(currentPathUrl)}`)}
                            >
                                <p>Wallet</p>
                                <MdNavigateNext size={30} />
                            </span>
                            <span
                                className="w-full flex justify-between py-4 text-xl font-semibold items-center"
                                onClick={() => router.push(
                                    `/m/user-events?id=${user?.id}&prev=${encodeURIComponent(currentPathUrl)}`
                                )}

                            >
                                <p>Experience</p>
                                <MdNavigateNext size={30} />
                            </span>
                        </div>
                    </div>
                )
            case "profile":
                return (
                    <div className="flex-1 w-full px-6">
                        <div className="w-full flex flex-col pt-6">
                            <span
                                className="w-full flex justify-between py-4 text-xl font-semibold items-center"
                                onClick={() => router.push(`/m/settings/edit-profile?prev=${encodeURIComponent(currentPathUrl)}`)}
                            >
                                <p>Edit Profile</p>
                                <MdNavigateNext size={30} />
                            </span>
                            <span
                                className="w-full flex justify-between py-4 text-xl font-semibold items-center"
                                onClick={() => router.push(`/m/settings/preferences?prev=${encodeURIComponent(currentPathUrl)}`)}
                            >
                                <p>Preferences</p>
                                <MdNavigateNext size={30} />
                            </span>
                            <span
                                className="w-full flex justify-between py-4 text-xl font-semibold items-center"
                                onClick={() => router.push(`/m/settings/delete-account?prev=${encodeURIComponent(currentPathUrl)}`)}

                            >
                                <p>Delete Account</p>
                                <MdNavigateNext size={30} />
                            </span>
                        </div>
                    </div>
                )
            default:
                return (
                    <div className="flex-1 flex flex-col gap-8 px-4 pb-10">
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
                        <div className="w-full flex flex-col">
                            {settingsOptions.map((item, i) => (
                                <span
                                    key={i}
                                    className="w-full flex items-center gap-5 py-6 px-2 border-b-neutral-300 border-b-1"
                                    onClick={item.onClickFunction}
                                >
                            {item.icon}
                                    <p className="font-semibold text-xl">{item.name}</p>
                        </span>
                            ))}
                        </div>
                        <LogoutButton />
                    </div>
                )
        }
    }

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
                    "w-full border-b border-b-neutral-300 flex flex-col gap-4 justify-center h-20 flex-shrink-0"
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
                        {titleText()}
                    </p>
                </div>
            </div>
            {render()}
        </div>
    )
}