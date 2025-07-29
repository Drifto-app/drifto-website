import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {MdVerified} from "react-icons/md";
import {cn} from "@/lib/utils";
import * as React from "react";

interface UserPlaceholderProps extends React.ComponentProps<"div"> {
    user: {[key: string]: any};
}

interface UserEventSinglePlaceholderProps extends UserPlaceholderProps {
    isHost: boolean;
}

function UserEventSinglePlaceholder({user, isHost, className, ...props }: UserEventSinglePlaceholderProps) {
    let verificationStyle = "";

    if(user.userVerificationType === "HOST_VERIFICATION") {
        verificationStyle = "text-black"
    } else if(user.userVerificationType === "USER_VERIFICATION") {
        verificationStyle = "text-blue-600"
    } else if(user.userVerificationType === "EVENT_VERIFICATION") {
        verificationStyle = "text-yellow-500"
    }

    return (
        <div key={user.id} className={cn(
            "flex flex-row gap-4",
            className
        )} {...props}>
            <div className="w-12 h-12 flex flex-row items-center">
                {
                    user.profileImageUrl !== null
                    ? <AspectRatio ratio={1/1}>
                            <Image
                                src={user.profileImageUrl}
                                alt={user.username}
                                fill
                                className="object-cover rounded-full" />
                        </AspectRatio>
                    : <AspectRatio ratio={1/1}>
                            <Image
                                src={"/default.jpeg "}
                                alt={user.username}
                                fill
                                className="object-cover rounded-full" />
                        </AspectRatio>
                }
            </div>
            <div>
                <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold text-md">{user.username}</p>
                    {user.verified && <MdVerified size={18} className={cn(
                        verificationStyle
                    )} />}
                </div>
                <p className="text-sm font-semibold text-neutral-400">{isHost ? "Main Host" : "Co-Host"}</p>
            </div>
        </div>
    )
}

export {UserEventSinglePlaceholder};