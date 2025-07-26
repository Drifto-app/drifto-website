'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {useAuthStore} from "@/store/auth-store";
import {useEffect} from "react";
import {Bounce, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GoogleOAuthProvider} from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <main>
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

        </main>
      </GoogleOAuthProvider>
      </body>
    </html>
  );
}
