import Link from "next/link";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Categories",
    href: "/admin/categories",
  },
  {
    name: "Resources",
    href: "/admin/resources",
  },
  {
    name: "Admins",
    href: "/admin/admins",
  },
  {
    name: "Settings",
    href: "/admin/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-xl font-bold">
          Gujarati Digital Library
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-4 py-3 transition hover:bg-slate-800"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-700 p-4">
        <p className="text-center text-sm text-slate-400">
          Version 1.0
        </p>
      </div>
    </aside>
  );
}