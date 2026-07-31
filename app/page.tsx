import CategoryGrid from "@/components/home/CategoryGrid";
import HeroSection from "@/components/home/HeroSection";
import LatestResources from "@/components/home/LatestResources";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <HeroSection />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <CategoryGrid />

        <LatestResources />
      </main>

      <Footer />
    </div>
  );
}