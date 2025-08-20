'use client';

import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>BeautyWell</title>
        <meta name="description" content="Receive a customized treatment quote tailored just for you - completely free. Experience premium anti-aging aesthetic care with Beauty Link." />
        {/* <!-- Meta Pixel Code --> */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1293314275572081');
          fbq('track', 'PageView');
          `}
        </Script>
        {/* <!-- End Meta Pixel Code --> */}
      </head>
      {/* <body className="overflow-hidden"> */}
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1293314275572081&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
