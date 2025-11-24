import * as React from "react";
import {cn} from "@/lib/utils";
import {FiBriefcase} from "react-icons/fi";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface OrderSuccessProps extends React.ComponentProps<"div"> {}

export const OrderSuccessDetails = ({
    className, ...props
}: OrderSuccessProps) => {
    const router = useRouter();

    return (
        <div className={cn(
            "w-full flex flex-col justify-between items-center px-4 py-8 gap-8",
            className
        )} {...props}>
           <div className="flex flex-col items-center justify-center w-full sm:max-w-[70vw] gap-6 mt-10">
               <div className="rounded-full bg-blue-200 p-6 animate-[shake_0.5s_ease-in-out_infinite]">
                   <FiBriefcase className="text-blue-600 text-8xl" />
               </div>
               <h1 className="w-full font-black text-2xl">Your tickets are confirmed!</h1>
               <div className="w-full flex flex-col items-start justify-center gap-6 px-3 py-5 border-1 border-neutral-200 text-neutral-700 text-md rounded-md">
                   <p>Check your Tickets! View your purchases details in the Plans Tab</p>
                   <p>Share the Excitement! Let other know about your event experience.</p>
                   <p>Change of plans? Easily request a refund if eligible</p>
                   <p>Need help? Contact <a href="mailto:support@drifto.app" className="font-bold">Drifto Support</a></p>
               </div>
           </div>
            <Button
                className="bg-blue-800 hover:bg-blue-800 text-white font-bold text-lg py-7 rounded-sm w-full"
                onClick={() => {
                    router.push("/?screen=plans")
                }}
            >
                Continue
            </Button>
        </div>
    )
}