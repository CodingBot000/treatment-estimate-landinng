import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { questions } from './questionScript/Script';

interface SkinConcernsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const SkinConcernsStep: React.FC<SkinConcernsStepProps> = ({ data, onDataChange }) => {
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {questions.skinTypes.map((type) => (
            <Card
              key={type.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                data.skinType === type.id
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => onDataChange({ ...data, skinType: type.id })}
            >
              <div className="text-center">
                <span className="font-medium text-gray-900">{type.label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Skin Concerns Selection */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          What are your main skin concerns? (Select all that apply)
        </Label>
        <div className="grid grid-cols-1 gap-6">
          {questions.skinConcerns.map((concern) => (
            <div key={concern.id} className="space-y-3">
              {concern.subOptions && concern.subOptions.length > 0 ? (
                <>
                  {/* Parent concern as title */}
                  <h3 className="text-md font-semibold text-gray-700 pl-1">
                    {concern.label}
                  </h3>
                  {/* Sub-options as selectable cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
                    {concern.subOptions.map((subOption) => (
                      <Card
                        key={subOption.id}
                        className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                          isSubOptionSelected(concern.id, subOption.id)
                            ? 'border-rose-400 bg-rose-50 shadow-sm'
                            : 'border-gray-200 hover:border-rose-300'
                        }`}
                        onClick={() => handleSubOptionToggle(concern.id, subOption.id)}
                      >
                        <span className="text-sm font-medium text-gray-900">
                          {subOption.label}
                        </span>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                // Regular concern card without sub-options
                <Card
                  className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    (data.concerns || []).includes(concern.id)
                      ? 'border-rose-400 bg-rose-50 shadow-md'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                  onClick={() => handleConcernToggle(concern.id)}
                >
                  <span className="font-medium text-gray-900">{concern.label}</span>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinConcernsStep;
