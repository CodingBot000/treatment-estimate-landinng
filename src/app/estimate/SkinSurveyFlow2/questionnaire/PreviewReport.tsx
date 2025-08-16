import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { steps } from './questionScript/Script';
import { Button } from '@/components/ui/button';
import { BASIC_INFO, BUDGET_PREFERENCES, HEALTH_CONDITIONS, SKIN_CONCERNS, TREATMENT_GOALS, UPLOAD_PHOTO, VISIT_PATHS } from '@/constants/steps';

interface PreviewReportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showSendFormButton: boolean;
  formData: Record<string, any>;
}

const PreviewReport: React.FC<PreviewReportProps> = 
({ open, onOpenChange, formData, showSendFormButton }) => 
  {

  const handleSubmit = () => {
    console.log('formData: ', formData);
  }

  const getStepSummary = (stepId: string, data: any) => {
    if (!data) return 'Not yet entered';

    switch (stepId) {
      case SKIN_CONCERNS:
        return (
          <div className="space-y-2">
            <p><strong>Skin Type:</strong> {data.skinType}</p>
            <p><strong>Skin Concerns:</strong> {data.concerns?.join(', ')}</p>
            {data.moreConcerns && (
              <div className="mt-2 p-3 bg-rose-50 rounded-md">
                <p><strong>Other Concerns:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{data.moreConcerns}</p>
              </div>
            )}
          </div>
        );

      case BUDGET_PREFERENCES:
        return (
          <div className="space-y-2">
            <p><strong>Budget Range:</strong> {data.budget}</p>
            <p><strong>Treatment Areas:</strong> {data.treatmentAreas?.join(', ')}</p>
            {data.otherAreas && (
              <div className="mt-2 p-3 bg-rose-50 rounded-md">
                <p><strong>Other Treatment Areas:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{data.otherAreas}</p>
              </div>
            )}
            <p><strong>Priority Order:</strong> {data.priorityOrder?.join(' > ')}</p>
          </div>
        );

      case TREATMENT_GOALS:
        return (
          <div className="space-y-2">
            <p><strong>Treatment Goals:</strong> {data.goals?.join(', ')}</p>
            {/* <p><strong>Preferred Start Time:</strong> {data.timeframe}</p> */}
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

      case HEALTH_CONDITIONS:
        return (
          <div className="space-y-2">
            <p><strong>Health Conditions:</strong> {data.healthConditions?.join(', ')}</p>
            {data.otherConditions && !data.healthConditions?.includes('none') && (
              <div className="mt-2 p-3 bg-rose-50 rounded-md">
                <p><strong>Other Health Conditions:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{data.otherConditions}</p>
              </div>
            )}
          </div>
        );

      case VISIT_PATHS:
        // console.log('PreviewReport - visitPaths data:', data);
        // console.log('PreviewReport - full formData:', formData);
        return (
          <div className="space-y-2">
            <p><strong>Referral Source:</strong> {data.visitPath}</p>
            {data.otherPath && data.visitPath === 'other' && (
              <div className="mt-2 p-3 bg-rose-50 rounded-md">
                <p><strong>Other Referral Source:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{data.otherPath}</p>
              </div>
            )}
          </div>
        );

      case BASIC_INFO:
        const privateInfo = data.privateInfo;
        if (!privateInfo) {
          return <p>No personal information provided</p>;
        }
        return (
          <div className="space-y-2">
            <p><strong>First Name:</strong> {privateInfo.firstName}</p>
            <p><strong>Last Name:</strong> {privateInfo.lastName}</p>
            <p><strong>Age Range:</strong> {privateInfo.ageRange}</p>
            <p><strong>Gender:</strong> {privateInfo.gender}</p>
            <p><strong>Email:</strong> {privateInfo.email}</p>
          </div>
        );
      case UPLOAD_PHOTO:
        return (
          <div className="space-y-2">
            {data.uploadedImage ? (
              <div>
                <p><strong>Uploaded Image:</strong> {data.imageFileName || 'Unknown file'}</p>
                <img 
                  src={data.uploadedImage} 
                  alt="Uploaded skin image" 
                  className="max-w-xs max-h-48 rounded-lg border border-gray-200 mt-2"
                />
              </div>
            ) : (
              <p><strong>Image:</strong> No image uploaded</p>
            )}
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
            onClick={handleSubmit}
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
