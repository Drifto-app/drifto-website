"use client"

import * as React from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {FaArrowLeft} from "react-icons/fa";
import {CommentCard} from "@/components/comment/comment-card";
import {authApi} from "@/lib/axios";
import {toast} from "react-toastify";
import {Loader} from "@/components/ui/loader";
import {useEffect, useRef, useCallback} from "react";
import {Button} from "@/components/ui/button";

interface CommentManageProps extends React.ComponentProps<"div">{
    entityId: string;
    type: string;
    onBackClick?: () => void;
    prev: string | null;
    currentPathUrl: string
}

export default function CommentManagePage(
    {entityId, currentPathUrl, onBackClick, prev, type, className, ...props}: CommentManageProps
) {
    const router = useRouter();

    // State for infinite scroll
    const [comments, setComments] = React.useState<any[]>([]);
    const [title, setTitle] = React.useState<string>("");
    const [hasMore, setHasMore] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [initialLoading, setInitialLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    // Refs for infinite scroll logic
    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(1);

    const loadComments = useCallback(async (resetData = false) => {
        if (loadingRef.current || !hasMoreRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        if (resetData) {
            setInitialLoading(true);
        }
        setError(null);

        try {
            const currentPage = resetData ? 1 : pageRef.current;

            const params: {[key: string]: string | number} = {
                pageSize: 10,
                pageNumber: currentPage,
                commentType: type
            };

            const response = await authApi.get(`/comment/entity/${entityId}`, {
                params
            });

            const newComments = response.data.data.data;

            if (resetData) {
                setComments(newComments);
                pageRef.current = 2;
            } else {
                setComments((prev) => [...prev, ...newComments]);
                pageRef.current = currentPage + 1;
            }

            if(type === "COMMENT_REPLY") {
                setTitle("Comment Replies");
            } else if(type === "POST") {
                setTitle("Post Comments")
            }else if(type === "EVENT") {
                setTitle("Event Comments")
            }

            const isLast = response.data.data.isLast;
            setHasMore(!isLast);
            hasMoreRef.current = !isLast;

        } catch (err: any) {
            toast.error(err.message || "Error loading comments");
            setError(err.message);
            console.log(err);
        } finally {
            setLoading(false);
            setInitialLoading(false);
            loadingRef.current = false;
        }
    }, [entityId, type]);

    // Initial load
    useEffect(() => {
        setComments([]);
        setHasMore(true);
        pageRef.current = 1;
        hasMoreRef.current = true;
        setError(null);
        loadComments(true);
    }, [loadComments]);

    // Infinite scroll
    useEffect(() => {
        const onScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200 &&
                !loadingRef.current &&
                hasMoreRef.current &&
                !error
            ) {
                loadComments(false);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loadComments, error]);

    const handleBackClick = () => {
        if (onBackClick) {
            // Use custom back navigation if provided
            onBackClick();
        } else {
            // Default router navigation
            router.push(prev != null ? prev : "/");
        }
    }

    // Loading state for initial load
    if (initialLoading) {
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
                            {title}
                        </p>
                    </div>
                </div>
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <Loader className="h-10 w-10"/>
                </div>
            </div>
        );
    }

    // Error state
    if (error && comments.length === 0) {
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
                            {<title></title>}
                        </p>
                    </div>
                </div>
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <h2>Unable to load comments</h2>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            "w-full flex flex-col items-center justify-center pb-20",
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
                        {title}
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 px-4">
                <h1 className="text-xl font-semibold text-neutral-800 pt-4">
                    {title} ({comments.length})
                </h1>
            </div>
            <div className="w-full flex flex-col gap-6 px-4 py-4">
                {comments.map((c) => (
                    <CommentCard key={c.id} comment={c} currentPathUrl={currentPathUrl} />
                ))}
            </div>

            {/* Loading indicator for pagination */}
            {loading && !initialLoading && (
                <div className="flex justify-center py-4">
                    <Loader className="h-8 w-8"/>
                </div>
            )}

            {/* End of content indicator */}
            {!hasMore && comments.length > 0 && (
                <p className="py-4 text-gray-500">You have reached the end!</p>
            )}

            {/* No comments message */}
            {!loading && !initialLoading && comments.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center py-8">
                    <p className="text-gray-500">No comments found</p>
                </div>
            )}

            {error && comments.length > 0 && (
                <div className="flex flex-col items-center justify-center py-4 pt-4 pb-15 w-full">
                    <p className="text-orange-700 text-sm mb-2">
                        Failed to load more events
                    </p>
                    <Button
                        onClick={() => loadComments(false)}
                        size="sm"
                        variant="outline"
                        className="border-orange-300 text-orange-700 hover:bg-orange-50"
                    >
                        Try Again
                    </Button>
                </div>
            )}
        </div>
    )
}