import React, {useEffect, useState} from "react";

export const ScreenProvider= ({ children }: { children: React.ReactNode }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isMobile) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <h3>Desktop is not supported</h3>
            </div>
        )
    }

    return <>{children}</>;
}