"use client";

import { useState } from "react";
import Image from "next/image";
import type { Business, Media } from "@/payload-types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ContactLinks from './ContactLinks';
import ExpandedCardModal from './ExpandedCardModal';
import { ZoomIcon } from '@/components/ui/icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ 
  business, 
}: BusinessCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const maxLength = 150;
  const description = business.description || "";
  const truncatedDescription =
    description.length > maxLength 
      ? description.substring(0, maxLength) + "..." 
      : description;

  // Get business logo if it exists (logo is optional)
  const businessLogo = business.logo && typeof business.logo === 'object' ? business.logo : null;

  // Prepare business images for carousel
  const businessImages = business.images
    .map(imageItem => {
      if (!imageItem || !imageItem.image) return null;
      const image = imageItem.image;
      return typeof image === 'object' ? image : null;
    })
    .filter((image): image is Media => image !== null);

  const openExpandedCard = () => {
    setIsExpanded(true);
  };

  return (
    <>
      <div 
        className="bg-dtup-beige rounded-2xl md:rounded-3xl overflow-hidden flex flex-col h-[26rem] cursor-pointer hover:opacity-90 transition-opacity relative border border-gray-300/70"
        onClick={openExpandedCard}
      >
        {/* Business Image */}
        <div className="relative overflow-hidden h-44">
          {businessImages.length > 0 && (
            <Image
              src={businessImages[0].url || ''}
              alt={businessImages[0].alt || business.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        
        {/* Business Info */}
        <div className="p-4 md:p-6 flex flex-col flex-grow">
          {/* Logo and Name */}
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            {businessLogo && (
              <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full flex-shrink-0">
                <Image
                  src={businessLogo.url || ''}
                  alt={businessLogo.alt || `${business.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-lg md:text-xl font-bold font-playfair overflow-hidden" style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>{business.name}</h3>
          </div>
          
          {/* Description */}
          <div className="flex-grow mb-3 md:mb-4 overflow-hidden">
            <p className="text-sm md:text-base text-gray-700">
              {truncatedDescription}
            </p>
          </div>
          
          {/* Social Links */}
          <div className="mt-auto">
            <ContactLinks contact={business.contact} />
          </div>
        </div>
        
        {/* Expand/Zoom Icon */}
        <div className="absolute bottom-3 right-3 bg-black/50 rounded-full p-2 text-white">
          <ZoomIcon />
        </div>
      </div>

      <ExpandedCardModal 
        business={business}
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
      />
    </>
  );
} 