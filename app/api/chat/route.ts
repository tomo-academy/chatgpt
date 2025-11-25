import { createAzure } from "@ai-sdk/azure";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

// Azure OpenAI Configuration
const azure = createAzure({
  resourceName: "kamesh6592-2021-resource",
  apiKey: process.env.AZURE_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { messages, tools } = await req.json();

    const result = streamText({
      model: azure("gpt-4o-mini"),
      messages: convertToModelMessages(messages),
      maxOutputTokens: 4096,
      temperature: 1,
      topP: 1,
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