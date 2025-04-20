"use client";

import LeftPanel from "@/components/LeftPanel";
import { FormProvider } from "@/contexts/FormContext";

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
          {children}
        </div>
      </div>
    </FormProvider>
  );
}
