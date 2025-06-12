"use client";

import { useState, useMemo, memo } from "react";
import Image from "next/image";
import type { Business, Media } from "@/payload-types";
import ContactLinks from './ContactLinks';
import ExpandedCardModal from './ExpandedCardModal';
import { ZoomIcon } from '@/components/ui/icons';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = memo(function BusinessCard({ 
  business, 
}: BusinessCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Memoize processed data to avoid recalculation on re-renders
  const processedData = useMemo(() => {
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

    return {
      truncatedDescription,
      businessLogo,
      businessImages,
      primaryImage: businessImages[0] || null
    };
  }, [business.description, business.logo, business.images]);

  const openExpandedCard = () => {
    setIsExpanded(true);
  };

  const closeExpandedCard = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <div 
        className="bg-dtup-beige rounded-2xl md:rounded-3xl overflow-hidden flex flex-col h-[26rem] cursor-pointer hover:opacity-90 transition-opacity relative border border-gray-300/70"
        onClick={openExpandedCard}
      >
        {/* Business Image */}
        <div className="relative overflow-hidden h-44 bg-gray-100">
          {processedData.primaryImage && (
            <Image
              src={processedData.primaryImage.url || ''}
              alt={processedData.primaryImage.alt || business.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={75}
            />
          )}
        </div>
        
        {/* Business Info */}
        <div className="p-4 md:p-6 flex flex-col flex-grow">
          {/* Logo and Name */}
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            {processedData.businessLogo && (
              <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full flex-shrink-0 bg-gray-100">
                <Image
                  src={processedData.businessLogo.url || ''}
                  alt={processedData.businessLogo.alt || `${business.name} logo`}
                  fill
                  className="object-cover"
                  sizes="48px"
                  loading="lazy"
                  quality={75}
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
              {processedData.truncatedDescription}
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
        onClose={closeExpandedCard}
      />
    </>
  );
});

export default BusinessCard; 