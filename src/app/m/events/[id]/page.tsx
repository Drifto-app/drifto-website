  "use client";

  import { ProtectedRoute } from "@/components/auth/ProtectedRoutes";
  import { useParams, useSearchParams } from "next/navigation";
  import { useEffect, useState } from "react";
  import { authApi } from "@/lib/axios";
  import { Loader } from "@/components/ui/loader";
  import { ScreenProvider } from "@/components/screen/screen-provider";
  import * as React from "react";
  import EventSinglePage from "@/components/event-page/event-single-page";
  import SingleEventHostPage from "@/components/event-page/event-single-host-page";
  import { MdErrorOutline } from "react-icons/md";
  import { useAuthStore } from '@/store/auth-store';

  export default function EventPage() {
    const { id } = useParams();

    const { isAuthenticated, isLoading, hasTriedRefresh } = useAuthStore();


    const queryParams = useSearchParams();
    const prev = queryParams.get("prev");

    const [event, setEvent] = useState<{ [key: string]: any }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [coHost, setCoHost] = useState<boolean>(false);

    useEffect(() => {
      if (!id) {
        return;
      }

      if (isLoading || (!isAuthenticated && !hasTriedRefresh)) {
        return;
      }

      const fetchEvent = async () => {
        setLoading(true);
        try {
          let response;
          if (isAuthenticated) {
            response = await authApi.get(`/event/${id}`);
          } else {
            response = await authApi.get(`/event/public/${id}`);

          }
          setEvent(response.data.data);


          if (response.data.data.hostCollaborationStatus != null) {
            setCoHost(response.data.data.hostCollaborationStatus);
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }, [id, isAuthenticated, isLoading, hasTriedRefresh]);

    if (error) {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <MdErrorOutline size={30} className="text-red-500" />
            <p className="font-semibold text-lg">Error loading event</p>
          </div>
        </div>
      );
    }

    if (loading) {
      return (
        <ScreenProvider>
          <div className="w-full h-screen flex flex-col items-center justify-center">
            <Loader className="h-10 w-10" />
          </div>
        </ScreenProvider>
      );
    }

    if (!isAuthenticated) {
      return (
        <ScreenProvider>
          <div className="w-full">
            <EventSinglePage event={event} prev={prev}/>
          </div>
        </ScreenProvider>
      )
    }


    return (
      <ProtectedRoute>
        <ScreenProvider>
          <div className="w-full">
            {coHost
              ? <SingleEventHostPage
                  event={event}
                  setEvent={setEvent}
                  prev={prev}
                  setLoading={setLoading}
                />
              : <EventSinglePage event={event} prev={prev} />}
          </div>
        </ScreenProvider>
      </ProtectedRoute>
    );
  }
