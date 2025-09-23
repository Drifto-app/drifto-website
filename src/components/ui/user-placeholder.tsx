"use client"

import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {MdVerified} from "react-icons/md";
import {cn} from "@/lib/utils";
import * as React from "react";
import {useRouter} from "next/navigation";
import {GoDash} from "react-icons/go";
import {useState} from "react";
import {LoaderSmall} from "@/components/ui/loader";
import {Button} from "@/components/ui/button";

interface UserPlaceholderProps extends React.ComponentProps<"div"> {
    user: {[key: string]: any};
    prev?: string;
}

interface UserEventSinglePlaceholderProps extends UserPlaceholderProps {
    isHost: boolean;
    removeClick?: (username: string) => void;
}

function UserVerificationBadge({user}: {user: {[key: string]: any}}) {
    let verificationStyle = "";

    if(user.userVerificationType === "HOST_VERIFICATION") {
        verificationStyle = "text-black"
    } else if(user.userVerificationType === "USER_VERIFICATION") {
        verificationStyle = "text-blue-600"
    } else if(user.userVerificationType === "EVENT_VERIFICATION") {
        verificationStyle = "text-yellow-500"
    }


    if(user.verified) {
        return (
            <MdVerified size={18} className={cn(
                verificationStyle
            )} />
        )
    }

    return null;
}

function UserEventSinglePlaceholder({user, isHost, removeClick, prev, className, ...props }: UserEventSinglePlaceholderProps) {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const handleRemoveClick = async (e: React.MouseEvent, username: string) => {
        // Prevent events bubbling to parent div
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);

        try {
            await removeClick!(username);
        } catch(error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUserClick = () => {
        router.push(`/m/user/${user.id}?prev=${encodeURIComponent(prev || "/")}`);
    }

    if(removeClick) {
        return (
            <div key={user.id} className={cn(
                "flex justify-between items-center",
                className
            )} {...props}>
                <div className="flex flex-row gap-4 cursor-pointer" onClick={handleUserClick}>
                    <div className="w-12 h-12 flex flex-row items-center">
                        <AspectRatio ratio={1}>
                            <Image
                                src={user.profileImageUrl || "/default.jpeg"}
                                alt={user.username}
                                fill
                                className="object-cover rounded-full" />
                        </AspectRatio>
                    </div>
                    <div>
                        <div className="flex flex-row gap-1 items-center">
                            <p className="font-semibold text-md">{user.username}</p>
                            <UserVerificationBadge user={user} />
                        </div>
                        <p className="text-sm font-semibold text-neutral-400">{isHost ? "Main Host" : "Co-Host"}</p>
                    </div>
                </div>
                {
                    isHost || <button
                        className="flex justify-center items-center px-4 cursor-pointer text-transparent border-none"
                        onClick={(e) => handleRemoveClick(e, user.username)}
                        disabled={loading}
                    >
                        {
                            loading ? <LoaderSmall /> : <GoDash size={25} className="text-red-600" />
                        }
                    </button>
                }
            </div>
        )
    }

    return (
        <div key={user.id} className={cn(
            "flex flex-row gap-4 cursor-pointer",
            className
        )} {...props} onClick={handleUserClick}>
            <div className="w-12 h-12 flex flex-row items-center">
                <AspectRatio ratio={1}>
                    <Image
                        src={user.profileImageUrl || "/default.jpeg"}
                        alt={user.username}
                        fill
                        className="object-cover rounded-full" />
                </AspectRatio>
            </div>
            <div>
                <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold text-md">{user.username}</p>
                    <UserVerificationBadge user={user} />
                </div>
                <p className="text-sm font-semibold text-neutral-400">{isHost ? "Main Host" : "Co-Host"}</p>
            </div>
        </div>
    )
}

function UserSinglePlaceholder({user, prev, className, ...props }: UserPlaceholderProps) {
    const router = useRouter();

    return (
        <div
            className={cn(
                "flex flex-row gap-4 cursor-pointer",
                className
             )}
            {...props}
            onClick={() => router.push(`/m/user/${user.id}?prev=${encodeURIComponent(prev || "/")}`)}
        >
            <div className="w-8 h-8 flex flex-row items-center">
                <AspectRatio ratio={1}>
                    <Image
                        src={user.profileImageUrl || "/default.jpeg"}
                        alt={user.username}
                        fill
                        className="object-cover rounded-full" />
                </AspectRatio>
            </div>
            <div className="flex flex-row gap-1 items-center">
                <p className="font-semibold text-md">{user.username}</p>
                <UserVerificationBadge user={user} />
            </div>
        </div>
    )
}

export {UserEventSinglePlaceholder, UserSinglePlaceholder, UserVerificationBadge};