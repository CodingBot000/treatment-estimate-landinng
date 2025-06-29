import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { questions } from './questionScript/Script';
import { Textarea } from '@/components/ui/textarea';

interface SkinConcernsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const SkinConcernsStep: React.FC<SkinConcernsStepProps> = ({ data, onDataChange }) => {
  const [hasOtherConcern, setHasOtherConcern] = useState(
    Array.isArray(data.concerns) && data.concerns.includes('other')
  );
  // 임시로 other 텍스트를 저장하는 상태
  const [tempMoreConcerns, setTempMoreConcerns] = useState(data.moreConcerns || '');

  useEffect(() => {
    setHasOtherConcern(Array.isArray(data.concerns) && data.concerns.includes('other'));
  }, [data.concerns]);

  const handleSkinTypeChange = (typeId: string) => {
    onDataChange({
      ...data,
      skinType: typeId
    });
  };

  const handleConcernToggle = (concernId: string) => {
    const currentConcerns = data.concerns || [];
    const updatedConcerns = currentConcerns.includes(concernId)
      ? currentConcerns.filter((id: string) => id !== concernId)
      : [...currentConcerns, concernId];
    
    // other가 해제되면 moreConcerns는 임시저장소에 보관하고 데이터에서만 제거
    const shouldRemoveMoreConcerns = concernId === 'other' && 
      currentConcerns.includes('other') && 
      !updatedConcerns.includes('other');

    onDataChange({
      ...data,
      concerns: updatedConcerns,
      ...(shouldRemoveMoreConcerns && { moreConcerns: undefined })
    });
  };

  const handleMoreConcernsChange = (text: string) => {
    // 임시 상태 업데이트
    setTempMoreConcerns(text);
    
    // other가 선택되어 있을 때만 실제 데이터에 반영
    if (hasOtherConcern) {
      onDataChange({
        ...data,
        moreConcerns: text
      });
    }
  };

  const handleSubOptionToggle = (parentId: string, subOptionId: string) => {
    const combinedId = `${parentId}_${subOptionId}`;
    const currentConcerns = data.concerns || [];
    const updatedConcerns = currentConcerns.includes(combinedId)
      ? currentConcerns.filter((id: string) => id !== combinedId)
      : [...currentConcerns, combinedId];
    
    onDataChange({
      ...data,
      concerns: updatedConcerns
    });
  };

  const isSubOptionSelected = (parentId: string, subOptionId: string) => {
    const currentConcerns = data.concerns || [];
    return currentConcerns.includes(`${parentId}_${subOptionId}`);
  };

  return (
    <div className="space-y-8">
      {/* Skin Type Selection */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          What's your skin type?
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

      {/* Skin Concerns */}
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
              <h3 className="font-medium text-gray-900">{concern.label}</h3>
            </Card>
          ))}
        </div>
      </div>

      {/* Skin Concerns Others */}
      {hasOtherConcern && (
        <div className="animate-fadeIn">
          <Label className="text-lg font-medium text-gray-800 mb-4 block">
            If you have any other concerns not included in the options, please write them freely below.
          </Label>
          <Textarea
            value={tempMoreConcerns}
            onChange={(e) => handleMoreConcernsChange(e.target.value)}
            placeholder="Describe any other concerns here..."
            className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 min-h-[120px]"
          />
        </div>
      )}
    </div>
  );
};

export default SkinConcernsStep;
