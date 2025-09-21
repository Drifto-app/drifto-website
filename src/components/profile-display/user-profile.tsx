import {cn} from "@/lib/utils";
import {ComponentProps, useState} from "react";
import {useAuthStore} from "@/store/auth-store";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import * as React from "react";
import {UserVerificationBadge} from "@/components/ui/user-placeholder";
import {Button} from "@/components/ui/button";
import {ShareDialog} from "@/components/share-button/share-option";
import {useShare} from "@/hooks/share-option";
import {PiFireSimpleBold} from "react-icons/pi";
import {FaHashtag, FaRegClock} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {BiCalendarAlt} from "react-icons/bi";
import {ActiveScreenType} from "@/components/profile-display/profile-display";
import {UserEvents} from "@/components/user/user-events";
import {UserPosts} from "@/components/user/user-posts";

interface UserProfileProps extends ComponentProps<"div"> {
    handleScreenChange: (value: string) => void;
    activeScreen: string;
    setActiveScreen: (value: ActiveScreenType) => void;
}

export const UserProfile = ({
    activeScreen, setActiveScreen, handleScreenChange, className, ...props
}: UserProfileProps) => {
    const {user} = useAuthStore();

    const userUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/user/${user?.id}`;
    const {
        isShareDialogOpen,
        closeShareDialog,
        handleQuickShare,
    } = useShare({
        title: user?.username,
        url: userUrl,
    });

    const userStats: {name: string, value: string | number}[] = [
        {name: "Ticket Sold", value: user?.participantCount || 0},
        {name: "Experience", value: user?.eventCount || 0},
        {name: "Subscribers", value: user?.totalFollowers || 0},
    ]

    const render = () => {
        switch (activeScreen) {
            case "events":
                return (
                    <UserEvents user={user!} isForUser={true} />
                )
            case "posts":
                return (
                    <UserPosts user={user!} isForUser={true} />
                )
            case "orders":
                return (
                    <div>
                        Order
                    </div>
                )
            case "subscribers":
                return (
                    <div>
                        Subscribers
                    </div>
                )
            default:
                return (
                    <>
                        <div className="w-full flex flex-col px-4 pt-6 gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 flex flex-row items-center">
                                    <AspectRatio ratio={1}>
                                        <Image
                                            src={user?.profileImage || "/default.jpeg"}
                                            alt={user?.username}
                                            fill
                                            className="object-cover rounded-full" />
                                    </AspectRatio>
                                </div>
                                <div className="flex flex-row gap-1 items-center">
                                    <p className="font-semibold text-lg ">{user?.username}</p>
                                    <UserVerificationBadge user={user!} />
                                </div>
                            </div>
                            <div className="w-full flex justify-between items-center px-6">
                                {userStats.map((item, index) => (
                                    <span
                                        key={index}
                                        className="flex flex-col items-center justify-center gap-1"
                                        onClick={() => {
                                            if(item.name === "Subscribers") {
                                                setActiveScreen("subscribers");
                                        }}}
                                    >
                                        <p className="text-neutral-400 text-md">{item.name}</p>
                                        <p className="font-bold text-xl">{item.value}</p>
                                    </span>
                                ))}
                            </div>
                            <div className="w-full flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 min-w-0 shadow-none font-semibold border-black py-6"
                                >
                                    Edit Profile
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 min-w-0 shadow-none font-semibold border-black py-6"
                                    onClick={handleQuickShare}
                                >
                                    Share Profile
                                </Button>
                            </div>
                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-3 border border-neutral-300 px-4 py-5 rounded-sm items-start" onClick={() => setActiveScreen("events")}>
                                    <div className="h-10 flex items-center justify-center">
                                        <PiFireSimpleBold size={40} />
                                    </div>
                                    <span className="font-semibold">Experiences</span>
                                </div>

                                <div className="flex flex-col gap-3 border border-neutral-300 px-4 py-5 rounded-sm items-start" onClick={() => setActiveScreen("posts")}>
                                    <div className="h-10 flex items-center justify-center">
                                        <FaHashtag size={30} />
                                    </div>
                                    <span className="font-semibold">Posts</span>
                                </div>
                                <div className="flex flex-col gap-3 border border-neutral-300 px-4 py-5 rounded-sm items-start" onClick={() => setActiveScreen("orders")}>
                                    <div className="h-10 flex items-center justify-center">
                                        <FaRegClock size={30} />
                                    </div>
                                    <span className="font-semibold">Orders</span>
                                </div>
                                <div
                                    className="flex flex-col gap-3 border border-neutral-300 px-4 py-5 rounded-sm items-start"
                                    onClick={() => handleScreenChange("plans")}>
                                    <div className="h-10 flex items-center justify-center">
                                        <BiCalendarAlt size={30} />
                                    </div>
                                    <span className="font-semibold">Plans</span>
                                </div>
                            </div>
                        </div>

                        <ShareDialog
                            isOpen={isShareDialogOpen}
                            onClose={closeShareDialog}
                            title={user?.username}
                            url={userUrl}
                        />
                    </>
                )
        }
    }

    return (
        <div
            className={cn(
                className,
                "w-full"
            )}
            {...props}
        >
            {render()}
        </div>
    )
}