import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WhatsApp Chat Viewer",
  description: "View and search your WhatsApp chat exports with dark mode, filtering, and an iOS-like UI.",
  keywords: ["WhatsApp Chat Viewer", "Chat Parser", "Export Chat", "WhatsApp History", "Dark UI", "Chat Filter"],
  openGraph: {
    title: "WhatsApp Chat Viewer",
    description: "Parse, filter, and explore WhatsApp chats in a beautiful UI.",
    url: "https://yourdomain.com",
    siteName: "WhatsApp Chat Viewer",
    images: [
      {
        url: "https://yourdomain.com/preview.png",
        width: 1200,
        height: 630,
        alt: "WhatsApp Chat Viewer UI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Chat Viewer",
    description: "Dark-themed WhatsApp chat viewer with sender-based filtering.",
    images: ["https://yourdomain.com/preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
