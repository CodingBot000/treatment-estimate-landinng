"use client";

// import Step1Component from "@/components/Step1";

// export default function Step1Page() {
//   return <Step1Component />;
// }


import { useState } from "react";
import { useRouter } from "next/navigation";
import { bodyPartOptions, conditionOptions } from "@/data/formData";
import { useForm } from "@/contexts/FormContext";
import SectionTitle from "@/components/SectionTitle";
import IconGrid from "@/components/IconGrid";
import SelectionGroup from "@/components/SelectionGroup";
import CommonButton from "@/components/CommonButton";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import Step1Page from "./step1-page";
import Step2Page from "./step2-page";
import SkinForm from "./skin-form";
import SkinSurveyForm from "./SkinSurveyForm";
import QuoteExploreSection from "../hookingpage/QuoteExploreSection";
import EstimateStepPage from "./EstimateStepPage";



export default function EstimatePage() {
  const [activeComponent, setActiveComponent] = useState<"skin" | "survey" | "quote">("skin");
  
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
      <div className="flex gap-2 mb-4">
        <button onClick={() => setActiveComponent("skin")} className={buttonStyle("skin")}>
          SkinForm
        </button>
        <button onClick={() => setActiveComponent("survey")} className={buttonStyle("survey")}>
          SkinSurveyForm
        </button>
        <button onClick={() => setActiveComponent("quote")} className={buttonStyle("quote")}>
          QuoteExploreSection
        </button>
      </div>

      {/* 선택된 컴포넌트 렌더링 */}
      <div>
        {activeComponent === "skin" && <SkinForm />}
        {activeComponent === "survey" && <SkinSurveyForm />}
        {activeComponent === "quote" && <EstimateStepPage />}
      </div>
    </div>
  
    );
}

