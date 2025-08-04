import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import {authApi} from "@/lib/axios";
import {toast} from "react-toastify";
import {Dialog} from "@headlessui/react";
import Image from "next/image";

interface ImageSnapshotsProps {
    initialImages: string[];
    onImageAdd: (imageUrl: string, images: string[]) => void;
    onImageRemove: (imageUrl: string, images: string[]) => void;
    maxImages?: number;
}

// Modal Component
const ImageModal = ({
                        isOpen,
                        onClose,
                        imageSrc,
                        onRemove
                    }: {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string | null;
    onRemove?: () => void;
}) => {
    if (!isOpen || !imageSrc) return null;

    return (

        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50"
        >
            {/* Remove button - top left */}
            {onRemove && (
                <div className="absolute top-4 left-4 z-10" onClick={() => { onRemove(); onClose(); }}>
                    <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors">
                        Delete
                    </button>
                </div>
            )}

            {/* Close button - top right */}
            <div className="absolute top-4 right-4 z-10" onClick={onClose}>
                <button className="text-white hover:text-gray-300 transition-colors">
                    <X size={30} />
                </button>
            </div>
            <Dialog.Panel className="bg-white overflow-hidden w-full max-h-[95%]">
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt="Snapshot"
                        width={800}
                        height={600}
                        className="object-contain w-full h-auto"
                        // style={{ maxHeight: "95vh" }}
                    />
                )}
            </Dialog.Panel>
        </Dialog>
    );
};

export const ImageSnapshots = ({
    initialImages = [], onImageAdd, onImageRemove, maxImages = 10
}: ImageSnapshotsProps) => {
    const [images, setImages] = useState<string[]>(initialImages);
    const [isUploading, setIsUploading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const handleImageAdd = async (file: File) => {
        if (images.length >= maxImages) {
            alert(`Maximum ${maxImages} images allowed`);
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("mediaFile", file);
            formData.append("fileData",  new Blob([JSON.stringify({
                mediaFileType: "EVENT_SCREENSHOT"
            })], { type: 'application/json' }))
            const response = await authApi.post("/file/upload", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (!response.data.success) {
                toast.error(response.data.description)
                return
            }

            const newImageUrl = response.data.data.url;
            const updatedImages: string[] = [...images, newImageUrl];
            setImages(updatedImages);

            // Trigger callback
            if (onImageAdd) {
                onImageAdd(newImageUrl, updatedImages);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageRemove = (imageUrl: string) => {
        const updatedImages = images.filter(img => img !== imageUrl);
        setImages(updatedImages);

        // Trigger callback
        if (onImageRemove) {
            onImageRemove(imageUrl, updatedImages);
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleImageAdd(file);
        } else {
            alert('Please select a valid image file');
        }
        // Reset input
        event.target.value = '';
    };

    const openModal = (imageSrc: string) => {
        setActiveImage(imageSrc);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setActiveImage(null);
    };

    if (images.length === 0 && !isUploading) {
        return (
            <div className="w-full bg-white rounded-lg">
                <div className="mb-2">
                    {/* Empty state with add button */}
                    <div className="flex justify-center">
                        <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col items-center justify-center">
                                <Plus className="w-8 h-8 text-gray-400 mb-1" />
                                <p className="text-xs text-gray-500 text-center">Add Snapshot</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileSelect}
                            />
                        </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        0 of {maxImages} snapshots
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full bg-white rounded-lg">
                <div className="mb-2">
                    {/* Carousel Container */}
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {/* Existing Images */}
                        {images.map((imageUrl, index) => (
                            <div key={imageUrl} className="relative group flex-shrink-0">
                                <div
                                    className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
                                    onClick={() => openModal(imageUrl)}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`Snapshot ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Remove button overlay */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleImageRemove(imageUrl);
                                        }}
                                        className="absolute top-1 right-1 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Remove image"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add New Image Button */}
                        {images.length < maxImages && (
                            <div className="flex-shrink-0">
                                <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center">
                                        {isUploading ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                                        ) : (
                                            <>
                                                <Plus className="w-6 h-6 text-gray-400 mb-1" />
                                                <p className="text-xs text-gray-500 text-center">Add</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        disabled={isUploading}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Image counter */}
                    <p className="text-xs text-gray-500 mt-2">
                        {images.length} of {maxImages} snapshots
                    </p>
                </div>
            </div>

            {/* Modal */}
            <ImageModal
                isOpen={modalOpen}
                onClose={closeModal}
                imageSrc={activeImage}
                onRemove={activeImage ? () => handleImageRemove(activeImage) : undefined}
            />
        </>
    );
};
