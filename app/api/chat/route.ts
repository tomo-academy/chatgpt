import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, model: selectedModel = "gpt-4o-mini" } = await req.json();

    let model;
    if (selectedModel.startsWith("gemini")) {
      model = google(selectedModel);
    } else {
      model = openai(selectedModel);
    }

    const result = await streamText({
      model: model as unknown as any, // Type workaround for AI SDK compatibility
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}