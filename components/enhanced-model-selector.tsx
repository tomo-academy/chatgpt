"use client";

import * as React from "react";
import { Check, ChevronDown, Sparkles, Brain, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorLogo,
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
          variant="outline"
          className={`justify-between h-9 min-w-[200px] bg-card border-border hover:bg-accent hover:text-accent-foreground transition-colors ${className}`}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              {currentModel.providerLogo && (
                <ModelSelectorLogo 
                  provider={currentModel.providerLogo} 
                  className="size-3.5"
                />
              )}
              <currentModel.icon className="size-3.5 text-foreground" />
            </div>
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="font-medium text-sm text-card-foreground truncate">
                {currentModel.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {currentModel.provider}
              </span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </ModelSelectorTrigger>
      
      <ModelSelectorContent className="w-[300px] p-0" title="Select Model">
        <ModelSelectorInput placeholder="Search models..." className="border-0 border-b border-border rounded-none" />
        <ModelSelectorList>
          <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
          
          <ModelSelectorGroup heading="Models">
            {models.map((model) => (
              <ModelSelectorItem
                key={model.id}
                value={model.id}
                onSelect={() => handleModelSelect(model.id)}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-none transition-colors"
              >
                <div className="flex items-center gap-2 shrink-0">
                  {model.providerLogo && (
                    <ModelSelectorLogo 
                      provider={model.providerLogo} 
                      className="size-3.5"
                    />
                  )}
                  <model.icon className="size-3.5 text-foreground" />
                </div>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <ModelSelectorName className="font-medium text-sm text-card-foreground">
                    {model.name}
                  </ModelSelectorName>
                  <div className="text-xs text-muted-foreground">
                    {model.provider} • {model.description}
                  </div>
                </div>
                {selectedModel === model.id && (
                  <Check className="h-4 w-4 text-foreground shrink-0" />
                )}
              </ModelSelectorItem>
            ))}
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );
}