"use client";

import { useState } from 'react';
import BeautyQuestionnaire from "./SkinSurveyFlow/BeautyQuestionnaire";
import DiagnosisResult from "./SkinSurveyFlow/questionnaire/DiagnosisResult";


export default function EstimatePage() {
  const [showDiagnosisResult, setShowDiagnosisResult] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<Record<string, any> | null>(null);

  const handleSubmissionComplete = (formData: Record<string, any>) => {
    console.log("MATCHING LOG: EstimatePage received form data:", formData);
    setSubmittedFormData(formData);
    setShowDiagnosisResult(true);
  };

  const handleDiagnosisComplete = () => {
    console.log("MATCHING LOG: Diagnosis completed in EstimatePage");
    setShowDiagnosisResult(false);
    setSubmittedFormData(null);
  };

  if (showDiagnosisResult && submittedFormData) {
    return (
      <div className="min-h-screen">
        <DiagnosisResult 
          formData={submittedFormData}
          onComplete={handleDiagnosisComplete}
        />
      </div>
    );
  }

  return (
    <div>
      <BeautyQuestionnaire onSubmissionComplete={handleSubmissionComplete} />
    </div>
  );
}

