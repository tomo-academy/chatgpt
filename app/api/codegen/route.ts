import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { codeBlockSchema } from '@/lib/schemas';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = streamObject({
      model: openai('gpt-4o-mini'),
      schema: codeBlockSchema,
      prompt: `You are a helpful coding assistant. Generate clean, well-commented code based on the user's request. Only generate code, no markdown formatting or backticks.

User request: ${prompt}

Please provide:
- language: The programming language (e.g., "javascript", "typescript", "python", "jsx", "tsx")
- filename: An appropriate filename with extension
- code: The actual code content without any markdown formatting`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in codegen API:', error);
    return new Response('Internal server error', { status: 500 });
  }
}