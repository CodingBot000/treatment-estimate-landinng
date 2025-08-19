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
