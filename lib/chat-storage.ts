// Chat storage service for browser localStorage
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  model?: string;
}

const STORAGE_KEYS = {
  CHATS: 'chatgpt-chats',
  CURRENT_CHAT: 'chatgpt-current-chat',
  USER_SETTINGS: 'chatgpt-settings'
} as const;

class ChatStorageService {
  private static instance: ChatStorageService;

  static getInstance(): ChatStorageService {
    if (!ChatStorageService.instance) {
      ChatStorageService.instance = new ChatStorageService();
    }
    return ChatStorageService.instance;
  }

  // Generate a chat title from the first user message
  private generateChatTitle(firstMessage: string): string {
    const title = firstMessage.slice(0, 50);
    return title.length < firstMessage.length ? `${title}...` : title;
  }

  // Get all chats from localStorage
  getAllChats(): Chat[] {
    try {
      const chatsData = localStorage.getItem(STORAGE_KEYS.CHATS);
      if (!chatsData) return [];
      
      const chats = JSON.parse(chatsData);
      return chats.map((chat: Chat) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map((msg: ChatMessage) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    } catch (error) {
      console.error('Error loading chats:', error);
      return [];
    }
  }

  // Get a specific chat by ID
  getChat(id: string): Chat | null {
    const chats = this.getAllChats();
    return chats.find(chat => chat.id === id) || null;
  }

  // Save a new chat
  saveChat(chat: Omit<Chat, 'id' | 'createdAt' | 'updatedAt'>): Chat {
    const newChat: Chat = {
      ...chat,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const chats = this.getAllChats();
    chats.unshift(newChat); // Add to beginning
    this.saveAllChats(chats);
    return newChat;
  }

  // Update an existing chat
  updateChat(id: string, updates: Partial<Chat>): Chat | null {
    const chats = this.getAllChats();
    const chatIndex = chats.findIndex(chat => chat.id === id);
    
    if (chatIndex === -1) return null;

    chats[chatIndex] = {
      ...chats[chatIndex],
      ...updates,
      updatedAt: new Date()
    };

    this.saveAllChats(chats);
    return chats[chatIndex];
  }

  // Add a message to a chat
  addMessageToChat(chatId: string, message: Omit<ChatMessage, 'id'>): Chat | null {
    const chat = this.getChat(chatId);
    if (!chat) return null;

    const newMessage: ChatMessage = {
      ...message,
      id: this.generateId(),
      timestamp: new Date()
    };

    chat.messages.push(newMessage);
    
    // Update chat title if this is the first user message
    if (chat.messages.length === 1 && message.role === 'user') {
      chat.title = this.generateChatTitle(message.content);
    }

    return this.updateChat(chatId, { messages: chat.messages, title: chat.title });
  }

  // Delete a chat
  deleteChat(id: string): boolean {
    const chats = this.getAllChats();
    const filteredChats = chats.filter(chat => chat.id !== id);
    
    if (filteredChats.length === chats.length) return false; // Chat not found
    
    this.saveAllChats(filteredChats);
    return true;
  }

  // Delete all chats
  deleteAllChats(): void {
    localStorage.removeItem(STORAGE_KEYS.CHATS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT);
  }

  // Get current chat ID
  getCurrentChatId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_CHAT);
  }

  // Set current chat ID
  setCurrentChatId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_CHAT, id);
  }

  // Clear current chat
  clearCurrentChat(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT);
  }

  // Create a new chat with optional first message
  createNewChat(firstMessage?: string, model?: string): Chat {
    const chat = this.saveChat({
      title: firstMessage ? this.generateChatTitle(firstMessage) : 'New Chat',
      messages: firstMessage ? [{
        id: this.generateId(),
        role: 'user',
        content: firstMessage,
        timestamp: new Date()
      }] : [],
      model
    });

    this.setCurrentChatId(chat.id);
    return chat;
  }

  // Helper method to save all chats
  private saveAllChats(chats: Chat[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chats:', error);
    }
  }

  // Generate a simple ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get user settings
  getUserSettings(): UserSettings {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
      return settings ? JSON.parse(settings) : {
        theme: 'dark',
        defaultModel: 'gpt-4o-mini',
        autoSave: true
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        theme: 'dark',
        defaultModel: 'gpt-4o-mini', 
        autoSave: true
      };
    }
  }

  // Save user settings
  saveUserSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }
}

interface UserSettings {
  theme: string;
  defaultModel: string;
  autoSave: boolean;
}

export const chatStorage = ChatStorageService.getInstance();