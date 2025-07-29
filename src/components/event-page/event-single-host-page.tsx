import * as React from "react";
import {cn} from "@/lib/utils";
import {useSpotGradient} from "@/lib/util";
import {SingleEventHeader} from "@/components/event-page/header";
import {SingleEventDetails} from "@/components/event-page/details";
import {SingleEventFooter} from "@/components/event-page/footer";
import {useState} from "react";
import CommentManagePage from "@/components/event-page/comment-manage";

interface SingleEventHostPageProps extends React.ComponentProps<"div">{
    event: {[key: string]: any};
    prev: string | null;
}

export default function SingleEventHostPage(
    {event, prev, className, ...props}: SingleEventHostPageProps
) {

    const [activeScreen, setActiveScreen] = useState<string>("");

    const gradient = useSpotGradient(event.eventTheme)
    const style = event.eventTheme
        ? {
            backgroundImage: gradient
        }
        : undefined;

    if(activeScreen === "comments") {
       return (
           <div
               className={cn(
                   "w-full ",
                   className,
                   event.eventTheme !== null ? "" : "bg-neutral-100",
               )}
               style={style}
               {...props}
           >
               <SingleEventHeader title={"Event Comments"} isCoHost={true} isCoHostComponent={true} prev={""} event={event} setActiveScreen={setActiveScreen} />
               <CommentManagePage event={event} />
               <SingleEventFooter  isCoHost={true} event={event} setActiveScreen={setActiveScreen}/>
           </div>
       )
    }

    return (
        <div
            className={cn(
                "w-full ",
                className,
                event.eventTheme !== null ? "" : "bg-neutral-100",
            )}
            style={style}
            {...props}
        >
            <SingleEventHeader isCoHost={true} prev={prev} event={event} />
            <SingleEventDetails isCoHost={true} event={event} setActiveScreen={setActiveScreen} />
            <SingleEventFooter  isCoHost={true} event={event} setActiveScreen={setActiveScreen}/>
        </div>
    )
}