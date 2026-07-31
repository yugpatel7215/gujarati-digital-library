import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  const categories = [
    {
      name: "Bhajan",
      description: "Gujarati devotional songs.",
    },
    {
      name: "Chalisa",
      description: "Popular Hindu chalisas.",
    },
    {
      name: "Aarti",
      description: "Daily aarti collection.",
    },
    {
      name: "Books",
      description: "Religious books and scriptures.",
    },
  ];

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
            key={category.name}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </section>
  );
}