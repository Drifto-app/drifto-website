"use client";

import {useState, useEffect, useRef, useCallback, ComponentProps} from "react";
import { Button } from "@/components/ui/button";
import {authApi} from "@/lib/axios";
import Image from "next/image";
import {FaRegEdit} from "react-icons/fa";
import {showTopToast} from "@/components/toast/toast-util";
import {LoaderSmall} from "@/components/ui/loader";
import {cn} from "@/lib/utils";

interface CoverImageUploaderProps extends ComponentProps<"div">{
    imageValue?: string;
    onImageValueChange?: (url: string) => void;
    mediaFileType: string;
    setSubmitDisabled: (loading: boolean) => void;
}

export function CoverImageUploader({
    imageValue, setSubmitDisabled, onImageValueChange, mediaFileType, className, ...props
}: CoverImageUploaderProps) {
    const [localPreview, setLocalPreview] = useState<string>();
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Clear any transient preview whenever the parent-controlled value changes
    useEffect(() => {
        setLocalPreview(undefined);
    }, [imageValue]);

    const preview = localPreview ?? imageValue;

    // Memoize the file change handler to prevent unnecessary re-renders
    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // 1) Show instant preview
        const previewUrl = URL.createObjectURL(file);
        setLocalPreview(previewUrl);
        setUploading(true);
        setSubmitDisabled(true)

        try {
            // 2) Send to your API
            const formData = new FormData();
            formData.append("mediaFile", file);
            formData.append("fileData",  new Blob([JSON.stringify({
                "mediaFileType": mediaFileType
            })], { type: 'application/json' }))
            const response = await authApi.post("/file/upload", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (!response.data.success) {
                showTopToast("error", response.data.description)
                return
            }

            const body = response.data.data;

            if (body.url) {
                // 3) Notify parent
                onImageValueChange?.(body.url);
                // Clean up the local preview URL
                URL.revokeObjectURL(previewUrl);
            }
        } catch (error) {
            console.error("Upload failed:", error);
            // Reset local preview on error
            setLocalPreview(undefined);
            URL.revokeObjectURL(previewUrl);
        } finally {
            setUploading(false);
            setSubmitDisabled(false);
        }

        // Reset the input value to allow re-uploading the same file
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [onImageValueChange]);

    const handleButtonClick = useCallback(() => {
        inputRef.current?.click();
    }, []);

    return (
        <div
            className={cn(
                "relative w-full h-80 bg-gray-100 overflow-hidden",
                className
            )}
            {...props}
        >
            <Image
                src={preview || "/createeventpic.jpg"}
                alt="Cover preview"
                fill
                className="object-cover h-full w-full"
            />

            <div className="absolute bottom-3 right-3 flex items-center justify-center transition">
                <Button
                    variant="secondary"
                    disabled={uploading}
                    onClick={handleButtonClick}
                    type="button"
                    className="flex flex-row items-center justify-center gap-1 h-10 rounded-sm"
                >
                    {uploading
                        ? <LoaderSmall />
                        :<>
                            <FaRegEdit size={25} className="flex-shrink-0" />
                            <span className="m-0 leading-none">
                                {!imageValue ? "Cover Image" : "Upload Image"}
                            </span>
                        </>}
                </Button>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

        </div>
    );
}