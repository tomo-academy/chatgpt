// Simplified schema for type definitions
// This is a minimal version to support the sidebar components

export type Chat = {
  id: string;
  createdAt: Date;
  title: string;
  userId: string;
  visibility: "public" | "private";
};

export type User = {
  id: string;
  email: string;
  password?: string;
};
