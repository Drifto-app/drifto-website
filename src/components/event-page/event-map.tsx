import * as React from "react";
import {cn} from "@/lib/utils";

interface SingleEventMapProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    style?: {[key: string]: any};
}

export const SingleEventMap = ({
    event, style, className, ...props
}: SingleEventMapProps) => {

    return (
        <div
            className={cn(
                "w-full min-h-[87vh]",
                className,
                event.eventTheme !== null ? "" : "bg-neutral-100",
            )}
            {...props}
            style={style}
        >
            <div>map</div>
        </div>
    )
}