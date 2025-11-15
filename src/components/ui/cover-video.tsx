"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ComponentProps,
} from "react";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/axios";
import { FaRegEdit } from "react-icons/fa";
import { showTopToast } from "@/components/toast/toast-util";
import { LoaderSmall } from "@/components/ui/loader";
import { cn, MAX_VIDEO_SIZE, uploadMedia } from "@/lib/utils";

interface CoverVideoUploaderProps extends ComponentProps<"div"> {
  videoValue?: string;
  onVideoValueChange?: (url: string) => void;
  mediaFileType: string;
  setSubmitDisabled: (loading: boolean) => void;
}

const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export function CoverVideoUploader({
  videoValue,
  setSubmitDisabled,
  onVideoValueChange,
  mediaFileType,
  className,
  ...props
}: CoverVideoUploaderProps) {
  const [localPreview, setLocalPreview] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Clear any transient preview whenever the parent-controlled value changes
  useEffect(() => {
    setLocalPreview(undefined);
  }, [videoValue]);

  const preview = localPreview ?? videoValue;

  // Handle video metadata to display duration
  const handleVideoMetadata = useCallback(() => {
    if (videoRef.current) {
      setVideoDuration(Math.round(videoRef.current.duration));
    }
  }, []);

  // Memoize the file change handler to prevent unnecessary re-renders
  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (
        !file ||
        !ALLOWED_VIDEO_TYPES.includes(file.type) ||
        file.size > MAX_VIDEO_SIZE
      ) {
        showTopToast(
          "error",
          "Please upload a valid video file (MP4, WebM, or MOV) under the size limit."
        );
        return;
      }

      // 1) Show instant preview
      const previewUrl = URL.createObjectURL(file);
      setLocalPreview(previewUrl);
      setUploading(true);
      setSubmitDisabled(true);

      try {
        const response = await uploadMedia(file, mediaFileType);

        if (!response) {
          showTopToast("error", "Upload failed.");
          return;
        }

        if (response) {
          onVideoValueChange?.(response);
          // Clean up the local preview URL
          URL.revokeObjectURL(previewUrl);
        }
      } catch (error: any) {
        console.log("error : " + error.response?.data?.description);
        showTopToast(
          "error",

          "Upload failed. Please try again."
        );
        // Reset local preview on error
        setLocalPreview(undefined);
        URL.revokeObjectURL(previewUrl);
      } finally {
        setUploading(false);
        setSubmitDisabled(false);
      }

      // Reset the input value to allow re-uploading the same file
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [onVideoValueChange, setSubmitDisabled]
  );

  const handleButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "relative w-full h-80 bg-gray-900 overflow-hidden",
        className
      )}
      {...props}
    >
      {preview ? (
        <>
          <video
            ref={videoRef}
            src={preview}
            className="w-full h-full object-cover"
            onLoadedMetadata={handleVideoMetadata}
          />
          {videoDuration > 0 && (
            <div className="absolute top-3 left-3 bg-black bg-opacity-70 px-2 py-1 rounded text-white text-sm font-medium">
              {formatDuration(videoDuration)}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="text-gray-400 text-lg">No video selected</div>
            <div className="text-gray-500 text-sm mt-1">
              Upload a cover video
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-3 right-3 flex items-center justify-center transition">
        <Button
          variant="secondary"
          disabled={uploading}
          onClick={handleButtonClick}
          type="button"
          className="flex flex-row items-center justify-center gap-1 h-10 rounded-sm"
        >
          {uploading ? (
            <LoaderSmall />
          ) : (
            <>
              <FaRegEdit size={25} className="flex-shrink-0" />
              <span className="m-0 leading-none">
                {!videoValue ? "Cover Video" : "Change Video"}
              </span>
            </>
          )}
        </Button>
        <input
          ref={inputRef}
          multiple={false}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
