import { NextRequest, NextResponse } from "next/server";
import type { Chat } from "@/lib/db/schema";
import storage from "@/lib/db/storage";

// Simple history endpoint that uses file-backed storage in `data/chats.json`.
// Query params: limit (number), ending_before (chatId)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const endingBefore = searchParams.get("ending_before");

    // Simulate authentication - replace with real session in production
    const userId = "user-1";

    let userChats = await storage.getChatsForUser(userId);

    // Sort by creation date (newest first)
    userChats.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Handle pagination by id
    if (endingBefore) {
      const endingBeforeIndex = userChats.findIndex((chat) => chat.id === endingBefore);
      if (endingBeforeIndex > -1) {
        userChats = userChats.slice(endingBeforeIndex + 1);
      }
    }

    const paginatedChats = userChats.slice(0, limit);
    const hasMore = userChats.length > limit;

    return NextResponse.json({ chats: paginatedChats, hasMore });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("id");

    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }

    // Simulate authentication - in a real app, you'd verify the session
    const userId = "user-1";

    const deleted = await storage.deleteChatById(chatId, userId);

    if (!deleted) {
      return NextResponse.json({ error: "Chat not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json({ error: "Failed to delete chat" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, userId = "user-1", visibility = "private" } = body || {};

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const chat: Chat = {
      id: `chat-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date(),
      title,
      userId,
      visibility,
    };

    await storage.addChat(chat);

    return NextResponse.json({ chat }, { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }
}