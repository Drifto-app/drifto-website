import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import jwt from "jsonwebtoken";
import {useAuthStore} from "@/store/auth-store";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

authApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { accessToken } = useAuthStore.getState();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

authApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const { refreshAccessToken, clearAuth } = useAuthStore.getState();

            try {
                const success = await refreshAccessToken();

                if (success && originalRequest.headers) {
                    const { accessToken } = useAuthStore.getState();
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return authApi(originalRequest);
                }
            } catch (refreshError) {
                clearAuth();
                // Redirect to login page
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);