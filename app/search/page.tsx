import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResourceCard from "@/components/home/ResourceCard";

import { resourceRepository } from "@/lib/resource-repository";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
    }>;
}

export default async function SearchPage({
    searchParams,
}: SearchPageProps) {
    const { q } = await searchParams;

    const query = q?.trim() ?? "";

    const resources = query
        ? await resourceRepository.searchResources(query)
        : [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Search
                    </h1>

                    {query ? (
                        <p className="mt-3 text-gray-600">
                            {resources.length} result
                            {resources.length !== 1 ? "s" : ""} for{" "}
                            <span className="font-semibold">
                                &quot;{query}&quot;
                            </span>
                        </p>
                    ) : (
                        <p className="mt-3 text-gray-600">
                            Enter a keyword to search resources.
                        </p>
                    )}
                </div>

                {query && resources.length === 0 && (
                    <div className="rounded-xl border bg-white p-10 text-center">
                        <h2 className="text-2xl font-semibold">
                            No resources found
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Try searching with another title,
                            author, or language.
                        </p>

                        <Link
                            href="/"
                            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                        >
                            Back to Home
                        </Link>
                    </div>
                )}

                {resources.length > 0 && (
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
                )}
            </main>

            <Footer />
        </div>
    );
}