import { notFound } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { resourceRepository } from "@/lib/resource-repository";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const resource = await resourceRepository.getResourceBySlug(slug);

  if (
    !resource ||
    !resource.isPublished ||
    !resource.category.isActive
  ) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href={`/categories/${resource.category.slug}`}
            className="hover:text-blue-600"
          >
            {resource.category.name}
          </Link>

          <span className="mx-2">/</span>

          <span>{resource.title}</span>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow">
          {resource.thumbnailUrl && (
            <div className="mb-8 flex justify-center">
              <img
                src={resource.thumbnailUrl}
                alt={resource.title}
                className="max-h-[450px] w-auto rounded-xl object-cover shadow-lg"
              />
            </div>
          )}

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {resource.category.name}
          </span>

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            {resource.title}
          </h1>

          <p className="mt-4 text-gray-600">
            {resource.description ??
              "No description available."}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-gray-900">
                Author
              </h3>

              <p className="mt-1 text-gray-600">
                {resource.author ?? "Unknown"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Language
              </h3>

              <p className="mt-1 text-gray-600">
                {resource.language}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Resource Type
              </h3>

              <p className="mt-1 text-gray-600">
                {resource.type}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Published On
              </h3>

              <p className="mt-1 text-gray-600">
                {resource.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t pt-8">
            {resource.type === "EXTERNAL_LINK" && (
              <a
                href={resource.externalUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Visit Website
              </a>
            )}

            {resource.type === "PDF" && (
              <a
                href={resource.fileUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
              >
                📄 Read PDF
              </a>
            )}

            {resource.type === "EPUB" && (
              <a
                href={resource.fileUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
              >
                📚 Download EPUB
              </a>
            )}

            {resource.type === "AUDIO" && (
              <a
                href={resource.fileUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
              >
                🎵 Listen Audio
              </a>
            )}

            {resource.type === "VIDEO" && (
              <a
                href={resource.fileUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition hover:bg-orange-700"
              >
                🎬 Watch Video
              </a>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}