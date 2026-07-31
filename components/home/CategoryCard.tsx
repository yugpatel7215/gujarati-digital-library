interface CategoryCardProps {
  name: string;
  description?: string | null;
}

export default function CategoryCard({
  name,
  description,
}: CategoryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 text-5xl">📚</div>

      <h3 className="text-xl font-semibold text-gray-900">
        {name}
      </h3>

      <p className="mt-2 text-gray-600">
        {description ?? "No description available."}
      </p>
    </div>
  );
}