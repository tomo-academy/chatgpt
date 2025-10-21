// Simple localStorage-based chat persistence
export class ChatPersistence {
  private static STORAGE_KEY = 'chatgpt-conversations';

  static saveConversation(messages: any[]) {
    try {
      const conversations = this.getConversations();
      const timestamp = new Date().toISOString();
      const conversationId = Date.now().toString();
      
      conversations[conversationId] = {
        id: conversationId,
        messages,
        timestamp,
        title: messages[0]?.content?.[0]?.text?.substring(0, 50) || 'New Conversation'
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(conversations));
      return conversationId;
    } catch (error) {
      console.error('Failed to save conversation:', error);
      return null;
    }
  }

  static getConversations(): Record<string, any> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load conversations:', error);
      return {};
    }
  }

  static getConversation(id: string) {
    const conversations = this.getConversations();
    return conversations[id] || null;
  }

  static deleteConversation(id: string) {
    try {
      const conversations = this.getConversations();
      delete conversations[id];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(conversations));
      return true;
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      return false;
    }
  }

  static clearAll() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear conversations:', error);
      return false;
    }
  }
}