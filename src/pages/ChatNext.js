'use client';

import React, { useState, useCallback } from 'react';
import { useChat } from 'ai/react';
import Message from '../components/Message';
import InputContainer from '../components/InputContainer';
import '../styles/Common.css';

export default function Chat({ 
  isResponsive, 
  isSidebarOpen, 
  setIsSidebarOpen, 
  showToast 
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append
  } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chat error:', error);
      showToast('Error occurred while sending message');
    }
  });

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSubmit(e);
    }
  }, [input, isLoading, handleSubmit]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    // Handle file drop logic here if needed
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  return (
    <div 
      className="chat-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {isDragActive && (
        <div className="drag-overlay">
          <div className="drag-message">Drop files here</div>
        </div>
      )}
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to NEXA</h2>
            <p>Start a conversation with AI</p>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isUser={message.role === 'user'}
              isThinking={isLoading && message === messages[messages.length - 1]}
            />
          ))
        )}
        
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
          <Message
            message={{ content: '', role: 'assistant' }}
            isUser={false}
            isThinking={true}
          />
        )}
      </div>

      <InputContainer
        inputText={input}
        setInputText={handleInputChange}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        isResponsive={isResponsive}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      
      {error && (
        <div className="error-message">
          {error.message || 'An error occurred'}
        </div>
      )}
    </div>
  );
}