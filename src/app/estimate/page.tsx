"use client";

// import Step1Component from "@/components/Step1";

// export default function Step1Page() {
//   return <Step1Component />;
// }


import { useState } from "react";
import { useRouter } from "next/navigation";
import { bodyPartOptions, conditionOptions } from "@/data/formData";
import { useForm } from "@/contexts/FormContext";
import SectionTitle from "@/components/SectionTitle";
import IconGrid from "@/components/IconGrid";
import SelectionGroup from "@/components/SelectionGroup";
import CommonButton from "@/components/CommonButton";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import Step1Page from "./step1-page";
import Step2Page from "./step2-page";



export default function EstimateStepPage() {
  const router = useRouter();
  const { formState, progress, setBodyPart, addBodyCondition, removeBodyCondition } = useForm();
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(formState.bodyPart);
  const [selectedConditions, setSelectedConditions] = useState<string[]>(formState.bodyConditions);

  const handleBodyPartSelect = (id: string) => {
    setSelectedBodyPart(id);
    setBodyPart(id);
    // Clear conditions when changing body part
    setSelectedConditions([]);
  };

  const handleConditionSelect = (id: string) => {
    if (selectedConditions.includes(id)) {
      // Remove the condition if already selected
      const updatedConditions = selectedConditions.filter(c => c !== id);
      setSelectedConditions(updatedConditions);
      removeBodyCondition(id);
    } else {
      // Add the condition if not selected
      setSelectedConditions([...selectedConditions, id]);
      addBodyCondition(id);
    }
  };

//   const handleNext = () => {
//     console.log("next click step1");
//     router.push("/estimate/step2");
//   };


  const [currentStepState, setCurrentStepState] = useState<string>('Step1');
  const handleNext = (nextStep: string) => {
    setCurrentStepState(nextStep);
  }
    
  return (
    <div>
        {currentStepState === 'Step1' && (
            <Step1Page onNext={() => handleNext('Step2') }
                        onBack={() => handleNext('')}
             />
        )}
        {currentStepState === 'Step2' && (
            <Step2Page onNext={() => handleNext('Step2-MoreInfo') }
            onBack={() => handleNext('Step1')}
            />
        )}

    </div>
  );
}

