import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Heart, Star, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import ProgressIndicator from './ProgressIndicator';
import PreviewReport from './questionnaire/PreviewReport';
import { steps } from './questionnaire/questionScript/Script';

interface StepData {
  concerns?: string[];
  budget?: string;
  treatmentAreas?: string[];
  priority?: string[];
  priorityOrder?: string[];
  goals?: string[];
  skinType?: string;
  visitPath?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  [key: string]: string | string[] | undefined; // 더 구체적인 인덱스 시그니처
}

// 각 스텝별 필수 선택 항목 검증 함수
const validateStepData = (stepId: string, data: StepData): boolean => {
  switch (stepId) {
    case 'skin-concerns':
      // 피부 타입과 피부 고민 모두 필수 선택
      return !!(
        data.skinType && // 피부 타입 선택 필수
        data.concerns && 
        data.concerns.length > 0 // 피부 고민 1개 이상 선택 필수
      );
    
    case 'budget-preferences':
      return !!(
        data.budget && // 예산 범위 선택 필수
        data.treatmentAreas && 
        data.treatmentAreas.length > 0 && // 관리 부위 1개 이상 선택 필수
        data.isPriorityConfirmed // 우선순위 확정 필수
      );
    
    case 'treatment-goals':
      console.log(`treatment-goals  data.goals:${data.goals}  data.goals.length:${data.goals?.length} data.timeframe:${data.timeframe} data.pastTreatments:${data.pastTreatments}`);
      return !!(
        data.goals && 
        data.goals.length > 0 && // 치료 목표 1개 이상 선택 필수
        data.timeframe && // 치료 시작 시기 선택 필수
        data.pastTreatments // 이전 치료 경험 선택 필수 (없는 경우도 빈 배열로 저장)
      );
    
    case 'health-condition':
      return !!(data.healthConditions && data.healthConditions.length > 0); // 건강 상태 선택 필수
    
    case 'visitPaths':
      return !!data.visitPath; // 방문 경로 선택 필수
    
    case 'basic-info':
      return !!(
        data.name && // 이름 필수
        data.phoneNumber && // 전화번호 필수
        data.email // 이메일 필수
      );
    
    default:
      return true;
  }
};

// 각 스텝별 필수 선택 항목 메시지
const getValidationMessage = (stepId: string): string => {
  switch (stepId) {
    case 'skin-concerns':
      return 'Please select both your skin type and skin concerns.';
    case 'budget-preferences':
      return 'Please choose your budget range, treatment areas, and set your priorities.';
    case 'treatment-goals':
      return 'Please select your treatment goals, preferred start time, and indicate any previous treatment history.';
    case 'health-condition':
      return 'Please select your current health conditions.';
    case 'visitPaths':
      return 'Please select how you found us.';
    case 'basic-info':
      return 'Please fill in your name, phone number, and email address.';
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
  const { toast } = useToast();

  const handleNext = () => {
    const currentStepData = formData[steps[currentStep].id] || {};
    
    if (!validateStepData(steps[currentStep].id, currentStepData)) {
      toast({
        variant: "destructive",
        title: "Please make a required selection",
        description: getValidationMessage(steps[currentStep].id),
        duration: 1500,
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
    
    if (!validateStepData(steps[currentStep].id, currentStepData)) {
      toast({
        variant: "destructive",
        title: "Please make a required selection",
        description: getValidationMessage(steps[currentStep].id),
        duration: 1500,
      });
      return;
    }

    // TODO: API 호출 구현
    console.log('Questionnaire completed:', formData);
  };

  const CurrentStepComponent = steps[currentStep].component as React.ComponentType<StepComponentProps>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">BeautyLink</h1>
                <p className="text-sm text-gray-600">Beauty Assessment</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={steps.length} 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
        <div className="mb-8 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
            {steps[currentStep].title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {steps[currentStep].subtitle}
          </p>
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-rose-100 shadow-xl shadow-rose-100/20 animate-scale-in">
          <div className="p-6 md:p-8">
            <CurrentStepComponent
              data={formData[steps[currentStep].id] || {}}
              onDataChange={(data: StepData) => handleStepData(steps[currentStep].id, data)}
            />
          </div>
        </Card>
      </div>

      {/* Navigation - Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-rose-100 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} 
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-8 py-3 rounded-full shadow-lg shadow-rose-200/50 flex items-center space-x-2"
            
              >
                <Star className="w-4 h-4 mr-2" />
                Complete
              </Button>
            ) : (
              <Button onClick={handleNext} 
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-8 py-3 rounded-full shadow-lg shadow-rose-200/50 flex items-center space-x-2"

              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
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
        onOpenChange={setIsPreviewOpen}
        formData={formData}
      />

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 opacity-20 pointer-events-none">
        <Star className="w-8 h-8 text-rose-300 animate-pulse" />
      </div>
      <div className="fixed bottom-20 left-10 opacity-20 pointer-events-none">
        <Heart className="w-6 h-6 text-pink-300 animate-pulse" />
      </div>
    </div>
  );
};

export default BeautyQuestionnaire;
