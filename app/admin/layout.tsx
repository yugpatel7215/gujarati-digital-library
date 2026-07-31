import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}