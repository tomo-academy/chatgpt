import { createAzure } from "@ai-sdk/azure";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

// Azure OpenAI Configuration
const azure = createAzure({
  resourceName: "kamesh6592-2021-resource",
  apiKey: process.env.AZURE_API_KEY || "",
});

// Google Gemini Configuration
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { messages, tools } = await req.json();

    // Get model from header or default to Azure
    const modelHeader = req.headers.get('x-model-id');
    const selectedModel = modelHeader || "gpt-4o-mini";

    // Determine which provider to use
    let model;
    let maxTokens = 4096;
    
    if (selectedModel.startsWith('gemini-')) {
      model = google(selectedModel);
      maxTokens = 8192; // Gemini supports more tokens
    } else {
      model = azure(selectedModel);
      maxTokens = 4096;
    }

    const result = streamText({
      model,
      messages: convertToModelMessages(messages),
      maxOutputTokens: maxTokens,
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