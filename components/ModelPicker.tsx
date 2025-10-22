"use client";
import type { FC } from "react";
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
  },
  {
    name: "GPT-4o",
    value: "gpt-4o",
  },
  {
    name: "GPT-4",
    value: "gpt-4",
  },
  {
    name: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo",
  },
];

export const ModelPicker: FC = () => {
  return (
    <Select defaultValue={models[0]?.value ?? ""}>
      <SelectTrigger className="max-w-[300px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.value} value={model.value}>
            <span className="flex items-center gap-2">
              <span>{model.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};