import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, tools, model = "gpt-4o-mini" } = await req.json();

    // Select the appropriate model based on the model parameter
    const selectedModel = model.startsWith("gemini") 
      ? google(model)
      : openai(model);

    const result = streamText({
      model: selectedModel as any,
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
