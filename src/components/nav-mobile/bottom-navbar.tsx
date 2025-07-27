import * as React from "react";
import { cn } from "@/lib/utils";
import {PiFireSimpleBold} from "react-icons/pi";
import {BiCalendarAlt} from "react-icons/bi";
import {HiOutlineSparkles} from "react-icons/hi";
import {LuInbox} from "react-icons/lu";
import {FaRegUser} from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import {useRouter} from "next/navigation";

interface NavItem {
    value: string;
    icon: React.ReactNode
    label: string;
}

interface BottomNavbarProps extends React.ComponentProps<"nav"> {
    activeScreen: string;
    setActiveScreen: (value: string) => void;
    onEventsRefresh?: () => void;
}

const navItems: NavItem[] = [
    { value: "events", icon: <PiFireSimpleBold size="25" />, label: "Events" },
    { value: "plans", icon: <BiCalendarAlt size="25" />, label: "Plans" },
    { value: "posts", icon: <HiOutlineSparkles size="25" />, label: "Posts" },
    { value: "update", icon: <LuInbox size="25" />, label: "Updates" },
    { value: "profile", icon: <FaRegUser size="25" />, label: "Profile" },
];

export const BottomNavbar = ({
    onEventsRefresh, activeScreen, setActiveScreen, className, ...props
}: BottomNavbarProps) => {

    const handleClick = (val: string) => {
        // If clicking on events tab when it's already active, trigger refresh
        if (val === "events" && activeScreen === "events" && onEventsRefresh) {
            onEventsRefresh();
        } else {
            setActiveScreen(val);
        }
    };


    return (
        <nav
            {...props}
            className={cn(
                "fixed inset-x-0 bottom-0 z-50 bg-white border-t border-neutral-200",
                "safe-area-inset-bottom",
                className
            )}
        >
            <ul className="flex justify-around items-center py-2">
                {navItems.map((item) => (
                    <li key={uuidv4()}>
                        <div
                            onClick={() => handleClick(item.value)}

                            className={cn(
                                "flex flex-col items-center hover:text-neutral-900",
                                activeScreen === item.value ? "text-neutral-900" : "text-neutral-400"
                            )}
                        >
                            {item.icon}
                            <span className="text-xs mt-1">{item.label}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
