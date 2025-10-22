"use client";
import type { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useModel } from "./ModelContext";

const models = [
  {
    name: "GPT-4o-mini",
    value: "gpt-4o-mini",
    provider: "openai"
  },
  {
    name: "GPT-4o",
    value: "gpt-4o",
    provider: "openai"
  },
  {
    name: "GPT-4",
    value: "gpt-4",
    provider: "openai"
  },
  {
    name: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo",
    provider: "openai"
  },
  {
    name: "Gemini 2.0 Flash",
    value: "gemini-2.0-flash-exp",
    provider: "google"
  },
  {
    name: "Gemini 1.5 Pro",
    value: "gemini-1.5-pro-002",
    provider: "google"
  },
  {
    name: "Gemini 1.5 Flash",
    value: "gemini-1.5-flash-002",
    provider: "google"
  },
];

export const ModelPicker: FC = () => {
  const { selectedModel, setSelectedModel } = useModel();

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="max-w-[300px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.value} value={model.value}>
            <span className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                model.provider === 'openai' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
              }`}>
                {model.provider === 'openai' ? 'OpenAI' : 'Google'}
              </span>
              <span>{model.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};