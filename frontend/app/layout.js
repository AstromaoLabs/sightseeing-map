import { Geist, Geist_Mono, PT_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: "400", 
});

export const metadata = {
  title: "SightseeingMap",
  description: "Generated by Next.js",
  openGraph: {
    title: "My Next.js App",
    description: "A modern web application built with Next.js",
    images: [
      {
        url: "/img/logo.png",
        width: 200,
        height: 150,
        alt: "local sightseeing Logo",
      },
    ],
    siteName: "My Next.js App",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ptSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
