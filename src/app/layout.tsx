import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {ClientProviders} from "@/components/client-providers";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";

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

  return (
      <html lang="en">
          <head>
              <meta charSet="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>Drifto</title>
              <meta name="description"
                    content="The ultimate mobile platform for discovering, booking, and managing experiences."/>
              <meta name="author" content="Drifto"/>
              <meta property="og:type" content="website" />
              <meta property="og:image" content="/logo-white.svg" />
          </head>
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ClientProviders>
              <main>{children}</main>
              <Analytics />
              <SpeedInsights />
          </ClientProviders>
          </body>
      </html>
  );
}
