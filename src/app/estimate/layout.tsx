"use client";

import Header from "@/components/Header";
import LeftPanel from "@/components/LeftPanel";
import ProgressBar from "@/components/ProgressBar";
import { FormProvider } from "@/contexts/FormContext";
import React, { useState } from "react";

export default function EstimateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <FormProvider>
      <div className="flex w-full h-full">
        {/* <LeftPanel /> */}
        
        <div className="flex-1 overflow-y-auto bg-white">
          {/* <Header title="Get a Free Personalized Treatment/Plastic Surgery Estimate" />

          <ProgressBar
            percentage={0}
            message="Just provide a few details, and you'll receive quotes from an average of three or more clinics"
            highlightedText="An average of three or more clinics"
          /> */}
          {children}
        </div>
      </div>
    </FormProvider>
  );
}
