"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import useMobile from "@/hooks/useMobile";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';

interface CustomCarouselProps {
  title: string;
  items: any[];
  renderItem: (item: any, index: number) => ReactNode;
  className?: string;
  slidesPerView?: { mobile: number; desktop: number };
  spaceBetween?: number;
  viewMoreHref?: string;
}

export default function CustomCarousel({
  title,
  items,
  renderItem,
  className = "",
  slidesPerView = { mobile: 1.3, desktop: 3.3 },
  spaceBetween = 32,
  viewMoreHref
}: CustomCarouselProps) {
  const isMobile = useMobile();

  return (
    <div className={`py-8 ${className}`}>
      {/* Title with optional "Ver más" link */}
      <div className="flex justify-between items-center mb-6 md:mb-8 px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-bold font-playfair">{title}</h2>
        {viewMoreHref && (
          <Link 
            href={viewMoreHref}
            className="text-sm md:text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:underline"
          >
            Ver más
          </Link>
        )}
      </div>
      
      {/* Swiper carousel with padding container */}
      <div className="overflow-visible">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          spaceBetween={spaceBetween}
          slidesPerView={isMobile ? slidesPerView.mobile : slidesPerView.desktop}
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
          {items.map((item, index) => (
            <SwiperSlide key={`item-${item.id || index}`} className="h-auto">
              {renderItem(item, index)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
} 