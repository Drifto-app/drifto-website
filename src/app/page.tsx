"use client"

import {ProtectedRoute} from "@/components/auth/ProtectedRoutes";
import {BottomNavbar} from "@/components/nav-mobile/bottom-navbar";
import {useEffect, useRef, useState} from "react";
import {HeaderMobile} from "@/components/header-mobile/header-mobile";
import {EventDisplay} from "@/components/event-display/event-display";

interface EventDisplayRef {
    refresh: () => void;
}

export default function Home() {
    const [activeScreen, setActiveScreen] = useState<string>("events");
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [location, setLocation] = useState<string | null>("lagos");
    const eventDisplayRef = useRef<EventDisplayRef>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Function to handle events refresh
    const handleEventsRefresh = () => {
        if (eventDisplayRef.current) {
            eventDisplayRef.current.refresh();
        }
    };

    if(activeScreen === "plans") {
        return (
            <ProtectedRoute>
                {isMobile && <div className="w-full">
                    <div className="w-full">
                        <div>plans</div>
                    </div>
                    <BottomNavbar
                        activeScreen={activeScreen}
                        setActiveScreen={setActiveScreen}
                        onEventsRefresh={handleEventsRefresh}
                    />
                </div>}
            </ProtectedRoute>
        )
    }

    if(activeScreen === "posts") {
        return (
            <ProtectedRoute>
                {isMobile && <div className="w-full">
                    <div className="w-full">
                        <div>posts</div>
                    </div>
                    <BottomNavbar
                        activeScreen={activeScreen}
                        setActiveScreen={setActiveScreen}
                        onEventsRefresh={handleEventsRefresh}
                    />
                </div>}
            </ProtectedRoute>
        )
    }

    if(activeScreen === "update") {
        return (
            <ProtectedRoute>
                {isMobile && <div className="w-full">
                    <div className="w-full">
                        <div>update</div>
                    </div>
                    <BottomNavbar
                        activeScreen={activeScreen}
                        setActiveScreen={setActiveScreen}
                        onEventsRefresh={handleEventsRefresh}
                    />
                </div>}
            </ProtectedRoute>
        )
    }

    if(activeScreen === "profile") {
        return (
            <ProtectedRoute>
                {isMobile && <div className="w-full">
                    <div className="w-full">
                        <div>profile</div>
                    </div>
                    <BottomNavbar
                        activeScreen={activeScreen}
                        setActiveScreen={setActiveScreen}
                        onEventsRefresh={handleEventsRefresh}
                    />
                </div>}
            </ProtectedRoute>
        )
    }

    return (
        <ProtectedRoute>
            {isMobile && <div className="w-full">
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
            </div>}
        </ProtectedRoute>
    );
}