import fs from "fs";
import path from "path";
import type { Chat, DBMessage, Vote, Document } from "@/lib/db/schema";

const DATA_DIR = path.resolve(process.cwd(), "data");
const CHATS_FILE = path.join(DATA_DIR, "chats.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const VOTES_FILE = path.join(DATA_DIR, "votes.json");
const DOCUMENTS_FILE = path.join(DATA_DIR, "documents.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CHATS_FILE)) {
    fs.writeFileSync(CHATS_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(VOTES_FILE)) {
    fs.writeFileSync(VOTES_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(DOCUMENTS_FILE)) {
    fs.writeFileSync(DOCUMENTS_FILE, JSON.stringify([]));
  }
}

// Chat functions
export async function readChats(): Promise<Chat[]> {
  ensureDataDir();
  const raw = await fs.promises.readFile(CHATS_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw) as Chat[];
    return parsed.map((c) => ({
      ...c,
      createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
    }));
  } catch {
    await fs.promises.writeFile(CHATS_FILE, JSON.stringify([]));
    return [];
  }
}

export async function writeChats(chats: Chat[]) {
  ensureDataDir();
  const serializable = chats.map((c) => ({ ...c, createdAt: c.createdAt?.toISOString() }));
  await fs.promises.writeFile(CHATS_FILE, JSON.stringify(serializable, null, 2));
}

export async function addChat(chat: Chat) {
  const chats = await readChats();
  chats.unshift(chat);
  await writeChats(chats);
}

export async function deleteChatById(id: string, userId?: string) {
  const chats = await readChats();
  const idx = chats.findIndex((c) => c.id === id && (userId ? c.userId === userId : true));
  if (idx === -1) return false;
  chats.splice(idx, 1);
  await writeChats(chats);
  
  // Also delete related messages and votes
  await deleteMessagesByChatId(id);
  await deleteVotesByChatId(id);
  
  return true;
}

export async function getChatsForUser(userId?: string): Promise<Chat[]> {
  const chats = await readChats();
  if (!userId) return chats;
  return chats.filter((c) => c.userId === userId);
}

export async function getChatById(id: string): Promise<Chat | null> {
  const chats = await readChats();
  return chats.find((c) => c.id === id) || null;
}

export async function saveChat(chat: Chat) {
  const chats = await readChats();
  const existingIndex = chats.findIndex((c) => c.id === chat.id);
  
  if (existingIndex > -1) {
    chats[existingIndex] = chat;
  } else {
    chats.unshift(chat);
  }
  
  await writeChats(chats);
  return chat;
}

// Message functions
export async function readMessages(): Promise<DBMessage[]> {
  ensureDataDir();
  const raw = await fs.promises.readFile(MESSAGES_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw) as DBMessage[];
    return parsed.map((m) => ({
      ...m,
      createdAt: m.createdAt ? new Date(m.createdAt) : new Date(),
    }));
  } catch {
    await fs.promises.writeFile(MESSAGES_FILE, JSON.stringify([]));
    return [];
  }
}

export async function writeMessages(messages: DBMessage[]) {
  ensureDataDir();
  const serializable = messages.map((m) => ({ ...m, createdAt: m.createdAt?.toISOString() }));
  await fs.promises.writeFile(MESSAGES_FILE, JSON.stringify(serializable, null, 2));
}

export async function saveMessages(newMessages: DBMessage[]) {
  const messages = await readMessages();
  
  for (const newMessage of newMessages) {
    const existingIndex = messages.findIndex((m) => m.id === newMessage.id);
    if (existingIndex > -1) {
      messages[existingIndex] = newMessage;
    } else {
      messages.push(newMessage);
    }
  }
  
  await writeMessages(messages);
  return newMessages;
}

export async function getMessagesByChatId(chatId: string): Promise<DBMessage[]> {
  const messages = await readMessages();
  return messages
    .filter((m) => m.chatId === chatId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export async function deleteMessagesByChatId(chatId: string) {
  const messages = await readMessages();
  const filtered = messages.filter((m) => m.chatId !== chatId);
  await writeMessages(filtered);
}

export async function getMessageById(id: string): Promise<DBMessage | null> {
  const messages = await readMessages();
  return messages.find((m) => m.id === id) || null;
}

export async function deleteMessagesByChatIdAfterTimestamp(chatId: string, timestamp: Date) {
  const messages = await readMessages();
  const filtered = messages.filter((m) => 
    m.chatId !== chatId || new Date(m.createdAt) < timestamp
  );
  await writeMessages(filtered);
}

// Vote functions
export async function readVotes(): Promise<Vote[]> {
  ensureDataDir();
  const raw = await fs.promises.readFile(VOTES_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw) as Vote[];
    return parsed.map((v) => ({
      ...v,
      createdAt: v.createdAt ? new Date(v.createdAt) : new Date(),
    }));
  } catch {
    await fs.promises.writeFile(VOTES_FILE, JSON.stringify([]));
    return [];
  }
}

export async function writeVotes(votes: Vote[]) {
  ensureDataDir();
  const serializable = votes.map((v) => ({ ...v, createdAt: v.createdAt?.toISOString() }));
  await fs.promises.writeFile(VOTES_FILE, JSON.stringify(serializable, null, 2));
}

export async function voteMessage(chatId: string, messageId: string, type: "up" | "down") {
  const votes = await readVotes();
  const existingIndex = votes.findIndex((v) => v.messageId === messageId);
  
  const vote: Vote = {
    id: existingIndex > -1 ? votes[existingIndex].id : `vote-${Date.now()}`,
    chatId,
    messageId,
    isUpvoted: type === "up",
    createdAt: existingIndex > -1 ? votes[existingIndex].createdAt : new Date(),
  };
  
  if (existingIndex > -1) {
    votes[existingIndex] = vote;
  } else {
    votes.push(vote);
  }
  
  await writeVotes(votes);
  return vote;
}

export async function getVotesByChatId(chatId: string): Promise<Vote[]> {
  const votes = await readVotes();
  return votes.filter((v) => v.chatId === chatId);
}

export async function deleteVotesByChatId(chatId: string) {
  const votes = await readVotes();
  const filtered = votes.filter((v) => v.chatId !== chatId);
  await writeVotes(filtered);
}

// Document functions (for artifacts)
export async function readDocuments(): Promise<Document[]> {
  ensureDataDir();
  const raw = await fs.promises.readFile(DOCUMENTS_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw) as Document[];
    return parsed.map((d) => ({
      ...d,
      createdAt: d.createdAt ? new Date(d.createdAt) : new Date(),
    }));
  } catch {
    await fs.promises.writeFile(DOCUMENTS_FILE, JSON.stringify([]));
    return [];
  }
}

export async function writeDocuments(documents: Document[]) {
  ensureDataDir();
  const serializable = documents.map((d) => ({ ...d, createdAt: d.createdAt?.toISOString() }));
  await fs.promises.writeFile(DOCUMENTS_FILE, JSON.stringify(serializable, null, 2));
}

export async function saveDocument(document: Document) {
  const documents = await readDocuments();
  const existingIndex = documents.findIndex((d) => d.id === document.id);
  
  if (existingIndex > -1) {
    documents[existingIndex] = document;
  } else {
    documents.push(document);
  }
  
  await writeDocuments(documents);
  return document;
}

export async function getDocumentById(id: string): Promise<Document | null> {
  const documents = await readDocuments();
  return documents.find((d) => d.id === id) || null;
}

export default {
  // Chat functions
  readChats,
  writeChats,
  addChat,
  deleteChatById,
  getChatsForUser,
  getChatById,
  saveChat,
  
  // Message functions
  readMessages,
  writeMessages,
  saveMessages,
  getMessagesByChatId,
  deleteMessagesByChatId,
  getMessageById,
  deleteMessagesByChatIdAfterTimestamp,
  
  // Vote functions
  readVotes,
  writeVotes,
  voteMessage,
  getVotesByChatId,
  deleteVotesByChatId,
  
  // Document functions
  readDocuments,
  writeDocuments,
  saveDocument,
  getDocumentById,
};
