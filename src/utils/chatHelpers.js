// Chat helper functions for Azure AI integration
import { createAzureAIClient } from './azureAI';

export const sendMessageToAzure = async (messages, userMessage, options = {}) => {
  const {
    azureApiKey,
    systemMessage,
    temperature = 0.7
  } = options;

  if (!azureApiKey) {
    throw new Error('Azure API key is required');
  }

  // Create Azure AI client
  const azureClient = createAzureAIClient(azureApiKey);
  
  // Prepare messages for API
  const apiMessages = [...messages, userMessage].map(msg => ({
    role: msg.role,
    content: typeof msg.content === 'string' ? msg.content : msg.content[0]?.text || msg.content
  }));

  // Add system message if configured
  if (systemMessage) {
    apiMessages.unshift({
      role: "system",
      content: systemMessage
    });
  }

  // Call Azure AI
  const response = await azureClient.sendMessage(apiMessages, {
    temperature: temperature,
    maxTokens: 1000
  });

  if (response.choices && response.choices[0]) {
    return response.choices[0].message.content;
  } else {
    throw new Error("No response from Azure AI");
  }
};

export const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;