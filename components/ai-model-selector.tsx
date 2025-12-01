"use client"

import * as React from "react"
import { Check, ChevronDown, Bot, Sparkles, Zap, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// AI Model types and configurations
export interface AIModel {
  id: string
  name: string
  description: string
  icon: React.ElementType
  maxTokens: number
  provider: "openai" | "anthropic" | "google"
  capabilities: string[]
  isPremium?: boolean
}

export const AI_MODELS: AIModel[] = [
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    description: "Azure OpenAI - Fast and efficient",
    icon: Brain,
    maxTokens: 128000,
    provider: "openai",
    capabilities: ["text", "code", "reasoning", "analysis"]
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    description: "Google - Latest multimodal model",
    icon: Sparkles,
    maxTokens: 1000000,
    provider: "google",
    capabilities: ["text", "code", "multimodal", "reasoning"]
  }
]

interface AIModelSelectorProps {
  selectedModel: AIModel
  onModelChange: (model: AIModel) => void
  className?: string
}

export function AIModelSelector({ 
  selectedModel, 
  onModelChange, 
  className 
}: AIModelSelectorProps) {
  const SelectedIcon = selectedModel.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "w-auto justify-between gap-2 px-3 py-2 h-auto text-left bg-transparent hover:bg-accent/50",
            className
          )}
        >
          <span className="font-medium">{selectedModel.name}</span>
          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] p-0" align="start">
        {/* User Info Section */}
        <div className="px-3 py-3 border-b">
          <p className="font-semibold text-sm">AI Models</p>
          <p className="text-xs text-muted-foreground">Choose your AI assistant</p>
        </div>
        
        {/* Models List */}
        {AI_MODELS.map((model) => {
          const ModelIcon = model.icon
          const isSelected = selectedModel.id === model.id
          
          return (
            <DropdownMenuItem
              key={model.id}
              onClick={() => onModelChange(model)}
              className="flex items-start gap-3 px-3 py-3 cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
            >
              <ModelIcon className="size-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{model.name}</span>
                  {isSelected && (
                    <div className="size-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {model.description}
                </p>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Hook for managing AI model selection
export function useAIModel(defaultModel?: AIModel) {
  const [selectedModel, setSelectedModel] = React.useState<AIModel>(
    defaultModel || AI_MODELS[0] // Default to GPT-4o Mini
  )

  const handleModelChange = React.useCallback((model: AIModel) => {
    setSelectedModel(model)
  }, [])

  return {
    selectedModel,
    setSelectedModel: handleModelChange,
    availableModels: AI_MODELS
  }
}