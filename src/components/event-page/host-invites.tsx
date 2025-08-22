"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {useState, useEffect} from "react";
import {authApi} from "@/lib/axios";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {Loader, LoaderSmall} from "@/components/ui/loader";
import {toast} from "react-toastify";

interface HostInvitesProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
}

export const HostInvites = ({
    event, className, ...props
}: HostInvitesProps) => {
    const [invites, setInvites] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [cancellingInvites, setCancellingInvites] = useState<Set<string>>(new Set())

    const fetchInvites = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await authApi.get(`/invite/event/${event.id}`)
            setInvites(response.data.data)
        } catch(error: any) {
            setError(error.response?.data?.message || "Failed to fetch invites")
            console.error("Error fetching invites:", error)
        } finally {
            setLoading(false)
        }
    }

    const revokeInvite = async (inviteId: string) => {
        setCancellingInvites(prev => new Set(prev).add(inviteId))

        try {
            await authApi.post(`/invite/${inviteId}/revoke`)
            // Remove the invite from the list after successful revocation
            setInvites(prev => prev.filter(invite => invite.inviteId !== inviteId))
        } catch(error: any) {
            console.error("Error revoking invite:", error)
            toast.error("Error revoking invite")
        } finally {
            setCancellingInvites(prev => {
                const newSet = new Set(prev)
                newSet.delete(inviteId)
                return newSet
            })
        }
    }

    useEffect(() => {
        if (event?.id) {
            fetchInvites()
        }
    }, [event?.id])

    if (loading && invites.length === 0) {
        return (
            <div
                className={cn(
                    "w-full min-h-[91vh] px-4",
                    className
                )}
                {...props}
            >
                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center justify-between pt-4 pb-2">
                        <h1 className="text-xl font-semibold text-neutral-800">
                            Co-Host Invites
                        </h1>
                    </div>
                    <div className="flex justify-center items-center py-8">
                        <Loader />
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div
                className={cn(
                    "w-full min-h-[91vh] px-4",
                    className
                )}
                {...props}
            >
                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center justify-between pt-4 pb-2">
                        <h1 className="text-xl font-semibold text-neutral-800">
                            Co-Host Invites
                        </h1>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 gap-2">
                        <div className="text-red-500">{error}</div>
                        <button
                            onClick={fetchInvites}
                            className="text-blue-500 text-sm underline"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={cn(
                "w-full min-h-[91vh] bg-gray-50 pt-2",
                className
            )}
            {...props}
        >
            <div className="w-full flex flex-col">
                {invites.length === 0 ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-neutral-500 text-center">
                            No pending invites
                        </div>
                    </div>
                ) : (
                    <div className="w-full px-4">
                        {invites.map((invite) => (
                            <div key={invite.inviteId} className="w-full flex items-center justify-between py-4 pb-4 border-b-neutral-200 border-b-1">
                                <div className="flex items-center gap-3">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                        {
                                            invite.userPlaceHolder?.profileImageUrl !== null ?
                                                <AspectRatio ratio={1/1}>
                                                    <Image
                                                        src={invite.userPlaceHolder?.profileImageUrl}
                                                        alt={invite.userPlaceHolder.username}
                                                        fill
                                                        className="object-cover rounded-full" />
                                                </AspectRatio> :
                                                <AspectRatio ratio={1/1}>
                                                    <Image
                                                        src={"/default.jpeg "}
                                                        alt={invite.userPlaceHolder.username}
                                                        fill
                                                        className="object-cover rounded-full" />
                                                </AspectRatio>
                                        }
                                    </div>

                                    {/* User Info */}
                                    <div className="flex flex-col">
                                        <span className="font-bold text-neutral-900">
                                            {invite.userPlaceHolder.username}
                                        </span>
                                        <span className="text-xs text-neutral-500 uppercase font-medium">
                                            {invite.invitationStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* Cancel Button */}
                                <button
                                    onClick={() => revokeInvite(invite.inviteId)}
                                    disabled={cancellingInvites.has(invite.inviteId)}
                                    className="text-red-500 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {cancellingInvites.has(invite.inviteId) ? <LoaderSmall />: "Cancel"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}