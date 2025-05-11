"use client";

import { ReactNode } from "react";
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
}

export default function CustomCarousel({
  title,
  items,
  renderItem,
  className = "",
  slidesPerView = { mobile: 1.3, desktop: 3.3 },
  spaceBetween = 32
}: CustomCarouselProps) {
  const isMobile = useMobile();

  return (
    <div className={`py-8 ${className}`}>
      <h2 className="text-4xl font-bold text-center mb-8 font-playfair">{title}</h2>
      
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