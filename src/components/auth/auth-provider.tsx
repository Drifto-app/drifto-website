import {useAuthStore} from "@/store/auth-store";
import React, {useEffect} from "react";

export const AuthProvider= ({ children }: { children: React.ReactNode }) => {
    const { setLoading, refreshAccessToken } = useAuthStore();

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true)
            await refreshAccessToken();
            setLoading(false)
        }

        initializeAuth()
    }, [setLoading, refreshAccessToken]);

    return <>{children}</>;
}