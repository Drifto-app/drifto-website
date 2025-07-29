"use client"

import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {BottomNavbar} from "@/components/nav-mobile/bottom-navbar";
import {useRef, useState} from "react";
import {HeaderMobile} from "@/components/header-mobile/header-mobile";
import {EventDisplay} from "@/components/event-display/event-display";
import {useAuthStore} from "@/store/auth-store";
import {ScreenProvider} from "@/components/screen/screen-provider";

interface EventDisplayRef {
    refresh: () => void;
}

export default function Home() {
    const {user} = useAuthStore.getState();

    const [activeScreen, setActiveScreen] = useState<string>("events");
    const [location, setLocation] = useState<string | null>(user?.city);
    const eventDisplayRef = useRef<EventDisplayRef>(null);

    // Function to handle events refresh
    const handleEventsRefresh = () => {
        if (eventDisplayRef.current) {
            eventDisplayRef.current.refresh();
        }
    };

    if(activeScreen === "plans") {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full">
                        <div className="w-full">
                            <div>plans</div>
                        </div>
                        <BottomNavbar
                            activeScreen={activeScreen}
                            setActiveScreen={setActiveScreen}
                            onEventsRefresh={handleEventsRefresh}
                        />
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    if(activeScreen === "posts") {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full">
                        <div className="w-full">
                            <div>posts</div>
                        </div>
                        <BottomNavbar
                            activeScreen={activeScreen}
                            setActiveScreen={setActiveScreen}
                            onEventsRefresh={handleEventsRefresh}
                        />
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    if(activeScreen === "update") {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full">
                        <div className="w-full">
                            <div>update</div>
                        </div>
                        <BottomNavbar
                            activeScreen={activeScreen}
                            setActiveScreen={setActiveScreen}
                            onEventsRefresh={handleEventsRefresh}
                        />
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    if(activeScreen === "profile") {
        return (
            <ProtectedRoute>
                <ScreenProvider>
                    <div className="w-full">
                        <div className="w-full">
                            <div>profile</div>
                        </div>
                        <BottomNavbar
                            activeScreen={activeScreen}
                            setActiveScreen={setActiveScreen}
                            onEventsRefresh={handleEventsRefresh}
                        />
                    </div>
                </ScreenProvider>
            </ProtectedRoute>
        )
    }

    return (
        <ProtectedRoute>
            <ScreenProvider>
                <div className="w-full">
                    <div className="w-full">
                        <HeaderMobile
                            location={location}
                            setLocation={setLocation}
                            activeScreen={activeScreen}
                        />
                        <EventDisplay
                            ref={eventDisplayRef}
                            location={location}
                        />
                    </div>
                    <BottomNavbar
                        activeScreen={activeScreen}
                        setActiveScreen={setActiveScreen}
                        onEventsRefresh={handleEventsRefresh}
                    />
                </div>
            </ScreenProvider>
        </ProtectedRoute>
    );
}