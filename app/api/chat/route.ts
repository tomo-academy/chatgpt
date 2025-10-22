import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { streamText, LanguageModel } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, tools, model } = await req.json();
    
    // Get the model from the request or fallback to global or default
    const selectedModelId = model || (globalThis as Record<string, unknown>).currentModel as string || "gpt-4o-mini";
    
    // Select the appropriate model based on the model parameter
    let selectedModel: LanguageModel;
    
    if (selectedModelId.startsWith("gemini")) {
      selectedModel = google(selectedModelId) as LanguageModel;
    } else {
      selectedModel = openai(selectedModelId) as LanguageModel;
    }

    const result = streamText({
      model: selectedModel,
      messages,
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