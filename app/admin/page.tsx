import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Gujarati Digital Library
          </h1>

          <div className="text-right">
            <p className="font-medium text-gray-900">
              {session.user?.name ?? "Administrator"}
            </p>

            <p className="text-sm text-gray-500">
              {session.user?.email}
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl p-8">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Dashboard
        </h2>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-gray-500">Categories</h3>

            <p className="mt-3 text-4xl font-bold text-blue-600">
              0
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-gray-500">Resources</h3>

            <p className="mt-3 text-4xl font-bold text-green-600">
              0
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-gray-500">Downloads</h3>

            <p className="mt-3 text-4xl font-bold text-purple-600">
              0
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-gray-500">Views</h3>

            <p className="mt-3 text-4xl font-bold text-orange-600">
              0
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-white p-6 shadow">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Welcome
          </h3>

          <p className="text-gray-600">
            You have successfully logged in as an administrator.
          </p>
        </div>
      </section>
    </main>
  );
}