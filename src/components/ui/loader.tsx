import React from "react";
import {cn} from "@/lib/utils";

export const LoaderSmall = ({className, ...props}: React.ComponentProps<"div">) => {
    return <div
        className={cn(
            "h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-neutral-800",
            className,
        )}
        {...props}
    ></div>;
}

export const Loader = ({className, ...props}: React.ComponentProps<"div">) => {
    return <div
        className={cn(
            "h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-neutral-800",
            className,
        )}
        {...props}
    ></div>;
}