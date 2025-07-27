import * as React from "react";
import { cn } from "@/lib/utils";

interface EventSingleContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface EventSingleContentTextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    headText: string;
}

function EventSingleContent({ className, children, ...props }: EventSingleContentProps) {
    return (
        <div
            data-slot="input"
            className={cn(
                "flex flex-row gap-4 rounded-2xl bg-white w-full py-3 px-4 items-center justify-start",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function EventSingleContentText({ headText, className, children, ...props }: EventSingleContentTextProps) {
    return (
        <div
            data-slot="input"
            className={cn(
                "flex flex-row gap-4 rounded-2xl bg-white w-full py-3 px-4 items-center justify-start",
                className
            )}
            {...props}
        >
            <p className="border-b-neutral-black font-semibold border-b-1 w-full pb-2">{headText}</p>
            {children}
        </div>
    );
}

export { EventSingleContent, EventSingleContentText };
