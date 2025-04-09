import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WhatsApp Chat Viewer - Online .txt File Parser & Reader",
  description: "Free online WhatsApp chat viewer to upload, view and search your exported .txt chats. Filter by sender, enjoy dark iOS-style UI, and explore messages easily.",
  keywords: [
    "WhatsApp Chat Viewer", 
    "Chat Parser", 
    "Export Chat Viewer", 
    "WhatsApp txt reader", 
    "View WhatsApp History", 
    "Online WhatsApp Chat Reader", 
    "WhatsApp Chat Analyzer", 
    "Chat Filter", 
    "Dark Mode WhatsApp Viewer"
  ],
  openGraph: {
    title: "WhatsApp Chat Viewer - Explore .txt WhatsApp Chats Online",
    description: "Upload and view your exported WhatsApp chats in a beautiful, dark UI. Filter by sender, group by date, and enjoy a smooth experience.",
    url: "https://chat-viewer-delta.vercel.app",
    siteName: "WhatsApp Chat Viewer",
    images: [
      {
        url: "https://chat-viewer-delta.vercel.app/preview.png",
        width: 1200,
        height: 630,
        alt: "WhatsApp Chat Viewer Dark Mode UI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Chat Viewer | Read .txt Chat Files Online",
    description: "Dark-themed WhatsApp chat viewer to explore your exported messages with filters and modern UI.",
    images: ["https://chat-viewer-delta.vercel.app/preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "WhatsApp Chat Viewer",
      "url": "https://chat-viewer-delta.vercel.app",
      "description": "A modern dark-themed viewer for WhatsApp exported chats.",
      "applicationCategory": "Utilities",
      "creator": {
        "@type": "Person",
        "name": "Harsh"
      }
    })
  }}
/>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
