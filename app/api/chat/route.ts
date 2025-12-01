import { createAzure } from "@ai-sdk/azure";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

// Azure OpenAI Configuration
const azure = createAzure({
  resourceName: "kamesh6592-2021-resource",
  apiKey: process.env.AZURE_API_KEY || "",
});

// Google Gemini Configuration
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

// AI Model configurations
const MODEL_CONFIGS: Record<string, { provider: string; modelName: string; maxTokens: number }> = {
  "gpt-4o-mini": { provider: "azure", modelName: "gpt-4o-mini", maxTokens: 128000 },
  "gemini-2.5-flash-lite": { provider: "google", modelName: "gemini-2.0-flash-exp", maxTokens: 1000000 },
};

export async function POST(req: Request) {
  try {
    const { messages, tools } = await req.json();

    // Get model from header or default to GPT-4o-mini
    const modelHeader = req.headers.get('x-model-id');
    const selectedModelId = modelHeader || "gpt-4o-mini";
    
    const modelConfig = MODEL_CONFIGS[selectedModelId];
    if (!modelConfig) {
      return new Response(`Unsupported model: ${selectedModelId}`, { status: 400 });
    }

    // Determine which provider to use
    let model;
    let maxOutputTokens = Math.min(4096, modelConfig.maxTokens);
    
    switch (modelConfig.provider) {
      case "azure":
        model = azure(modelConfig.modelName);
        break;
      case "google":
        model = google(modelConfig.modelName);
        break;
      default:
        return new Response(`Unsupported provider: ${modelConfig.provider}`, { status: 400 });
    }

    console.log(`Using model: ${selectedModelId} (${modelConfig.provider}:${modelConfig.modelName})`);

    const result = streamText({
      model,
      messages: convertToModelMessages(messages),
      maxOutputTokens,
      temperature: 0.7,
      topP: 0.95,
      tools: tools ? {
        ...frontendTools(tools),
      } : undefined,
      onError: console.error,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}