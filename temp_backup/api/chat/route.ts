import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, tools } = await req.json();

    const result = streamText({
      model: openai("gpt-4o-mini"),
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