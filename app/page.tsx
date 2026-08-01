import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedResources from "@/components/home/FeaturedResources";
import HeroSection from "@/components/home/HeroSection";
import LatestResources from "@/components/home/LatestResources";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import { categoryRepository } from "@/lib/category-repository";
import { resourceRepository } from "@/lib/resource-repository";

export default async function HomePage() {
 const [
  categories,
  latestResources,
  featuredResources,
] = await Promise.all([
  categoryRepository.getPublishedCategories(),
  resourceRepository.getLatestResources(),
  resourceRepository.getFeaturedResources(),
]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <HeroSection />

      <main className="mx-auto max-w-7xl px-6 py-16 space-y-16">
        <CategoryGrid categories={categories} />

        <FeaturedResources
          resources={featuredResources}
        />

        <LatestResources
          resources={latestResources}
        />
      </main>

      <Footer />
    </div>
  );
}