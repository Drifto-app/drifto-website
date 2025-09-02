import {persist} from "zustand/middleware";
import {create} from "zustand";
import {api, authApi} from "@/lib/axios";
import {showTopToast} from "@/components/toast/toast-util";

interface AuthState {
    user: {[key: string]: any} | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    hasTriedRefresh: boolean;
}

 export interface LoginCredentials {
     username?: string;
     email?: string;
     password: string;
 }

export interface AuthResponse {
    user: {[key: string]: any};
    accessToken: string;
    refreshToken: string;
    message: string | null;
    "2fa": boolean;
}

interface AuthStore extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    googleLogin: (credentials: string) => Promise<void>;
    logout: () => void;
    refreshAccessToken: () => Promise<boolean>;
    getUser: () => Promise<void>;
    setUser: (user: {[key: string]: any}) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            hasTriedRefresh: false,

            login: async (credentials: LoginCredentials) => {
                try{
                    set({isLoading: true});

                    const request: {
                        username?: string;
                        email?: string;
                        password: string;
                    } = {
                        password: credentials.password,
                    }
                    if(credentials.username) {
                        request.username = credentials.username;
                    }else {
                        request.email = credentials.email;
                    }

                    const response = await api.post('/auth/login', request);
                    const {user, accessToken, refreshToken} = response.data.data

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                    })
                } catch (error) {
                    set({isLoading: false});
                    throw error;
                }
            },

            googleLogin: async (credentials: string) => {
                try{
                    set({isLoading: true});

                    const response = await api.post('/auth/google', {
                        googleIdToken: credentials,
                    });
                    const {user, accessToken, refreshToken} = response.data.data

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                    })
                } catch (error) {
                    set({isLoading: false});
                    throw error;
                }
            },

            logout: () => {
                const { refreshToken } = get();
                api.post('/auth/logout', {
                    refreshToken
                })
                get().clearAuth();
            },

            refreshAccessToken: async (): Promise<boolean> => {
                try {
                    const { refreshToken, user } = get();
                    if (!refreshToken) return false;

                    const response = await api.post('/auth/refresh/token', {
                        refreshToken,
                        userId: user!.id,
                    });

                    set({
                        accessToken: response.data.data.accessToken,
                        user: response.data.data.user,
                        isAuthenticated: true,
                    });
                    return true;
                } catch (error) {
                    get().clearAuth();
                    return false;
                } finally {
                    set({ isLoading: false, hasTriedRefresh: true });
                }
            },

            async getUser(): Promise<void> {
                try {
                    const response = await authApi.get('/user/current');

                    set({ user: response.data.data })
                }catch(error: any) {
                    set({isLoading: false});
                    throw error
                }
            },

            setUser: (user: {[key: string]: any}) => set({ user }),

            setTokens: (accessToken: string, refreshToken: string) =>
                set({ accessToken, refreshToken, isAuthenticated: true }),

            clearAuth: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    isLoading: false,
                }),

            setLoading: (isLoading: boolean) => set({ isLoading }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
                isLoading: state.isLoading,
                hasTriedRefresh: state.hasTriedRefresh,
            }),
        }
    )
);