"use client";

import React, { useContext } from "react";
import { ModelContext } from "./ChatProvider";
import { AIModelSelector, AI_MODELS, type AIModel } from "./ai-model-selector";

export function ModelSelector() {
  const { selectedModel, setSelectedModel } = useContext(ModelContext);

  // Find the current AI model based on the selected model ID
  const currentAIModel = AI_MODELS.find(model => model.id === selectedModel) || AI_MODELS[2];

  const handleModelChange = (aiModel: AIModel) => {
    setSelectedModel(aiModel.id);
  };

  return (
    <AIModelSelector
      selectedModel={currentAIModel}
      onModelChange={handleModelChange}
      className="w-[220px]"
    />
  );
}
