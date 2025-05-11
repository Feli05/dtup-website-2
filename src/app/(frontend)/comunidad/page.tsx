import { fetchCategories } from "@/lib/api";
import CategoriesHero from "@/components/Categories/Hero";
import CategoryCarousel from "@/components/Categories/CategoryCarousel";

export default async function CommunityPage() {
  const categories = await fetchCategories();

  return (
    <main>
      {/* Hero Section with Search */}
      <CategoriesHero categories={categories} />

      {/* Categories Carousel */}
      <div className="w-full overflow-hidden">
        <CategoryCarousel categories={categories} />
      </div>
    </main>
  );
}
