import ResourceCard from "./ResourceCard";

export default function LatestResources() {
  const resources = [
    {
      title: "Hanuman Chalisa",
      author: "Tulsidas",
      category: "Chalisa",
    },
    {
      title: "Shiv Mahimna",
      author: "Unknown",
      category: "Bhajan",
    },
    {
      title: "Durga Aarti",
      author: null,
      category: "Aarti",
    },
  ];

  return (
    <section className="mt-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Latest Resources
        </h2>

        <p className="mt-2 text-gray-600">
          Recently added resources.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.title}
            title={resource.title}
            author={resource.author}
            category={resource.category}
          />
        ))}
      </div>
    </section>
  );
}