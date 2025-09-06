import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import PageHeader from "../page-header/page-header";
import { Tabs } from "./tabs";
import { authApi } from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  Radio,
  Upload,
} from "lucide-react";
import {Loader} from "@/components/ui/loader";
import {useShare} from "@/hooks/share-option";
import {ShareDialog} from "@/components/share-button/share-option";
import {AvatarImage, Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

// Types
interface BookingItem {
  eventId: string;
  title: string;
  titleImage: string;
  startTime: string;
  stopTime: string;
  numberOfTickets: number;
  address: string;
  eventDisplayStatus?: string;
}

interface EventItem {
  id: string;
  description: string;
  titleImage: string;
  title: string;
  coHosts: any[];
  startTime: string | Date;
}

interface BookingsResponse {
  data: {
    data: BookingItem[];
  };
}

type TabType = "bookings" | "events" | null;

// Constants
const BOOKING_API_CONFIG = {
  pageNumber: 1,
  pageSize: 15,
  userPlanType: "SCHEDULED" as const,
};

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
};

// Utility Functions
const formatDateRange = (startTime: string, endTime: string): string => {
  const startDate = new Date(startTime);
  const formattedStartDate = startDate.toLocaleString(
    "en-US",
    DATE_FORMAT_OPTIONS
  );

  // Remove the year from start date (everything after the last comma)
  const startDateWithoutYear = formattedStartDate.slice(
    0,
    formattedStartDate.lastIndexOf(",")
  );

  //   if (endTime) {
  const endDate = new Date(endTime);
  console.log(endTime);
  const formattedEndDate = endDate.toLocaleString("en-US", DATE_FORMAT_OPTIONS);
  // }
  return `${startDateWithoutYear} - ${formattedEndDate}`;

  // If no end time, still show the start date without year
  return startDateWithoutYear;
};

// Sub-components
interface BookingCardProps {
  booking: BookingItem;
}

function BookingCard({ booking }: BookingCardProps) {
  const dateRange = formatDateRange(booking.startTime, booking.stopTime);
  const router = useRouter();
  return (
    <div className="w-full flex flex-col" onClick={() => {
      router.push(`/m/bookings/${booking.eventId}`);
    }}>
      <article className=" shadow-xl flex flex-col rounded-lg overflow-hidden">
        <div className="relative">
          <Image
            src={booking.titleImage}
            alt={booking.title}
            width={800}
            height={200}
            className="w-full h-48 object-cover"
            priority={false}
          />
        </div>

        <div className="p-3 space-y-2">
          <h3 className="text-xl font-bold first-letter:uppercase line-clamp-2">
            {booking.title}
          </h3>

          <div className="space-y-1 text-sm text-gray-600 flex flex-col gap-1">
            <p className="font-normal text-base">{dateRange}</p>
            <p className=" flex gap-2 items-center">
              <Radio /> {booking.eventDisplayStatus || "ACTIVE"}
            </p>
            <p className=" flex gap-2 items-center">
              <Briefcase size={25} />
              <span>{booking.numberOfTickets} Tickets</span>
            </p>
            <p
              className="truncate flex gap-2 items-center"
              title={booking.address}
            >
              <MapPin size={25} />
              <span>{booking.address}</span>
            </p>
          </div>
        </div>
      </article>
      {booking.numberOfTickets > 1 ? (
        <div className="flex flex-col items-center gap-1">
          <div className=" w-[95%] h-2 bg-neutral-300 rounded-b-xl"></div>
          <div className=" w-[93%] h-2 bg-neutral-300 rounded-b-xl"></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

interface BookingsListProps {
  bookings: BookingItem[];
  isLoading: boolean;
  error: string | null;
}

function BookingsList({ bookings, isLoading, error }: BookingsListProps) {

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading bookings: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 pb-15">
      {bookings.map((booking) => (
        <BookingCard key={booking.eventId} booking={booking} />
      ))}
    </div>
  );
}

const EVENT_API_CONFIG = {
  pageNumber: 1,
  pageSize: 10,
};

function useEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.get("/event/user", {
        params: EVENT_API_CONFIG,
      });

      const eventsData = response.data.data.data;

      if (!Array.isArray(eventsData)) {
        throw new Error("Invalid response format");
      }

      setEvents(eventsData);
      console.log("events:", eventsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load events";
      setError(errorMessage);
      console.error("Error loading events:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return { events, isLoading, error, refetch: loadEvents };
}

function EventsContent({ events, isLoading }: { events: EventItem[], isLoading: boolean }) {
  const router = useRouter();

  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
    );
  }

  if(events.length <= 0) {
    return (
        <div className=" w-full flex flex-col items-center justify-center gap-3 h-[80dvh]">
          <span className="text-neutral-500 text-sm">You have not created or collaborated in any experience.</span>
          <Button
            className="font-bold bg-blue-800 hover:bg-blue-800 px-6 py-6 text-md"
            onClick={() => {router.push(`/m/event-create?prev=${encodeURIComponent("/?screen=plans")}`)}}
          >
            Create Event
          </Button>
        </div>
    )
  }

  return (
    <div className="text-center pt-4 pb-12 flex flex-col gap-6">
      {events?.map((event, index) => {
        return (
          <div key={index}>
            <EventsCard event={event} />
          </div>
        );
      })}
    </div>
  );
}

interface EventsCardProp {
  event: EventItem;
}
function EventsCard({ event }: EventsCardProp) {

  const eventUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/event/${event.id}`;
  const {
    isShareDialogOpen,
    closeShareDialog,
    handleQuickShare,
  } = useShare({
    title: event.title,
    url: eventUrl,
    description: event.description
  });

  function formatDateToMonthDay(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  const router = useRouter();
  return (
      <>
        <div className="flex flex-col gap-5">
          <Image
              width={800}
              height={500}
              src={event.titleImage}
              onClick={() => router.push(`/m/event/${event.id}?prev=${encodeURIComponent("/?screen=plans")}`)}
              className="w-full max-h-96 object-cover rounded-2xl"
              alt=""
          />
          <h3 className=" text-left text-xl font-semibold first-letter:capitalize">
            {event.title}
          </h3>
          <div className="flex justify-between items-center">
            {event.coHosts && event.coHosts.length > 0 && (
                <span className="flex gap-3 items-center">
                  <div className="relative *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                      {event.coHosts.slice(0, 4).map((cohost, index) => (
                          <Avatar key={index}>
                            <AvatarImage src={cohost.profileImageUrl} alt={cohost.username} />
                            <AvatarFallback>
                              <Image src={"/default.jpeg"} alt={cohost.username} fill />
                            </AvatarFallback>
                          </Avatar>
                      ))}
                    </div>
                  <p>{event.coHosts.length} hosts</p>
                </span>
            )}
            <div className="flex gap-3 items-center ml-auto">
              <span className=" text-white bg-black py-2 px-3 font-normal rounded-full flex ">
                {formatDateToMonthDay(event.startTime.toLocaleString())}
              </span>
              <span className=" text-white bg-black py-2 px-2 font-normal rounded-full flex" onClick={handleQuickShare}>
                <Upload />
              </span>
            </div>
          </div>
        </div>

        <ShareDialog
            isOpen={isShareDialogOpen}
            onClose={closeShareDialog}
            eventTitle={event.title}
            eventUrl={eventUrl}
            eventDescription={event.description}
        />
      </>
  );
}

// Fetches bookings
function useBookings() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.get<BookingsResponse>(
        "/userTicket/user/plan",
        {
          params: BOOKING_API_CONFIG,
        }
      );

      const bookingsData = response.data.data.data;

      if (!Array.isArray(bookingsData)) {
        throw new Error("Invalid response format");
      }

      setBookings(bookingsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load bookings";
      setError(errorMessage);
      console.error("Error loading bookings:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  return { bookings, isLoading, error, refetch: loadBookings };
}

// Main Component
export default function PlanningDisplay() {
  const [activeTab, setActiveTab] = useState<TabType>("bookings");
  const { bookings, isLoading, error } = useBookings();
  const {
    events,
    isLoading: isEventsLoading,
    error: isEventsError,
    refetch,
  } = useEvents();

  const renderTabContent = () => {
    switch (activeTab) {
      case "bookings":
        return (
          <BookingsList
            bookings={bookings}
            isLoading={isLoading}
            error={error}
          />
        );
      case "events":
        return <EventsContent events={events} isLoading={isLoading}/>;
      default:
        return null;
    }
  };

  return (
    //view hieght subtracted from navbar height
    <div className="w-full overflow-y-scroll bg-gray-50">
      <div className="p-2">
        <PageHeader headerTitle="Plans" />
        <Tabs active={activeTab} onClick={setActiveTab} />
      </div>

      <main className="p-4">{renderTabContent()}</main>
    </div>
  );
}
