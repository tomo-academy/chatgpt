// Azure AI Foundry integration utility
export class AzureAIClient {
  constructor(endpoint, apiKey) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
  }

  async sendMessage(messages, options = {}) {
    const {
      temperature = 0.7,
      maxTokens = 1000,
      model = "gpt-4o-mini"
    } = options;

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify({
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Azure AI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Azure AI API error:', error);
      throw error;
    }
  }

  async sendMessageStream(messages, options = {}, onChunk) {
    const {
      temperature = 0.7,
      maxTokens = 1000,
      model = "gpt-4o-mini"
    } = options;

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify({
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`Azure AI API error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.choices?.[0]?.delta?.content) {
                onChunk(parsed.choices[0].delta.content);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Azure AI streaming error:', error);
      throw error;
    }
  }
}

// Default Azure AI instance
export const createAzureAIClient = (apiKey) => {
  const endpoint = 'https://lynxa.cognitiveservices.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview';
  return new AzureAIClient(endpoint, apiKey);
};