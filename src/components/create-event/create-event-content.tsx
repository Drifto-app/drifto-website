"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {ReactNode, useCallback, useState} from "react";
import {FaArrowLeft} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {IoCashOutline, IoEarthOutline, IoGiftOutline} from "react-icons/io5";
import {Button} from "@/components/ui/button";
import {CoverImageUploader} from "@/components/ui/cover-image";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {DateTimePicker} from "@/components/event-page/date-time-input";
import {LocationSearchDialog} from "@/components/event-page/location-search-dialog";
import {EventTagDialog} from "@/components/event-page/event-tag-edit";

interface CreateEventContentProps extends React.ComponentProps<"div"> {
    prev: string | null;
}

type ActiveScreenType = "intro" | "details" | "ticket" | "preview" | "success";

interface IntroObjectType {
    title: string;
    text: string;
    icon: ReactNode
}

const intoObjects: IntroObjectType[] = [
    {
        title: "share your passion",
        text: "Turn what you love into an unforgettable experience for others.",
        icon: <IoGiftOutline size={50} className="text-indigo-700"/>
    },
    {
        title: "be discovered",
        text: "Showcase your experience to those who are eager to try something new.",
        icon: <IoEarthOutline size={50}/>
    },
    {
        title: "earn while inspiring",
        text: "Monetize your ideas and make a difference, one experience at a time.",
        icon: <IoCashOutline size={50} className="text-green-600"/>
    }
]

export const CreateEventContent = ({
    prev, className, ...props
}: CreateEventContentProps) => {
    const router = useRouter();

    const [activeScreen, setActiveScreen] = useState<ActiveScreenType>("intro");
    const [loading, setLoading] = useState<boolean>(false);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
    const [startDateError, setStartDateError] = useState<boolean>(false);
    const [stopDateError, setStopDateError] = useState<boolean>(false);

    const [titleImage, setTitleImage] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [address, setAddress] = useState<string | undefined>(undefined);
    const [city, setCity] = useState<string | undefined>(undefined);
    const [state, setState] = useState<string | undefined>(undefined);
    const [coordinates, setCoordinates] = useState<{[key: string]: number} | undefined>(undefined);
    const [locationSecure, setLocationSecure] = useState<boolean | null>(null);
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [startTime, setStartTime] = useState<Date | undefined>(undefined);
    const [stopTime, setStopTime] = useState<Date | undefined>(undefined);
    const [isAgeRestricted, setIsAgeRestricted] = useState<boolean>(false);
    const [minimumAge, setMinimumAge] = useState<string>(String(""));
    const [eventTags, setEventTags] = useState<string[]>([])
    const [screenshots, setScreenshots] = useState<string[]>([])
    const [tickets, setTickets] = useState<any[]>([]);

    const handleBackClick = () => {
        if(activeScreen === "details") {
            setActiveScreen("intro");
        } else if(activeScreen === "ticket") {
            setActiveScreen("details");
        } else if(activeScreen === "preview") {
            setActiveScreen("ticket");
        } else {
            router.push(prev != null ? prev : "/");
        }
    }

    const handleTitleImageChange = useCallback((newUrl: string) => {
        setTitleImage(newUrl);
    }, []);

    const handleLocationChange = (locationData: {[key: string]: any}) => {
        setCoordinates({
            latitude: locationData.coordinates.lat,
            longitude: locationData.coordinates.lng
        });
        setAddress(locationData.address);
        setCity(locationData.city);
        setState(locationData.state);
    }

    const handleStartDateChange = (value: Date) => {
        if(!stopTime) return;

        if(value > stopTime || value < new Date(Date.now())) {
            setStartDateError(true)
            return;
        }

        setStartDateError(false)
        setStartTime(value);
    }

    const handleStopDateChange = (value: Date) => {
        if(!startTime) return;

        if(value < startTime || value < new Date(Date.now())) {
            setStopDateError(true)
            return;
        }

        setStopDateError(false)
        setStopTime(value);
    }

    const handleMinimumAgeChange = (raw: string) => {
        // integers only
        const numericStr = raw.replace(/\D/g, "");
        // normalize leading zeros (optional)
        const normalized = numericStr.replace(/^0+(?=\d)/, "");
        setMinimumAge(normalized);

        const value = normalized === "" ? 0 : parseInt(normalized, 10);
        setIsAgeRestricted(value > 0);
    };

    const handleTicketsChange = (updated: { [key: string]: any }) => {
        setTickets(prev =>
            prev.map(t => (t.id === updated.id ? { ...t, ...updated } : t))
        );
    };

    const headerTitle = () => {
        switch (activeScreen) {
            case "intro":
                return "";
            case "details":
                return "Create Event";
            case "ticket":
                return "Pricing & Capacity";
            case "preview":
                return "Preview & Settings";
        }
    }

    const renderScreen = () => {
        switch (activeScreen) {
            case "details":
                return (
                    <>
                        <CoverImageUploader
                            imageValue={titleImage}
                            onImageValueChange={handleTitleImageChange}
                            mediaFileType={"EVENT_HEADER"}
                            setSubmitDisabled={setSubmitDisabled}
                        />
                        <div className="w-full flex flex-col px-4 gap-5 mt-4 pb-15">
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-neutral-500">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Event Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="py-6 "
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="description" className="text-neutral-500">Description</Label>
                                <textarea
                                    id="decription"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={8}
                                    className="py-2 px-3 bg-white rounded-md border-1 border-neutral-200 focus:border-blue-600 focus:border-1 focus:outline-hidden"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <DateTimePicker date={startTime} setDate={handleStartDateChange} label="start date & time" />
                                {
                                    startDateError && <p className="text-xs text-red-600">Start time cannot be past the stop time</p>
                                }
                            </div>
                            <div className="w-full">
                                <DateTimePicker date={stopTime} setDate={handleStopDateChange} label="stop date & time" />
                                {
                                    stopDateError && <p className="text-xs text-red-600">Stop time cannot be before the stop time</p>
                                }
                            </div>
                            <div className="grid gap-2 w-full">
                                <Label htmlFor="m-age" className="text-neutral-500">Minimum Age</Label>
                                <Input
                                    id="m-age"
                                    name="m-age"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d*"
                                    placeholder="Minimum Age"
                                    value={minimumAge}
                                    onChange={(e) => handleMinimumAgeChange(e.target.value)}
                                    className="py-2 bg-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="text-neutral-500">Location</div>
                                <LocationSearchDialog
                                    currentLocation={{coordinates, address, city, state }}
                                    onLocationUpdate={handleLocationChange}
                                    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex flex-col">
                                    <div className="font-bold">Event Genre</div>
                                    <p className="text-neutral-400 text-xs font-semibold">Select genres that best describe your event</p>
                                </div>
                                <EventTagDialog
                                    currentEventTags={eventTags}
                                    onTagAdd={
                                        (tag: string) => setEventTags([...eventTags, tag])
                                    }
                                    onTagRemove={(tag: string) => setEventTags((value) => value.filter((i) => i !== tag)) }
                                />
                            </div>
                        </div>
                    </>
                )
            default:
                return(
                    <div className="w-full flex flex-col flex-1 items-center gap-8 py-8">
                       <div className="w-full flex flex-col gap-4 px-4">
                           {intoObjects.map((item, index) => (
                               <div key={index} className="flex flex-col gap-2 items-center w-full rounded-md shadow-md py-5 px-4">
                                   {item.icon}
                                   <h3 className="font-black text-2xl capitalize">{item.title}</h3>
                                   <p className="text-neutral-500 text-md text-center font-semibold leading-tight">{item.text}</p>
                               </div>
                           ))}
                       </div>
                        <div className="w-full px-4">
                            <Button
                                className="w-full rounded-md shadow-md py-6 text-md font-semibold bg-blue-800 hover:bg-blue-800"
                                onClick={() => setActiveScreen("details")}
                            >
                                Create Event
                            </Button>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div
            className={cn(
                "w-full min-h-[100dvh] flex flex-col",
                className
            )}
            {...props}
        >
            {
                activeScreen !== "success"
                    ? <>
                        <div className={cn(
                            "w-full border-b-1 border-b-neutral-300 flex flex-col gap-3 h-20 justify-center",
                            className
                        )} {...props}>
                            <div className="flex flex-row items-center px-8">
                                <FaArrowLeft
                                    size={20}
                                    onClick={handleBackClick}
                                    className="cursor-pointer hover:text-neutral-700 transition-colors"
                                />
                                <p className="font-semibold text-neutral-950 text-md w-full text-center capitalize truncate ml-4">
                                    {headerTitle()}
                                </p>
                            </div>
                        </div>
                        <form>
                            {renderScreen()}
                        </form>
                    </>
                    : <div>Success</div>
            }
        </div>
    )
}