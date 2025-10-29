import { notFound } from "next/navigation";
import storage from "@/lib/db/storage";
import { convertToUIMessages } from "@/lib/utils";

// Mock user - in real app this would come from auth
const mockUser = {
  id: "user-1",
  email: "guest@example.com",
  name: "Guest User",
};

export default async function ChatIdPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  // Get chat from storage
  const chat = await storage.getChatById(id);
  
  if (!chat) {
    notFound();
  }
  
  // Simple auth check - in real app use proper session
  if (chat.visibility === "private" && chat.userId !== mockUser.id) {
    notFound();
  }
  
  // Get messages for this chat
  const messagesFromDb = await storage.getMessagesByChatId(id);
  const uiMessages = convertToUIMessages(messagesFromDb);
  
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{chat.title}</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          {messagesFromDb.length} messages
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {uiMessages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No messages yet. Start a conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {uiMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="text-sm">
                    {message.parts
                      .filter((part) => part.type === "text")
                      .map((part, idx) => (
                        <p key={idx}>{part.text}</p>
                      ))}
                  </div>
                  <div className="mt-1 text-xs opacity-70">
                    {new Date(message.metadata.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input (placeholder) */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            disabled
          />
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            disabled
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Chat functionality will be connected soon
        </p>
      </div>
    </div>
  );
}