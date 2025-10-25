// src/contexts/ConversationsContext.js
import React, { createContext, useState, useCallback, useEffect, useRef } from "react";
 
export const ConversationsContext = createContext();

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [error, setError] = useState(null);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const intervalRef = useRef(null);
  const isOnlineRef = useRef(navigator.onLine);

  // Helper function to save conversations to localStorage
  const saveConversationsToStorage = useCallback((conversationsToSave) => {
    try {
      localStorage.setItem('nexa_conversations', JSON.stringify(conversationsToSave));
    } catch (error) {
      console.error('Failed to save conversations to localStorage:', error);
    }
  }, []);

  const fetchConversations = useCallback(async (isRealTimeUpdate = false) => {
    if (!isRealTimeUpdate) {
      setIsLoadingChat(true);
    }
    try {
      // Load conversations from localStorage
      const storedConversations = localStorage.getItem('nexa_conversations');
      const conversations = storedConversations ? JSON.parse(storedConversations) : [];
      setConversations(conversations);
      setLastFetchTime(Date.now());
      setError(null);
    } catch (error) {
      console.error('Failed to load conversations:', error);
      setError("Failed to load conversations from local storage.");
      setConversations([]);
    } finally {
      if (!isRealTimeUpdate) {
        setIsLoadingChat(false);
      }
    }
  }, []);

  // Real-time polling for conversation updates
  const startRealTimeUpdates = useCallback(() => {
    if (intervalRef.current || !isRealTimeEnabled) return;
    
    intervalRef.current = setInterval(() => {
      if (isOnlineRef.current && document.visibilityState === 'visible') {
        fetchConversations(true);
      }
    }, 5000); // Update every 5 seconds
  }, [fetchConversations, isRealTimeEnabled]);

  const stopRealTimeUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      isOnlineRef.current = true;
      if (isRealTimeEnabled) {
        fetchConversations(true);
        startRealTimeUpdates();
      }
    };

    const handleOffline = () => {
      isOnlineRef.current = false;
      stopRealTimeUpdates();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isOnlineRef.current && isRealTimeEnabled) {
        fetchConversations(true);
        startRealTimeUpdates();
      } else {
        stopRealTimeUpdates();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start real-time updates
    if (isRealTimeEnabled && isOnlineRef.current) {
      startRealTimeUpdates();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopRealTimeUpdates();
    };
  }, [fetchConversations, startRealTimeUpdates, stopRealTimeUpdates, isRealTimeEnabled]);

  const addConversation = useCallback((newConversation) => {
    setConversations((prevConversations) => {
      // Check if conversation already exists to avoid duplicates
      const exists = prevConversations.some(
        conv => conv.conversation_id === newConversation.conversation_id
      );
      if (exists) return prevConversations;
      
      const updatedConversations = [newConversation, ...prevConversations];
      saveConversationsToStorage(updatedConversations);
      return updatedConversations;
    });
  }, [saveConversationsToStorage]);

  const deleteConversation = useCallback((conversation_id) => {
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.filter(
        (conv) => conv.conversation_id !== conversation_id
      );
      saveConversationsToStorage(updatedConversations);
      return updatedConversations;
    });
  }, [saveConversationsToStorage]);

  const deleteAllConversation = useCallback(() => {
    setConversations([]);
    saveConversationsToStorage([]);
  }, [saveConversationsToStorage]);

  const updateConversation = useCallback((conversation_id, newAlias, isLoading = undefined) => {
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.map((conv) =>
        conv.conversation_id === conversation_id
          ? { 
              ...conv, 
              alias: newAlias,
              ...(isLoading !== undefined && { isLoading })
            }
          : conv
      );
      saveConversationsToStorage(updatedConversations);
      return updatedConversations;
    });
  }, [saveConversationsToStorage]);

  const toggleStarConversation = useCallback((conversation_id, starred) => {
    setConversations(prevConversations => {
      const updatedConversations = prevConversations.map(conv => 
        conv.conversation_id === conversation_id 
          ? { ...conv, starred, starred_at: starred ? new Date().toISOString() : null }
          : conv
      );
      saveConversationsToStorage(updatedConversations);
      return updatedConversations;
    });
  }, [saveConversationsToStorage]);

  const toggleRealTime = (enabled) => {
    setIsRealTimeEnabled(enabled);
    if (enabled && isOnlineRef.current) {
      startRealTimeUpdates();
    } else {
      stopRealTimeUpdates();
    }
  };

  return (
    <ConversationsContext.Provider value={{
      conversations,
      isLoadingChat,
      error,
      isRealTimeEnabled,
      lastFetchTime,
      fetchConversations,
      addConversation,
      deleteConversation,
      deleteAllConversation,
      updateConversation,
      toggleStarConversation,
      toggleRealTime,
      startRealTimeUpdates,
      stopRealTimeUpdates
    }}>
      {children}
    </ConversationsContext.Provider>
  );
}