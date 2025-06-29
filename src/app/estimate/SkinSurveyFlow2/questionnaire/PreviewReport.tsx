import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { steps } from './questionScript/Script';
import { Button } from '@/components/ui/button';

interface PreviewReportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showSendFormButton: boolean;
  formData: Record<string, any>;
}

const PreviewReport: React.FC<PreviewReportProps> = 
({ open, onOpenChange, formData, showSendFormButton }) => 
  {
  const getStepSummary = (stepId: string, data: any) => {
    if (!data) return 'Not yet entered';

    switch (stepId) {
      case 'skin-concerns':
        return (
          <div className="space-y-2">
            <p><strong>Skin Type:</strong> {data.skinType}</p>
            <p><strong>Skin Concerns:</strong> {data.concerns?.join(', ')}</p>
          </div>
        );

      case 'budget-preferences':
        return (
          <div className="space-y-2">
            <p><strong>Budget Range:</strong> {data.budget}</p>
            <p><strong>Treatment Areas:</strong> {data.treatmentAreas?.join(', ')}</p>
            <p><strong>Priority Order:</strong> {data.priorityOrder?.join(' > ')}</p>
          </div>
        );

      case 'treatment-goals':
        return (
          <div className="space-y-2">
            <p><strong>Treatment Goals:</strong> {data.goals?.join(', ')}</p>
            <p><strong>Preferred Start Time:</strong> {data.timeframe}</p>
            <p><strong>Previous Treatments:</strong> {data.pastTreatments?.join(', ')}</p>
            {data.sideEffects && (
              <div className="mt-2 p-3 bg-rose-50 rounded-md">
                <p><strong>Treatment Side Effects:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{data.sideEffects}</p>
              </div>
            )}
            {data.additionalNotes && (
              <p><strong>Additional Notes:</strong> {data.additionalNotes}</p>
            )}
          </div>
        );

      case 'health-condition':
        return (
          <div className="space-y-2">
            <p><strong>Health Conditions:</strong> {data.healthConditions?.join(', ')}</p>
          </div>
        );

      case 'visitPaths':
        return (
          <div className="space-y-2">
            <p><strong>Referral Source:</strong> {data.visitPath}</p>
          </div>
        );

      case 'basic-info':
        return (
          <div className="space-y-2">
            <p><strong>First Name:</strong> {data.firstName}</p>
            <p><strong>Last Name:</strong> {data.lastName}</p>
            <p><strong>Age Range:</strong> {data.ageRange}</p>
            <p><strong>Gender:</strong> {data.gender}</p>
            <p><strong>Email:</strong> {data.email}</p>
          </div>
        );

      default:
        return 'No data available';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-center mb-4">
            Preview Your Consultation Request
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 p-4">
            {steps.map((step) => (
              <Card key={step.id} className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {step.title}
                </h3>
                <div className="text-gray-600">
                  {getStepSummary(step.id, formData[step.id])}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex justify-end mt-4">
          <Button 
            disabled={!showSendFormButton}
            className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white"
          >
            Send Form
          </Button>
        </div>
        
      </DialogContent>
    </Dialog>
  );
};

export default PreviewReport;
