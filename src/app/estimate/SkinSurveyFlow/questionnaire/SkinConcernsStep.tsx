import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { questions } from '../../../data/form-definition';
import { Textarea } from '@/components/ui/textarea';
import CardBasic from '@/components/card/CardBasic';
import { ChoiceCard } from '@/components/card/ChoiceCard';

interface SkinConcernsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const SkinConcernsStep: React.FC<SkinConcernsStepProps> = ({ data, onDataChange }) => {
  const skinConcerns = data.skinConcerns || { concerns: [] };
  const [hasOtherConcern, setHasOtherConcern] = useState(
    Array.isArray(skinConcerns.concerns) && skinConcerns.concerns.includes('other')
  );
  // 임시로 other 텍스트를 저장하는 상태
  const [tempMoreConcerns, setTempMoreConcerns] = useState(skinConcerns.moreConcerns || '');

  useEffect(() => {
    setHasOtherConcern(Array.isArray(skinConcerns.concerns) && skinConcerns.concerns.includes('other'));
  }, [skinConcerns.concerns]);

  const handleSkinTypeChange = (typeId: string) => {
    onDataChange({
      ...data,
      skinType: typeId
    });
  };

  const handleConcernToggle = (concernId: string) => {
    const currentConcerns = skinConcerns.concerns || [];
    const updatedConcerns = currentConcerns.includes(concernId)
      ? currentConcerns.filter((id: string) => id !== concernId)
      : [...currentConcerns, concernId];
    
    // other가 해제되면 moreConcerns는 임시저장소에 보관하고 데이터에서만 제거
    const shouldRemoveMoreConcerns = concernId === 'other' && 
      currentConcerns.includes('other') && 
      !updatedConcerns.includes('other');

    onDataChange({
      ...data,
      skinConcerns: {
        ...skinConcerns,
        concerns: updatedConcerns,
        ...(shouldRemoveMoreConcerns ? {} : { moreConcerns: skinConcerns.moreConcerns })
      }
    });
  };

  const handleMoreConcernsChange = (text: string) => {
    // 임시 상태 업데이트
    setTempMoreConcerns(text);
    
    // other가 선택되어 있을 때만 실제 데이터에 반영
    if (hasOtherConcern) {
      onDataChange({
        ...data,
        skinConcerns: {
          ...skinConcerns,
          moreConcerns: text
        }
      });
    }
  };


  return (
    <div className="space-y-8">
      {/* Skin Type Selection */}
     {/* <div>
      <Label className="text-lg font-medium text-gray-800 mb-4 block">
        What's your skin type?
      </Label>

      <div role="radiogroup" aria-label="Skin type" className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.skinTypes.map((type) => {
          const isSelected = data.skinType === type.id;

          return (
            <ChoiceCard
              key={type.id}
              mode="single"
              title={type.label}
              subtitle={type.description}
              selected={isSelected}
              onSelect={() => handleSkinTypeChange(type.id)}
              showIndicator={false} // 싱글은 점 숨김 (디자인 가이드)
              className={
                isSelected
                  ? 'p-4 border-rose-400 bg-rose-50 shadow-md'
                  : 'p-4 border-gray-200 hover:border-rose-300 hover:shadow-md'
              }
            />
          );
        })}
      </div>
    </div> */}

      {/* Skin Concerns */}
      {/* <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          What are your main skin concerns? (Select all that apply)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.skinConcerns.map((concern) => (
            <Card
              key={concern.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                (skinConcerns.concerns || []).includes(concern.id)
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handleConcernToggle(concern.id)}
            >
              <h3 className="font-medium text-gray-900">{concern.label}</h3>
            </Card>
          ))}
        </div>
      </div> */}

      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          What are your main skin concerns? (Select all that apply)
        </Label>

        <div role="group" aria-label="Skin concerns" className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.skinConcerns.map((concern) => {
            const isSelected = (skinConcerns.concerns ?? []).includes(concern.id);
            return (
              <ChoiceCard
                key={concern.id}
                mode="multi"
                title={concern.label}
                selected={isSelected}
                onSelect={() => handleConcernToggle(concern.id)}
                className={
                  isSelected
                    ? 'border-rose-400 bg-rose-50 shadow-md ring-0' // 선택 시 스타일
                    : 'border-gray-200 hover:border-rose-300'       // 미선택 스타일
                }
              />
            );
          })}
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
