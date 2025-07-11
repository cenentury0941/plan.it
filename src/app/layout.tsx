import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import NoSsr from "@/components/util/no-ssr";
import { Zain } from 'next/font/google';

const zain = Zain({
    weight: '400',
    subsets: ['latin'],
  })
  
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plan.it",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zain.className} antialiased min-h-screen`}
      >      
        <NoSsr>
          {children}
        </NoSsr>
      </body>
    </html>
  );
}
