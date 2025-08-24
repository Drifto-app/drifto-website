import * as React from "react";
import {cn} from "@/lib/utils";
import {CoverImageUploader} from "@/components/ui/cover-image";
import {useCallback, useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {LocationSearchDialog} from "@/components/event-page/location-search-dialog";
import {Switch} from "@/components/ui/switch";
import {DateTimePicker} from "@/components/event-page/date-time-input";
import {toast} from "react-toastify";
import {ImageSnapshots} from "@/components/ui/image-snapshot";
import {EventTagDialog} from "@/components/event-page/event-tag-edit";
import {Button} from "@/components/ui/button";
import {TicketCard} from "@/components/event-page/edit-ticket-card";
import {NewTicketCard} from "@/components/event-page/new-ticket-card";
import {authApi} from "@/lib/axios";
import {LoaderSmall} from "@/components/ui/loader";

interface EventEditProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    setEvent: (event: {[key: string]: any}) => void;
    setMainActiveScreen: (activeScreen: string, title?: string) => void;
}

interface HeaderItem {
    value: string;
    label: string;
}

const headerItems: HeaderItem[] = [
    {value: 'details', label: "Details" },
    {value: 'tickets', label: "Tickets" }
]

export const EventEdit = ({
    event, className, setEvent, setMainActiveScreen, ...props
}: EventEditProps) => {
    const[activeScreen, setActiveScreen] = useState<string>("details");


    const [loading, setLoading] = useState<boolean>(false);
    const [startDateError, setStartDateError] = useState<boolean>(false);
    const [stopDateError, setStopDateError] = useState<boolean>(false);

    const [titleImage, setTitleImage] = useState<string | undefined>(
        event.titleImage
    );
    const [title, setTitle] = useState<string>(event.title);
    const [description, setDescription] = useState<string>(event.description);
    const [address, setAddress] = useState<string>(event.address);
    const [city, setCity] = useState<string>(event.city);
    const [state, setState] = useState<string>(event.state);
    const [coordinates, setCoordinates] = useState<{[key: string]: number}>(event.location);
    const [locationSecure, setLocationSecure] = useState<boolean>(event.locationSecure);
    const [isPublic, setIsPublic] = useState<boolean>(event.public);
    const [startTime, setStartTime] = React.useState<Date>(new Date(event.startTime));
    const [stopTime, setStopTime] = React.useState<Date>(new Date(event.stopTime));
    const [isAgeRestricted, setIsAgeRestricted] = useState<boolean>(event.ageRestricted);
    const [minimumAge, setMinimumAge] = useState<string>(String(event.minimumAge ?? "0"));
    const [eventTags, setEventTags] = useState<string[]>(event.eventTags)
    const [screenshots, setScreenshots] = useState<string[]>(event.screenshots)
    const [tickets, setTickets] = useState<any[]>(event.tickets);

    const handleTitleImageChange = useCallback((newUrl: string) => {
        setTitleImage(newUrl);
    }, []);

    useEffect(() => {
        setEvent((prev: any) => ({ ...prev, tickets }));
    }, [tickets, setEvent]);

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
        if(value > stopTime || value < new Date(Date.now())) {
            setStartDateError(true)
            return;
        }

        setStartDateError(false)
        setStartTime(value);
    }

    const handleStopDateChange = (value: Date) => {
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

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

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
            minimumAge:  minimumAge === "" ? null : parseInt(minimumAge, 10),
            tags: eventTags,
        }

        try {
            const response = await authApi.patch(`/event/${event.id}`, params);
            toast.success("Updated successfully");
            setEvent(response.data.data);
            setMainActiveScreen("")
        } catch (error: any) {
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    const renderScreen = () => {
        switch (activeScreen) {
            case "tickets":
                return (
                    <div className="px-3 flex flex-col gap-3 pt-2">
                        {tickets.map((ticket, index) => (
                            <TicketCard
                                key={index}
                                ticket={ticket}
                                onChange={handleTicketsChange}
                                removeTicket={(ticketId: string) => {
                                setTickets((tickets) => {
                                    return tickets.filter((i) => i.id !== ticketId)
                                });
                            }} />
                        ))}
                        <NewTicketCard
                            eventId={event.id}
                            addTicket={(newTicket: {[key: string]: any}) => {
                                setTickets([...tickets, newTicket]);
                            }}
                        />
                    </div>
                )

            case "details":
                return (
                    <>
                        <CoverImageUploader
                            value={titleImage}
                            onChange={handleTitleImageChange}
                            mediaFileType={"EVENT_HEADER"}
                        />
                        <div className="w-full flex flex-col gap-5 px-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-neutral-500">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="py-6 bg-neutral-200"
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="description" className="text-neutral-500">Description</Label>
                                <textarea
                                    id="decription"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="py-2 px-3 bg-neutral-200 rounded-md focus:border-blue-600 focus:border-1 focus:outline-hidden"
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
                            <div className="grid gap-2 w-full">
                                <Label htmlFor="secure-location" className="text-neutral-500">Secure Location</Label>
                                <div className="flex flex-row justify-between items-center rounded-md px-4 py-4 bg-neutral-200 gap-2">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold">Hide Exact Location</h3>
                                        <p className="text-sm text-neutral-500">Enable to hide the exact location fromm attendees until necessary</p>
                                    </div>
                                    <Switch id="secure-location" size="medium" checked={locationSecure} onCheckedChange={() => {setLocationSecure(!locationSecure)}} />
                                </div>
                            </div>
                            <div className="grid gap-2 w-full">
                                <Label htmlFor="event-visible" className="text-neutral-500">Event Visibility</Label>
                                <div className="flex flex-row justify-between items-center rounded-md px-4 py-4 bg-neutral-200 gap-2">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold">Public Event</h3>
                                        <p className="text-sm text-neutral-500">Enable to make the event visible to all users.</p>
                                    </div>
                                    <Switch id="event-visible" size="medium" checked={isPublic} onCheckedChange={() => {setIsPublic(!isPublic)}} />
                                </div>
                            </div>
                           <div className="w-full flex flex-col gap-1">
                               <DateTimePicker date={startTime} setDate={handleStartDateChange} label="start date" />
                               {
                                   startDateError && <p className="text-xs text-red-600">Start time cannot be past the stop time</p>
                               }
                           </div>
                            <div className="w-full">
                                <DateTimePicker date={stopTime} setDate={handleStopDateChange} label="stop date" />
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
                                    className="py-2 bg-neutral-200"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="text-neutral-500">Event Tags</div>
                                <EventTagDialog
                                    currentEventTags={eventTags}
                                    onTagAdd={
                                    (tag: string) => setEventTags([...eventTags, tag])
                                    }
                                    onTagRemove={(tag: string) => setEventTags((value) => value.filter((i) => i !== tag)) }
                                />
                            </div>
                            <div className="grid gap-2 w-full">
                                <Label htmlFor="m-age" className="text-neutral-500">Snapshots</Label>
                                <ImageSnapshots initialImages={screenshots} maxImages={50} onImageAdd={setScreenshots} onImageRemove={setScreenshots}/>
                            </div>
                            <div className="bg-white pt-2 border-none border-t border-white w-full fixed inset-x-0 bottom-0 z-60 pb-4 flex items-center justify-center safe-area-inset-bottom">
                                <Button
                                    type="submit"
                                    className="w-[90%] text-md py-6 font-bold"
                                    disabled={loading || startDateError || stopDateError}
                                    onClick={handleUpdateSubmit}>
                                    {loading ? <LoaderSmall /> : "Confirm Changes"}
                                </Button>
                            </div>
                        </div>
                    </>
                )
        }
    }

    return (
        <div className={cn(
            "w-full min-h-[85vh]",
            className
        )} {...props}>
            <ul className="w-full flex flex-row justify-between pt-2">
                {headerItems.map((item) => (
                    <li key={item.value} className="w-full">
                        <div
                            onClick={() => setActiveScreen!(item.value)}
                            className={cn(
                                "flex flex-col items-center pb-3 border-b-2 cursor-pointer px-4",
                                activeScreen === item.value
                                    ? "border-neutral-950 text-neutral-950"
                                    : "border-transparent text-neutral-500"
                            )}
                        >
                            <span className="text-md mt-1 whitespace-nowrap font-semibold">
                                {item.label}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
            <form className="w-full flex flex-col gap-5 pb-18">
                {
                    renderScreen()
                }
            </form>
        </div>
    )
}
