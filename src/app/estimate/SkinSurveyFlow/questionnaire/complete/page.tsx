'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface CompleteStepProps {
  onNext: () => void;
}

const CompleteStep: React.FC<CompleteStepProps> = ({ onNext }) => {
  const router = useRouter();
  const handleNext = () => {
      router.replace('/'); // 항상 루트("/")로 이동
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-light text-pink-400 mb-8">
          Beauty well
        </h1>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            It's done!
          </h2>
          <p className="text-xl text-gray-900">
            doctor's doing the diagnosis
          </p>
        </div>

        {/* Diagnosis Card */}
        <div className="flex justify-center">
          <Card className="w-40 h-32 bg-pink-50 border-pink-100 flex flex-col items-center justify-center space-y-2">
            <p className="text-pink-300 text-sm font-medium tracking-wider">
              DIAGNOSIS
            </p>
            <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
              <div className="w-6 h-8 bg-pink-300 rounded-t-full"></div>
            </div>
          </Card>
        </div>

        {/* Information Text */}
        <div className="text-center space-y-4">
          <p className="text-gray-900 text-base">
            I will send the results to the contact information you filled out.
          </p>
          <p className="text-gray-500 text-sm">
            It will take about 1 day to send the result.
          </p>
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-8">
        <Button 
          onClick={handleNext}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white rounded-lg h-12 text-base font-medium"
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default CompleteStep;