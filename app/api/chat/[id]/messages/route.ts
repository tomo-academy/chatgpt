import { NextRequest, NextResponse } from "next/server";
import storage from "@/lib/db/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get messages for the chat
    const messages = await storage.getMessagesByChatId(id);
    
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await params; // Use params to avoid unused variable warning
    const body = await request.json();
    
    const { messages } = body;
    
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages must be an array" },
        { status: 400 }
      );
    }
    
    // Save messages to the chat
    await storage.saveMessages(messages);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving messages:", error);
    return NextResponse.json(
      { error: "Failed to save messages" },
      { status: 500 }
    );
  }
}