import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, QrCode, CheckCircle, AlertTriangle } from "lucide-react";
import { authApi } from "@/lib/axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Loader, LoaderSmall } from "@/components/ui/loader";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose, DialogDescription,
} from "@/components/ui/dialog";
import QrScannerDialog from "@/components/event-page/qrcode-dialog";
import { Transition } from "@headlessui/react";
import { showTopToast } from "@/components/toast/toast-util";
import defaultImage from "@/assests/default.jpeg";

interface FindAttendeesProps extends React.ComponentProps<"div"> {
    event: { [key: string]: any };
}

export const FindAttendees = ({
    event, className, ...props
}: FindAttendeesProps) => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedTicket, setSelectedTicket] = useState<{ [key: string]: any } | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [markingUsed, setMarkingUsed] = useState(false);
    const [scannerOpen, setScannerOpen] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    // API function to fetch tickets
    const fetchTickets = async (pageNum: number, search: string = "") => {
        setLoading(true);

        try {
            const params: { [key: string]: string | number } = {
                pageSize: '20',
                dir: 'desc',
                pageNumber: pageNum.toString(),
                ...(search && { search: search.trim() })
            };

            const response = await authApi.get(`/userTicket/event/${event.id}`, { params });

            const data = response.data.data.data;

            setLoading(false);

            // Check if there are more pages
            if (response.data.data.isLast === false) {
                setHasMore(false);
            }

            return data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setLoading(false);
            // Return empty array on error
            return [];
        }
    };

    // Initial load
    useEffect(() => {
        loadInitialTickets();
    }, []);

    // Search effect
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchQuery !== "") {
                handleSearch();
            } else {
                loadInitialTickets();
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const loadInitialTickets = async () => {
        const initialTickets = await fetchTickets(1);
        setTickets(initialTickets);
        setPage(2);
        setHasMore(true);
    };

    const handleSearch = async () => {
        const searchResults = await fetchTickets(1, searchQuery);
        setTickets(searchResults);
        setPage(2);
        setHasMore(searchQuery === "");
    };

    const loadMoreTickets = async () => {
        if (loading || !hasMore) return;

        const newTickets = await fetchTickets(page, searchQuery);
        setTickets(prev => [...prev, ...newTickets]);
        setPage(prev => prev + 1);
    };

    // Infinite scroll handler
    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadMoreTickets();
        }
    }, [loading, hasMore, page, searchQuery]);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            return () => scrollElement.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    const handleMarkAsUsed = (ticket: { [key: string]: any }) => {
        setSelectedTicket(ticket);
        setShowModal(true);
    };

    const confirmMarkAsUsed = async () => {
        if (!selectedTicket) return;

        setMarkingUsed(true);

        try {
            // API call to mark ticket as used
            const response = await authApi.post(`/userTicket/mark/${selectedTicket.ticketReference}`);

            if (response.data.success) {
                // Update the ticket in the list
                setTickets(prev => prev.map(ticket =>
                    ticket.id === selectedTicket.id
                        ? { ...ticket, markedUsed: true }
                        : ticket
                ));
            } else {
                showTopToast("error", response.data.description);
                return;
            }
        } catch (error) {
            showTopToast("error", 'Failed to mark ticket as used. Please try again.')
        }

        setMarkingUsed(false);
        setShowModal(false);
        setSelectedTicket(null);
    };

    const cancelMarkAsUsed = () => {
        setShowModal(false);
        setSelectedTicket(null);
    };

    return (
        <div
            className={cn("w-full flex-1 px-4 ", className)}
            {...props}
        >
            <div className="w-full flex flex-col gap-4 pt-5 no-scrollbar">

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search email, username or ticket reference"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-6 rounded-full bg-gray-100 focus:bg-white"
                    />
                </div>

                {/* Tickets List */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto space-y-3 pb-20 no-scrollbar"
                >
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="flex flex-col items-start gap-4 justify-between p-4 bg-white rounded-lg border border-gray-200"
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
                                    {
                                        ticket.userPlaceHolderResponse?.profileImageUrl !== null ?
                                            <AspectRatio ratio={1 / 1}>
                                                <Image
                                                    src={ticket.userPlaceHolderResponse?.profileImageUrl}
                                                    alt={ticket.userPlaceHolderResponse.username}
                                                    fill
                                                    className="object-cover rounded-full" />
                                            </AspectRatio> :
                                            <AspectRatio ratio={1 / 1}>
                                                <Image
                                                    src={defaultImage}
                                                    alt={ticket.userPlaceHolderResponse.username}
                                                    fill
                                                    className="object-cover rounded-full" />
                                            </AspectRatio>
                                    }
                                </div>
                                <div className="w-full">
                                    <div className="flex flex-row justify-between w-full">
                                        <h3 className="font-semibold text-gray-900">{ticket.userPlaceHolderResponse.username}</h3>
                                        <p className="text-gray-600">{ticket.ticketName}</p>
                                    </div>
                                    <p className="text-sm text-neutral-500 font-mono text-wrap">{ticket.userPlaceHolderResponse.email}</p>
                                    <p className="text-sm text-neutral-500 font-mono text-wrap">{ticket.ticketReference}</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 w-full">
                                <span className="text-neutral-500 font-medium">{ticket.ticketType}</span>
                                {!ticket.markedUsed ? (
                                    <Button
                                        variant="outline"
                                        onClick={() => handleMarkAsUsed(ticket)}
                                        className="px-4 py-2 font-semibold text-blue-800 rounded-full hover:text-blue-800 transition-colors"
                                    >
                                        Mark as Used
                                    </Button>
                                ) : (
                                    <span className="px-4 py-2 text-green-600 font-semibold bg-green-50 rounded-lg">
                                        Used
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-center py-4">
                            <Loader />
                        </div>
                    )}

                    {!hasMore && tickets.length > 0 && (
                        <div className="text-center py-4 text-gray-500">
                            No more tickets to load
                        </div>
                    )}
                </div>
            </div>

            {/* Scan Ticket Button */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
                <Button
                    onClick={() => setScannerOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <QrCode className="w-5 h-5" />
                    Scan Ticket
                </Button>
                <QrScannerDialog
                    open={scannerOpen}
                    onOpenChange={setScannerOpen}
                    onResult={(ticketReference: string) => {
                        setTickets(tickets =>
                            tickets.map(ticket =>
                                ticket.ticketReference === ticketReference
                                    ? { ...ticket, markedUsed: true }
                                    : ticket
                            )
                        );
                    }}
                />
            </div>

            {/* Modal using shadcn Dialog */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent
                    className="w-full max-w-sm sm:rounded-lg flex flex-col items-center justify-center"
                >
                    <DialogHeader>
                        <DialogTitle className="text-lg text-center">
                            Mark Ticket as Used
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Are you sure you want to mark{" "}
                            {selectedTicket?.userPlaceHolderResponse?.username}
                            {"'"}s {selectedTicket?.ticketType} ticket as used?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="w-full flex flex-row sm:justify-between justify-between gap-3">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={markingUsed}
                                className="flex-1 text-lg py-6 border-neutral-400 text-neutral-500 hover:bg-neutral-300 font-semibold"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={confirmMarkAsUsed}
                            disabled={markingUsed}
                            className="flex-1 text-lg py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        >
                            {markingUsed ? <LoaderSmall /> : "OK"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};