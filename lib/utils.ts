import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DBMessage } from "@/lib/db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  parts: any[];
  metadata: {
    createdAt: string;
  };
};

export type MessageMetadata = {
  createdAt: string;
};

export type Attachment = {
  name: string;
  url: string;
  contentType: string;
};

export function convertToUIMessages(messages: DBMessage[]): ChatMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role as 'user' | 'assistant' | 'system',
    parts: message.parts || [],
    metadata: {
      createdAt: message.createdAt.toISOString(),
    },
  }));
}

export function generateUUID(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function getTextFromMessage(message: ChatMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

export function createMessage({
  chatId,
  role,
  content,
}: {
  chatId: string;
  role: "user" | "assistant" | "system";
  content: any;
}): DBMessage {
  return {
    id: generateUUID(),
    chatId,
    role,
    parts: content.parts || [],
    attachments: content.attachments || [],
    createdAt: new Date(),
  };
}

export async function generateTitleFromUserMessage(message: any): Promise<string> {
  // Simple title generation based on first message
  const text = getTextFromMessage(message);
  if (text.length > 50) {
    return text.substring(0, 47) + "...";
  }
  return text || "New Chat";
}