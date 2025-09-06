"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {FaHeart, FaHotjar, FaRegCalendar} from "react-icons/fa";
import {IoMdHeartEmpty, IoMdSearch} from "react-icons/io";
import {IoLocationOutline, IoPizzaOutline, IoShareSocialOutline} from "react-icons/io5";
import {EventSingleContent, EventSingleContentText} from "@/components/ui/content";
import {TbTicketOff} from "react-icons/tb";
import {HiMiniUsers} from "react-icons/hi2";
import {SnapshotCarousel} from "@/components/event-page/image-silder";
import {authApi} from "@/lib/axios";
import {toast} from "react-toastify";
import {useState} from "react";
import {UserEventSinglePlaceholder} from "@/components/ui/user-placeholder";
import {MdCancel} from "react-icons/md";
import {Dialog} from "@headlessui/react";
import {Input} from "@/components/ui/input";
import {router} from "next/client";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useShare} from "@/hooks/share-option";
import {ShareDialog} from "@/components/share-button/share-option";
import {showTopToast} from "@/components/toast/toast-util";

interface SingleEventDetailsProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    isCoHost: boolean;
    setActiveScreen?: (activeScreen: string, title?: string) => void;
}


export const SingleEventDetails = ({
    event, setActiveScreen, isCoHost, className, ...props
}: SingleEventDetailsProps) => {
    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isLiked, setIsLiked] = useState<boolean>(event.likedByUser);
    const [isLikedLoading, setIsLikedLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeSrc, setActiveSrc] = React.useState<string | null>(null);

    const startDate = new Date(event.startTime);
    const stopDate = new Date(event.stopTime);
    const formattedStartDate = startDate.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
       year: "numeric",
    });

    const formattedStopDate = stopDate.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });


    const formattedStartTime = startDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    const formattedStopTime = stopDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    let eventDisplayDetails: {
        icon: React.ReactNode
        value: string
        description: string
    } = {
        icon: <IoPizzaOutline size={26}/>,
        value: event.eventDisplayStatus,
        description: `This event is now ${event.eventDisplayStatus}`
    }

    const eventUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/event/${event.id}`;
    const {
        isShareDialogOpen,
        closeShareDialog,
        handleQuickShare,
    } = useShare({
        title: event.title,
        url: eventUrl,
        description: event.description
    });

    const openModal = (src: string) => {
        setActiveSrc(src);
        setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);

    const handleReaction = async () => {
        if (isLikedLoading) return;

        setIsLikedLoading(true);

        try {
            setIsLiked(!isLiked);
            await authApi.post(`/reaction/react`, {
                reactionType: "EVENT",
                eventId: event.id,
            })
        } catch (err: any) {
            showTopToast("error", err.message);
            setIsLiked(!isLiked);
        } finally {
            setIsLikedLoading(false);
        }
    }

    if(event.eventDisplayStatus === "ACTIVE") {
        eventDisplayDetails = {
            icon: <IoPizzaOutline size={26}/>,
            value: "active",
            description: `Tickets are now available`
        }
    }else if (event.eventDisplayStatus === "HOT") {
        eventDisplayDetails = {
            icon: <FaHotjar size={20} className="text-orange-600"/>,
            value: "hot",
            description: `Tickets are almost sold out`
        }
    } else if (event.eventDisplayStatus === "SOLD_OUT") {
        eventDisplayDetails = {
            icon: <TbTicketOff size={22} className="text-red-600"/>,
            value: "sold out",
            description: `Tickets are sold out`
        }
    }

    if(isCoHost) {
        return (
            <>
                <div className={cn(
                    "w-full px-4",
                    className,
                )} {...props}>
                    <div className="w-full flex flex-col items-center gap-6 pt-5 pb-25">
                        <div className="flex w-full gap-2 items-center">
                            <div className="w-full max-w-xl h-12 flex flex-row items-center border rounded-full px-4 shadow-md cursor-pointer" onClick={() => setActiveScreen!("tickets")} >
                                <IoMdSearch size={20} className="text-blue-800" />
                                <Input
                                    className="h-full w-full shadow-none border-none placeholder:font-black placeholder:text-lg placeholder:text-blue-800"
                                    placeholder="Find people who booked"
                                    disabled
                                />
                            </div>
                            <div className="flex flex-row gap-3">
                                <button
                                    className="text-white rounded-full bg-neutral-800 p-2 opacity-90"
                                    onClick={handleQuickShare}
                                >
                                    <IoShareSocialOutline size={25} />
                                </button>
                            </div>
                        </div>
                        <div className="relative w-full max-h-[40vh] overflow-hidden rounded-lg" onClick={() => openModal(event.titleImage)}>
                            <Image
                                src={event.titleImage}
                                alt={event.title}
                                width={800}
                                height={500}
                                className="w-full h-auto rounded-lg object-cover"
                                style={{ maxHeight: '40vh' }}
                                loading="eager"
                            />

                            {event.original && (
                                <div className="absolute top-4 left-2 rounded-full py-2 px-2 text-xs shadow-md font-semibold bg-white">
                                    Drifto Original
                                </div>
                            )}
                        </div>
                        <EventSingleContentText isLine={false} headText={"Event Title:"} className="shadow-xl">
                            <h1 className="capitalize font-black text-4xl w-full text-neutral-400">{event.title}</h1>
                        </EventSingleContentText>
                        <EventSingleContentText isLine={false} headText={"Location:"} className="shadow-xl">
                            <p className="capitalize font-black text-lg w-full text-neutral-400">
                                {`${event.address}, ${event.city}, ${event.state}`}
                            </p>
                        </EventSingleContentText>
                        <EventSingleContentText isLine={false} headText={"Event Time:"} className="shadow-xl items-start">
                            <div className="flex flex-col gap-1">
                                <p className="text-md font-semibold text-neutral-400">{formattedStartDate} - {formattedStopDate}</p>
                                <p className="text-md font-medium text-neutral-400">{formattedStartTime} - {formattedStopTime}</p>
                            </div>
                        </EventSingleContentText>
                        <EventSingleContentText
                            headText="Event Stats:"
                            className="space-y-2 items-start shadow-xl"
                            isLine={false}
                        >
                            <div className="w-full flex flex-row gap-1 justify-between px-6 sm:px-20">
                                <div className="w-full flex flex-col gap-1 items-center cursor-pointer" onClick={() => router.push(
                                    `/m/comment/${event.id}` +
                                    `?prev=${encodeURIComponent(`/m/events/${event.id}`)}` +
                                    `&type=EVENT`
                                )}>
                                    <p className="font-semibold text-neutral-800 text-2xl">
                                        {event.totalComments}
                                    </p>
                                    <p className="text-md text-neutral-400">
                                        comments
                                    </p>
                                </div>
                                <div className="w-full flex flex-col gap-1 items-center cursor-pointer" onClick={() => router.push(
                                    `/m/reaction/${event.id}` +
                                    `?prev=${encodeURIComponent(`/m/events/${event.id}`)}` +
                                    `&type=EVENT`
                                )}>
                                    <p className="font-semibold text-neutral-800 text-2xl">
                                        {event.totalLikes}
                                    </p>
                                    <p className="text-md text-neutral-400">
                                        likes
                                    </p>
                                </div>
                                <div className="w-full flex flex-col gap-1 items-center cursor-pointer" onClick={() => setActiveScreen!("event-earnings")}>
                                    <p className="font-semibold text-neutral-800 text-2xl">
                                        {event.tickets.reduce((min: number, ticket: {purchasedQuantity: number}) => {
                                            return ticket.purchasedQuantity
                                        }, 0)}
                                    </p>
                                    <p className="text-md text-neutral-400">
                                        tickets sold
                                    </p>
                                </div>
                            </div>
                        </EventSingleContentText>
                        <EventSingleContentText
                            headText="Event Tags"
                            className="space-y-2 items-start shadow-xl"
                            isLine={false}
                        >
                            <div className="flex flex-wrap gap-2">
                                {event.eventTags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="inline-block text-sm font-semibold px-3 py-1 bg-neutral-950 text-white rounded-full"
                                    >
                                {tag}
                            </span>
                                ))}
                            </div>
                        </EventSingleContentText>
                        <EventSingleContentText isLine={false} headText={"Minimum Age:"} className="shadow-xl items-start">
                            <h2 className="text-2xl font-semibold text-neutral-400">
                                {event.ageRestricted ? event.minimumAge : "No age restrictions"}
                            </h2>
                        </EventSingleContentText>
                        <EventSingleContentText isLine={false} headText="Event Description" className="flex-col shadow-xl">
                            <p className="text-md w-full text-left text-neutral-400 font-semibold">{event.description}</p>
                        </EventSingleContentText>
                        <EventSingleContentText headText={"Event Screenshots"} isLine={false} className="flex-col shadow-xl">
                            <SnapshotCarousel snapshots={event.screenshots} />
                        </EventSingleContentText>
                        <EventSingleContentText isLine={false} headText="Hosted By" className="flex-col items-start shadow-xl">
                            {event.coHosts.map((coHost: {[key: string]: any}, i: number) => (
                                <UserEventSinglePlaceholder user={coHost} key={coHost.id} isHost={(i + 1) === event.coHosts.length} />
                            ))}
                            {event.hostCollaborationStatus == "HOST" && (
                                <div className="w-full flex flex-col gap-8 items-center text-md text-blue-600 my-4">
                                    <p
                                        className="underline font-bold underline-offset-3 cursor-pointer hover:text-blue-800 transition-colors"
                                        onClick={() => setActiveScreen!('co-host-manage')}
                                    >
                                        Manage Co-Host
                                    </p>
                                    <p
                                        className="underline font-bold underline-offset-3 cursor-pointer hover:text-blue-800 transition-colors"
                                        onClick={() => setActiveScreen!('host-invites')}
                                    >
                                        See All Host Invites
                                    </p>
                                </div>
                            )}
                        </EventSingleContentText>
                    </div>
                </div>

                <ShareDialog
                    isOpen={isShareDialogOpen}
                    onClose={closeShareDialog}
                    eventTitle={event.title}
                    eventUrl={eventUrl}
                    eventDescription={event.description}
                />

                <Dialog
                    open={isOpen}
                    onClose={closeModal}
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="absolute top-4 right-4" onClick={closeModal}>
                        <MdCancel size={30} className="text-white" />
                    </div>
                    <Dialog.Panel className="bg-white overflow-hidden w-full max-h-[95%]">
                        {activeSrc && (
                            <Image
                                src={activeSrc}
                                alt="Snapshot"
                                width={800}
                                height={600}
                                className="object-contain w-full h-auto"
                                // style={{ maxHeight: "95vh" }}
                            />
                        )}
                    </Dialog.Panel>
                </Dialog>
            </>
        )
    }

    return (
        <>
            <div className={cn(
                "w-full px-4",
                className,
            )} {...props}>
                <div className="w-full py-4 flex flex-col items-center gap-4 pt-5 pb-25">
                    <div className="relative w-full max-h-[40vh] overflow-hidden rounded-lg">
                        <Image
                            src={event.titleImage}
                            alt={event.title}
                            width={800}
                            height={500}
                            className="w-full h-auto rounded-lg object-cover"
                            style={{ maxHeight: '40vh' }}
                        />

                        {event.original && (
                            <div className="absolute top-4 left-2 rounded-full py-2 px-2 text-xs shadow-md font-semibold bg-white">
                                Drifto Original
                            </div>
                        )}

                        <div className="absolute top-3 right-2 flex flex-row gap-3">
                            <button className=" text-white rounded-full bg-neutral-800 p-2 opacity-90" onClick={handleReaction} disabled={isLikedLoading}>
                                {isLiked ? (
                                    <FaHeart size={25} className="text-red-500" />
                                ) : (
                                    <IoMdHeartEmpty size={25} />
                                )}
                            </button>
                            <button
                                className="text-white rounded-full bg-neutral-800 p-2 opacity-90"
                                onClick={handleQuickShare}
                            >
                                <IoShareSocialOutline size={25} />
                            </button>
                        </div>
                    </div>
                    <h1 className="capitalize font-black text-2xl w-full text-neutral-950">{event.title}</h1>
                    <EventSingleContent>
                        <FaRegCalendar size={18}/>
                        <div className="flex flex-col gap-1">
                            <p className="text-md font-semibold text-neutral-500">{formattedStartDate} - {formattedStopDate}</p>
                            <p className="text-md font-medium text-neutral-500">{formattedStartTime} - {formattedStopTime}</p>
                        </div>
                    </EventSingleContent>
                    <EventSingleContent>
                        <IoLocationOutline size={26}/>
                        {event.locationSecure && !event.address ? (
                                <p className="font-semibold text-sm capitalize">
                                    <span className="text-blue-500">Purchase ticket to see full location: </span>
                                    {`${event.city}, ${event.state}`}
                                </p>
                            ) :
                            <p className="font-semibold text-sm">
                                {`${event.address}, ${event.city}, ${event.state}`}
                            </p>
                        }
                    </EventSingleContent>
                    <EventSingleContent>
                        {eventDisplayDetails.icon}
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold normal-case">This event is {eventDisplayDetails.value}</p>
                            <p className="text-sm font-medium text-neutral-400">{eventDisplayDetails.description}</p>
                        </div>
                    </EventSingleContent>
                    {event.ageRestricted && (
                        <EventSingleContent>
                            <HiMiniUsers size={26}/>
                            <p className="font-semibold text-sm">This event is suitable for ages {event.minimumAge} and above</p>
                        </EventSingleContent>
                    )}
                    <EventSingleContentText
                        headText="Event Vibe"
                        className="flex flex-col space-y-2 items-start"
                    >
                        <div className="flex flex-wrap gap-2">
                            {event.eventTags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="inline-block text-sm font-semibold px-3 py-1 bg-neutral-950 text-white rounded-full"
                                >
                                {tag}
                            </span>
                            ))}
                        </div>
                    </EventSingleContentText>
                    <EventSingleContentText headText="About" className="flex-col">
                        <p className="text-sm w-full text-left">{event.description}</p>
                    </EventSingleContentText>
                    <EventSingleContentText headText="Snapshots" className="flex-col">
                        <SnapshotCarousel snapshots={event.screenshots} />
                    </EventSingleContentText>
                    <EventSingleContentText headText="Hosted By" className="flex-col items-start">
                        {event.coHosts.map((coHost: {[key: string]: any}, i: number) => (
                            <UserEventSinglePlaceholder
                                user={coHost}
                                key={coHost.id}
                                isHost={(i + 1) === event.coHosts.length}
                                onClick={() => {router.push(`/user/m/${coHost.id}?prev=${pathname}?${searchParams}`)}} />
                        ))}
                    </EventSingleContentText>
                    <div className="text-red-600 font-semibold underline w-full text-center py-2 cursor-pointer">
                        Report Event
                    </div>
                </div>
            </div>

            <ShareDialog
                isOpen={isShareDialogOpen}
                onClose={closeShareDialog}
                eventTitle={event.title}
                eventUrl={eventUrl}
                eventDescription={event.description}
            />
        </>
    )
}