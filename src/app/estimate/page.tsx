"use client";

import { useState } from 'react';
import BeautyQuestionnaire from "./SkinSurveyFlow/BeautyQuestionnaire";
import DiagnosisResult from "./SkinSurveyFlow/questionnaire/DiagnosisResult";
import { log } from '@/utils/logger';
import DiagnosisRecommend from './SkinSurveyFlow/questionnaire/DiagnosisRecommend';


export default function EstimatePage() {
  const [showDiagnosisResult, setShowDiagnosisResult] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<Record<string, any> | null>(null);

  const handleSubmissionComplete = (formData: Record<string, any>) => {
    log.debug("MATCHING LOG: EstimatePage received form data:", formData);
    setSubmittedFormData(formData);
    setShowDiagnosisResult(true);
  };

  const handleDiagnosisComplete = () => {
    log.debug("MATCHING LOG: Diagnosis completed in EstimatePage");
    setShowDiagnosisResult(false);
    setSubmittedFormData(null);
  };

  if (showDiagnosisResult && submittedFormData) {
    return (
      <div className="min-h-screen">
        <DiagnosisRecommend 
          formData={submittedFormData}
          onComplete={handleDiagnosisComplete}
        />
        {/* <DiagnosisResult 
          formData={submittedFormData}
          onComplete={handleDiagnosisComplete}
        /> */}
      </div>
    );
  }

  return (
    <div>
      <BeautyQuestionnaire onSubmissionComplete={handleSubmissionComplete} />
    </div>
  );
}

