"use client";

import * as React from "react";
import Image from "next/image";
import {
    FaCheckCircle,
    FaRegHeart,
    FaRegComment,
} from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { authApi } from "@/lib/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

interface CommentCardProps extends React.ComponentProps<"div"> {
    comment: { [key: string]: any };
    currentPathUrl: string;
}

export function CommentCard({ comment, currentPathUrl, className, ...props}: CommentCardProps) {
    const router = useRouter();

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
            toast.error(err?.message || "Something went wrong");
        } finally {
            setIsLikedLoading(false);
        }
    };

    return (
        <div className={cn(
            "flex flex-col gap-3 py-6 px-8 border border-neutral-200 rounded-lg",
            className
        )} {...props}>
            {/* author + date */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        src={comment.userPlaceHolder.profileImageUrl}
                        alt={comment.userPlaceHolder.username}
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-neutral-900">
                            {comment.userPlaceHolder.username}
                        </p>
                        {comment.userPlaceHolder.verified && (
                            <FaCheckCircle size={14} className="text-blue-500" />
                        )}
                    </div>
                </div>
                <p className="text-md text-neutral-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                </p>
            </div>

            {/* comment text */}
            <p className="text-neutral-800 text-lg mt-3 mb-5">{comment.comment}</p>

            {/* actions */}
            <div className="flex items-center justify-between gap-6 text-neutral-500 font-bold">
                <div className="flex items-center gap-2">
                    <span className="text-md">{totalReactions}</span>
                    <button
                        onClick={handleReaction}
                        disabled={isLikedLoading}
                        className="font-inherit"
                    >
                        {isLiked ? (
                            <FaHeart size={28} className="text-red-500" />
                        ) : (
                            <FaRegHeart size={28} />
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-2" onClick={() => router.push(
                    `/m/comment/${comment.id}` +
                    `?prev=${encodeURIComponent(currentPathUrl)}` +
                    `&type=COMMENT_REPLY`
                    )}>
                    <span className="text-md">{comment.totalComments}</span>
                    <FaRegComment size={28} />
                </div>

                <AiOutlineSend size={28} className="cursor-pointer" />
            </div>
        </div>
    );
}
