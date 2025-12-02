"use client";

import React, { useContext } from "react";
import { ModelContext } from "./ChatProvider";
import { Brain, Sparkles } from "lucide-react";
import { Workspaces, WorkspaceTrigger, WorkspaceContent } from "@/components/workspaces";

// AI Models configuration
interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AI_MODELS: AIModel[] = [
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

  // Transform AI models to workspace format
  interface WorkspaceModel extends AIModel {
    logo?: string;
  }
  
  const workspaceModels: WorkspaceModel[] = AI_MODELS.map(model => ({
    id: model.id,
    name: model.name,
    provider: model.provider,
    description: model.description,
    icon: model.icon,
    logo: undefined, // We'll use the icon instead
  }));

  const handleModelChange = (workspace: import("./workspaces").Workspace) => {
    const model = workspace as WorkspaceModel;
    setSelectedModel(model.id);
  };

  return (
    <Workspaces
      workspaces={workspaceModels}
      selectedWorkspaceId={selectedModel}
      onWorkspaceChange={handleModelChange}
    >
      <WorkspaceTrigger 
        className="w-[200px]"
        renderTrigger={(model) => {
          const workspaceModel = model as WorkspaceModel;
          return (
            <div className="flex items-center gap-2">
              {React.createElement(workspaceModel.icon, { className: "size-4" })}
              <div className="flex flex-col items-start">
                <span className="font-medium">{model.name}</span>
                <span className="text-xs text-muted-foreground">
                  {workspaceModel.provider}
                </span>
              </div>
            </div>
          );
        }}
      />
      <WorkspaceContent 
        title="AI Models"
        renderWorkspace={(model) => {
          const workspaceModel = model as WorkspaceModel;
          return (
            <div className="flex items-center gap-2">
              {React.createElement(workspaceModel.icon, { className: "size-4" })}
              <div className="flex flex-col items-start">
                <span className="font-medium">{model.name}</span>
                <span className="text-xs text-muted-foreground">
                  {workspaceModel.provider}
                </span>
              </div>
            </div>
          );
        }}
      />
    </Workspaces>
  );
}
