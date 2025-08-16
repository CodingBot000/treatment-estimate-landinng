"use client";


import { useState } from "react";
import BeautyQuestionnaire from "./SkinSurveyFlow/BeautyQuestionnaire";



export default function EstimatePage() {
  const [activeComponent, setActiveComponent] = useState<"skinFlow" | "skin" | "survey" | "quote" | "animateSurveyForm">("skinFlow");
  
  const buttonStyle = (key: string) =>
    `px-4 py-2 rounded border transition-all
     ${
       activeComponent === key
         ? "bg-blue-600 text-white border-blue-600"
         : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
     }`;

  return (
    <div className="p-4">
     
      <BeautyQuestionnaire />
    </div>
  
    );
}

