"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CategoryCarouselProps } from "./types";
import useMobile from "@/hooks/useMobile";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';

// Mock data for testing
const MOCK_CATEGORIES = [
  {
    id: '1',
    title: 'Moda',
    slug: 'moda',
    description: 'Descubra las últimas tendencias en moda y accesorios de diseñadores locales.',
    bgColor: 'bg-[#F8D0C0]',
    image: {
      url: '/mock/moda.jpg',
      alt: 'Moda y accesorios'
    }
  },
  {
    id: '2',
    title: 'Comida',
    slug: 'comida',
    description: 'Deliciosas opciones gastronómicas de emprendedores locales.',
    bgColor: 'bg-[#F8F0C8]',
    image: {
      url: '/mock/comida.jpg',
      alt: 'Comida y gastronomía'
    }
  },
  {
    id: '3',
    title: 'Hogar',
    slug: 'hogar',
    description: 'Productos artesanales para convertir tu casa en un hogar especial.',
    bgColor: 'bg-[#D0E2D8]',
    image: {
      url: '/mock/hogar.jpg',
      alt: 'Productos para el hogar'
    }
  },
  {
    id: '4',
    title: 'Belleza',
    slug: 'belleza',
    description: 'Productos y servicios de belleza y cuidado personal de alta calidad.',
    bgColor: 'bg-[#F8E0E0]',
    image: {
      url: '/mock/belleza.jpg',
      alt: 'Belleza y cuidado personal'
    }
  }
];

export default function CategoryCarousel({ categories = [] }: CategoryCarouselProps) {
  // Use mock data if no categories are provided
  const displayCategories = MOCK_CATEGORIES;
  const isMobile = useMobile();

  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold text-center mb-8 font-playfair">Explora por Categorías</h2>
      
      {/* Swiper carousel with padding container */}
      <div className="overflow-visible">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          spaceBetween={32}
          slidesPerView={isMobile ? 1.3 : 3.3}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.8,
            momentumVelocityRatio: 0.8,
            minimumVelocity: 0.1
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1.5
          }}
          grabCursor={false}
          className="w-full py-4 px-6 carousel"
          slidesOffsetBefore={8}
          slidesOffsetAfter={8}
        >
          {displayCategories.map((category, index) => (
            <SwiperSlide key={`${category.id}-${index}`} className="h-auto">
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
                    className={`rounded-3xl overflow-hidden h-full flex flex-col text-center shadow-sm transition-all duration-300 hover:shadow-md ${category.bgColor}`}
                  >
                    {/* Circular image at the top */}
                    <div className="pt-8 pb-4 px-8 flex justify-center">
                      <div className="relative w-48 h-48 overflow-hidden rounded-full border-4 border-white shadow-md">
                        <Image
                          src={category.image.url}
                          alt={category.image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Text content */}
                    <div className="p-6 flex-grow flex flex-col items-center justify-center">
                      <h3 className="text-3xl font-bold mb-3 font-playfair">{category.title}</h3>
                      <p className="text-gray-700 line-clamp-2">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
} 