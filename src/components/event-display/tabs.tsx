"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import {HiOutlineGlobe} from "react-icons/hi";
import {IoGameControllerOutline, IoMusicalNotes} from "react-icons/io5";
import {MdOutlineMovie, MdOutlineSportsBasketball, MdSpa} from "react-icons/md";
import {GiCrafting, GiMountainClimbing, GiPaintBrush, GiPalmTree, GiWeightLiftingUp} from "react-icons/gi";
import {
    FaBookOpen,
    FaBriefcase,
    FaCameraRetro,
    FaChild, FaGamepad,
    FaHandHoldingHeart,
    FaHandsHelping, FaLaptopCode,
    FaMoon, FaPaw, FaPlane,
    FaUtensils
} from "react-icons/fa";
import {FaEarthAfrica, FaTicketSimple} from "react-icons/fa6";

interface EventItem {
    value: string | null;
    icon: React.ReactNode
    label: string;
}

const eventItems: EventItem[] = [
    { value: null,        icon: <FaEarthAfrica size={28} />,         label: "Explore" },
    { value: "gaming",          icon: <FaGamepad size={30} />, label: "Games" },
    { value: "music",          icon: <FaTicketSimple size={30} />,          label: "Music" },
    { value: "sports",          icon: <MdOutlineSportsBasketball size={30} />, label: "Sports" },
    { value: "adventure",      icon: <GiMountainClimbing size={30} />,      label: "Adventure" },
    { value: "art & culture",    icon: <GiPaintBrush size={30} />,            label: "Art & Culture" },
    { value: "business & talks", icon: <FaBriefcase size={30} />,             label: "Business & Talks" },
    { value: "causes",         icon: <FaHandHoldingHeart size={30} />,      label: "Causes" },
    { value: "diy & crafts",     icon: <GiCrafting size={30} />,              label: "DIY & Crafts" },
    { value: "family",         icon: <FaChild size={30} />,                label: "Family" },
    { value: "fashion",        icon: <GiPalmTree size={30} />,             label: "Fashion" },
    { value: "fitness",        icon: <GiWeightLiftingUp size={30} />,      label: "Fitness" },
    { value: "food & drinks",    icon: <FaUtensils size={30} />,             label: "Food & Drinks" },
    { value: "learning",       icon: <FaBookOpen size={30} />,             label: "Learning" },
    { value: "meetups",        icon: <FaHandsHelping size={30} />,         label: "Meetups" },
    { value: "movies & film",    icon: <MdOutlineMovie size={30} />,         label: "Movies & Film" },
    { value: "nightlife",      icon: <FaMoon size={30} />,                 label: "Nightlife" },
    { value: "photography",    icon: <FaCameraRetro size={30} />,          label: "Photography" },
    { value: "pets & animals",   icon: <FaPaw size={30} />,                  label: "Pets & Animals" },
    { value: "recreation",     icon: <GiPalmTree size={30} />,             label: "Recreation" },
    { value: "shows",          icon: <GiCrafting size={30} />,             label: "Shows" },
    { value: "tech",           icon: <FaLaptopCode size={30} />,           label: "Tech" },
    { value: "travel",         icon: <FaPlane size={30} />,                label: "Travel" },
    { value: "volunteering",   icon: <FaHandsHelping size={30} />,         label: "Volunteering" },
    { value: "wellness",       icon: <MdSpa size={30} />,                  label: "Wellness" },
];

const tabColors: { [key: string]: any } = {
    'Explore': { active: '#1976D2', inactive: '#1976D2' },
    'Games': { active: '#00796B', inactive: '#00796B' },
    'Music': { active: '#F57C00', inactive: '#F57C00' },
    'Sports': { active: '#C62828', inactive: '#C62828' },
    'Adventure': { active: '#2E7D32', inactive: '#2E7D32' },
    'Art & Culture': { active: '#455A64', inactive: '#455A64' },
    'Business & Talks': { active: '#6A1B9A', inactive: '#6A1B9A' },
    'Causes': { active: '#0288D1', inactive: '#0288D1' },
    'DIY & Crafts': { active: '#9E9D24', inactive: '#9E9D24' },
    'Family': { active: '#5D4037', inactive: '#5D4037' },
    'Fashion': { active: '#9E9D24', inactive: '#9E9D24' },
    'Fitness': { active: '#F4511E', inactive: '#F4511E' },
    'Food & Drinks': { active: '#D32F2F', inactive: '#D32F2F' },
    'Learning': { active: '#FFA000', inactive: '#FFA000' },
    'Meetups': { active: '#00838F', inactive: '#00838F' },
    'Movies & Film': { active: '#6A1B9A', inactive: '#6A1B9A' },
    'Nightlife': { active: '#283593', inactive: '#283593' },
    'Photography': { active: '#5D4037', inactive: '#5D4037' },
    'Pets & Animals': { active: '#00796B', inactive: '#00796B' },
    'Recreation': { active: '#2E7D32', inactive: '#2E7D32' },
    'Shows': { active: '#0288D1', inactive: '#0288D1' },
    'Tech': { active: '#0288D1', inactive: '#0288D1' },
    'Travel': { active: '#FF5722', inactive: '#FF5722' },
    'Volunteering': { active: '#00838F', inactive: '#00838F' },
    'Wellness': { active: '#00838F', inactive: '#00838F' },
};

export function Tabs({
                         active, onClick
                     }: {
    active: string | null;
    onClick?: (v: string | null) => void;
}) {
    return (
        <ul className="flex flex-row flex-nowrap w-full gap-1 overflow-x-auto px-4 no-scrollbar">
            {eventItems.map((item) => {
                const colors = tabColors[item.label] || { active: '#000', inactive: '#666' };
                const isActive = active === item.value;

                return (
                    <li key={item.value ?? "explore"} className="flex-shrink-0">
                        <div
                            onClick={() => onClick?.(item.value)}
                            className={cn(
                                "flex flex-col items-center border-b-3 cursor-pointer px-4 transition-all gap-1",
                                isActive ? "pb-2 border-b-neutral-800" : "pb-0 opacity-50 border-transparent"
                            )}
                            style={{
                                color: isActive ? colors.active : colors.inactive
                            }}
                        >
                            {item.icon}
                            <span className={cn(" mt-1 whitespace-nowrap", isActive ? "text-md font-bold text-neutral-700" : "text-[15px] text-neutral-500")}>
                                {item.label}
                            </span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}