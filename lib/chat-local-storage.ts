// lib/chat-local-storage.ts
// Utility for chat persistence in localStorage

export type Chat = {
  id: string;
  messages: Array<{ id: string; text: string; sender: string; timestamp: number }>;
};

const STORAGE_KEY = 'local_chats';

export function saveChat(chat: Chat) {
  const chats = loadChats();
  const idx = chats.findIndex(c => c.id === chat.id);
  if (idx !== -1) {
    chats[idx] = chat;
  } else {
    chats.push(chat);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

export function loadChats(): Chat[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getChat(id: string): Chat | undefined {
  return loadChats().find(c => c.id === id);
}

export function deleteChat(id: string) {
  const chats = loadChats().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}
