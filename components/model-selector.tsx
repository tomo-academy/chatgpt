"use client";

import React, { useContext } from "react";
import { ModelContext } from "./ChatProvider";
import { Brain, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// AI Models configuration
const AI_MODELS = [
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "Azure OpenAI",
    description: "Fast and efficient for most tasks",
    icon: Sparkles,
  },
  {
    id: "gemini-2.5-flash-lite", 
    name: "Gemini 2.5 Flash Lite",
    provider: "Google",
    description: "Google's latest AI model",
    icon: Brain,
  },
];

export function ModelSelector() {
  const { selectedModel, setSelectedModel } = useContext(ModelContext);

  const currentModel = AI_MODELS.find(model => model.id === selectedModel) || AI_MODELS[0];
  const CurrentIcon = currentModel.icon;

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="w-[200px]">
        <div className="flex items-center gap-2">
          <CurrentIcon className="size-4" />
          <SelectValue placeholder="Select AI Model" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>AI Models</SelectLabel>
          {AI_MODELS.map((model) => {
            const ModelIcon = model.icon;
            return (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex items-center gap-2">
                  <ModelIcon className="size-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">{model.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {model.provider}
                    </span>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
