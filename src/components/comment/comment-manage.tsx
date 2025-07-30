"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {FaArrowLeft} from "react-icons/fa";
import {CommentCard} from "@/components/comment/comment-card";

interface CommentManageProps extends React.ComponentProps<"div">{
    comments: [{[key: string]: any}];
    type: string;
    onBackClick?: () => void;
    prev: string | null;
    currentPathUrl: string
}

export default function CommentManagePage(
    {comments, currentPathUrl, onBackClick, prev, type, className, ...props}: CommentManageProps
) {
    const router = useRouter();

    const handleBackClick = () => {
        if (onBackClick) {
            // Use custom back navigation if provided
            onBackClick();
        } else {
            // Default router navigation
            router.push(prev != null ? prev : "/");
        }
    }



    return (
        <div className={cn(
            "w-full flex flex-col items-center justify-center",
            className
        )} {...props}>
            <div className={cn(
                "w-full border-b-1 border-b-neutral-300 flex flex-col gap-3 h-20 justify-center",
                className
            )} {...props}>
                <div className="flex flex-row items-center px-8">
                    <FaArrowLeft
                        size={20}
                        onClick={handleBackClick}
                        className="cursor-pointer hover:text-neutral-700 transition-colors"
                    />
                    <p className="font-semibold text-neutral-950 text-xl w-full text-center capitalize truncate ml-4">
                        {"Manage Comments"}
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 px-4">
                <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                    Event Comments ({comments.length})
                </h1>
            </div>
            <div className="w-full flex flex-col gap-6 px-4 py-4">
                {comments.map((c) => (
                    <CommentCard key={c.id} comment={c} currentPathUrl={currentPathUrl} />
                ))}
            </div>
        </div>
    )
}