import { fetchCategories, fetchBusinesses } from "@/lib/api";
import CategoriesHero from "@/components/Categories/Hero";
import CategoryCarousel from "@/components/Categories/CategoryCarousel";
import BusinessCarousel from "@/components/Categories/BusinessCarousel";

export default async function CommunityPage() {
  const categories = await fetchCategories();
  const businesses = await fetchBusinesses();

  return (
    <main>
      {/* Hero Section with Search */}
      <CategoriesHero categories={categories} />

      {/* Categories Carousel */}
      <div className="w-full overflow-hidden">
        <CategoryCarousel categories={categories} />
      </div>

      {/* Business Carousel */}
      <div className="w-full overflow-hidden">
        <BusinessCarousel businesses={businesses} />
      </div>
    </main>
  );
}
