import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, tools, model = "gpt-4o-mini" } = await req.json();

    // Select the appropriate model based on the model parameter
    let selectedModel;
    
    if (model.startsWith("gemini")) {
      selectedModel = google(model);
    } else {
      selectedModel = openai(model);
    }

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
