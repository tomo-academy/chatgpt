import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

function getModelProvider(modelId: string) {
  if (modelId.startsWith('gemini-')) {
    return google(modelId);
  }
  // Default to OpenAI for GPT models
  return openai(modelId);
}

export async function POST(req: Request) {
  try {
    const { messages, tools } = await req.json();
    
    // Get the current model from global state or default to gpt-4o-mini
    const currentModel = (globalThis as Record<string, unknown>).currentModel as string || "gpt-4o-mini";
    const selectedModel = getModelProvider(currentModel);

    const result = streamText({
      model: selectedModel,
      messages: convertToModelMessages(messages),
      maxOutputTokens: 1200,
      tools: tools ? {
        ...frontendTools(tools),
      } : undefined,
      onError: console.error,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}