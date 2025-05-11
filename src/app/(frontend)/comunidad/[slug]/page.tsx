import { notFound } from 'next/navigation';
import { fetchCategories } from '@/lib/api';
import CategorySlug from '@/components/CategorySlug';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const categories = await fetchCategories();
  const category = categories.find(cat => cat.slug === slug);

  if (!category) {
    notFound();
  }

  return <CategorySlug category={category} />;
} 