'use client';

import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>BeautyLink</title>
        <meta name="description" content="Receive a customized treatment quote tailored just for you - completely free. Experience premium anti-aging aesthetic care with Beauty Link." />
      </head>
      {/* <body className="overflow-hidden"> */}
      <body>
        {/* <main className="flex h-screen w-screen"> */}
        <ToastProvider>
          <main className="min-h-screen w-full">
            {children}
          </main>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
