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

  const fetchConversations = useCallback(async (isRealTimeUpdate = false) => {
    if (!isRealTimeUpdate) {
      setIsLoadingChat(true);
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_FASTAPI_URL}/conversations`, {
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error('대화를 불러오는 데 실패했습니다.');
      }
      const data = await res.json();
      setConversations(data.conversations);
      setLastFetchTime(Date.now());
      setError(null);
    } catch (error) {
      setError(error.message || "대화를 불러오는 데 실패했습니다.");
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

  const addConversation = (newConversation) => {
    setConversations((prevConversations) => {
      // Check if conversation already exists to avoid duplicates
      const exists = prevConversations.some(
        conv => conv.conversation_id === newConversation.conversation_id
      );
      if (exists) return prevConversations;
      
      return [newConversation, ...prevConversations];
    });
  };

  const deleteConversation = (conversation_id) => {
    setConversations((prevConversations) =>
      prevConversations.filter(
        (conv) => conv.conversation_id !== conversation_id
      )
    );
  };

  const deleteAllConversation = () => {
    setConversations([]);
  };

  const updateConversation = (conversation_id, newAlias, isLoading = undefined) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.conversation_id === conversation_id
          ? { 
              ...conv, 
              alias: newAlias,
              ...(isLoading !== undefined && { isLoading })
            }
          : conv
      )
    );
  };

  const toggleStarConversation = (conversation_id, starred) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.conversation_id === conversation_id 
          ? { ...conv, starred, starred_at: starred ? new Date().toISOString() : null }
          : conv
      )
    );
  };

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