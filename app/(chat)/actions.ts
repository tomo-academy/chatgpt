"use server";

import type { VisibilityType } from "@/components/visibility-selector";

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  // TODO: Implement database update when database is set up
  console.log(`Updating chat ${chatId} visibility to ${visibility}`);
  return { success: true };
}

export async function deleteChat({ id }: { id: string }) {
  // TODO: Implement database deletion when database is set up
  console.log(`Deleting chat ${id}`);
  return { success: true };
}
