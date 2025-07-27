import * as React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {FaHeart, FaHotjar, FaRegCalendar} from "react-icons/fa";
import {IoMdHeartEmpty} from "react-icons/io";
import {IoLocationOutline, IoPizzaOutline, IoShareSocialOutline} from "react-icons/io5";
import {EventSingleContent, EventSingleContentText} from "@/components/ui/content";
import {TbTicketOff} from "react-icons/tb";
import {HiMiniUsers} from "react-icons/hi2";
import {SnapshotCarousel} from "@/components/event-page/image-silder";
import {authApi} from "@/lib/axios";
import {toast} from "react-toastify";
import {useState} from "react";

interface SingleEventDetailsProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
}


export const SingleEventDetails = ({
    event, className, ...props
}: SingleEventDetailsProps) => {
    const [isLiked, setIsLiked] = useState<boolean>(event.likedByUser);
    const [isLikedLoading, setIsLikedLoading] = useState<boolean>(false);

    const startDate = new Date(event.startTime);false
    const stopDate = new Date(event.stopTime);
    const formatted = startDate.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
       year: "numeric",
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

    const handleReaction = async () => {
        setIsLikedLoading(true);

        try {
            setIsLiked(!isLiked);
            await authApi.post(`/reaction/react`, {
                reactionType: "EVENT",
                eventId: event.id,
            })
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLikedLoading(false);
        }
    }

    if(event.eventDisplayStatus === "ACTIVE") {
        eventDisplayDetails = {
            icon: <IoPizzaOutline size={26}/>,
            value: event.eventDisplayStatus,
            description: `Tickets are now available`
        }
    }else if (event.eventDisplayStatus === "HOT") {
        eventDisplayDetails = {
            icon: <FaHotjar size={20} className="text-orange-600"/>,
            value: event.eventDisplayStatus,
            description: `Tickets are almost sold out`
        }
    } else if (event.eventDisplayStatus === "SOLD_OUT") {
        eventDisplayDetails = {
            icon: <TbTicketOff size={22} className="text-red-600"/>,
            value: event.eventDisplayStatus,
            description: `Tickets are almost sold out`
        }
    }

    return (
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
                        <button className=" text-white rounded-full bg-neutral-800 p-2 opacity-90" disabled>
                            <IoShareSocialOutline size={25} />
                        </button>
                    </div>
                </div>
                <h1 className="capitalize font-black text-2xl w-full">{event.title}</h1>
                <EventSingleContent>
                    <FaRegCalendar size={18}/>
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold">{formatted}</p>
                        <p className="text-sm font-medium text-neutral-400">{formattedStartTime} - {formattedStopTime}</p>
                    </div>
                </EventSingleContent>
                <EventSingleContent>
                    <IoLocationOutline size={26}/>
                    <p className="font-semibold text-sm">{event.address}, {event.city}, {event.state}</p>
                </EventSingleContent>
                <EventSingleContent>
                    {eventDisplayDetails.icon}
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold">This event is {eventDisplayDetails.value.toLowerCase()}</p>
                        <p className="text-sm font-medium text-neutral-400">{eventDisplayDetails.description}</p>
                    </div>
                </EventSingleContent>
                {event.ageRestricted && (
                    <EventSingleContent>
                        <HiMiniUsers size={26}/>
                        <p className="font-semibold text-sm">This event is suitable for ages {event.minimumAge} and above</p>
                    </EventSingleContent>
                )}
                <EventSingleContentText headText="About" className="flex-col jus">
                    <p className="text-sm w-full text-left">{event.description}</p>
                </EventSingleContentText>
                <EventSingleContentText headText="Snapshots" className="flex-col jus">
                    <SnapshotCarousel snapshots={event.screenshots} />
                </EventSingleContentText>
            </div>
        </div>
    )
}