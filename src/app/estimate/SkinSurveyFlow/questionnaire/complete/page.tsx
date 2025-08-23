'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { recommendTreatments, RecommendationOutput } from '../questionScript/matchingDiagnosis';
import { log } from '@/utils/logger';

interface CompleteStepProps {
  onNext: () => void;
}

const CompleteStep: React.FC<CompleteStepProps> = ({ onNext }) => {
  const router = useRouter();
  const [recommendationResult, setRecommendationResult] = useState<RecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleNext = () => {
      router.replace('/'); // 항상 루트("/")로 이동
  };

  useEffect(() => {
    log.debug("MATCHING LOG: Complete 페이지 useEffect 시작");
    // Get form data from localStorage
    const savedFormData = localStorage.getItem('skinSurveyFormData');
    log.debug("MATCHING LOG: localStorage에서 가져온 데이터:", savedFormData);
    
    if (savedFormData) {
      try {
        const formData = JSON.parse(savedFormData);
        log.debug("MATCHING LOG: 파싱된 formData:", formData);
        
        // Map formData to recommendation algorithm parameters
        const skinConcerns = formData.skinConcerns?.concerns?.map((concern: string) => ({ id: concern })) || [];
        
        // Add subOptions for concerns that have them
        if (formData.skinConcerns?.moreConcerns) {
          skinConcerns.push({ id: "other", subOptions: [formData.skinConcerns.moreConcerns] });
        }

        const treatmentAreas = formData.treatmentAreas?.treatmentAreas || [];
        if (formData.treatmentAreas?.otherAreas) {
          treatmentAreas.push(formData.treatmentAreas.otherAreas);
        }

        // Map age range to age group
        const ageRangeMap: Record<string, any> = {
          "10s": "teens",
          "20s": "20s",
          "30s": "30s", 
          "40s": "40s",
          "50s": "50s",
          "60s": "60s",
          "70s": "70_plus"
        };

        const algorithmInput = {
          skinTypeId: formData.skinType || "combination",
          ageGroup: ageRangeMap[formData.userInfo?.ageRange] || undefined,
          gender: formData.userInfo?.gender || undefined,
          skinConcerns: skinConcerns,
          treatmentGoals: formData.goals || [],
          treatmentAreas: treatmentAreas,
          budgetRangeId: formData.budget || "1000-5000", 
          priorityId: formData.priorityOrder?.priorityOrder?.[0] || "effectiveness",
          pastTreatments: formData.pastTreatments?.pastTreatments || ["none"],
          medicalConditions: formData.healthConditions?.healthConditions || ["none"],
        };
        log.debug("MATCHING LOG: 알고리즘에 전달할 입력:", algorithmInput);
        log.debug("MATCHING LOG: recommendTreatments 함수 호출 직전");
        
        const result = recommendTreatments(algorithmInput);
        
        log.debug("MATCHING LOG: recommendTreatments 함수 호출 완료");
        log.debug("MATCHING LOG: 알고리즘 결과:", result);
        
        setRecommendationResult(result);
      } catch (error) {
        console.error('MATCHING LOG: 알고리즘 실행 중 에러:', error);
        console.error('MATCHING LOG: 에러 상세:', error);
      }
    } else {
      log.debug("MATCHING LOG: localStorage에 저장된 formData가 없음");
    }
    log.debug("MATCHING LOG: 로딩 완료 설정");
    setIsLoading(false);
  }, []);

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
        {/* Diagnosis algorithm result */ }


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

        {/* Diagnosis algorithm result */}
        {isLoading ? (
          <div className="text-center">
            <p className="text-gray-500">Analyzing your responses...</p>
          </div>
        ) : recommendationResult ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Your Personalized Treatment Recommendations
              </h3>
            </div>
            
            {/* Recommended Treatments */}
            {recommendationResult.recommendations.length > 0 && (
              <Card className="p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">💊 Recommended Treatments</h4>
                <div className="space-y-3">
                  {recommendationResult.recommendations.map((treatment, index) => (
                    <div key={treatment.key} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 capitalize">{treatment.label}</h5>
                        <p className="text-sm text-gray-600">{treatment.rationale.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${treatment.priceUSD}</p>
                        <p className="text-xs text-gray-500">₩{treatment.priceKRW.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Cost:</span>
                    <div className="text-right">
                      <p className="text-xl font-bold text-pink-600">${recommendationResult.totalPriceUSD}</p>
                      <p className="text-sm text-gray-500">₩{recommendationResult.totalPriceKRW.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Excluded Treatments */}
            {recommendationResult.excluded.length > 0 && (
              <Card className="p-6 bg-gray-50">
                <h4 className="text-lg font-medium text-gray-700 mb-4">❌ Excluded Treatments</h4>
                <div className="space-y-2">
                  {recommendationResult.excluded.map((excluded, index) => (
                    <div key={excluded.key} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 capitalize">{excluded.label}</span>
                      <span className="text-sm text-gray-600">{excluded.reason}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Treatment Substitutions */}
            {recommendationResult.substitutions.length > 0 && (
              <Card className="p-6 bg-blue-50">
                <h4 className="text-lg font-medium text-blue-700 mb-4">🔄 Treatment Substitutions</h4>
                <div className="space-y-2">
                  {recommendationResult.substitutions.map((sub, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium capitalize">{sub.from}</span>
                      <span className="text-gray-600"> → </span>
                      <span className="font-medium capitalize">{sub.to}</span>
                      <span className="text-gray-600"> ({sub.reason})</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Important Notes */}
            {recommendationResult.notes.length > 0 && (
              <Card className="p-6 bg-yellow-50 border-yellow-200">
                <h4 className="text-lg font-medium text-yellow-700 mb-4">📝 Important Notes</h4>
                <div className="space-y-2">
                  {recommendationResult.notes.map((note, index) => (
                    <p key={index} className="text-sm text-yellow-700">
                      • {note}
                    </p>
                  ))}
                </div>
              </Card>
            )}

            {/* Upgrade Suggestions */}
            {recommendationResult.upgradeSuggestions.length > 0 && (
              <Card className="p-6 bg-green-50 border-green-200">
                <h4 className="text-lg font-medium text-green-700 mb-4">💡 Upgrade Suggestions</h4>
                <div className="space-y-2">
                  {recommendationResult.upgradeSuggestions.map((suggestion, index) => (
                    <p key={index} className="text-sm text-green-700">
                      • {suggestion}
                    </p>
                  ))}
                </div>
              </Card>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500">No form data found for recommendations.</p>
          </div>
        )}
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