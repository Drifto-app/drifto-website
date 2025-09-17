import {ComponentProps, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {authApi} from "@/lib/axios";
import {showTopToast} from "@/components/toast/toast-util";
import {UserSinglePlaceholder} from "@/components/ui/user-placeholder";
import * as React from "react";
import {FaHeart, FaRegComment, FaRegHeart} from "react-icons/fa";
import {AiOutlineSend} from "react-icons/ai";
import {MediaCarousel, MediaDialog} from "@/components/post/post-media";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface PostCardProps extends ComponentProps<"div">{
    postContent: {[key: string]: any};
    disabled?: boolean;
}

export const PostCard = ({
    postContent, disabled = false, className, ...props
}: PostCardProps) => {
    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isLiked, setIsLiked] = useState<boolean>(postContent.likedByUser);
    const [isLikedLoading, setIsLikedLoading] = useState<boolean>(false);
    const [totalReactions, setTotalReactions] = useState<number>(
        postContent.totalLikes
    );
    const [showMediaDialog, setShowMediaDialog] = useState<boolean>(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(0);
    const prevUrl = pathname + "?" + searchParams;

    const handleReaction = async () => {
        if (isLikedLoading) return;

        setIsLikedLoading(true);

        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setTotalReactions((prev) => prev + (newLiked ? 1 : -1));

        try {
            await authApi.post(`/reaction/react`, {
                reactionType: "POST",
                postId: postContent.id,
            })
        } catch (err: any) {
            showTopToast("error", err.message);
            setTotalReactions((prev) => prev + (newLiked ? -1 : 1));
        } finally {
            setIsLikedLoading(false);
        }
    }

    const handleMediaClick = (index: number) => {
        setSelectedMediaIndex(index);
        setShowMediaDialog(true);
    };

    const handleCloseMediaDialog = () => {
        setShowMediaDialog(false);
    };

    return (
        <>
            <div
                className={cn(
                    "w-full py-4 border-b-1 border-b-neutral-200",
                    className,
                )}
                {...props}
            >
                <div className="w-full flex flex-col gap-6 px-4">
                    <div className="flex items-center justify-between">
                        <UserSinglePlaceholder user={postContent.userPlaceHolder} prev={prevUrl} />
                        <p className="text-sm text-neutral-500">
                            {new Date(postContent.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                    <span className="flex flex-col gap-2">
                        <p className="text-md text-neutral-800">
                            {postContent.content}
                        </p>
                        <span className="flex flex-wrap gap-1 text-blue-600">
                            {postContent.taggedUsers.map((tagUser: {[key: string]: any}) => (
                                <a
                                    key={tagUser.id}
                                    className="leading-tight"
                                    href={`/m/user/${tagUser.id}?prev=${encodeURIComponent(prevUrl)}`}
                                >
                                    @{tagUser.username}
                                </a>
                            ))}
                        </span>
                        <span className="flex flex-wrap gap-1 text-blue-600">
                            {postContent.taggedEvents.map((tagEvent: {[key: string]: any}) => (
                                <a
                                    key={tagEvent.eventId}
                                    className="leading-tight"
                                    href={`/m/events/${tagEvent.eventId}?prev=${encodeURIComponent(prevUrl)}`}
                                >
                                    #{tagEvent.title}
                                </a>
                            ))}
                        </span>
                        <span className="w-full">
                            {postContent.mediaFiles && postContent.mediaFiles.length > 0 && (
                                <MediaCarousel
                                    mediaFiles={postContent.mediaFiles}
                                    itemClickAction={handleMediaClick}
                                />
                            )}
                        </span>
                    </span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-400 font-bold">
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
                                    `/m/comment/${postContent.id}` +
                                    `?prev=${encodeURIComponent(prevUrl)}` +
                                    `&type=POST`
                                )
                            }
                        }}>
                            <span className="text-md">{postContent.totalComments}</span>
                            <FaRegComment className="w-6 h-6" />
                        </div>

                        <AiOutlineSend className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>
            </div>

            <MediaDialog
                mediaFiles={postContent.mediaFiles || []}
                initialIndex={selectedMediaIndex}
                isOpen={showMediaDialog}
                onClose={handleCloseMediaDialog}
            />
        </>
    )
}