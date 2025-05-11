import type { Category } from "@/payload-types";

// Define a basic mock category for testing
export interface MockCategory {
  id: string | number;
  title: string;
  slug: string;
  description: string;
  bgColor?: string;
  image?: {
    url?: string;
    alt?: string;
  } | null;
}

// Combined type to handle both Payload CMS categories and mock categories
export type CategoryWithImage = Category | MockCategory;

export interface CategoryCarouselProps {
  categories: CategoryWithImage[];
} 