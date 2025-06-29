import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { questions } from './questionScript/Script';
import { FaInstagram, FaReddit, FaTiktok, FaYoutube, FaGoogle, FaComments } from 'react-icons/fa';
// import { SiLemon8 } from 'react-icons/si';

interface VisitPathStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const VisitPathStep: React.FC<VisitPathStepProps> = ({ data, onDataChange }) => {
  const [hasOtherPath, setHasOtherPath] = useState(data.visitPath === 'other');
  const [tempOtherPath, setTempOtherPath] = useState(data.otherPath || '');

  useEffect(() => {
    setHasOtherPath(data.visitPath === 'other');
  }, [data.visitPath]);

  const handleVisitPathChange = (visitPath: string) => {
    const shouldRemoveOtherPath = data.visitPath === 'other' && visitPath !== 'other';
    
    console.log('VisitPathStep - handleVisitPathChange - before update:', { visitPath, data, tempOtherPath });
    
    // other를 선택할 때 이전에 저장된 tempOtherPath를 복원
    if (visitPath === 'other') {
      onDataChange({
        ...data,
        visitPath,
        otherPath: tempOtherPath
      });
    } else {
      onDataChange({
        ...data,
        visitPath,
        ...(shouldRemoveOtherPath && { otherPath: undefined })
      });
    }
  };

  const handleOtherPathChange = (text: string) => {
    // 임시 상태 업데이트
    setTempOtherPath(text);
    
    console.log('VisitPathStep - handleOtherPathChange - before update:', { text, hasOtherPath, data });
    
    // other가 선택되어 있을 때 실제 데이터에 바로 반영
    if (hasOtherPath) {
      onDataChange({
        ...data,
        visitPath: 'other',
        otherPath: text
      });
    }
  };

  // 아이콘 매핑
  const iconMap = {
    instagram: FaInstagram,
    // lemon8: SiLemon8,
    lemon8: FaComments,
    reddit: FaReddit,
    tiktok: FaTiktok,
    youtube: FaYoutube,
    google_search: FaGoogle,
    Chat_Ai: FaComments,
    other: FaComments
  };

  return (
    <div className="space-y-8">
      {/* Budget Range */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
           How did you hear about us? 
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.visitPaths.map((path) => {
            const IconComponent = iconMap[path.id as keyof typeof iconMap];
            
            return (
              <Card
                key={path.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  data.visitPath === path.id
                    ? 'border-rose-400 bg-rose-50 shadow-md'
                    : 'border-gray-200 hover:border-rose-300'
                }`}
                onClick={() => handleVisitPathChange(path.id)}
              >
                <div className="flex items-center space-x-3">
                  {IconComponent && (
                    <div className="flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{path.label}</h3>
                    {path.id === 'Chat_Ai' && (
                      <p className="text-sm text-gray-600">{path.description}</p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Other Visit Path */}
        {hasOtherPath && (
          <div className="mt-6 animate-fadeIn">
            <Label className="text-lg font-medium text-gray-800 mb-4 block">
              Please tell us how you found us:
            </Label>
            <Textarea
              value={tempOtherPath}
              onChange={(e) => handleOtherPathChange(e.target.value)}
              placeholder="Please describe how you heard about us..."
              className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 min-h-[120px]"
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default VisitPathStep;
