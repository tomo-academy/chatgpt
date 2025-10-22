"use client";
import type { FC } from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const models = [
  {
    name: "GPT-4o-mini",
    value: "gpt-4o-mini",
    provider: "OpenAI",
  },
  {
    name: "GPT-4o",
    value: "gpt-4o",
    provider: "OpenAI",
  },
  {
    name: "GPT-4",
    value: "gpt-4",
    provider: "OpenAI",
  },
  {
    name: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo",
    provider: "OpenAI",
  },
  {
    name: "Gemini 2.0 Flash",
    value: "gemini-2.0-flash-exp",
    provider: "Google",
  },
  {
    name: "Gemini 1.5 Pro",
    value: "gemini-1.5-pro",
    provider: "Google",
  },
  {
    name: "Gemini 1.5 Flash",
    value: "gemini-1.5-flash",
    provider: "Google",
  },
];

interface ModelPickerProps {
  onModelChange?: (model: string) => void;
}

export const ModelPicker: FC<ModelPickerProps> = ({ onModelChange }) => {
  const [selectedModel, setSelectedModel] = useState(models[0]?.value ?? "");

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    if (onModelChange) {
      onModelChange(value);
    }
  };

  return (
    <Select value={selectedModel} onValueChange={handleModelChange}>
      <SelectTrigger className="max-w-[300px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.value} value={model.value}>
            <span className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {model.provider}
              </span>
              <span>{model.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
