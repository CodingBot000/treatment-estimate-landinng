"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { formDefinition } from "@/app/data/form-definition";
import SurveyResult from "./SurveyResult";
import SurveySummary from "./SurveySummary";

export default function SkinSurveyFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<Record<string, string[]>>({});
  const [showResult, setShowResult] = useState(false);

  const current = formDefinition[step];
  const isFirst = step === 0;
  const isLast = step === formDefinition.length - 1;

  const handleToggleSub = (label: string, subValue: string) => {
    const currentSubs = selectedSub[label] || [];
    const updated = currentSubs.includes(subValue)
      ? currentSubs.filter((v) => v !== subValue)
      : [...currentSubs, subValue];

    setSelectedSub((prev) => ({ ...prev, [label]: updated }));
  };

  const handleOptionClick = (label: string) => {
    setSelectedOption(label);
  };

  const handleNext = () => {
    const id = current.id;

    let result: any = null;
    if (current.type === "single-select") {
      result = selectedOption;
    } else if (current.type === "multi-select") {
      result = Object.entries(selectedSub).map(([label, subs]) => ({
        label,
        sub: subs.length ? subs : undefined,
      }));
    } else if (current.type === "file-upload") {
      result = answers[id];
    }

    setAnswers((prev) => ({ ...prev, [id]: result }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (isFirst) return;
    const prevStep = step - 1;
    const prevId = formDefinition[prevStep].id;

    const prevData = answers[prevId];
    if (formDefinition[prevStep].type === "single-select") {
      setSelectedOption(prevData || null);
    } else if (formDefinition[prevStep].type === "multi-select") {
      const restored: Record<string, string[]> = {};
      prevData?.forEach((item: any) => {
        if (item.label) restored[item.label] = item.sub || [];
      });
      setSelectedSub(restored);
    }

    setStep(prevStep);
  };

  if (showResult) return <SurveyResult answers={answers} />;

  const renderTwoPanel = () => {
    if (!current.options) return null;

    const subMap = current.options.reduce((acc, opt) => {
      if (typeof opt === "string") return acc;
      acc[opt.label] = opt.sub || [];
      return acc;
    }, {} as Record<string, string[]>);

    return (
      <div className="flex flex-col gap-4">
        {Object.entries(subMap).map(([label, subs]) => {
          const isSelected = selectedOption === label || selectedSub[label];
          return (
            <div
              key={label}
              className="flex flex-col md:flex-row md:items-start gap-2"
            >
              <div className="w-full md:w-1/3">
                <Button
                  variant={isSelected ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleOptionClick(label)}
                >
                  {label}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-2/3">
                {subs.map((sub) => (
                  <Button
                    key={`${label}-${sub}`}
                    size="sm"
                    variant={selectedSub[label]?.includes(sub) ? "default" : "outline"}
                    onClick={() => handleToggleSub(label, sub)}
                  >
                    {sub}
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderOnePanel = () => {
    if (!current.options) return null;

    return (
      <div className="flex flex-col gap-3 w-full">
        {current.options.map((opt) => {
          const label = typeof opt === "string" ? opt : opt.label;
          const isSelected = selectedOption === label || selectedSub[label];
          return (
            <Button
              key={label}
              variant={isSelected ? "default" : "outline"}
              className="w-full"
              onClick={() => handleOptionClick(label)}
            >
              {label}
            </Button>
          );
        })}
      </div>
    );
  };

  const shouldUseOnePanel =
    current.options?.every((opt) => typeof opt === "string") ?? false;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-10">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardContent className="p-6 space-y-6">
          <Progress value={((step + 1) / formDefinition.length) * 100} />

          <SurveySummary answers={answers} />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-center">{current.title}</h2>
              {current.subdescription && <p className="text-s text-gray-500 text-center">{current.subdescription}</p>}
              {current.type === "file-upload" ? (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [current.id]: e.target.files?.[0],
                    }))
                  }
                />
              ) : shouldUseOnePanel ? renderOnePanel() : renderTwoPanel()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between gap-2 pt-4">
            {!isFirst && (
              <Button variant="ghost" onClick={handleBack}>
                ← 이전으로
              </Button>
            )}
            <Button
              onClick={() => {
                if (isLast) setShowResult(true);
                else handleNext();
              }}
            >
              다음
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
