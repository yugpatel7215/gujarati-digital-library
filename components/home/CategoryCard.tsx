import Link from "next/link";

interface CategoryCardProps {
  name: string;
  slug: string;
  description?: string | null;
}

export default function CategoryCard({
  name,
  slug,
  description,
}: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-500 cursor-pointer">
        <div className="mb-4 text-5xl">📚</div>

        <h3 className="text-xl font-semibold text-gray-900">
          {name}
        </h3>

        <p className="mt-2 text-gray-600">
          {description ?? "No description available."}
        </p>
      </div>
    </Link>
  );
}