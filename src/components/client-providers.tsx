'use client';

import { ReactNode } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/components/auth/auth-provider";
import { EventTagsProvider } from "@/hooks/event-tags-providers";
import {Toaster} from "sonner";

interface ClientProvidersProps {
    children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <AuthProvider>
                <EventTagsProvider>
                    {children}
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Bounce}
                    />
                    <Toaster />
                </EventTagsProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}