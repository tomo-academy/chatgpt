import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

// AJ STUDIOZ Custom API Provider
const ajStudioz = createOpenAI({
  baseURL: "https://api.ajstudioz.dev/v1",
  apiKey: "dummy-key", // Not required for our public API
});

export async function POST(req: Request) {
  try {
    const { messages, tools } = await req.json();

    // Get model from cookie/header or default to hanuman-s1
    const modelHeader = req.headers.get('x-model-id');
    const selectedModel = modelHeader || "hanuman-s1";

    const result = streamText({
      model: ajStudioz(selectedModel),
      system: selectedModel === "aj-deepseek" 
        ? "You are AJ by AJ STUDIOZ - a helpful AI assistant. You excel at coding, problem-solving, and providing clear, accurate responses."
        : "You are Hanuman S-1 by AJ STUDIOZ - a fast and intelligent AI assistant. You specialize in rapid responses, excellent code generation, and problem-solving.",
      messages: convertToModelMessages(messages),
      maxOutputTokens: 2000,
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