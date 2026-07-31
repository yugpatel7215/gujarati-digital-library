import { auth } from "@/lib/auth";

export default async function Topbar() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Panel
        </h1>
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-900">
          {session?.user?.name ?? "Administrator"}
        </p>

        <p className="text-sm text-gray-500">
          {session?.user?.email}
        </p>
      </div>
    </header>
  );
}