import { createAzure } from "@ai-sdk/azure";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, tools } = await req.json();

    // Initialize Azure AI with your endpoint
    const azure = createAzure({
      resourceName: "lynxa",
      apiKey: process.env.AZURE_API_KEY || "",
    });

    const result = streamText({
      model: azure("gpt-4o-mini"),
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