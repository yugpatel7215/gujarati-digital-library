import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResourceCard from "@/components/home/ResourceCard";

import { resourceRepository } from "@/lib/resource-repository";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const resources =
    await resourceRepository.getResourcesByCategorySlug(slug);

  if (resources.length === 0) {
    notFound();
  }

  const category = resources[0].category;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <span className="mx-2">/</span>

          <span>{category.name}</span>
        </div>

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">
            {category.name}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            {category.description ??
              "Browse all resources in this category."}
          </p>

          <p className="mt-6 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            {resources.length} Resource
            {resources.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      </main>

      <Footer />
    </div>
  );
}