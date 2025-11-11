"use client";

import { useContext } from "react";
import { ModelContext } from "./ChatProvider";
import { models } from "@/lib/models";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ModelSelector() {
  const { selectedModel, setSelectedModel } = useContext(ModelContext);

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select model" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(models).map(([id, model]) => (
          <SelectItem key={id} value={id}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
