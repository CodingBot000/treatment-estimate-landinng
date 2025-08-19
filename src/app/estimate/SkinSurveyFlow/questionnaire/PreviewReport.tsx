import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { steps } from '../../../data/form-definition';
import { Button } from '@/components/ui/button';
import { USER_INFO, BUDGET, HEALTH_CONDITIONS, PREFERENCES, PRIORITYFACTORS, SKIN_CONCERNS, SKIN_TYPE, TREATMENT_EXPERIENCE_BEFORE, TREATMENT_GOALS, UPLOAD_PHOTO, VISIT_PATHS } from '@/constants/steps';
import { supabase } from '@/lib/supabaseClient';
import SubmissionModal from './SubmissionModal';
import { useRouter } from 'next/navigation';

interface PreviewReportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showSendFormButton: boolean;
  formData: Record<string, any>;
}

const PreviewReport: React.FC<PreviewReportProps> = 
({ open, onOpenChange, formData, showSendFormButton }) => 
  {

  const router = useRouter();
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmissionModalOpen(true);
    setIsSubmitting(true);
    setIsCompleted(false);

    try {
      // 모든 스텝의 데이터를 합치기
      const allStepData = Object.values(formData).reduce((acc, stepData) => {
        return { ...acc, ...stepData };
      }, {});

      // 이미지 업로드 처리
      let imagePaths: string[] = [];
      if (allStepData.uploadImage?.imageFile) {
        const submissionId = crypto.randomUUID();
        const originalFileName = allStepData.uploadImage.imageFileName || 'image.jpg';
        
        // 파일명을 안전하게 변환 (한글/특수문자 제거)
        const safeFileName = originalFileName
          .replace(/[^a-zA-Z0-9.-]/g, '_') // 영문, 숫자, 점, 하이픈만 허용
          .replace(/_{2,}/g, '_'); // 연속된 언더스코어를 하나로 변환
        
        const imagePath = `consultation_photos/${submissionId}/raw/${safeFileName}`;
        
        // Supabase Storage에 이미지 업로드 (bucket: users)
        const { error: uploadError } = await supabase.storage
          .from('users')
          .upload(imagePath, allStepData.uploadImage.imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Image upload error:', uploadError);
          throw new Error('Failed to upload image');
        }

        imagePaths = [imagePath];
      }

      // API로 데이터 전송
      const response = await fetch('/api/consultation/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...allStepData,
          imagePaths
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit consultation');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      console.log('Submission successful:', result);
      setIsCompleted(true);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit consultation. Please try again.');
      setIsSubmissionModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmissionComplete = () => {
    setIsSubmissionModalOpen(false);
    setIsCompleted(false);
    onOpenChange(false);
    // 페이지 새로고침 또는 다른 페이지로 이동
    // window.location.reload();
    router.replace('/estimate/SkinSurveyFlow/questionnaire/complete')
  };

  const getStepSummary = (stepId: string, data: any) => {
    if (!data) return 'Not yet entered';

    switch (stepId) {
      case SKIN_TYPE:
        const skinType = data.skinType;
        return (
          <div className="space-y-2">
            <p><strong>Skin Type:</strong> {data.skinType}</p>
          </div>
        );

      case SKIN_CONCERNS:
        const skinConcerns = data.skinConcerns;
        return (
          <div className="space-y-2">
            <p><strong>Skin Concerns:</strong> {skinConcerns?.concerns?.join(', ')}</p>
            {skinConcerns?.moreConcerns && (
              <div className="mt-2 p-3 rounded-md">
                <p><strong>Other Concerns:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{skinConcerns.moreConcerns}</p>
              </div>
            )}
          </div>
        );

      case BUDGET:
        return (
          <div className="space-y-2">
            <p><strong>Budget Range:</strong> {data.budget}</p>
          </div>
        );
        case PREFERENCES:
        const treatmentAreas = data.treatmentAreas;
        return (
          <div className="space-y-2">
            <p><strong>Treatment Areas:</strong> {treatmentAreas?.treatmentAreas?.join(', ')}</p>
            {treatmentAreas?.otherAreas && (
              <div className="mt-2 p-3 rounded-md">
                <p><strong>Other Treatment Areas:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{treatmentAreas.otherAreas}</p>
              </div>
            )}

          </div>
        );
        case PRIORITYFACTORS:
        return (
          <div className="space-y-2">
            <p><strong>Priority Order:</strong> {data.priorityOrder?.priorityOrder?.join(' > ')}</p>
          </div>
        );
      case TREATMENT_GOALS:
        return (
          <div className="space-y-2">
            <p><strong>Treatment Goals:</strong> {data.goals?.join(', ')}</p>
            
          </div>
        );
      case TREATMENT_EXPERIENCE_BEFORE:
        const pastTreatments = data.pastTreatments;
        return (
          <div className="space-y-2">
            <p><strong>Previous Treatments:</strong> {pastTreatments?.pastTreatments?.join(', ')}</p>
            {pastTreatments?.sideEffects && (
              <div className="mt-2 p-3 rounded-md">
                <p><strong>Treatment Side Effects:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{pastTreatments.sideEffects}</p>
              </div>
            )}
            {pastTreatments?.additionalNotes && (
              <p><strong>Additional Notes:</strong> {pastTreatments.additionalNotes}</p>
            )}
          </div>
        );

      case HEALTH_CONDITIONS:
        const healthConditions = data.healthConditions;
        return (
          <div className="space-y-2">
            <p><strong>Health Conditions:</strong> {healthConditions?.healthConditions?.join(', ')}</p>
            {healthConditions?.otherConditions && !healthConditions.healthConditions?.includes('none') && (
              <div className="mt-2 p-3 rounded-md">
                <p><strong>Other Health Conditions:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{healthConditions.otherConditions}</p>
              </div>
            )}
          </div>
        );

      case VISIT_PATHS:
        const visitPath = data.visitPath;
        return (
          <div className="space-y-2">
            <p><strong>Referral Source:</strong> {visitPath?.visitPath}</p>
            {visitPath?.otherPath && visitPath.visitPath === 'other' && (
              <div className="mt-2 p-3 rounded-md">
                <p><strong>Other Referral Source:</strong></p>
                <p className="text-gray-700 whitespace-pre-wrap">{visitPath.otherPath}</p>
              </div>
            )}
          </div>
        );

      case USER_INFO:
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
        const uploadImage = data.uploadImage;
        return (
          <div className="space-y-2">
            {uploadImage?.uploadedImage ? (
              <div>
                <p><strong>Uploaded Image:</strong> {uploadImage.imageFileName || 'Unknown file'}</p>
                <img 
                  src={uploadImage.uploadedImage} 
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

      {/* Submission Modal */}
      <SubmissionModal
        open={isSubmissionModalOpen}
        onOpenChange={setIsSubmissionModalOpen}
        isSubmitting={isSubmitting}
        isCompleted={isCompleted}
        onComplete={handleSubmissionComplete}
      />
    </Dialog>
  );
};

export default PreviewReport;
