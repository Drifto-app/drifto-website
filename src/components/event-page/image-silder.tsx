import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ShadCN Carousel & AspectRatio components
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Headless UI Dialog for modal pop-up
import { Dialog } from '@headlessui/react';
import { MdCancel } from "react-icons/md";
import {X} from "lucide-react";

interface SnapshotCarouselProps {
    snapshots?: string[];
}

export const SnapshotCarousel: React.FC<SnapshotCarouselProps> = ({ snapshots }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeSrc, setActiveSrc] = React.useState<string | null>(null);

    const openModal = (src: string) => {
        setActiveSrc(src);
        setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);

    if (!snapshots || snapshots.length === 0) return null;

    return (
        <>
            <Carousel className="w-full">
                <CarouselContent className="flex gap-2 overflow-x-auto no-scrollbar">
                    {snapshots.map((src, idx) => (
                        <CarouselItem key={idx} className="w-[60%] flex-none">
                            <div className="cursor-pointer" onClick={() => openModal(src)}>
                                <Card className="overflow-hidden p-0 rounded-lg">
                                    <CardContent className="p-0">
                                        <AspectRatio ratio={4/3}>
                                            <Image
                                                src={src}
                                                alt={`Snapshot ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </AspectRatio>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>


            <Dialog
                open={isOpen}
                onClose={closeModal}
                className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50"
            >
                <div className="absolute top-4 right-4 text-white" onClick={closeModal}>
                    <X size={30} />
                </div>
                <Dialog.Panel className="bg-white overflow-hidden w-full max-h-[95%]">
                    {activeSrc && (
                        <Image
                            src={activeSrc}
                            alt="Snapshot"
                            width={800}
                            height={600}
                            className="object-contain w-full h-auto"
                            // style={{ maxHeight: "95vh" }}
                        />
                    )}
                </Dialog.Panel>
            </Dialog>
        </>
    );
};