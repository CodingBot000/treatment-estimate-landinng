import React from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { questions } from './questionScript/Script';
import { FaInstagram, FaReddit, FaTiktok, FaYoutube, FaGoogle, FaComments } from 'react-icons/fa';
// import { SiLemon8 } from 'react-icons/si';

interface VisitPathStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const VisitPathStep: React.FC<VisitPathStepProps> = ({ data, onDataChange }) => {
  const handleVisitPathChange = (visitPath: string) => {
    onDataChange({
      ...data,
      visitPath
    });
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

      </div>

    </div>
  );
};

export default VisitPathStep;
