"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CategoryCarouselProps } from "./types";
import CustomCarousel from "@/components/ui/CustomCarousel";
import { Category } from "@/payload-types";

export default function CategoryCarousel({ categories = [] }: CategoryCarouselProps) {
  // Early return if no categories are available
  if (categories.length === 0) {
    return null;
  }

  const renderCategoryCard = (category: Category, index: number) => {
    const categoryImage = typeof category.image === 'object' ? category.image : null;
    
    return (
      <motion.div
        className="h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: index * 0.1 }}
        whileHover={{ 
          scaleX: 1.06,
          transition: { duration: 0.15 }
        }}
      >
        <Link href={`/comunidad/${category.slug}`} className="block h-full">
          <div 
            className="rounded-3xl overflow-hidden h-full flex flex-col text-center shadow-sm transition-all duration-300 hover:shadow-md"
            style={{ backgroundColor: category.bgColor }}
          >
            {/* Circular image at the top */}
            <div className="pt-8 pb-4 px-8 flex justify-center">
              <div className="relative w-48 h-48 overflow-hidden rounded-full border-4 border-white shadow-md">
                {categoryImage && (
                  <Image
                    src={categoryImage.url || ''}
                    alt={categoryImage.alt || category.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            
            {/* Text content */}
            <div className="p-6 flex-grow flex flex-col items-center justify-center">
              <h3 className="text-3xl font-bold mb-3 font-playfair h-[4rem] flex items-center">{category.title}</h3>
              <p className="text-gray-700 line-clamp-2">{category.description}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <CustomCarousel
      title="Explora por Categorías"
      items={categories}
      renderItem={renderCategoryCard}
      slidesPerView={{ mobile: 1.3, desktop: 3.3 }}
    />
  );
} 