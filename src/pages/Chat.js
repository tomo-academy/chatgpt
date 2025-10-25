import React, { useState, useEffect, useCallback, useRef, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SettingsContext } from "../contexts/SettingsContext";
import { ConversationsContext } from "../contexts/ConversationsContext";
import { motion, AnimatePresence } from "framer-motion";
import { useFileUpload } from "../utils/useFileUpload";
import { sendMessageToAzure } from "../utils/chatHelpers";
import Message from "../components/Message";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import InputContainer from "../components/InputContainer";
import "../styles/Common.css";

function Chat({ isTouch, chatMessageRef }) {
  const { conversation_id } = useParams();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const [userFixedScroll, setUserFixedScroll] = useState(false);
  const [deleteIndex, setdeleteIndex] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const { 
    uploadedFiles, 
    setUploadedFiles,
    processFiles, 
    removeFile
  } = useFileUpload([]);

  const lastScrollTopRef = useRef(0);
  
  const {
    temperature,
    systemMessage,
    azureApiKey,
    useAzureAI
  } = useContext(SettingsContext);

  const {
    conversations,
    updateConversation,
  } = useContext(ConversationsContext);

  const generateMessageId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    if (conversation_id) {
      const storedMessages = localStorage.getItem(`conversation_${conversation_id}`);
      if (storedMessages) {
        try {
          const parsedMessages = JSON.parse(storedMessages);
          setMessages(parsedMessages);
        } catch (error) {
          console.error('Error parsing stored messages:', error);
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
      setIsInitialized(true);
    }
  }, [conversation_id]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (isInitialized && conversation_id) {
      localStorage.setItem(`conversation_${conversation_id}`, JSON.stringify(messages));
    }
  }, [messages, conversation_id, isInitialized]);

  const deleteMessages = useCallback(
    async (deleteIndex) => {
      try {
        const newMessages = messages.slice(0, deleteIndex);
        setMessages(newMessages);
        setConfirmModal(false);
        setdeleteIndex(null);
      } catch (error) {
        console.error("Error deleting messages:", error);
        setToastMessage("Error deleting messages.");
        setShowToast(true);
      }
    },
    [messages]
  );

  const sendMessage = useCallback(
    async (message, files = uploadedFiles) => {
      if (!message.trim()) {
        setToastMessage("Please enter a message.");
        setShowToast(true);
        return;
      }

      // Check if Azure AI is configured
      if (!useAzureAI || !azureApiKey) {
        setToastMessage("Please configure Azure AI in settings first.");
        setShowToast(true);
        return;
      }

      const userMessage = { 
        role: "user", 
        content: message,
        id: generateMessageId()
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      setUploadedFiles([]);
      setIsLoading(true);
      setIsThinking(true);
      
      setTimeout(() => {
        setScrollTrigger((v) => v + 1);
      }, 0);

      try {
        // Call our Azure AI helper
        const assistantContent = await sendMessageToAzure(messages, userMessage, {
          azureApiKey,
          systemMessage,
          temperature
        });

        const assistantMessage = {
          role: "assistant",
          content: assistantContent,
          id: generateMessageId()
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Update conversation alias with first message if it's "New Chat"
        const currentConv = conversations.find(c => c.conversation_id === conversation_id);
        if (currentConv && currentConv.alias === "New Chat") {
          const newAlias = message.slice(0, 50) + (message.length > 50 ? "..." : "");
          updateConversation(conversation_id, newAlias);
        }

      } catch (error) {
        console.error('Azure AI Error:', error);
        setToastMessage("Failed to get response from Azure AI. Please check your API key and try again.");
        setShowToast(true);
        
        const errorMessage = {
          role: "assistant",
          content: "I'm sorry, I encountered an error while processing your request. Please make sure your Azure AI configuration is correct and try again.",
          id: generateMessageId()
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        setIsThinking(false);
        setTimeout(() => {
          setScrollTrigger((v) => v + 1);
        }, 100);
      }
    },
    [
      conversation_id,
      azureApiKey,
      useAzureAI,
      systemMessage,
      temperature,
      messages,
      conversations,
      updateConversation,
      uploadedFiles,
      setUploadedFiles
    ]
  );

  const resendMessage = useCallback(
    async (messageContent, deleteIndex = null) => {
      setIsLoading(true);
      try {
        if (deleteIndex !== null) {
          await deleteMessages(deleteIndex);
        }
        await sendMessage(messageContent);
      } catch (error) {
        console.error("Error resending message:", error);
        setToastMessage("Failed to resend message.");
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    },
    [deleteMessages, sendMessage]
  );

  const regenerateMessage = useCallback(
    async (messageIndex) => {
      try {
        const lastUserMessage = messages[messageIndex - 1];
        if (lastUserMessage && lastUserMessage.role === "user") {
          await resendMessage(lastUserMessage.content, messageIndex);
        }
      } catch (error) {
        console.error("Error regenerating message:", error);
        setToastMessage("Failed to regenerate message.");
        setShowToast(true);
      }
    },
    [messages, resendMessage]
  );

  const handleFileUpload = useCallback(
    async (acceptedFiles) => {
      try {
        const processedFiles = await processFiles(acceptedFiles);
        setUploadedFiles((prev) => [...prev, ...processedFiles]);
      } catch (error) {
        console.error("File upload error:", error);
        setToastMessage("Error uploading files.");
        setShowToast(true);
      }
    },
    [processFiles, setUploadedFiles]
  );

  const memoizedMessages = useMemo(() => {
    return messages.map((message, index) => (
      <Message
        key={message.id || index}
        message={message}
        index={index}
        lastMessage={index === messages.length - 1}
        resendMessage={resendMessage}
        regenerateMessage={regenerateMessage}
        setdeleteIndex={setdeleteIndex}
        setConfirmModal={setConfirmModal}
        isTouch={isTouch}
      />
    ));
  }, [messages, resendMessage, regenerateMessage, isTouch]);

  // Auto-scroll effect
  useEffect(() => {
    if (chatMessageRef.current && !userFixedScroll) {
      const scrollElement = chatMessageRef.current;
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [scrollTrigger, chatMessageRef, userFixedScroll]);

  // Handle scroll to detect user manual scrolling
  const handleScroll = useCallback(() => {
    if (chatMessageRef.current) {
      const scrollElement = chatMessageRef.current;
      const currentScrollTop = scrollElement.scrollTop;
      const scrollHeight = scrollElement.scrollHeight;
      const clientHeight = scrollElement.clientHeight;
      
      const isAtBottom = currentScrollTop + clientHeight >= scrollHeight - 10;
      setUserFixedScroll(!isAtBottom);
      
      lastScrollTopRef.current = currentScrollTop;
    }
  }, [chatMessageRef]);

  return (
    <div className="chat-container">
      <div 
        className="chat-messages"
        ref={chatMessageRef}
        onScroll={handleScroll}
      >
        <AnimatePresence>
          {memoizedMessages}
        </AnimatePresence>
        
        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="thinking-indicator"
          >
            <div className="thinking-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="chat-input-container">
        <InputContainer
          inputText={inputText}
          setInputText={setInputText}
          sendMessage={sendMessage}
          isLoading={isLoading}
          uploadedFiles={uploadedFiles}
          removeFile={removeFile}
          handleFileUpload={handleFileUpload}
          isDragActive={isDragActive}
          setIsDragActive={setIsDragActive}
          placeholder="Type your message..."
        />
      </div>

      <Modal show={confirmModal} onClose={() => setConfirmModal(false)}>
        <div className="confirm-modal">
          <h3>Delete Messages</h3>
          <p>Are you sure you want to delete this message and all messages after it?</p>
          <div className="modal-buttons">
            <button onClick={() => setConfirmModal(false)}>Cancel</button>
            <button onClick={() => deleteMessages(deleteIndex)}>Delete</button>
          </div>
        </div>
      </Modal>

      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default Chat;