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



export default function Step1() {
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

  // const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

    // const handleConditionSelect = (id: string) => {
    //   setSelectedConditions((prev) =>
    //     prev.includes(id)
    //       ? prev.filter((item) => item !== id) // 선택 해제
    //       : [...prev, id] // 선택 추가
    //   );
    // };

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

  const handleNext = () => {
    console.log("next click step1");
    router.push("/estimate/step2");
  };

  // Get relevant conditions for the selected body part
  const availableConditions = selectedBodyPart && conditionOptions[selectedBodyPart]
    ? conditionOptions[selectedBodyPart].map(condition => ({
        id: condition.id,
        label: condition.label
      }))
    : [];

    
  return (
    <div className="flex flex-col h-full">
      <Header title="Get a Free Personalized Treatment/Plastic Surgery Estimate" />

      <ProgressBar
        percentage={0}
        message="Just provide a few details, and you'll receive quotes from an average of three or more clinics"
        highlightedText="An average of three or more clinics"
      />

      <div className="flex-1 overflow-auto">
        <div className="py-4">
          <SectionTitle
            text="Select the area you're currently concerned about."
            highlightedText="Area"
          />

          <IconGrid
            items={bodyPartOptions}
            selectedItem={selectedBodyPart || undefined}
            onSelect={handleBodyPartSelect}
          />
        </div>

        {selectedBodyPart && availableConditions.length > 0 && (
          <div className="py-4">
            <SectionTitle
              text="Please select all conditions that apply to this area."
              highlightedText="Condition"
            />

            <SelectionGroup
              options={availableConditions}
              selectedOptions={selectedConditions} // Multiple selection allowed
              multiple
              onSelect={handleConditionSelect}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <CommonButton
          onClick={handleNext}
          disabled={!selectedBodyPart || selectedConditions.length === 0}
        >
          Next
        </CommonButton>
      </div>
    </div>
  );
}

