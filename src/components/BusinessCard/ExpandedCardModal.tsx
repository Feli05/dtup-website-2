"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/ui/icons";
import type { Business, Media } from "@/payload-types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ContactLinks from './ContactLinks';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface ExpandedCardModalProps {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpandedCardModal({ business, isOpen, onClose }: ExpandedCardModalProps) {
  const [expandedImageIndex, setExpandedImageIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  if (!isOpen) return null;

  const description = business.description || "";
  const businessLogo = business.logo && typeof business.logo === 'object' ? business.logo : null;

  // Prepare business images for carousel
  const businessImages = business.images
    .map(imageItem => {
      if (!imageItem || !imageItem.image) return null;
      const image = imageItem.image;
      return typeof image === 'object' ? image : null;
    })
    .filter((image): image is Media => image !== null);

  // Handle navigation
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl md:rounded-3xl w-full max-w-4xl h-[600px] md:h-[700px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 z-20 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        {/* Top Half - Image Carousel */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            initialSlide={expandedImageIndex}
            onSlideChange={(swiper) => setExpandedImageIndex(swiper.realIndex)}
            onSwiper={setSwiperInstance}
            className="h-full w-full"
          >
            {businessImages.map((image, index) => (
              <SwiperSlide key={`expanded-image-${index}`}>
                <div className="relative w-full h-full">
                  {/* Blurred background image */}
                  <div className="absolute inset-0">
                    <Image
                      src={image.url || ''}
                      alt=""
                      fill
                      className="object-cover blur-md scale-110"
                    />
                    {/* Dark overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  
                  {/* Main sharp image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={image.url || ''}
                      alt={image.alt || business.name}
                      fill
                      className="object-contain p-4 z-10"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm z-10">
            {expandedImageIndex + 1} / {businessImages.length}
          </div>

          {/* Custom Navigation buttons */}
          {businessImages.length > 1 && (
            <>
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 text-white z-10"
                onClick={handlePrevImage}
              >
                <ChevronLeftIcon />
              </button>
              
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 text-white z-10"
                onClick={handleNextImage}
              >
                <ChevronRightIcon />
              </button>
            </>
          )}
        </div>

        {/* Bottom Half - Business Info */}
        <div className="h-[336px] md:h-[380px] bg-dtup-beige p-6 md:p-8 overflow-y-auto">
          {/* Logo and Name */}
          <div className="flex items-center gap-4 mb-6">
            {businessLogo && (
              <div className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-full flex-shrink-0">
                <Image
                  src={businessLogo.url || ''}
                  alt={businessLogo.alt || `${business.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-bold font-playfair">{business.name}</h2>
          </div>
          
          {/* Contact Links */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Contacto</h3>
            <ContactLinks contact={business.contact} />
          </div>
          
          {/* Full Description */}
          <div className="border-t border-gray-300 pt-4">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
} 