import CategoryCard from "./CategoryCard";

type CategoryGridProps = {
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }[];
};

export default function CategoryGrid({
  categories,
}: CategoryGridProps) {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Featured Categories
        </h2>

        <p className="mt-2 text-gray-600">
          Browse resources by category.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            slug={category.slug}
            description={category.description ?? ""}
          />
        ))}
      </div>
    </section>
  );
}