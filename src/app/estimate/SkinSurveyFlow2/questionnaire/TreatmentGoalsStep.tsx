import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { questions } from './questionScript/Script';

interface TreatmentGoalsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const TreatmentGoalsStep: React.FC<TreatmentGoalsStepProps> = ({ data, onDataChange }) => {
  // 임시로 부작용 텍스트를 저장하는 상태
  const [tempSideEffects, setTempSideEffects] = useState(data.sideEffects || '');
  const [hasPastTreatments, setHasPastTreatments] = useState(
    Array.isArray(data.pastTreatments) && data.pastTreatments.length > 0
  );

  useEffect(() => {
    setHasPastTreatments(Array.isArray(data.pastTreatments) && data.pastTreatments.length > 0);
  }, [data.pastTreatments]);

  const handleGoalToggle = (goalId: string) => {
    const currentGoals = data.goals || [];
    const updatedGoals = currentGoals.includes(goalId)
      ? currentGoals.filter((id: string) => id !== goalId)
      : [...currentGoals, goalId];
    
    onDataChange({
      ...data,
      goals: updatedGoals
    });
  };

  // const handleTimeframeChange = (timeframe: string) => {
  //   onDataChange({
  //     ...data,
  //     timeframe
  //   });
  // };

  const handlePastTreatmentToggle = (treatmentId: string) => {
    const currentTreatments = data.pastTreatments || [];
    const updatedTreatments = currentTreatments.includes(treatmentId)
      ? currentTreatments.filter((id: string) => id !== treatmentId)
      : [...currentTreatments, treatmentId];
    
    // 시술 선택이 변경될 때마다 데이터 업데이트
    const hasSelectedTreatments = updatedTreatments.length > 0;
    
    onDataChange({
      ...data,
      pastTreatments: updatedTreatments,
      // 시술이 선택되어 있고 임시 텍스트가 있을 때만 sideEffects 포함
      sideEffects: hasSelectedTreatments ? tempSideEffects : undefined
    });
  };

  const handleSideEffectsChange = (text: string) => {
    // 임시 상태 업데이트
    setTempSideEffects(text);
    
    // 시술이 선택되어 있을 때만 실제 데이터에 반영
    if (hasPastTreatments) {
      onDataChange({
        ...data,
        sideEffects: text
      });
    }
  };

  const handleNotesChange = (notes: string) => {
    onDataChange({
      ...data,
      additionalNotes: notes
    });
  };

  return (
    <div className="space-y-8">
      {/* Treatment Goals */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          What are your treatment goals? (Select all that apply)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.treatmentGoals.map((goal) => (
            <Card
              key={goal.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                (data.goals || []).includes(goal.id)
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handleGoalToggle(goal.id)}
            >
              <h3 className="font-medium text-gray-900">{goal.label}</h3>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeframe */}
      {/* <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          When would you like to start treatment?
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {questions.timeframes.map((timeframe) => (
            <Card
              key={timeframe.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md text-center ${
                data.timeframe === timeframe.id
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handleTimeframeChange(timeframe.id)}
            >
              <span className="font-medium text-gray-900">{timeframe.label}</span>
            </Card>
          ))}
        </div>
      </div> */}

      {/* Past Treatments */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          Have you had any of these treatments before? (Select all that apply)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.pastTreatments.map((treatment) => (
            <Card
              key={treatment.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                (data.pastTreatments || []).includes(treatment.id)
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handlePastTreatmentToggle(treatment.id)}
            >
              <div className="text-center">
                <span className="font-medium text-gray-900">{treatment.label}</span>
                {treatment.description && (
                  <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Side Effects Description */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          If you have experienced any side effects after the selected procedure(s), please describe them below. (Optional)
        </Label>
        <Textarea
          value={tempSideEffects}
          onChange={(e) => handleSideEffectsChange(e.target.value)}
          placeholder="Share any specific concerns, expectations, or questions you have about treatment..."
          className={`border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 min-h-[120px] ${
            !hasPastTreatments ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!hasPastTreatments}
        />
      </div>

      {/* Additional Notes */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          Anything else you'd like us to know? (Optional)
        </Label>
        <Textarea
          value={data.additionalNotes || ''}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Share any specific concerns, expectations, or questions you have about treatment..."
          className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default TreatmentGoalsStep;
