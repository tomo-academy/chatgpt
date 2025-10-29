// Enhanced schema for comprehensive chat functionality
// This matches the reference repository structure exactly

export type User = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Chat = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  title: string;
  userId: string;
  visibility: "public" | "private";
  lastContext?: any;
};

// Database message format with parts
export type DBMessage = {
  id: string;
  chatId: string;
  role: "user" | "assistant" | "system";
  parts: any[]; // Message parts array like reference repo
  attachments: any[]; // Attachments array
  createdAt: Date;
  updatedAt?: Date;
};

export type Message = DBMessage; // Alias for compatibility

export type Vote = {
  id: string;
  chatId: string;
  messageId: string;
  isUpvoted: boolean;
  userId?: string;
  createdAt: Date;
};

export type Document = {
  id: string;
  title: string;
  content: string;
  kind: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type Suggestion = {
  id: string;
  documentId: string;
  userId: string;
  originalText: string;
  suggestedText: string;
  createdAt: Date;
};

export type Stream = {
  id: string;
  chatId: string;
  createdAt: Date;
};

export type ChatSettings = {
  id: string;
  userId: string;
  saveHistory: boolean;
  autoScroll: boolean;
  typingIndicator: boolean;
  theme: "light" | "dark" | "system";
  notifications: {
    browser: boolean;
    email: boolean;
    sound: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReports: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
};
