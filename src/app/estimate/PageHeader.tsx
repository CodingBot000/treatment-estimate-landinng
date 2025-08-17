import React from 'react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import ProgressIndicator from './SkinSurveyFlow/ProgressIndicator';

interface PageHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ currentStep, totalSteps, onBack }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-full relative">
            {onBack && (
              <button 
                onClick={onBack}
                className="absolute left-0 ml-6 w-6 h-6 flex items-center justify-center"
              >
                <Image 
                  src="/estimate/icons/btn_back.svg" 
                  alt="Back" 
                  width={24} 
                  height={24}
                />
              </button>
            )}
              <h1 className="text-xl font-semibold text-gray-900">Treatment Recommendation</h1>
          </div>
          {/* <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {totalSteps}
          </div> */}
        </div>
        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
      </div>
    </div>
  );
};

export default PageHeader;