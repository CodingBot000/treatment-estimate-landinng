
import React from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { questions } from './questionScript/Script';

interface SkinConcernsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}


const SkinConcernsStep: React.FC<SkinConcernsStepProps> = ({ data, onDataChange }) => {
  const handleSkinTypeChange = (skinType: string) => {
    onDataChange({
      ...data,
      skinType
    });
  };

  const handleConcernToggle = (concernId: string) => {
    const currentConcerns = data.concerns || [];
    const updatedConcerns = currentConcerns.includes(concernId)
      ? currentConcerns.filter((id: string) => id !== concernId)
      : [...currentConcerns, concernId];
    
    onDataChange({
      ...data,
      concerns: updatedConcerns
    });
  };

  return (
    <div className="space-y-8">
      {/* Skin Type Selection */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          What's your skin type?
          </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {questions.skinTypes.map((type) => (
            <Card
              key={type.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                data.skinType === type.id
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handleSkinTypeChange(type.id)}
            >
              <h3 className="font-medium text-gray-900 mb-1">{type.label}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Skin Concerns Selection */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          What are your main skin concerns? (Select all that apply)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.skinConcerns.map((concern) => (
            <Card
              key={concern.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                (data.concerns || []).includes(concern.id)
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handleConcernToggle(concern.id)}
            >
              <div className="flex items-center space-x-3">
                {/* <span className="text-2xl">{concern.emoji}</span> */}
                <span className="font-medium text-gray-900">{concern.label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinConcernsStep;
