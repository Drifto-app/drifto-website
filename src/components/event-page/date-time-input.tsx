"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DateTimePickerProps extends React.ComponentProps<"div"> {
    date: Date | undefined
    setDate: (value: Date) => void
    required?: boolean
    label: string
}

export const DateTimePicker = ({
                                   label,
                                   date,
                                   setDate,
                                   className,
                                   required = false,
                                   ...props
                               }: DateTimePickerProps) => {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [dateValue, setDateValue] = React.useState(formatDate(date))
    const [timeValue, setTimeValue] = React.useState(formatTime(date))

    // Keep internal inputs in sync if `date` prop changes externally
    React.useEffect(() => {
        setDateValue(formatDate(date))
        setTimeValue(formatTime(date))
        setMonth(date)
    }, [date])

    const currentYear = new Date().getFullYear()
    const maxYear = currentYear + 10

    // Called when user types a new date string
    function handleDateChange(str: string) {
        setDateValue(str)
        const [monthDayYear, existingTime] = [str, timeValue || "00:00"]
        const parsed = new Date(`${monthDayYear} ${existingTime}`)
        if (isValidDate(parsed)) {
            setDate(parsed)
            setMonth(parsed)
        }
    }

    // Called when user picks or types a new time
    function handleTimeChange(str: string) {
        setTimeValue(str)
        const [h, m] = str.split(":").map(Number)
        const base = date ?? new Date()
        const updated = new Date(base)
        updated.setHours(h, m)
        setDate(updated)
    }

    return (
        <div className={cn("flex flex-col gap-3", className)} {...props}>
            <Label htmlFor="datetime" className="px-1 capitalize text-neutral-500">
                {label}
            </Label>
            <div className="flex gap-2 items-center">
                {/* ───────── Date picker ───────── */}
                <div className="relative flex-1">
                    <Input
                        id="date"
                        value={dateValue}
                        placeholder="June 01, 2025"
                        required={required}
                        className="bg-background pr-10 border-none shadow-none w-full"
                        onChange={(e) => handleDateChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                                e.preventDefault()
                                setOpen(true)
                            }
                        }}
                    />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            >
                                <CalendarIcon className="size-4" />
                                <span className="sr-only">Select date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="end"
                            alignOffset={-8}
                            sideOffset={10}
                        >
                            <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                month={month}
                                onMonthChange={setMonth}
                                onSelect={(d) => {
                                    setDate(d!)
                                    setDateValue(formatDate(d))
                                    setOpen(false)
                                }}
                                // restrict selectable years
                                fromYear={currentYear}
                                toYear={maxYear}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* ───────── Time picker ───────── */}
                <Input
                    id="time"
                    type="time"
                    value={timeValue}
                    required={required}
                    className="w-32"
                    onChange={(e) => handleTimeChange(e.target.value)}
                />
            </div>
        </div>
    )
}

// Helpers
function formatDate(date: Date | undefined) {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

function formatTime(date: Date | undefined) {
    if (!date) return ""
    return date
        .toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
}

function isValidDate(d: Date) {
    return !isNaN(d.getTime())
}
