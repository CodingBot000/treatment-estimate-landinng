import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface UploadImageStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const UploadImageStep: React.FC<UploadImageStepProps> = ({ data, onDataChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(data?.uploadedImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed');
      return;
    }

    // 파일 크기 검증 (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    // 지원되는 파일 형식 검증
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PNG and JPG, JPEG files can be uploaded');
      return;
    }

    // 파일을 base64로 변환하여 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      onDataChange({
        ...data,
        uploadedImage: result,
        imageFile: file,
        imageFileName: file.name
      });
    };
    reader.readAsDataURL(file);
  }, [data, onDataChange]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <Label className="text-lg font-medium text-gray-800 mb-2 block">
          Please post a picture to diagnose your skin
        </Label>
        <p className="text-sm text-gray-600 mb-6">
          Only png and jpg files can be uploaded.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragging 
            ? 'border-rose-400 bg-rose-50' 
            : 'border-rose-300 hover:border-rose-400 hover:bg-rose-50'
          }
          ${uploadedImage ? 'border-solid border-rose-400 bg-rose-50' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpg,image/jpeg"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploadedImage ? (
          <div className="space-y-4">
            <img
              src={uploadedImage}
              alt="Uploaded image"
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-600">
              Click to change image
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-rose-500 rounded-lg flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Click to upload a file
              </p>
              <p className="text-sm text-gray-600">
                You can upload up to 10MB.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="text-xs text-gray-500 leading-relaxed">
        All images are encrypted and securely stored, and will not be used for any purpose other than diagnosis.
      </div>
    </div>
  );
};

export default UploadImageStep;
