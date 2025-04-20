"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import CommonButton from "@/components/CommonButton";
import { useForm } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";

export default function MoreInfo() {
  const router = useRouter();
  const { formState, progress, addPhoto, removePhoto, setConcerns } = useForm();
  const [concernsText, setConcernsText] = useState<string>(formState.concerns);
  const [photos, setPhotos] = useState<File[]>(formState.photos);
  const [handleDiscuss, setHandleDiscuss] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files);
      newPhotos.forEach(file => {
        addPhoto(file);
      });
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    removePhoto(index);
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleConcernsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConcernsText(e.target.value);
    setConcerns(e.target.value);
  };

  const handleSubmit = () => {
    alert("Your quote request has been submitted. You'll receive the results shortly!");
    router.push("/");
  };

  const handleDiscussInfo = ( directInputDiscuss: number ) => {
    if (directInputDiscuss === 0) {
      setHandleDiscuss(true)
    } else {
      setHandleDiscuss(false)
    }
  }

  const getBodyPartSummary = () => {
    if (!formState.bodyPart) return "Not selected";
    return formState.bodyPart;
  };

  const getConditionsSummary = () => {
    if (formState.bodyConditions.length === 0) return "Not selected";
    return formState.bodyConditions.join(", ");
  };

  const getBudgetSummary = () => {
    if (!formState.budget || !formState.visitFrequency) return "Not selected";
    return `Up to ${formState.budget}K KRW for ${formState.visitFrequency} visits`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* <Header title="Get a Quote by Budget" /> */}

      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <p className="text-lg font-medium mb-4">
            BueatyLink will help you create your <span className="text-beauty-purple">quote</span>.
          </p>

          {/* Form summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="mb-2">
              <div className="text-sm text-gray-500">Concern Area</div>
              <div className="text-beauty-darkPurple">{getBodyPartSummary()}</div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-gray-500">Condition</div>
              <div className="text-beauty-darkPurple">{getConditionsSummary()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Budget Info</div>
              <div className="text-beauty-darkPurple">{getBudgetSummary()}</div>
            </div>
          </div>

          <SectionTitle
            text="Uploading a photo of the area of concern helps us provide a more accurate quote! (Optional)"
            highlightedText="Photo"
          />
          <p className="text-sm text-gray-500 px-4 mb-4">
            Photos are strictly protected and used only by clinics to prepare a personalized treatment plan.
          </p>

          <div className="flex flex-wrap gap-4 px-4 py-5">
            {/* Photo upload button */}
            <label className="border-2 border-gray-300 rounded-lg w-36 h-36 flex items-center justify-center cursor-pointer hover:border-beauty-purple">
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*,image/heic"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl text-gray-500">+</span>
                </div>
                <span className="text-sm text-gray-500">Add Photo</span>
              </div>
            </label>

            {/* Photo previews */}
            {photos.map((photo, index) => (
              <div key={`photo-${index}`} className="relative w-36 h-36">
                <div className="w-36 h-36 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <SectionTitle
            text="What’s your main concern? Feel free to mention any specific treatment you’re considering! (Required)"
            highlightedText="Main Concern"
          />
          <p className="text-sm text-gray-500 px-4 mb-4">
            Let us know your concern so we can suggest tailored solutions from clinics. If you have a treatment in mind, please share it as well.
          </p>

          {/* <div className="px-4 mb-8">
            <textarea
              value={concernsText}
              onChange={handleConcernsChange}
              placeholder="What are your concerns? The more details you provide, the more accurate your quote will be."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beauty-purple"
            />
          </div> */}
        </div>
      </div>
      <div>
      <div className="flex flex-wrap gap-2 px-4 py-2">
      
        <button
          onClick={() => {
              handleDiscussInfo(0)
            }
          }
          className={`
            rounded-full px-5 py-3 font-medium text-sm transition-all
            ${handleDiscuss
              ? 'bg-beauty-purple text-white'
              : 'bg-white border border-gray-200 text-beauty-darkPurple'
            }
          `}
        >
        I'll discuss it with the clinic
        </button>
        <button
          onClick={() => {
              handleDiscussInfo(1)
            }
          }
          className={`
            rounded-full px-5 py-3 font-medium text-sm transition-all
            ${!handleDiscuss
              ? 'bg-beauty-purple text-white'
              : 'bg-white border border-gray-200 text-beauty-darkPurple'
            }
          `}
        >
        I'll fill it out now
        </button>
    </div>

      </div>
     {!handleDiscuss ? (
      <div className="px-4 mb-8">
              <textarea
                value={concernsText}
                onChange={handleConcernsChange}
                placeholder="What are your concerns? The more details you provide, the more accurate your quote will be."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beauty-purple"
              />
            </div>
        ): (
        <div className="px-4 mb-8">
 
      </div>
      )}
      
      <div className="p-4">
        <CommonButton
          onClick={handleSubmit}
          disabled={!concernsText.trim()}
        >
          Request Personalized Quote 📩
        </CommonButton>
      </div>

    </div>
  );
}
