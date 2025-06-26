import React from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { questions } from './questionScript/Script';

interface HealthConditionStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const HealthConditionStep: React.FC<HealthConditionStepProps> = ({ data, onDataChange }) => {
  const handleHealthConditionToggle = (conditionId: string) => {
    const currentConditions = data.healthConditions || [];
    
    if (conditionId === 'none') {
      // '없음' 선택 시 다른 모든 선택 해제
      onDataChange({
        ...data,
        healthConditions: ['none']
      });
      return;
    }

    // '없음'이 선택되어 있었다면 제거
    const filteredConditions = currentConditions.filter((id: string) => id !== 'none');
    
    // 선택/해제 토글
    const updatedConditions = filteredConditions.includes(conditionId)
      ? filteredConditions.filter((id: string) => id !== conditionId)
      : [...filteredConditions, conditionId];
    
    onDataChange({
      ...data,
      healthConditions: updatedConditions
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          Do you have any of the following medical conditions that we should consider before treatment? (Select all that apply)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {questions.medicalConditions.map((condition) => (
            <Card
              key={condition.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                (data.healthConditions || []).includes(condition.id)
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handleHealthConditionToggle(condition.id)}
            >
              <h3 className="font-medium text-gray-900 mb-1">{condition.label}</h3>
              <p className="text-sm text-gray-600">{condition.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthConditionStep;
