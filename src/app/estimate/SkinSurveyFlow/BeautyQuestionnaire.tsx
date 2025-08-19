import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import PageHeader from '../PageHeader';
import PreviewReport from './questionnaire/PreviewReport';
import { steps } from '../../data/form-definition';

import { 
  USER_INFO,
   BUDGET,
    HEALTH_CONDITIONS,
     PREFERENCES,
     PRIORITYFACTORS,
     SKIN_CONCERNS,
      SKIN_TYPE,
      TREATMENT_EXPERIENCE_BEFORE,
      TREATMENT_GOALS,
       UPLOAD_PHOTO,
        VISIT_PATHS 
      } from '@/constants/steps';

interface PrivateInfo {
  firstName: string;
  lastName: string;
  ageRange: string;
  gender: string;
  email: string;
}

interface SkinConcerns {
  concerns: string[];
  moreConcerns?: string;
}

interface TreatmentAreas {
  treatmentAreas: string[];
  otherAreas?: string;
}

interface PriorityOrder {
  priorityOrder: string[];
  isPriorityConfirmed?: boolean;
}

interface PastTreatments {
  pastTreatments: string[];
  sideEffects?: string;
  additionalNotes?: string;
}

interface VisitPath {
  visitPath: string;
  otherPath?: string;
}

interface UploadImage {
  uploadedImage?: string; // base64 이미지 데이터
  imageFile?: File; // 실제 파일 객체
  imageFileName?: string; // 파일명
}

interface HealthConditions {
  healthConditions: string[];
  otherConditions?: string;
}

interface StepData {
  skinType?: string;
  skinConcerns?: SkinConcerns; 
  privateInfo?: PrivateInfo;

  treatmentAreas?: TreatmentAreas;
  priorityOrder?: PriorityOrder;
  pastTreatments?: PastTreatments;
  budget?: string;
  goals?: string[];
  
  visitPath?: VisitPath;
  uploadImage?: UploadImage;
  healthConditions?: HealthConditions;
 
  timeframe?: string;  
}

// 각 스텝별 필수 선택 항목 검증 함수
const validateStepData = (stepId: string, data: StepData): boolean => {
  console.log('validateStepData validateStepData stepId:', stepId);
  switch (stepId) {
    case SKIN_TYPE:
      return !!(
        data.skinType
      );
    case SKIN_CONCERNS:
      // 피부 타입과 피부 고민 모두 필수 선택
      const skinConcerns = data.skinConcerns;
      return !!(
        // data.skinType && // 피부 타입 선택 필수
        skinConcerns?.concerns && 
        skinConcerns.concerns.length > 0 // 피부 고민 1개 이상 선택 필수
      );
    
    case BUDGET:
      return !!(
        data.budget  // 예산 범위 선택 필수
      );
    case PREFERENCES:
      const treatmentAreas = data.treatmentAreas;
      return !!(
        treatmentAreas?.treatmentAreas && 
        treatmentAreas.treatmentAreas.length > 0  // 관리 부위 1개 이상 선택 필수
      );
    
      case PRIORITYFACTORS:
      
      const priorityOrder = data.priorityOrder;
      return !!(
        priorityOrder?.priorityOrder &&
        priorityOrder.priorityOrder.length > 0 && // 우선순위 확정 필수
        priorityOrder?.isPriorityConfirmed // 우선순위 확정 필수
      );
    

    case TREATMENT_GOALS:
      
      // console.log(`treatment-goals  data.goals:${data.goals}  data.goals.length:${data.goals?.length} data.timeframe:${data.timeframe} pastTreatments:${pastTreatments?.pastTreatments}`);
      return !!(
        data.goals && 
        data.goals.length > 0
      );
    case TREATMENT_EXPERIENCE_BEFORE:
      const pastTreatments = data.pastTreatments;
      // console.log(`treatment-goals  data.goals:${data.goals}  data.goals.length:${data.goals?.length} data.timeframe:${data.timeframe} pastTreatments:${pastTreatments?.pastTreatments}`);
      return !!(
        pastTreatments?.pastTreatments // 이전 치료 경험 선택 필수 (없는 경우도 빈 배열로 저장)
      );
    
    case HEALTH_CONDITIONS:
      return !!(data.healthConditions?.healthConditions && data.healthConditions.healthConditions.length > 0); // 건강 상태 선택 필수
    
    case VISIT_PATHS:
      return !!data.visitPath?.visitPath; // 방문 경로 선택 필수
    
    case USER_INFO:
      // console.log('validateStepData basic-info data', data);
      // console.log('validateStepData basic-info data.privateInfo', data.privateInfo);
      const privateInfo = data.privateInfo;
      if (!privateInfo) return false;
      // console.log('validateStepData basic-info privateInfo.firstName', privateInfo.firstName);
      // console.log('validateStepData basic-info privateInfo.lastName', privateInfo.lastName);
      // console.log('validateStepData basic-info privateInfo.ageRange', privateInfo.ageRange);
      // console.log('validateStepData basic-info privateInfo.gender', privateInfo.gender);
      // console.log('validateStepData basic-info privateInfo.email', privateInfo.email);
      // const testCondition = privateInfo.firstName && privateInfo.lastName && privateInfo.ageRange && privateInfo.gender && privateInfo.email;
      // console.log('validateStepData basic-info testCondition::', !!testCondition);
      return !!(
        privateInfo.firstName && 
        privateInfo.lastName &&
        privateInfo.ageRange &&
        privateInfo.gender &&
        privateInfo.email
      );
    case UPLOAD_PHOTO:
      // 파일이 업로드되었는지 확인
      return !!(
        data.uploadImage?.uploadedImage || data.uploadImage?.imageFile
      );
    default:
      return true;
  }
};

// 각 스텝별 필수 선택 항목 메시지
const getValidationMessage = (stepId: string): string => {
  switch (stepId) {
    case SKIN_TYPE:
      return 'Please select your skin type.';
    case SKIN_CONCERNS:
      return 'Please select skin concerns.';
    case BUDGET:
      return 'Please choose your budget range.';
    case PREFERENCES:
      return 'Please choose your treatment areas.';
    case PRIORITYFACTORS:
      return 'Please set your priorities.';
    case TREATMENT_GOALS:
      return 'Please select your treatment goals.';
    case TREATMENT_EXPERIENCE_BEFORE:
      return 'Please indicate any previous treatment history.';
    case HEALTH_CONDITIONS:
      return 'Please select your current health conditions.';
    case VISIT_PATHS:
      return 'Please select how you found us.';
    case USER_INFO:
      return 'Please fill in your name, age, gender and email address.';
    case UPLOAD_PHOTO:
      return 'Please post a picture to diagnose your skin.';
    default:
      return 'Please complete all required fields.';
  }
};

interface StepComponentProps {
  data: StepData;
  onDataChange: (data: StepData) => void;
}

const BeautyQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, StepData>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isValideSendForm, setIsValideSendForm] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    const currentStepData = formData[steps[currentStep].id] || {};
    
    if (!validateStepData(steps[currentStep].id, currentStepData)) {
      setIsValideSendForm(false);
      toast({
        variant: "destructive",
        title: "Please make a required selection",
        description: getValidationMessage(steps[currentStep].id),
      
      }); 
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // 스크롤을 즉시 최상단으로 이동
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // 스크롤을 즉시 최상단으로 이동
      window.scrollTo(0, 0);
    }
  };

  const handleStepData = (stepId: string, data: StepData) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: data
    }));
  };

  const handleSubmit = () => {
    const currentStepData = formData[steps[currentStep].id] || {};
    console.log('currentStepData', currentStepData);
    if (!validateStepData(steps[currentStep].id, currentStepData)) {
      setIsValideSendForm(false);
      // console.log('validateStepData currentStepData::', currentStepData);
      // console.log('validateStepData currentStep::', currentStep);
      // console.log('validateStepData steps[currentStep].id::', steps[currentStep].id);
      // console.log('validateStepData launch toast message: ', getValidationMessage(steps[currentStep].id));
      toast({
        variant: "destructive",
        title: "Please make a required selection",
        description: getValidationMessage(steps[currentStep].id),
      });
      return;
    }

    setIsPreviewOpen(true);
    setIsValideSendForm(true);
  
    // console.log('Questionnaire completed:', formData);
  };

  const CurrentStepComponent = steps[currentStep].component as React.ComponentType<StepComponentProps>;

  return (
    // <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <div className="min-h-screen">
      {/* Header */}
      <PageHeader 
        currentStep={currentStep} 
        totalSteps={steps.length} 
        onBack={currentStep > 0 ? handlePrevious : undefined}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
        <div className="mb-8 animate-fade-in">
          {currentStep + 1 > steps.length -1 ? (
          <h2 
            className="mb-3"
            style={{
              fontFamily: 'Pretendard Variable',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '100%',
              color: '#111827'
            }}
          >
            {currentStep + 1} / {steps.length - 1 }
          </h2>
        ) : (
         <h2 
            className="mb-3"
            style={{
              fontFamily: 'Pretendard Variable',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '140%',
              color: '#111827'
            }}
          >
            Completetion
          </h2>
         )}
          
          <h2 
            className="mb-3"
            style={{
              fontFamily: 'Pretendard Variable',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '140%',
              color: '#111827'
            }}
          >
            {steps[currentStep].title}
          </h2>
          <p 
            className="max-w-2xl"
            style={{
              fontFamily: 'Pretendard Variable',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '140%',
              color: '#888B93'
            }}
          >
            {steps[currentStep].subtitle}
          </p>
        </div>

        {/* <Card className="bg-white/70 backdrop-blur-sm border-rose-100 shadow-xl shadow-rose-100/20 animate-scale-in"> */}
        {/* <Card className="bg-white backdrop-blur-sm shadow-xl animate-scale-in"> */}
          {/* <div className="p-6 md:p-8"> */}
          <div>
            <CurrentStepComponent
              data={formData[steps[currentStep].id] || {}}
              onDataChange={(data: StepData) => handleStepData(steps[currentStep].id, data)}
            />
          </div>
        {/* </Card> */}
      </div>

      {/* Navigation - Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md  shadow-lg">
        <div className="max-w-[768px] mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center gap-3">
            {currentStep === 0 ? (
              <Button onClick={handleNext} 
                className="w-full h-12 px-4 rounded-lg text-white flex items-center justify-center"
                style={{ backgroundColor: '#FB718F' }}
              >
                Next
              </Button>
            ) : currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} 
                className="w-full h-12 px-4 rounded-lg text-white flex items-center justify-center"
                style={{ backgroundColor: '#FB718F' }}
              >
                Submit
              </Button>
            ) : (
              <>
                <Button
                  onClick={handlePrevious}
                  className="w-25 h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-500 flex items-center justify-center"
                  style={{ 
                    borderColor: '#E4E5E7',
                    color: '#777777',
                    fontFamily: 'Pretendard Variable',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '140%'
                  }}
                >
                  Previous
                </Button>
                <Button onClick={handleNext} 
                  className="flex-1 h-12 px-4 rounded-lg text-white flex items-center justify-center"
                  style={{ backgroundColor: '#FB718F' }}
                >
                  Next
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Preview Floating Button */}
      <Button
        onClick={() => setIsPreviewOpen(true)}
        className="fixed right-8 top-1/2 -translate-y-1/2 bg-white hover:bg-rose-50 text-rose-500 border-rose-200 shadow-lg rounded-full p-4 z-50"
      >
        <FileText className="w-6 h-6" />
      </Button>

      {/* Preview Dialog */}
      <PreviewReport
        open={isPreviewOpen}
        showSendFormButton={isValideSendForm}
        onOpenChange={setIsPreviewOpen}
        formData={formData}
      />

      {/* Decorative Elements */}
      {/* <div className="fixed top-20 right-10 opacity-20 pointer-events-none">
        <Star className="w-8 h-8 text-rose-300 animate-pulse" />
      </div>
      <div className="fixed bottom-20 left-10 opacity-20 pointer-events-none">
        <Heart className="w-6 h-6 text-pink-300 animate-pulse" />
      </div> */}
    </div>
  );
};

export default BeautyQuestionnaire;
