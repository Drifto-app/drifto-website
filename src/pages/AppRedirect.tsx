import { useEffect, useState } from "react";
import DriftoBanner from "@/components/DriftoBanner";
import Footer from "@/components/Footer";
import { IoSend } from "react-icons/io5";

type Platform = "ios" | "android" | "desktop";

function detectPlatform(): Platform {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return "ios";
    }

    // Android detection
    if (/android/i.test(userAgent)) {
        return "android";
    }

    // Default to desktop for everything else
    return "desktop";
}

function getRedirectUrl(platform: Platform): string {
    switch (platform) {
        case "ios":
            return import.meta.env.VITE_DRIFTO_APPSTORE_URL;
        case "android":
            return import.meta.env.VITE_DRIFTO_PLAYSTORE_URL;
        case "desktop":
        default:
            return import.meta.env.VITE_DRIFTO_WEBAPP_URL;
    }
}

function getPlatformMessage(platform: Platform): string {
    switch (platform) {
        case "ios":
            return "Redirecting to the App Store...";
        case "android":
            return "Redirecting to the Play Store...";
        case "desktop":
        default:
            return "Redirecting to Drifto...";
    }
}

export default function AppRedirect() {
    const [platform, setPlatform] = useState<Platform | null>(null);
    const [redirectUrl, setRedirectUrl] = useState<string>("");

    useEffect(() => {
        const detectedPlatform = detectPlatform();
        const url = getRedirectUrl(detectedPlatform);

        setPlatform(detectedPlatform);
        setRedirectUrl(url);

        // Redirect immediately
        window.location.href = url;
    }, []);

    return (
        <div className="overflow-x-hidden">
            <div className="bg-white py-2 md:py-6 lg:px-24 mt-28 min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-8">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center animate-pulse">
                            <IoSend className="text-white" size={24} />
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold mb-4">
                            {platform ? getPlatformMessage(platform) : "Detecting your device..."}
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base mb-6">
                            Please wait while we redirect you to the right place.
                        </p>

                        {/* Loading spinner */}
                        <div className="flex justify-center mb-8">
                            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>

                        {/* Manual redirect link as fallback */}
                        {redirectUrl && (
                            <p className="text-sm text-gray-500">
                                Not redirected?{" "}
                                <a
                                    href={redirectUrl}
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    Click here
                                </a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <DriftoBanner />
        </div>
    );
}
