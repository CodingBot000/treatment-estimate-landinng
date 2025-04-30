
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  type: "single-select" | "multi-select";
  question: string;
  options: string[];
}

const surveyQuestions: Question[] = [
  {
    id: "q1",
    type: "multi-select",
    question: "현재 가장 신경 쓰이는 부위는?",
    options: ["얼굴 전체", "눈가", "턱선", "팔자주름", "모공", "여드름"]
  },
  {
    id: "q2",
    type: "single-select",
    question: "피부 타입을 알려주세요",
    options: ["지성", "건성", "복합성", "민감성"]
  },
  {
    id: "q3",
    type: "multi-select",
    question: "현재 어떤 고민이 있으신가요?",
    options: ["탄력 저하", "잡티", "트러블", "홍조", "노화", "모공", "칙칙함"]
  }
];

export default function SkinSurveyForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const current = surveyQuestions[step];
  const isLast = step === surveyQuestions.length - 1;

  const handleSelect = (option: string) => {
    setAnswers((prev) => {
      const currentAnswer = prev[current.id] || [];
      if (current.type === "single-select") {
        return { ...prev, [current.id]: [option] };
      } else {
        const exists = currentAnswer.includes(option);
        return {
          ...prev,
          [current.id]: exists
            ? currentAnswer.filter((o) => o !== option)
            : [...currentAnswer, option]
        };
      }
    });
  };


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{current.question}</h2>

      {current.type === "single-select" ? (
        <RadioGroup
          value={answers[current.id]?.[0] || ""}
          onValueChange={(val) => handleSelect(val)}
          className="space-y-3"
        >
          
          {current.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value={opt} />
                <span>{opt}</span>
            </label>
            ))}


        </RadioGroup>
      ) : (
        <div className="space-y-2">
          {current.options.map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <Checkbox
                checked={answers[current.id]?.includes(opt)}
                onCheckedChange={() => handleSelect(opt)}
              />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button
          disabled={step === 0}
          variant="ghost"
          onClick={() => setStep((s) => s - 1)}
        >
          이전
        </Button>
        <Button onClick={() => (isLast ? console.log(answers) : setStep((s) => s + 1))}>
          {isLast ? "제출" : "다음"}
        </Button>
      </div>
    </div>
  );
}
