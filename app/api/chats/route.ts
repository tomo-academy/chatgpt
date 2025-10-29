import { NextRequest, NextResponse } from "next/server";
import storage from "@/lib/db/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title = "New Chat", visibility = "private" } = body;
    
    // Create new chat
    const chatId = `chat-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    const newChat = {
      id: chatId,
      title,
      userId: userId || "user-1",
      visibility: visibility as "private" | "public",
      createdAt: new Date(),
      path: `/chat/${chatId}`,
    };
    
    await storage.addChat(newChat);
    
    return NextResponse.json({ 
      success: true, 
      chat: newChat 
    });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    const chats = await storage.getChatsForUser(userId || "user-1");
    
    // Transform to match expected format
    return NextResponse.json({ 
      chats,
      hasMore: false // For now, we'll load all chats at once
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}