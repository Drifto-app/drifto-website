"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authApi } from "@/lib/axios";
import { toast } from "react-toastify";
import { showTopToast } from "@/components/toast/toast-util";
import { AspectRatio } from "../ui/aspect-ratio";

interface EventCardProps extends React.ComponentProps<"div"> {
  event: { [key: string]: any };
  currentPathUrl: string;
}

export const EventCard = ({
                            event,
                            currentPathUrl,
                            className,
                            ...props
                          }: EventCardProps) => {
  const router = useRouter();

  const [price, setPrice] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(event.likedByUser);
  const [isLikedLoading, setIsLikedLoading] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // PRICE LOGIC
  useEffect(() => {
    if (event.tickets) {
      const newPrice: number = event.tickets.reduce(
        (min: number, ticket: { price: number }) => {
          return ticket.price < min ? ticket.price : min;
        },
        Infinity
      );

      if (newPrice === 0) {
        setPrice("Free");
      } else {
        setPrice(newPrice.toString());
      }
    }
  }, [event.tickets]);

  // INTERSECTION OBSERVER FOR VIDEO PLAYBACK CONTROL
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const source = video.querySelector("source");
    if (!source) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          // Load video if not loaded yet
          if (!source.src) {
            source.src = event.coverVideo;
            video.load();
          }

          // Play video when it's in view (center 50% of viewport)
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(err => {
            console.log("Video play failed:", err);
          });
        } else {
          // Pause video when out of view
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.5, // Play when 50% visible
        rootMargin: "-25% 0px -25% 0px" // Focus on center of viewport
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [event.coverVideo]);

  // Handle mute/unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // DATE FORMAT
  const dt = new Date(event.startTime);
  const formatted = dt.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleReaction = async () => {
    if (isLikedLoading) return;

    setIsLikedLoading(true);
    const likedState: boolean = isLiked;

    try {
      setIsLiked(!likedState);
      await authApi.post(`/reaction/react`, {
        reactionType: "EVENT",
        eventId: event.id,
      });
    } catch (err: any) {
      showTopToast("error", err.message);
      setIsLiked(likedState);
    } finally {
      setIsLikedLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col border-none", className)} {...props}>
      <div className="w-full rounded-lg flex flex-col gap-1">
        <div
          ref={containerRef}
          className="relative w-full max-h-[75vh] overflow-hidden"
        >
          {event.coverVideo ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              preload="none"
              muted={isMuted}
              playsInline
              loop
              controls={false}
              poster={event.titleImage}
              onClick={() => {
                router.push(
                  `/m/events/${event.id}?prev=${encodeURIComponent(
                    currentPathUrl
                  )}`
                );
              }}
            >
              <source data-src={event.coverVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={event.titleImage}
              alt={event.title}
              width={800}
              height={500}
              className="w-full h-auto object-cover rounded-lg"
              style={{ maxHeight: "75vh" }}
              onClick={() => {
                router.push(
                  `/m/events/${event.id}?prev=${encodeURIComponent(
                    currentPathUrl
                  )}`
                );
              }}
            />
          )}

          {event.original && (
            <div className="absolute top-4 left-2 rounded-full py-2 px-2 text-xs shadow-md font-semibold bg-white">
              Drifto Original
            </div>
          )}
          {event.coverVideo && (
            <div className="absolute bottom-0 left-0 pr-6 pl-2 pt-6 pb-4 ">
              <button
                className="text-white rounded-full bg-neutral-800 p-2 opacity-90 z-90"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <HiVolumeOff size={20} />
                ) : (
                  <HiVolumeUp size={20} />
                )}
              </button>
            </div>
          )}

          {/* Like Button */}
          <div
            className="p-3 absolute top-3 right-2 z-1000 h-15 w-15"
            onClick={handleReaction}
          >
            <button
              className="absolute top-3 right-2 text-white rounded-full bg-neutral-800 p-2 opacity-90 z-90"
              disabled={isLikedLoading}
            >
              {isLiked ? (
                <FaHeart
                  size={25}
                  className="text-red-500 animate-[heartBeat_0.3s_ease-in-out]"
                  style={{
                    animation: 'heartBeat 0.2s ease-in-out'
                  }}
                />
              ) : (
                <IoMdHeartEmpty size={25} />
              )}
            </button>
          </div>
        </div>

        <h3 className="mt-2 font-semibold text-xl capitalize">{event.title}</h3>

        <p className="text-sm text-gray-500 flex flex-row gap-2 items-center">
          {formatted} at
          <span className="capitalize font-semibold">{event.city}</span>
          <span className="flex flex-row gap-1 items-center">
            <IoTicket size={15} />
            {event.numberOfPurchasedTickets}
          </span>
        </p>
      </div>

      {price && (
        <div className="flex items-center text-xl font-bold w-full justify-end mt-2 text-neutral-500">
          {price === "Free" ? price : "₦ " + price}
        </div>
      )}
    </div>
  );
};