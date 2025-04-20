"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import SectionTitle from "@/components/SectionTitle";
import SelectionGroup from "@/components/SelectionGroup";
import CommonButton from "@/components/CommonButton";
import { useForm } from "@/contexts/FormContext";
import { budgetOptions, frequencyOptions } from "@/data/formData";

export default function Step2() {
  const router = useRouter();
  const { formState, progress, setBudget, setVisitFrequency } = useForm();
  const [selectedBudget, setSelectedBudget] = useState<string | null>(
    formState.budget ? `budget-${formState.budget}` : null
  );
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
    formState.visitFrequency
  ? `freq-${formState.visitFrequency === "Undecided"
      ? "undecided"
      : formState.visitFrequency.replace(/times?/g, "")}`
  : null
  );
  const [summary, setSummary] = useState<string>("");

  // Update summary whenever selections change
  useEffect(() => {
    if (selectedBudget && selectedFrequency) {
      const budget = budgetOptions.find(option => option.id === selectedBudget)?.value;
      const frequency = frequencyOptions.find(option => option.id === selectedFrequency)?.value;

      if (budget && frequency) {
        if (frequency === "Undecided") {
          setSummary(`You plan to spend up to ₩${budget * 10000} to shine again.`);
        } else {
          setSummary(`You plan to spend up to ₩${budget * 10000} per visit to shine again.`);
        }
      }
    }
  }, [selectedBudget, selectedFrequency]);

  const handleBudgetSelect = (id: string) => {
    setSelectedBudget(id);
    const budget = budgetOptions.find(option => option.id === id)?.value;
    if (budget) {
      setBudget(budget);
    }
  };

  const handleFrequencySelect = (id: string) => {
    setSelectedFrequency(id);
    const frequency = frequencyOptions.find(option => option.id === id)?.value as any;
    if (frequency) {
      setVisitFrequency(frequency);
    }
  };

  const handleNext = () => {
    router.push("/estimate/step3");
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Get an Estimate by Budget" />

      <div className="flex-1 overflow-auto">
        <div className="p-4">
        <p className="text-lg font-medium mb-4">
          BeautyLink will help you create a <span className="text-beauty-purple">treatment estimate</span>.
        </p>

          {/* Selected body part and conditions summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="mb-2">
              <div className="text-sm text-gray-500">Concern Area</div>
              <div className="text-beauty-darkPurple">
                {formState.bodyPart ? formState.bodyPart : "Not Selected"}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Concern Condition</div>
              <div className="text-beauty-darkPurple">
                {formState.bodyConditions.length > 0
                  ? formState.bodyConditions.join(", ")
                  : "Not Selected"}
              </div>
            </div>
          </div>

          <SectionTitle
            text="Please select your maximum budget. (Select one, required)"
            highlightedText="Budget"
          />
          <p className="text-sm text-gray-500 px-4 mb-4">
          Clinics will provide personalized treatment/surgery solutions within your selected budget.
          </p>

          <div className="px-4 mb-8">
            <SelectionGroup
              options={budgetOptions.map(option => ({ id: option.id, label: option.label }))}
              selectedOption={selectedBudget || undefined}
              onSelect={handleBudgetSelect}
            />
          </div>

          <SectionTitle
            text="Please select your desired number of clinic visits. (Required)"
            highlightedText="Number of Visits"
          />
          <p className="text-sm text-gray-500 px-4 mb-4">
          Let us know how many sessions you’d like an estimate for.
          </p>

          <div className="px-4 mb-8">
            <SelectionGroup
              options={frequencyOptions.map(option => ({ id: option.id, label: option.label }))}
              selectedOption={selectedFrequency || undefined}
              onSelect={handleFrequencySelect}
            />
          </div>

          {summary && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-center">
              <p className="text-beauty-darkPurple">
                {summary.split('<').map((part, index, array) => {
                  if (index === 0) return <span key={index}>{part}</span>;
                  const highlightedText = part.split('>')[0];
                  const remainingText = part.split('>')[1] || '';
                  return (
                    <span key={index}>
                      <span className="text-beauty-purple font-medium">{highlightedText}</span>
                      {remainingText}
                    </span>
                  );
                })}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <CommonButton
          onClick={handleNext}
          disabled={!selectedBudget || !selectedFrequency}
        >
          Next Step
        </CommonButton>
      </div>
    </div>
  );
}
