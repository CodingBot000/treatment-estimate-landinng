"use client";


import { useState } from "react";
import SkinForm from "./skinForm/skin-form";
import SkinSurveyForm from "./SkinSurveyForm/SkinSurveyForm";
import EstimateStepPage from "./estimateStepPage/EstimateStepPage";
import SkinSurveyFlow from "./SkinSurveryFlow/SkinSurveyFlow";
import BeautyQuestionnaire from "./SkinSurveyFlow2/BeautyQuestionnaire";



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
      {/* 버튼 영역 */}
      {/* <div className="mb-4 grid grid-cols-2 gap-2 text-sm md:flex md:text-base md:gap-2">
        <button onClick={() => setActiveComponent("skinFlow")} className={buttonStyle("skinFlow")}>
        BeautyQuestionnaire
        </button>
        <button onClick={() => setActiveComponent("skin")} className={buttonStyle("skin")}>
          SkinForm
        </button>
        <button onClick={() => setActiveComponent("survey")} className={buttonStyle("survey")}>
          SkinSurveyForm
        </button>
        <button onClick={() => setActiveComponent("quote")} className={buttonStyle("quote")}>
          EstimateStepPage
        </button>
        <button onClick={() => setActiveComponent("animateSurveyForm")} className={buttonStyle("animateSurveyForm")}>
          animateSurveyForm
        </button>
      </div> */}

      {/* 선택된 컴포넌트 렌더링 */}
      {/* <div>
        { activeComponent === "skinFlow" && <BeautyQuestionnaire />}
        { activeComponent === "skin" && <SkinForm />}
        {activeComponent === "survey" && <SkinSurveyForm />}
        {activeComponent === "quote" && <EstimateStepPage />}
        {activeComponent === "animateSurveyForm" && <SkinSurveyFlow />}
      </div> */}
      <BeautyQuestionnaire />
    </div>
  
    );
}

