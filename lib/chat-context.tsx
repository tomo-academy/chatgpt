'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { chatStorage, Chat, ChatMessage } from '@/lib/chat-storage';

interface ChatContextType {
  // Current chat state
  currentChat: Chat | null;
  chats: Chat[];
  isLoading: boolean;
  
  // Chat management
  createNewChat: (firstMessage?: string, model?: string) => Chat;
  loadChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  deleteAllChats: () => void;
  
  // Message management
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  
  // Settings
  userSettings: any;
  updateSettings: (settings: any) => void;
  
  // Refresh chats list
  refreshChats: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userSettings, setUserSettings] = useState<any>({});

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load chats
        const allChats = chatStorage.getAllChats();
        setChats(allChats);

        // Load current chat
        const currentChatId = chatStorage.getCurrentChatId();
        if (currentChatId) {
          const chat = chatStorage.getChat(currentChatId);
          if (chat) {
            setCurrentChat(chat);
          } else {
            // Current chat ID is invalid, clear it
            chatStorage.clearCurrentChat();
          }
        }

        // Load user settings
        const settings = chatStorage.getUserSettings();
        setUserSettings(settings);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const refreshChats = () => {
    const allChats = chatStorage.getAllChats();
    setChats(allChats);
  };

  const createNewChat = (firstMessage?: string, model?: string): Chat => {
    const newChat = chatStorage.createNewChat(firstMessage, model);
    setCurrentChat(newChat);
    refreshChats();
    return newChat;
  };

  const loadChat = (chatId: string) => {
    const chat = chatStorage.getChat(chatId);
    if (chat) {
      setCurrentChat(chat);
      chatStorage.setCurrentChatId(chatId);
    }
  };

  const deleteChat = (chatId: string) => {
    const deleted = chatStorage.deleteChat(chatId);
    if (deleted) {
      // If we deleted the current chat, clear it
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        chatStorage.clearCurrentChat();
      }
      refreshChats();
    }
  };

  const deleteAllChats = () => {
    chatStorage.deleteAllChats();
    setCurrentChat(null);
    setChats([]);
  };

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    if (!currentChat) return;

    const updatedChat = chatStorage.addMessageToChat(currentChat.id, message);
    if (updatedChat) {
      setCurrentChat(updatedChat);
      refreshChats();
    }
  };

  const updateChatTitle = (chatId: string, title: string) => {
    const updatedChat = chatStorage.updateChat(chatId, { title });
    if (updatedChat) {
      if (currentChat?.id === chatId) {
        setCurrentChat(updatedChat);
      }
      refreshChats();
    }
  };

  const updateSettings = (newSettings: any) => {
    const updatedSettings = { ...userSettings, ...newSettings };
    setUserSettings(updatedSettings);
    chatStorage.saveUserSettings(updatedSettings);
  };

  const value: ChatContextType = {
    currentChat,
    chats,
    isLoading,
    createNewChat,
    loadChat,
    deleteChat,
    deleteAllChats,
    addMessage,
    updateChatTitle,
    userSettings,
    updateSettings,
    refreshChats
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}