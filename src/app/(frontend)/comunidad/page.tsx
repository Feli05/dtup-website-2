export const revalidate = 60;

import { fetchCategories, fetchBusinesses } from "@/lib/api";
import CategoryPage from "@/components/Categories/CategoryPage";

export default async function CommunityPage() {
  const categories = await fetchCategories();
  const businesses = await fetchBusinesses();

  return <CategoryPage categories={categories} businesses={businesses} />;
}
