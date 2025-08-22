"use client"

import * as React from "react";
import {cn} from "@/lib/utils";

interface CoHostManageProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
}

export const CoHostManage = ({
    event, className, ...props
}: CoHostManageProps) => {
    return (
        <div
            className={cn(
                "w-full min-h-[91vh] px-4",
                className
            )}
            {...props}
        >
            <div className="w-full flex flex-col gap-2 pt-2">
                <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                    Add or Remove Co-Host
                </h1>
                <p className="text-neutral-400 font-semibold">
                    Add or remove co-host to collaborate on planning and hosting your event. You can add up to 5 hosts in total (including yourself)
                </p>
            </div>
        </div>
    )
}