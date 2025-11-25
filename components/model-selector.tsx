"use client";

import React, { useContext } from "react";
import { ModelContext } from "./ChatProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const models = [
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "Azure OpenAI" },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", provider: "Google" },
];

export function ModelSelector() {
  const { selectedModel, setSelectedModel } = useContext(ModelContext);

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            <div className="flex flex-col">
              <span className="font-medium">{model.name}</span>
              <span className="text-xs text-muted-foreground">{model.provider}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
