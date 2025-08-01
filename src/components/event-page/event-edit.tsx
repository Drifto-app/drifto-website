import * as React from "react";
import {cn} from "@/lib/utils";
import {CoverImageUploader} from "@/components/ui/cover-image";
import {useCallback, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

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

    const handleTitleImageChange = useCallback((newUrl: string) => {
        setTitleImage(newUrl);
    }, []);

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
            <form className="w-full flex flex-col gap-2">
                <CoverImageUploader
                    value={titleImage}
                    onChange={handleTitleImageChange}
                    mediaFileType={"EVENT_HEADER"}
                />
                <div className="grid gap-2 px-4">
                    <Label htmlFor="email" className="text-neutral-500">Title</Label>
                    <Input
                        id="email"
                        type="text"
                        placeholder="Email or Username"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="py-4 bg-neutral-200"
                    />
                </div>
            </form>
        </div>
    )
}
