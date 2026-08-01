import Link from "next/link";

interface ResourceCardProps {
  title: string;
  slug: string;
  author?: string | null;
  category: string;
}

export default function ResourceCard({
  title,
  slug,
  author,
  category,
}: ResourceCardProps) {

  return (
    <Link href={`/resources/${slug}`}>
      <div className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg">
        <div className="mb-4 text-5xl">📖</div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {category}
        </span>

        <h3 className="mt-4 text-xl font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-gray-600">
          {author ?? "Unknown Author"}
        </p>
      </div>
    </Link>
  );
}