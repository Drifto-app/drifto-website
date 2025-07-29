import * as React from "react";
import {cn} from "@/lib/utils";
import {FaArrowLeft} from "react-icons/fa";
import {useRouter} from "next/navigation";

interface SingleEventHeaderProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    activeScreen?: string;
    setActiveScreen?: (activeScreen: string) => void;
    prev: string | null;
    isCoHost: boolean;
    isCoHostComponent?: boolean;
    title?: string;
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
    title = "Manage Event", isCoHostComponent = false, isCoHost, event, activeScreen, setActiveScreen, prev, className, ...props
                                  }: SingleEventHeaderProps) => {
    const router = useRouter();

    const handleBackClick = () => {
        if(isCoHostComponent) {
            setActiveScreen!(prev!);
        } else {
            router.push(prev != null ? prev : "/")
        }
    }


    if (isCoHost) {
        return (
            <div className={cn(
                "w-full border-b-1 border-b-neutral-300 flex flex-col gap-3 h-20 justify-center",
                className
            )} {...props}>
                <div className="flex flex-row items-center px-8">
                    <FaArrowLeft size={20} onClick={handleBackClick} />
                    <p className="font-semibold text-neutral-950 text-xl w-full text-center capitalize truncate ml-4">
                        {isCoHostComponent ? title : "Manage Event"}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={cn(
            "w-full border-b-1 border-b-neutral-300 flex flex-col gap-3",
            className
        )} {...props}>
            <div className="flex flex-row items-center pt-6 px-8">
                <FaArrowLeft size={20} onClick={() => router.push(prev != null ? prev : "/")} />
                <p className="font-semibold text-neutral-800 text-xl w-full text-center capitalize truncate ml-4">
                    {event.title}
                </p>
            </div>
            <ul className="flex flex-row justify-between px-4">
                {headerItems.map((item) => (
                    <li key={item.value} className="flex-shrink-0">
                        <div
                            onClick={() => setActiveScreen!(item.value)}
                            className={cn(
                                "flex flex-col items-center hover:text-neutral-900 pb-1 border-b-2 cursor-pointer px-4",
                                activeScreen === item.value
                                    ? "border-neutral-950 text-neutral-950"
                                    : "border-transparent text-neutral-700"
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
