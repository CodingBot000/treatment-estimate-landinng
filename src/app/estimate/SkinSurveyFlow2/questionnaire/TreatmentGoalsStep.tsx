import React from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { questions } from './questionScript/Script';

interface TreatmentGoalsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const TreatmentGoalsStep: React.FC<TreatmentGoalsStepProps> = ({ data, onDataChange }) => {
  const handleGoalChange = (goalId: string) => {
    const currentGoals = data.goals || [];
    const updatedGoals = currentGoals.includes(goalId)
      ? currentGoals.filter((id: string) => id !== goalId)
      : [...currentGoals, goalId];
    
    onDataChange({
      ...data,
      goals: updatedGoals
    });
  };

  const handleTimeframeChange = (timeframe: string) => {
    onDataChange({
      ...data,
      timeframe
    });
  };

  const handlePastTreatmentToggle = (treatmentId: string) => {
    const currentTreatments = data.pastTreatments || [];
    
    if (treatmentId === 'none') {
      onDataChange({
        ...data,
        pastTreatments: ['none']
      });
      return;
    }

    const filteredTreatments = currentTreatments.filter((id: string) => id !== 'none');
    const updatedTreatments = filteredTreatments.includes(treatmentId)
      ? filteredTreatments.filter((id: string) => id !== treatmentId)
      : [...filteredTreatments, treatmentId];
    
    onDataChange({
      ...data,
      pastTreatments: updatedTreatments
    });
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
          What's your main treatment goal? (Select all that apply)
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
              onClick={() => handleGoalChange(goal.id)}
            >
              <div className="flex items-start space-x-3">
                {/* <span className="text-2xl">{goal.emoji}</span> */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{goal.label}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeframe */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          When would you like to start treatment?
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.timeframes.map((timeframe) => (
            <Card
              key={timeframe.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                data.timeframe === timeframe.id
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handleTimeframeChange(timeframe.id)}
            >
              <h3 className="font-medium text-gray-900 mb-1">{timeframe.label}</h3>
              <p className="text-sm text-gray-600">{timeframe.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Treatments */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-4 block">
          Have you had any of these treatments before? (Select all that apply)
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {questions.pastTreatments.map((treatment) => (
            <Card
              key={treatment.id}
              className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md text-center ${
                (data.pastTreatments || []).includes(treatment.id)
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => handlePastTreatmentToggle(treatment.id)}
            >
              <span className="font-medium text-gray-900 text-sm">{treatment.label}</span>
            </Card>
          ))}
        </div>
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
