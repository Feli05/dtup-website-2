import type { Category } from "@/payload-types";

export interface HeroImage {
  src: string;
  alt: string;
}

export interface SearchBarProps {
  categories: Category[];
  onSearch: (query: string, category?: string) => void;
}

export interface HeroProps {
  categories: Category[];
  onSearch: (query: string, category?: string) => void;
} 