'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
          <Image
            src="/estimate/diagnosis_goal.svg"
            alt="Diagnosis Goal"
            width={240}
            height={240}
          />
        </div>

        {/* Information Text */}
        <div className="text-center space-y-4">
          <p className="text-gray-900 text-base">
            I will send the results to the contact information you filled out.
          </p>
          <p className="text-gray-500 text-sm">
            We’ll notify you as soon as your diagnostic is ready—usually within 24 hours. If diagnostic requests stack up, it can take up to 3 days.
          </p>

            {/* Highlighted Notice */}
          <div className="mt-6 bg-rose-50 border border-rose-200 rounded-lg px-4 py-3 shadow-sm">
            <p className="text-rose-700 font-semibold text-sm md:text-base">
              Also, our professional skin consultation and recommendation web service will be launching soon within this month, so stay tuned!
            </p>
          </div>
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