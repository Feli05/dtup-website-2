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
      <div className="flex justify-between items-start gap-4 mb-6 md:mb-8 px-4 md:px-6">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold font-playfair flex-grow">{title}</h2>
        {viewMoreHref && (
          <Link 
            href={viewMoreHref}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
          >
            Ver más
          </Link>
        )}
      </div>
      
      {/* Swiper carousel with padding container */}
      <div className="relative overflow-visible">
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
          grabCursor={true}
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
        
        {/* Right edge gradient hint - only show if there are more items */}
        {items.length > (isMobile ? slidesPerView.mobile : slidesPerView.desktop) && (
          <div className="absolute top-0 right-0 w-8 md:w-12 h-full bg-gradient-to-l from-white via-white/60 to-transparent pointer-events-none z-10" />
        )}
        
        {/* Subtle scroll indicator */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>←</span>
            <span>Desliza para ver más</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
} 