"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {HiOutlineGlobe} from "react-icons/hi";
import {FaRegUser} from "react-icons/fa";
import {TbBuildings} from "react-icons/tb";
import {IoGameControllerOutline, IoMusicalNotes, IoStorefrontOutline} from "react-icons/io5";
import {MdOutlineSportsBasketball} from "react-icons/md";
import {CiChat1} from "react-icons/ci";
import {GiMountainClimbing, GiWeightLiftingUp} from "react-icons/gi";
import {
    FaUtensils,
    FaLaptopCode,
    FaHandHoldingHeart,
    FaPlane,
    FaBookOpen,
    FaCameraRetro,
    FaHandsHelping,
    FaPaw,
    FaBriefcase,
    FaMoon,
    FaChild,
} from 'react-icons/fa';
import { GiPalmTree, GiPaintBrush, GiCrafting } from 'react-icons/gi';
import { MdSpa, MdOutlineMovie } from 'react-icons/md';
import {v4 as uuidv4} from "uuid";
import {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import {authApi} from "@/lib/axios";
import {toast} from "react-toastify";
import {EventCard} from "@/components/event-display/event-card";
import {Loader} from "@/components/ui/loader";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface EventDisplayProps extends React.ComponentProps<"div"> {
    location: string | null;
}

interface EventDisplayRef {
    refresh: () => void;
}

interface EventItem {
    value: string | null;
    icon: React.ReactNode
    label: string;
}

// const eventItems: EventItem[] = [
//     { value: "explore", icon: <HiOutlineGlobe size={25} />, label: "Explore" },
//     { value: "community", icon: <TbBuildings size={25} />, label: "Community" },
//     { value: "games", icon: <IoGameControllerOutline size={25} />, label: "Games" },
//     { value: "music", icon: <IoMusicalNotes size={25} />, label: "Music" },
//     { value: "sport", icon: <MdOutlineSportsBasketball size={25} />, label: "Sport" },
//     { value: "hangout", icon: <IoStorefrontOutline size={25} />, label: "Hangout" },
//     { value: "discover", icon: <CiChat1 size={25} />, label: "Discover" },
//
//
//     { value: "adventure",     icon: <GiMountainClimbing size={25} />, label: "Adventure"     },
//     { value: "art_culture",   icon: <GiPaintBrush size={25} />,        label: "Art & Culture" },
//     { value: "business_talks",icon: <FaBriefcase size={25} />,         label: "Business & Talks" },
//     { value: "causes",        icon: <FaHandHoldingHeart size={25} />,  label: "Causes"        },
//     { value: "diy_crafts",    icon: <GiCrafting size={25} />,          label: "DIY & Crafts"  },
//     { value: "family",        icon: <FaChild size={25} />,             label: "Family"        },
//     { value: "fashion",       icon: <GiPalmTree size={25} />,          label: "Fashion"       },
//     { value: "fitness",       icon: <GiWeightLiftingUp size={25} />,     label: "Fitness"       },
//     { value: "food_drinks",   icon: <FaUtensils size={25} />,          label: "Food & Drinks" },
//     { value: "learning",      icon: <FaBookOpen size={25} />,          label: "Learning"      },
//     { value: "meetups",       icon: <FaHandsHelping size={25} />,      label: "Meetups"       },
//     { value: "movies_film",   icon: <MdOutlineMovie size={25} />,      label: "Movies & Film" },
//     { value: "nightlife",     icon: <FaMoon size={25} />,              label: "Nightlife"     },
//     { value: "photography",   icon: <FaCameraRetro size={25} />,       label: "Photography"   },
//     { value: "pets_animals",  icon: <FaPaw size={25} />,               label: "Pets & Animals"},
//     { value: "recreation",    icon: <GiPalmTree size={25} />,          label: "Recreation"    },
//     { value: "shows",         icon: <GiCrafting size={25} />,          label: "Shows"         },
//     { value: "tech",          icon: <FaLaptopCode size={25} />,        label: "Tech"          },
//     { value: "travel",        icon: <FaPlane size={25} />,             label: "Travel"        },
//     { value: "volunteering",  icon: <FaHandsHelping size={25} />,      label: "Volunteering"  },
//     { value: "wellness",      icon: <MdSpa size={25} />,               label: "Wellness"      },
// ];

const eventItems: EventItem[] = [
    { value: null,        icon: <HiOutlineGlobe size={27} />,         label: "Explore" },
    { value: "gaming",          icon: <IoGameControllerOutline size={27} />, label: "Games" },
    { value: "music",          icon: <IoMusicalNotes size={27} />,          label: "Music" },
    { value: "sports",          icon: <MdOutlineSportsBasketball size={27} />, label: "Sports" },
    { value: "adventure",      icon: <GiMountainClimbing size={27} />,      label: "Adventure" },
    { value: "art & culture",    icon: <GiPaintBrush size={27} />,            label: "Art & Culture" },
    { value: "business & talks", icon: <FaBriefcase size={27} />,             label: "Business & Talks" },
    { value: "causes",         icon: <FaHandHoldingHeart size={27} />,      label: "Causes" },
    { value: "diy & crafts",     icon: <GiCrafting size={27} />,              label: "DIY & Crafts" },
    { value: "family",         icon: <FaChild size={27} />,                label: "Family" },
    { value: "fashion",        icon: <GiPalmTree size={27} />,             label: "Fashion" },
    { value: "fitness",        icon: <GiWeightLiftingUp size={27} />,      label: "Fitness" },
    { value: "food & drinks",    icon: <FaUtensils size={27} />,             label: "Food & Drinks" },
    { value: "learning",       icon: <FaBookOpen size={27} />,             label: "Learning" },
    { value: "meetups",        icon: <FaHandsHelping size={27} />,         label: "Meetups" },
    { value: "movies & film",    icon: <MdOutlineMovie size={27} />,         label: "Movies & Film" },
    { value: "nightlife",      icon: <FaMoon size={27} />,                 label: "Nightlife" },
    { value: "photography",    icon: <FaCameraRetro size={27} />,          label: "Photography" },
    { value: "pets & animals",   icon: <FaPaw size={27} />,                  label: "Pets & Animals" },
    { value: "recreation",     icon: <GiPalmTree size={27} />,             label: "Recreation" },
    { value: "shows",          icon: <GiCrafting size={27} />,             label: "Shows" },
    { value: "tech",           icon: <FaLaptopCode size={27} />,           label: "Tech" },
    { value: "travel",         icon: <FaPlane size={27} />,                label: "Travel" },
    { value: "volunteering",   icon: <FaHandsHelping size={27} />,         label: "Volunteering" },
    { value: "wellness",       icon: <MdSpa size={27} />,                  label: "Wellness" },
];

export const EventDisplay = forwardRef<EventDisplayRef, EventDisplayProps>(({
    location, className, ...props
}, ref) => {
    const router = useRouter();

    const [activeEventItem, setActiveEventItem] = React.useState<string | null>(null);
    const [events, setEvents] = React.useState<any[]>([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(1);

    const loadEvents = React.useCallback(async (resetData = false) => {
        if (loadingRef.current || !hasMoreRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const currentPage = resetData ? 1 : pageRef.current;

            const params: {[key: string]: string | number} = {
                pageSize: 10,
                pageNumber: currentPage,
            }

            if(activeEventItem != null) {
                params.eventTag = activeEventItem;
            }

            if(location != null) {
                params.location = location;
            }

            const response = await authApi.get("/feed/event", {
                params
            });

            const newEvents = response.data.data.data;

            if (resetData) {
                setEvents(newEvents);
                pageRef.current = 2;
            } else {
                setEvents((prev) => [...prev, ...newEvents]);
                pageRef.current = currentPage + 1;
            }

            const isLast = response.data.data.isLast;
            setHasMore(!isLast);
            hasMoreRef.current = !isLast;

        } catch (err) {
            toast.error("Error loading events");
            console.log(err);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, [location, activeEventItem]);

    // Expose refresh method via ref
    useImperativeHandle(ref, () => ({
        refresh: () => {
            setEvents([]);
            setHasMore(true);
            pageRef.current = 1;
            hasMoreRef.current = true;
            loadEvents(true);
        }
    }), [loadEvents]);

    // Reset when category changes
    useEffect(() => {
        setEvents([]);
        setHasMore(true);
        pageRef.current = 1;
        hasMoreRef.current = true;
        loadEvents(true);
    }, [activeEventItem, loadEvents]);

    // Infinite scroll
    useEffect(() => {
        const onScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200 &&
                !loadingRef.current &&
                hasMoreRef.current
            ) {
                loadEvents(false);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loadEvents]);

    return (
        <div
            className={cn(
                "w-full flex flex-col items-center justify-center pb-20",
                className
            )}
            {...props}
        >
            <ul className="flex flex-row flex-nowrap w-full gap-1 overflow-x-auto px-4 no-scrollbar">
                {eventItems.map((item) => (
                    <li key={item.value} className="flex-shrink-0">
                        <div
                            onClick={() => setActiveEventItem(item.value)}
                            className={cn(
                                "flex flex-col items-center hover:text-neutral-900 pb-1 border-b-2 cursor-pointer px-4",
                                activeEventItem === item.value
                                    ? "border-neutral-900 text-neutral-900"
                                    : "border-transparent text-neutral-400"
                            )}
                        >
                            {item.icon}
                            <span className="text-sm mt-1 whitespace-nowrap">
                                {item.label}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex flex-col gap-10 px-4 mt-4 w-full max-w-7xl ">
                {events.map((evt, index) => (
                    <EventCard key={evt.id} event={evt} />
                ))}
            </div>

            <Button size="lg" className="fixed bottom-20 rounded-full z-1000" onClick={() => router.push("/m/create/event")}>
                Create Event
            </Button>

            {loading && (
                <div className="flex justify-center py-4">
                    <Loader className="h-8 w-8"/>
                </div>
            )}
            {!hasMore && events.length > 0 && (
                <p className="py-4 text-gray-500">You have reached the end!</p>
            )}
        </div>
    );
});
