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
import {EventThemeSelector} from "@/components/event-page/event-theme";
import {ImageSnapshots} from "@/components/ui/image-snapshot";

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
    const [startDateError, setStartDateError] = useState<string | null>(null);
    const [stopDateError, setStopDateError] = useState<string | null>(null);

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
    const [eventTheme, setEventTheme] = useState<[string, string]>(['#fff', '#fff'])

    const isDetailsInValid = !title || !description || !startTime || !!startDateError || !stopTime || !!stopDateError || !address || !city || !state || !coordinates || !eventTags || eventTags.length === 0 || !eventTheme;

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
        const valueDate = new Date(value);
        const stopTimeValue: Date | null = stopTime ? new Date(stopTime) : null;

        // Always update the state first
        setStartTime(value);

        // Then validate and set errors
        setStartDateError(null);

        if (valueDate < new Date()) {
            setStartDateError("Start date or time cannot be before the current date or time");
            return;
        }

        if (stopTimeValue && valueDate >= stopTimeValue) {
            setStartDateError("Start date or time must be before the stop date or time");
            return;
        }

        // Clear stop date error if it's now valid
        if (stopTimeValue && stopDateError && valueDate < stopTimeValue) {
            setStopDateError(null);
        }
    }

    const handleStopDateChange = (value: Date) => {
        const valueDate = new Date(value);
        const startTimeValue: Date | null = startTime ? new Date(startTime) : null;

        // Always update the state first
        setStopTime(value);

        // Then validate and set errors
        setStopDateError(null);

        if (valueDate < new Date()) {
            setStopDateError("Stop date or time cannot be before the current date or time");
            return;
        }

        if (startTimeValue && valueDate <= startTimeValue) {
            setStopDateError("Stop date or time must be after the start date or time");
            return;
        }

        // Clear start date error if it's now valid
        if (startTimeValue && startDateError && valueDate > startTimeValue) {
            setStartDateError(null);
        }
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
            case "ticket":
                return (
                    <div>
                        Tickets
                    </div>
                )
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
                                    required
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
                                    required
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <DateTimePicker date={startTime} setDate={handleStartDateChange} label="start date & time" />
                                {
                                    startDateError && <p className="text-xs text-red-600">{startDateError}</p>
                                }
                            </div>
                            <div className="w-full">
                                <DateTimePicker date={stopTime} setDate={handleStopDateChange} label="stop date & time" />
                                {
                                    stopDateError && <p className="text-xs text-red-600">{stopDateError}</p>
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
                            <div className="grid gap-2">
                                <div className="flex flex-col">
                                    <div className="font-bold">Event Theme</div>
                                    <p className="text-neutral-400 text-xs font-semibold">Select a theme that sets the vibe for your event</p>
                                </div>
                                <EventThemeSelector currentEventTheme={eventTheme} setEventTheme={setEventTheme} />
                            </div>
                            <div className="grid gap-2 w-full">
                                <div className="flex flex-col">
                                    <div className="font-bold">Event Snapshots</div>
                                    <p className="text-neutral-400 text-xs font-semibold">Choose up to 20 pictures that best represent you experience</p>
                                </div>
                                <ImageSnapshots setSubmitDisabled={setSubmitDisabled} initialImages={screenshots} maxImages={20} onImageAdd={setScreenshots} onImageRemove={setScreenshots}/>
                            </div>
                            <Button
                                className="bg-blue-800 hover:bg-blue-800 font-semibold text-sm py-6 rounded-md"
                                onClick={() => {}}
                                disabled={isDetailsInValid}
                            >
                                Continue
                            </Button>
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