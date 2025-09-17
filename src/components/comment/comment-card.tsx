"use client";

import * as React from "react";
import Image from "next/image";
import {
    FaRegHeart,
    FaRegComment,
} from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { authApi } from "@/lib/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";
import {UserSinglePlaceholder} from "@/components/ui/user-placeholder";
import {showTopToast} from "@/components/toast/toast-util";

interface CommentCardProps extends React.ComponentProps<"div"> {
    comment: { [key: string]: any };
    currentPathUrl: string;
    disabled?: boolean;
}

export function CommentCard({ comment, currentPathUrl, disabled, className, ...props}: CommentCardProps) {
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [isLiked, setIsLiked] = useState<boolean>(comment.likedByUser);
    const [isLikedLoading, setIsLikedLoading] = useState<boolean>(false);
    const [totalReactions, setTotalReactions] = useState<number>(
        comment.totalLikes
    );

    const handleReaction = async () => {
        if (isLikedLoading) return;

        setIsLikedLoading(true);

        // Optimistic update!
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setTotalReactions((prev) => prev + (newLiked ? 1 : -1));

        try {
            await authApi.post(`/reaction/react`, {
                reactionType: "COMMENT",
                commentId: comment.id,
            });
        } catch (err: any) {
            setIsLiked(!newLiked);
            setTotalReactions((prev) => prev + (newLiked ? -1 : 1));
            showTopToast("error", err?.message || "Something went wrong");
        } finally {
            setIsLikedLoading(false);
        }
    };

    return (
        <div className={cn(
            "flex flex-col gap-3 py-6 px-8 border border-neutral-200 rounded-lg bg-white",
            className
        )} {...props}>
            {/* author + date */}
            <div className="flex items-center justify-between">
               <UserSinglePlaceholder user={comment.userPlaceHolder} prev={`${pathname}?${searchParams}`} />
                <p className="text-md text-neutral-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                </p>
            </div>

            {/* comment text */}
            <p className="text-neutral-800 text-lg mt-3 mb-5">{comment.comment}</p>

            {/* actions */}
            <div className="flex items-center justify-between gap-6 text-neutral-400 font-bold">
                <div className="flex items-center gap-2">
                    <span className="text-md">{totalReactions}</span>
                    <button
                        onClick={handleReaction}
                        disabled={isLikedLoading || disabled}
                        className="font-inherit"
                    >
                        {isLiked ? (
                            <FaHeart className="w-6 h-6 text-red-500" />
                        ) : (
                            <FaRegHeart className="w-6 h-6" />
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-2" onClick={() => {
                    if(!disabled) {
                        router.push(
                            `/m/comment/${comment.id}` +
                            `?prev=${encodeURIComponent(currentPathUrl)}` +
                            `&type=COMMENT_REPLY`
                        )
                    }
                }}>
                    <span className="text-md">{comment.totalComments}</span>
                    <FaRegComment className="w-6 h-6" />
                </div>

                <AiOutlineSend className="w-6 h-6 cursor-pointer" />
            </div>
        </div>
    );
}
