import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

function getModelProvider(modelId: string) {
  if (modelId.startsWith("gemini")) {
    return google(modelId);
  }
  return openai(modelId);
}

export async function POST(req: Request) {
  try {
    const { messages, tools, selectedModel = "gpt-4o-mini" } = await req.json();

    const model = getModelProvider(selectedModel);

    const result = streamText({
      model,
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