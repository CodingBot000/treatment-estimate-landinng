import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "BeautyLink",
  description: "Receive a customized treatment quote tailored just for you - completely free. Experience premium anti-aging aesthetic care with Beauty Link.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className="overflow-hidden"> */}
      <body>
        {/* <main className="flex h-screen w-screen"> */}
        <main className="min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
