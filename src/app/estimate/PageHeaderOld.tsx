import React from 'react';
import { Sparkles } from 'lucide-react';
import ProgressIndicator from './SkinSurveyFlow/ProgressIndicator';

interface PageHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const PageHeaderOld: React.FC<PageHeaderProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">MimoTok</h1>
              <p className="text-sm text-gray-600">Beauty Assessment</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {totalSteps}
          </div>
        </div>
        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
      </div>
    </div>
  );
};

export default PageHeaderOld;