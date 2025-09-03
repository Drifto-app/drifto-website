"use client"

import React, {useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {SearchType} from "@/components/search/search-component";
import {LuFilter, LuUsers} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import {DateRange} from "react-day-picker";
import {DateRangeType} from "@/components/search/advance-search";
import { MdOutlineDateRange } from "react-icons/md";
import {TbCategory, TbCurrencyNaira } from "react-icons/tb";
import {useEventTags} from "@/store/event-tag-store";
import {GoTag} from "react-icons/go";


export const FilterTypeDialog = ({
    searchText, setSearchText
}: {
    searchText: SearchType;
    setSearchText: (text: SearchType) => void;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [eventType, setEventType] = useState<SearchType>(searchText)

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <div
                    className="flex items-center justify-center gap-2 text-neutral-800 font-semibold px-3 py-2 rounded-md border-1 border-neutral-300"
                >
                    <LuFilter size={20} />
                    <span className="capitalize text-sm leading-none">{searchText.toLowerCase() || "Type"}</span>
                </div>
            </DialogTrigger>

            <DialogContent className="px-0">
                <DialogHeader className="text-left w-full border-b-1 border-neutral-200 pb-4 px-4">
                    <DialogTitle className="text-xl">Select search type</DialogTitle>
                    <p className="text-neutral-400 text-sm font-semibold">Choose what to search for: Events or Users</p>
                </DialogHeader>
                <div className="w-full flex flex-col items-center justify-center gap-4 px-4 py-4">
                    <div
                        className={cn(
                            "w-full py-4 font-semibold rounded-md flex items-center justify-center border-1",
                            eventType === "EVENT" ? "bg-neutral-950 text-white" : "border-neutral-400"
                            )}
                        onClick={() => {setEventType("EVENT")}}
                    >
                        Event
                    </div>
                    <div
                        className={cn(
                            "w-full py-4 font-semibold rounded-md flex items-center justify-center border-1",
                            eventType === "USER" ? "bg-neutral-950 text-white" : "border-neutral-400"
                        )}
                        onClick={() => {setEventType("USER")}}
                    >
                        User
                    </div>
                </div>
                <div className="w-full flex items-center justify-between px-4">
                    <DialogClose asChild>
                        <Button variant="outline" className="text-md py-6 px-10 border-neutral-800 hover:border-neutral-800">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="default"
                        className="text-md py-6 px-10 bg-blue-800 hover:bg-blue-800"
                        onClick={() => {
                            setSearchText(eventType)
                            setIsOpen(false)
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const FilterDateDialog = ({
    dateValue, setDateValue
}: {
    dateValue: DateRangeType | null;
    setDateValue: (value: DateRangeType) => void;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(
        dateValue ? {from: dateValue.from, to: dateValue.to} : undefined
    )


    const formatRange = (range: DateRangeType | null) => {
        if (!dateValue || !range?.from || !range?.to) return "";
        const fromMonth = range.from.toLocaleString("en-US", { month: "short" });
        const toMonth = range.to.toLocaleString("en-US", { month: "short" });

        if (fromMonth === toMonth) {
            return `${fromMonth} ${range.from.getDate()} - ${range.to.getDate()}`;
        }

        return `${fromMonth} ${range.from.getDate()} - ${toMonth} ${range.to.getDate()}`;
    };

    const title = formatRange(dateValue);

    const selectedDateRangeString = () => {
        let fromString = "";
        let toString = "";

        if(dateRange?.from) {
            fromString = dateRange.from.toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        }

        if(dateRange?.to) {
            toString = dateRange.to.toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        }

        return `${fromString} - ${toString}`;
    };


    const currentYear = new Date().getFullYear()
    const maxYear = currentYear + 10

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <div
                    className="flex items-center justify-center gap-2 text-neutral-800 font-semibold px-3 py-2 rounded-md border-1 border-neutral-300"
                >
                    <MdOutlineDateRange size={20} />
                    <span className="capitalize text-sm leading-none whitespace-nowrap">{title || "Date"}</span>
                </div>
            </DialogTrigger>

            <DialogContent className="px-0">
                <DialogHeader className="text-left w-full border-b-1 border-neutral-200 pb-4 px-4">
                    <DialogTitle className="text-xl">Select a date</DialogTitle>
                    <p className="text-neutral-400 text-sm font-semibold">You can also select a range of dates</p>
                </DialogHeader>
                <div className="w-full flex flex-col items-center justify-center gap-4 px-4 py-4">
                    <div className="w-full text-center text-sm">
                        {selectedDateRangeString()}
                    </div>
                    <div className="border-2 border-neutral-300 rounded-md p-2">
                        <Calendar
                            mode="range"
                            selected={dateRange}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDateRange(date!)
                            }}
                            startMonth={new Date(currentYear, 0)}
                            endMonth={new Date(maxYear, 0)}
                        />
                    </div>
                </div>
                <div className="w-full flex items-center justify-between px-4">
                    <DialogClose asChild>
                        <Button variant="outline" className="text-md py-6 px-10 border-neutral-800 hover:border-neutral-800">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="default"
                        className="text-md py-6 px-10 bg-blue-800 hover:bg-blue-800"
                        onClick={() => {
                            setIsOpen(false)
                            setDateValue({
                                to: dateRange?.to,
                                from: dateRange?.from,
                            })
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const FilterPriceDialog = ({
    isTicketPaid, setIsTicketPaid
}: {
    isTicketPaid: boolean | null;
    setIsTicketPaid: (value: boolean | null) => void;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPaid, setIsPaid] = useState<boolean | null>(isTicketPaid);

    const title = () => {
        switch (isTicketPaid) {
            case null:
                return "Price";
            case true:
                return "Premium";
            case false:
                return "Free";
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <div className="flex items-center justify-center gap-2 text-neutral-800 font-semibold px-3 py-2 rounded-md border border-neutral-300">
                    <TbCurrencyNaira size={20} className="flex-shrink-0" />
                    <span className="capitalize text-sm leading-none">{title()}</span>
                </div>
            </DialogTrigger>

            <DialogContent className="px-0">
                <DialogHeader className="text-left w-full border-b-1 border-neutral-200 pb-4 px-4">
                    <DialogTitle className="text-xl">Select a price</DialogTitle>
                    <p className="text-neutral-400 text-sm font-semibold">Choose from free to premium (paid events)</p>
                </DialogHeader>
                <div className="w-full flex flex-col items-center justify-center gap-4 px-4 py-4">
                    <div
                        className={cn(
                            "w-full py-4 font-semibold rounded-md flex items-center justify-center border-1",
                            isPaid === null ? "bg-neutral-950 text-white" : "border-neutral-400"
                        )}
                        onClick={() => {setIsPaid(null)}}
                    >
                        All
                    </div>
                    <div
                        className={cn(
                            "w-full py-4 font-semibold rounded-md flex items-center justify-center border-1",
                            isPaid === false ? "bg-neutral-950 text-white" : "border-neutral-400"
                        )}
                        onClick={() => {setIsPaid(false)}}
                    >
                        Free
                    </div>
                    <div
                        className={cn(
                            "w-full py-4 font-semibold rounded-md flex items-center justify-center border-1",
                            isPaid === true ? "bg-neutral-950 text-white" : "border-neutral-400"
                        )}
                        onClick={() => {setIsPaid(true)}}
                    >
                        Premium
                    </div>
                </div>
                <div className="w-full flex items-center justify-between px-4">
                    <DialogClose asChild>
                        <Button variant="outline" className="text-md py-6 px-10 border-neutral-800 hover:border-neutral-800">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="default"
                        className="text-md py-6 px-10 bg-blue-800 hover:bg-blue-800"
                        onClick={() => {
                            setIsTicketPaid(isPaid)
                            setIsOpen(false)
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const FilterHostDialog = ({
    isHostVerified, setIsHostVerified,
                                  }: {
    isHostVerified: boolean | null;
    setIsHostVerified: (value: boolean | null) => void;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean | null>(isHostVerified);

    const title = () => {
        switch (isHostVerified) {
            case null:
                return "Host";
            case true:
                return "Verified";
            case false:
                return "Not Verified";
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <div className="flex items-center justify-center gap-2 text-neutral-800 font-semibold px-3 py-2 rounded-md border border-neutral-300">
                    <LuUsers size={20} className="flex-shrink-0" />
                    <span className="capitalize text-sm leading-none whitespace-nowrap">{title()}</span>
                </div>
            </DialogTrigger>

            <DialogContent className="px-0">
                <DialogHeader className="text-left w-full border-b-1 border-neutral-200 pb-4 px-4">
                    <DialogTitle className="text-xl">Select a host type</DialogTitle>
                    <p className="text-neutral-400 text-sm font-semibold">Choose either verified or unverified hosts</p>
                </DialogHeader>
                <div className="w-full flex flex-col items-center justify-center gap-4 px-4 py-4">
                    <div
                        className={cn(
                            "w-full py-4 font-semibold rounded-md flex items-center justify-center border-1",
                            isVerified === null ? "bg-neutral-950 text-white" : "border-neutral-400"
                        )}
                        onClick={() => {setIsVerified(null)}}
                    >
                        All
                    </div>
                    <div
                        className={cn(
                            "w-full py-4 font-semibold rounded-md flex items-center justify-center border-1",
                            isVerified === true ? "bg-neutral-950 text-white" : "border-neutral-400"
                        )}
                        onClick={() => {setIsVerified(true)}}
                    >
                        Verified
                    </div>
                    <div
                        className={cn(
                            "w-full py-4 font-semibold rounded-md flex items-center justify-center border-1",
                            isVerified === false ? "bg-neutral-950 text-white" : "border-neutral-400"
                        )}
                        onClick={() => {setIsVerified(false)}}
                    >
                        Not Verified
                    </div>
                </div>
                <div className="w-full flex items-center justify-between px-4">
                    <DialogClose asChild>
                        <Button variant="outline" className="text-md py-6 px-10 border-neutral-800 hover:border-neutral-800">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="default"
                        className="text-md py-6 px-10 bg-blue-800 hover:bg-blue-800"
                        onClick={() => {
                            setIsHostVerified(isVerified)
                            setIsOpen(false)
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const FilterCategoryDialog = ({
    categories, setCategories,
}: {
    categories: string[] | null;
    setCategories: (value: string[] | null) => void;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [eventCategories, setEventCategories] = useState<string[] | null>(categories);

    const title = () => {
        if(!categories || categories.length === 0) {
            return "Categories";
        } else {
            return categories.join(', ') ;
        }
    }

    const onTagRemove = (value: string) => {
        setEventCategories((item) => {
            return item ? item.filter((i) => i !== value) : null;
        })
    }

    const onTagAdd = (tag: string) => {
        if (!eventCategories) {
            setEventCategories([tag]);
        } else {
            setEventCategories([...eventCategories, tag]);
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <div className="flex items-center justify-center gap-2 text-neutral-800 font-semibold px-3 py-2 rounded-md border border-neutral-300">
                    <TbCategory size={20} className="flex-shrink-0" />
                    <span className="capitalize text-sm leading-none truncate max-w-20">{title()}</span>
                </div>
            </DialogTrigger>

            <DialogContent className="px-0">
                <DialogHeader className="text-left w-full border-b-1 border-neutral-200 pb-4 px-4">
                    <DialogTitle className="text-xl">Select a categories</DialogTitle>
                    <p className="text-neutral-400 text-sm font-semibold">Select one or more categories. Scroll to explore all available option</p>
                </DialogHeader>
                <div className="w-full grid grid-col-1 min-[350px]:grid-cols-2 gap-3 max-h-100 overflow-y-auto flex-grow no-scrollbar px-4 py-4">
                    {useEventTags().map((tag, index) => {
                        const isSelected = eventCategories?.includes(tag.name);
                        return (
                            <Button
                                variant={`${isSelected ? "default" : "outline"}`}
                                key={index}
                                className={`px-2 py-2 text-sm rounded-md font-semibold truncate`}
                                onClick={() => isSelected ? onTagRemove(tag.name) : onTagAdd(tag.name)}
                            >
                                <GoTag size={25} />
                               <span>{tag.name}</span>
                            </Button>
                        );
                    })}
                </div>
                <div className="w-full flex items-center justify-between px-4">
                    <DialogClose asChild>
                        <Button variant="outline" className="text-md py-6 px-10 border-neutral-800 hover:border-neutral-800">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="default"
                        className="text-md py-6 px-10 bg-blue-800 hover:bg-blue-800"
                        onClick={() => {
                            setCategories(eventCategories)
                            setIsOpen(false)
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}