import * as React from "react";
import {cn} from "@/lib/utils";
import {FaArrowLeft} from "react-icons/fa";
import {useRouter} from "next/navigation";

interface SingleEventHeaderProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    activeScreen: string;
    setActiveScreen: (activeScreen: string) => void;
}

interface HeaderItem {
    value: string;
    label: string;
}

const headerItems: HeaderItem[] = [
    {value: 'details', label: "Details" },
    {value: 'map', label: "Map" },
    {value: 'reviews', label: "Reviews" },
    {value: 'related', label: "Related" },
]

export const SingleEventHeader = ({
    event, activeScreen, setActiveScreen, className, ...props
}: SingleEventHeaderProps) => {
    const router = useRouter();

    return (
        <div className={cn(
            "w-full border-b-1 flex flex-col gap-3",
            className
        )} {...props}>
            <div className="flex flex-row items-center pt-6 px-8">
                <FaArrowLeft size={20} onClick={() => router.push("/")} />
                <p className="font-semibold text-gray-700 text-xl w-full text-center capitalize truncate ml-4">
                    {event.title}
                </p>
            </div>
            <ul className="flex flex-row justify-between px-4">
                {headerItems.map((item) => (
                    <li key={item.value} className="flex-shrink-0">
                        <div
                            onClick={() => setActiveScreen(item.value)}
                            className={cn(
                                "flex flex-col items-center hover:text-neutral-900 pb-1 border-b-2 cursor-pointer px-4",
                                activeScreen === item.value
                                    ? "border-neutral-900 text-neutral-900"
                                    : "border-transparent text-neutral-600"
                            )}
                        >
                            <span className="text-md mt-1 whitespace-nowrap">
                                {item.label}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
