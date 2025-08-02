import * as React from "react";
import {cn} from "@/lib/utils";
import {CoverImageUploader} from "@/components/ui/cover-image";
import {useCallback, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {LocationSearchDialog} from "@/components/event-page/location-search-dialog";
import {Switch} from "@/components/ui/switch";
import {DateTimePicker} from "@/components/event-page/date-time-input";

interface EventEditProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
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
    event, className, ...props
}: EventEditProps) => {
    const[activeScreen, setActiveScreen] = useState<string>("details");

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

    return (
        <div className="w-full min-h-[85vh]">
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
            <form className="w-full flex flex-col gap-5 pb-10">
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
                            required
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
                            required
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
                    <DateTimePicker date={startTime} setDate={setStartTime} label="start date" />
                    <DateTimePicker date={stopTime} setDate={setStopTime} label="stop date" />
                </div>
            </form>
        </div>
    )
}
