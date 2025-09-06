import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import PageHeader from "../page-header/page-header";
import { Tabs } from "./tabs";
import { authApi } from "@/lib/axios";
import { log } from "console";
import { useRouter } from "next/navigation";
import {
  Antenna,
  Briefcase,
  Loader,
  MapPin,
  PinIcon,
  Radio,
  Upload,
  Wifi,
} from "lucide-react";
import { FaSuitcase } from "react-icons/fa";
import { GiSuitcase } from "react-icons/gi";
import { PiSuitcaseLight } from "react-icons/pi";

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
    <div>
      <article className=" shadow-xl flex flex-col rounded-lg overflow-hidden">
        <div className="relative">
          <Image
            src={booking.titleImage}
            alt={booking.title}
            width={800}
            height={200}
            className="w-full h-48 object-cover"
            priority={false}
            onClick={() => {
              router.push(`/m/bookings/${booking.eventId}`);
            }}
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
  console.log(bookings);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading bookings...</span>
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

function EventsContent({ events }: { events: EventItem[] }) {
  // const { events, isLoading, error, refetch } = useEvents();
  return (
    <div className="text-center py-12 flex flex-col gap-4">
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
  function formatDateToMonthDay(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  const router = useRouter();
  console.log("id", event.id);
  return (
    <div>
      <Image
        width={800}
        height={500}
        src={event.titleImage}
        onClick={() => router.push(`/m/event/${event.id}`)}
        className="w-full max-h-96 object-cover rounded-2xl"
        alt=""
      />
      <h3 className=" mt-4 text-left text-xl font-semibold first-letter:capitalize">
        {event.title}
      </h3>
      <div className="flex mt-14 justify-between items-center">
        {event.coHosts && event.coHosts.length > 0 && (
          <span className=" flex gap-8 items-center">
            <div className=" relative">
              <Image
                sizes="25"
                width={50}
                height={50}
                className=" rounded-full object-cover w-10 h-10 z-10 relative border-2 border-white"
                src={event.coHosts[0]?.profileImageUrl}
                alt=""
              />

              <Image
                width={50}
                height={50}
                className=" rounded-full object-cover w-8 h-8 absolute left-6 top-1"
                src={event.coHosts[1]?.profileImageUrl}
                alt=""
              />
            </div>
            {event.coHosts.length} hosts
          </span>
        )}
        <div className="flex gap-3 items-center ml-auto">
          <span className=" text-white bg-black py-2 px-3 font-normal rounded-full flex ">
            {formatDateToMonthDay(event.startTime.toLocaleString())}
          </span>
          <span className=" text-white bg-black py-2 px-2 font-normal rounded-full flex ">
            <Upload />
          </span>
        </div>
      </div>
    </div>
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
        return <EventsContent events={events} />;
      default:
        return null;
    }
  };

  return (
    //view hieght subtracted from navbar height
    <div className="h-[calc(100vh-60px)] overflow-y-scroll bg-gray-50">
      <div className="p-2">
        <PageHeader headerTitle="Plans" />
        <Tabs active={activeTab} onClick={setActiveTab} />
      </div>

      <main className="p-4">{renderTabContent()}</main>
    </div>
  );
}
