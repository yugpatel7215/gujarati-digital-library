import ResourceCard from "./ResourceCard";

interface FeaturedResourcesProps {
  resources: {
    id: string;
    title: string;
    slug: string;
    author: string | null;
    category: {
      name: string;
    };
  }[];
}

export default function FeaturedResources({
  resources,
}: FeaturedResourcesProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Featured Resources
        </h2>

        <p className="mt-2 text-gray-600">
          Hand-picked resources recommended by our editors.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            title={resource.title}
            slug={resource.slug}
            author={resource.author}
            category={resource.category.name}
          />
        ))}
      </div>
    </section>
  );
}