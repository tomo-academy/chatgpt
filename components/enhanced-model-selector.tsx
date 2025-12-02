"use client";

import * as React from "react";
import { Check, ChevronDown, Sparkles, Brain, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorList,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorName,
} from "@/components/ai-elements/model-selector";

interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  providerLogo?: string;
}

const models: Model[] = [
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "Azure OpenAI",
    description: "Fast and efficient for most tasks",
    icon: Sparkles,
    providerLogo: "openai",
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google AI",
    description: "Google's latest AI model",
    icon: Brain,
    providerLogo: "google",
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Advanced reasoning and analysis",
    icon: Bot,
    providerLogo: "anthropic",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "Azure OpenAI",
    description: "Most capable GPT-4 model",
    icon: Zap,
    providerLogo: "openai",
  },
];

interface EnhancedModelSelectorProps {
  selectedModel?: string;
  onModelChange?: (model: string) => void;
  className?: string;
}

export function EnhancedModelSelector({
  selectedModel = "gpt-4o-mini",
  onModelChange,
  className,
}: EnhancedModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  
  const currentModel = models.find((model) => model.id === selectedModel) || models[0];

  const handleModelSelect = (modelId: string) => {
    onModelChange?.(modelId);
    setOpen(false);
  };

  return (
    <ModelSelector open={open} onOpenChange={setOpen}>
      <ModelSelectorTrigger asChild>
        <Button
          variant="ghost"
          className={`justify-between h-8 px-3 bg-transparent hover:bg-accent/50 border-0 font-medium text-sm ${className}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-foreground">
              {currentModel.name}
            </span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </ModelSelectorTrigger>
      
      <ModelSelectorContent className="w-[280px] p-2" title="Select Model">
        <ModelSelectorList>
          <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
          
          <ModelSelectorGroup>
            {models.map((model) => (
              <ModelSelectorItem
                key={model.id}
                value={model.id}
                onSelect={() => handleModelSelect(model.id)}
                className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-accent rounded-sm transition-colors"
              >
                <div className="flex items-center gap-2 shrink-0">
                  <model.icon className="size-4" />
                </div>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <ModelSelectorName className="font-normal text-sm">
                    {model.name}
                  </ModelSelectorName>
                  <div className="text-xs text-muted-foreground">
                    {model.provider}
                  </div>
                </div>
                {selectedModel === model.id && (
                  <Check className="h-3.5 w-3.5 shrink-0" />
                )}
              </ModelSelectorItem>
            ))}
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );
}