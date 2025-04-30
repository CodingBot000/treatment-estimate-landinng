"use client"

import React, { useState } from "react";
import { formDefinition, FormDefinitionProps } from "./form-definition";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
    q2: z.string().min(1, "나이대는 필수 항목입니다."),
    q3: z.string().min(1, "피부 타입은 필수 항목입니다."),
    q4: z.string().min(1, "고민 기간은 필수 항목입니다.")
  });
  
  export default function SkinForm() {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
  
    const handleChange = (id: string, value: any) => {
      setFormData((prev) => ({ ...prev, [id]: value }));
    };
  
    const renderField = (q: FormDefinitionProps) => {
      if (q.type === "single-select" && q.options) {
        return (
          <div className="space-y-1">
            <Select onValueChange={(val) => handleChange(q.id, val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {q.options.map((opt) => (
                  <SelectItem key={typeof opt === 'string' ? opt : opt.label} value={typeof opt === 'string' ? opt : opt.label}>
                    {typeof opt === 'string' ? opt : opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[q.id] && <p className="text-sm text-red-500">{errors[q.id]}</p>}
          </div>
        );
      }
  
      if (q.type === "multi-select" && q.options) {
        return (
          <div className="space-y-2">
            {q.options.map((opt) => {
              const label = typeof opt === 'string' ? opt : opt.label;
              const sub = typeof opt === 'object' && opt.sub ? opt.sub : [];
              const hasInput = typeof opt === 'object' && opt.input;
              const isChecked = (formData[q.id] || []).includes(label);
  
              return (
                <div key={label} className="space-y-1">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={label}
                      checked={isChecked}
                      onChange={(e) => {
                        const selected = formData[q.id] || [];
                        const updated = e.target.checked
                          ? [...selected, label]
                          : selected.filter((v: string) => v !== label);
                        handleChange(q.id, updated);
                      }}
                    />
                    <span>{label}</span>
                  </label>
  
                  {isChecked && sub.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {sub.map((s) => (
                        <label key={s} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={s}
                            onChange={(e) => {
                              const subKey = `${q.id}_${label}`;
                              const selected = formData[subKey] || [];
                              const updated = e.target.checked
                                ? [...selected, s]
                                : selected.filter((v: string) => v !== s);
                              handleChange(subKey, updated);
                            }}
                          />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                  )}
  
                  {isChecked && hasInput && (
                    <Input
                      type="text"
                      placeholder="기타 내용을 입력해주세요"
                      onChange={(e) => handleChange(`${q.id}_기타입력`, e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      }
  
      if (q.type === "file-upload") {
        return (
          <Input type="file" onChange={(e) => handleChange(q.id, e.target.files?.[0])} />
        );
      }
  
      return null;
    };
  
    const handleSubmit = () => {
      const parsed = schema.safeParse(formData);
      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {};
        parsed.error.errors.forEach(err => {
          if (err.path.length > 0) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }
  
      setErrors({});
      console.log("제출 데이터", formData);
      alert("문진표가 제출되었습니다.");
    };
  
    return (
      <div className="flex justify-center py-12">
        <Card className="w-full max-w-2xl">
          <CardContent className="space-y-6 py-8">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
              {formDefinition.map((q) => (
                <div key={q.id} className="space-y-2">
                  <Label>{q.label}</Label>
                  {renderField(q)}
                </div>
              ))}
              <Button type="submit" className="w-full">제출하기</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  