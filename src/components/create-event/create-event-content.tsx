"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {FaArrowLeft} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {IoCashOutline, IoEarthOutline, IoGiftOutline, IoLocationOutline} from "react-icons/io5";
import {Button} from "@/components/ui/button";
import {CoverImageUploader} from "@/components/ui/cover-image";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {DateTimePicker} from "@/components/event-page/date-time-input";
import {LocationSearchDialog} from "@/components/event-page/location-search-dialog";
import {EventTagDialog} from "@/components/event-page/event-tag-edit";
import {EventThemeSelector} from "@/components/event-page/event-theme";
import {ImageSnapshots} from "@/components/ui/image-snapshot";
import { v4 as uuidv4 } from 'uuid';
import {FiTrash2} from "react-icons/fi";
import {GoCalendar, GoTag} from "react-icons/go";
import {TbUsers} from "react-icons/tb";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {CiCalendar, CiClock2} from "react-icons/ci";
import {LuClock} from "react-icons/lu";
import {SnapshotCarousel} from "@/components/event-page/image-silder";
import {Switch} from "@/components/ui/switch";
import {LoaderSmall} from "@/components/ui/loader";
import {authApi} from "@/lib/axios";
import {showTopToast} from "@/components/toast/toast-util";
import {CreateEventSuccess} from "@/components/create-event/create-success";
import {useShare} from "@/hooks/share-option";

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

interface TicketDataType {
    id: string;
    name: string;
    description: string;
    price: string;
    quantity: string;
    isPaid: boolean;
    quantityError: boolean;
}

export const CreateEventContent = ({
    prev, className, ...props
}: CreateEventContentProps) => {
    const router = useRouter();

    const [event, setEvent] = useState<{[key: string]: any} | null>(null)
    const [activeScreen, setActiveScreen] = useState<ActiveScreenType>("intro");
    const [loading, setLoading] = useState<boolean>(false);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
    const [startDateError, setStartDateError] = useState<string | null>(null);
    const [stopDateError, setStopDateError] = useState<string | null>(null);
    const [isSelectedTicketPaid, setIsSelectedTicketPaid] = useState<boolean>(true);
    const [currentTicketData, setCurrentTicketData] = useState<TicketDataType>({
        id: "",
        name: "",
        description: "",
        price: "",
        quantity: "",
        isPaid: false,
        quantityError: false,
    });

    const [titleImage, setTitleImage] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [address, setAddress] = useState<string | undefined>(undefined);
    const [city, setCity] = useState<string | undefined>(undefined);
    const [state, setState] = useState<string | undefined>(undefined);
    const [coordinates, setCoordinates] = useState<{
            latitude: number,
            longitude: number
        } | undefined>(undefined);
    const [locationSecure, setLocationSecure] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [startTime, setStartTime] = useState<Date | undefined>(undefined);
    const [stopTime, setStopTime] = useState<Date | undefined>(undefined);
    const [isAgeRestricted, setIsAgeRestricted] = useState<boolean>(false);
    const [minimumAge, setMinimumAge] = useState<string>(String(""));
    const [eventTags, setEventTags] = useState<string[]>([])
    const [screenshots, setScreenshots] = useState<string[]>([])
    const [tickets, setTickets] = useState<any[]>([]);
    const [eventTheme, setEventTheme] = useState<[string, string]>(['#fff', '#fff'])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [activeScreen]);

    const isDetailsInValid = submitDisabled || !title || !description || !startTime || !!startDateError || !stopTime || !!stopDateError || !address || !city || !state || !coordinates || !eventTags || eventTags.length === 0 || !eventTheme;

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

    const handleTicketAdd = (newTicket: TicketDataType) => {
        const newTicketData: TicketDataType = {...newTicket, id: uuidv4()};

        setTickets([...tickets, newTicketData]);
        setCurrentTicketData({
            id: "",
            name: "",
            description: "",
            price: "",
            quantity: "",
            isPaid: false,
            quantityError: false,
        })
    }

    const handleTicketRemove = (ticketId: string) => {
        setTickets((prev) => prev.filter((i) => i.id !== ticketId));
    }

    const handleTicketPriceChange = (raw: string) => {
        // Allow only digits and a single decimal point
        let cleaned = raw.replace(/[^0-9.]/g, "");

        // Prevent more than one decimal point
        const parts = cleaned.split(".");
        if (parts.length > 2) {
            cleaned = parts[0] + "." + parts.slice(1).join("");
        }

        // Limit to 2 decimal places if decimal exists
        if (parts.length === 2) {
            cleaned = parts[0] + "." + parts[1].slice(0, 2);
        }

        const numValue = parseFloat(cleaned);

        setCurrentTicketData({...currentTicketData, price: cleaned, isPaid: !isNaN(numValue) && numValue > 0});
    };

    const handleTicketQuantityChange = (raw: string) => {
        // integers only
        const numericStr = raw.replace(/\D/g, "");
        // normalize leading zeros (optional)
        const normalized = numericStr.replace(/^0+(?=\d)/, "");
        const value = normalized === "" ? 0 : parseInt(normalized, 10);

        if (value < 1) {
            setCurrentTicketData({...currentTicketData, quantity: normalized, quantityError: true});
            return;
        }

        setCurrentTicketData({...currentTicketData, quantity: normalized, quantityError: false})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const isSubmitDataValid: boolean = !title || !description || !startTime || !stopTime || !titleImage || !address || !city || !state || !coordinates?.latitude || !coordinates?.longitude || (isAgeRestricted && !minimumAge) || eventTags.length <= 0 || eventTheme.length !== 2;

        if(isSubmitDataValid) return

        const paramTickets:{
            title: string,
            description: string,
            price: number,
            totalQuantity: number,
            paid: boolean
        }[] = []

        for (const ticket of tickets) {
            paramTickets.push({
                title: ticket.name,
                description: ticket.description,
                price: ticket.price === "" || !ticket.price ? 0 : parseFloat(ticket.price),
                totalQuantity: parseInt(ticket.quantity),
                paid: ticket.isPaid
            })
        }

        const params = {
            title,
            description,
            isLocationSecure: locationSecure,
            isPublic,
            startTime,
            stopTime,
            screenshots,
            titleImage,
            city,
            state,
            location: coordinates,
            address,
            isAgeRestricted,
            minimumAge:  minimumAge === "" || minimumAge === "0" ? null : parseInt(minimumAge, 10),
            tags: eventTags,
            eventTheme: eventTheme,
            tickets: paramTickets
        }

        try {
            const response = await authApi.post(`/event/create`, params);

            setEvent(response.data.data);
            showTopToast("success", "Create experience successfully");
            setActiveScreen("success")
        } catch (error: any) {
            showTopToast("error", error.response?.data?.description);
        }finally {
            setLoading(false);
        }
    }

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
                                onClick={() => setActiveScreen("ticket")}
                                disabled={isDetailsInValid}
                                type="button"
                            >
                                Continue
                            </Button>
                        </div>
                    </>
                )
            case "ticket":
                return (
                    <div className="w-full flex-1">
                        <div className="w-full flex flex-col gap-6 px-4 py-4">
                            <div className="flex flex-col gap-4 px-4 py-4 w-full items-center justify-center border-1 border-neutral-200 rounded-md shadow-md">
                                <h2 className="font-bold text-xl">Create Ticket for Event</h2>
                                <div
                                    className={`flex justify-between w-full items-center rounded-md border border-neutral-200`}
                                >
                                   <span
                                     className={`w-[50%] text-center font-semibold cursor-pointer pl-4 py-3 border-b-2  ${
                                     isSelectedTicketPaid ? "text-black border-black" : "text-neutral-400 border-transparent"}`}
                                     onClick={() => setIsSelectedTicketPaid(true)}
                                   >
                                        Paid
                                   </span>
                                    <span
                                        className={`w-[50%] text-center font-semibold pr-4cursor-pointer py-3 border-b-2 ${
                                            !isSelectedTicketPaid ? "text-black border-black" : "text-neutral-400 border-transparent"
                                        }`}
                                        onClick={() => setIsSelectedTicketPaid(false)}
                                    >
                                        Free
                                    </span>
                                </div>
                                <div className="w-full flex flex-col gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title" className="text-neutral-500">Ticket Name</Label>
                                        <Input
                                            id="ticket-name"
                                            type="text"
                                            placeholder="Ticket Name"
                                            value={currentTicketData.name}
                                            onChange={(e) => setCurrentTicketData({...currentTicketData, name: e.target.value})}
                                            className="py-6 "
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title" className="text-neutral-500">Description</Label>
                                        <textarea
                                            id="ticket-decription"
                                            placeholder="Ticket Description"
                                            value={currentTicketData.description}
                                            onChange={(e) => setCurrentTicketData({...currentTicketData, description: e.target.value})}
                                            rows={5}
                                            className="py-2 px-3 bg-white rounded-md border-1 border-neutral-200 focus:border-blue-600 focus:border-1 focus:outline-hidden"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        {isSelectedTicketPaid && <div className="grid gap-2 w-full">
                                            <Label htmlFor="title" className="text-neutral-500">Price</Label>
                                            <Input
                                                id="ticket-price"
                                                type="text"
                                                placeholder="Ticket Price"
                                                value={currentTicketData.price}
                                                onChange={(e) => handleTicketPriceChange(e.target.value)}
                                                className="py-6 "
                                                required
                                            />
                                        </div>}
                                        <div className="grid gap-2 w-full">
                                            <Label htmlFor="title" className="text-neutral-500">Quantity</Label>
                                            <Input
                                                id="ticket-quantity"
                                                type="text"
                                                placeholder="Ticket Quantity"
                                                value={currentTicketData.quantity}
                                                onChange={(e) => handleTicketQuantityChange(e.target.value)}
                                                className="py-6 "
                                                required
                                            />
                                            {
                                                currentTicketData.quantityError && (
                                                    <span className="text-xs text-red-600">Quantity cannot be lower than 1</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <Button
                                        className="py-7 text-md font-semibold bg-blue-800 hover:bg-blue-800"
                                        onClick={() => handleTicketAdd(currentTicketData)}
                                        type="button"
                                    >
                                        + Create Ticket
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                {tickets.length > 0 && (
                                    <h3 className="font-semibold text-xl">You created tickets ({tickets.length})</h3>
                                )}
                                {tickets.map((ticket) => (
                                    <div key={ticket.id} className="flex flex-col gap-4 p-4 border-1 border-neutral-600 rounded-md shadow-md">
                                        <div className="flex justify-between w-full items-center">
                                            <span className="font-semibold text-sm leading-none capitalize">{ticket.name}</span>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="px-2 py-1 border-none shadow-none"
                                                onClick={() => handleTicketRemove(ticket.id)}
                                                type="button"
                                            >
                                                <FiTrash2 className="text-red-600" />
                                            </Button>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <span className="flex items-center gap-1">
                                                <GoTag className="text-blue-800" />
                                                {ticket.price ? ticket.price : "0.00"}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <TbUsers className="text-blue-800" />
                                                Qty: {ticket.quantity}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                className="py-7 text-lg font-bold bg-blue-800 hover:bg-blue-800"
                                onClick={() => setActiveScreen("preview")}
                                disabled={tickets.length === 0}
                                type="button"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                )
            case "preview":
                return (
                    <div className="w-full flex-1">
                        <div className="w-full flex flex-col gap-3 px-4 pt-6 pb-15">
                            <div className="relative h-80 rounded-full w-full">
                                <Image
                                    src={titleImage || "/createeventpic.jpg"}
                                    alt="Cover preview"
                                    fill
                                    className="object-cover h-full w-full rounded-lg"
                                />
                            </div>
                            <h3 className="font-bold text-2xl">
                                {title}
                            </h3>
                            <div className="flex flex-col gap-4 text-neutral-700 font-medium text-md">
                                <div className="w-full flex items-center justify-start gap-4">
                                    <div className="flex items-center gap-1">
                                        <GoCalendar size={20} />
                                        <span className="leading-none">
                                        {startTime?.toLocaleString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <LuClock size={20} />
                                        <span className="leading-none">
                                        {startTime?.toLocaleString("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                        })}
                                    </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IoLocationOutline size={27} />
                                    <p className="leading-tight">{`${address}, ${city}, ${state}`}</p>
                                </div>
                                <p className="text-lg leading-tight">
                                    {description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {eventTags.map((item, index) => (
                                        <div key={index} className="inline-block text-sm font-medium px-3 py-1 bg-neutral-300 text-neutral-700 rounded-full">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full flex flex-col gap-3">
                                    <div className="font-bold text-black text-lg">Snapshots</div>
                                    <SnapshotCarousel snapshots={screenshots} />
                                </div>
                                <div className="w-full flex flex-col gap-3">
                                    <div className="font-bold text-black text-lg">Tickets</div>
                                    <div className="flex flex-col gap-2 w-full">
                                        {tickets.map((ticket) => (
                                            <div key={ticket.id} className="flex flex-col gap-2 px-4 py-4 bg-neutral-200 rounded-md">
                                                <span className="font-bold text-black">{ticket.name}</span>
                                                <div className="w-full flex justify-between items-center">
                                                    <span className="text-blue-700 font-semibold">{ticket.price || "FREE"}</span>
                                                    <span className="font-medium text-sm text-neutral-600">Quantity: {ticket.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-6">
                                    <div className="w-full flex gap-4 items-center">
                                        <Switch id="secure-location" size="medium" checked={locationSecure} onCheckedChange={() => {setLocationSecure(!locationSecure)}} />
                                        <span className="font-semibold">Extra Security</span>
                                    </div>
                                    <div className="w-full flex gap-4 items-center">
                                        <Switch id="secure-location" size="medium" checked={isPublic} onCheckedChange={() => {setIsPublic(!isPublic)}} />
                                        <span className="font-semibold">Make this event public</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="py-7 text-lg font-bold bg-blue-800 hover:bg-blue-800 mt-6"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? <LoaderSmall /> : "Create"}
                            </Button>
                        </div>
                    </div>
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
                                type="button"
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
                    : <CreateEventSuccess
                        onContinue={() => {router.push("/?screen=plans")}}
                        event={event!}
                    />
            }
        </div>
    )
}