import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// Mock user data - in a real app, this would come from authentication
const mockUser = {
  id: "user-1",
  email: "guest@example.com",
  name: "Guest User",
  image: "https://avatar.vercel.sh/guest",
};

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar user={mockUser} />
      <SidebarInset className="flex flex-col">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}