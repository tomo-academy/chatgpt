import { redirect } from "next/navigation";

export default function ChatIndexPage() {
  // Redirect /chat to the app root where the chat UI lives
  redirect("/");
}
