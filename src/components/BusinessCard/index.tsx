"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { InstagramIcon, FacebookIcon, WebsiteIcon, PhoneIcon, ChevronLeftIcon, ChevronRightIcon,CloseIcon } from "@/components/ui/icons";
import type { Business, Media } from "@/payload-types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BusinessCardProps {
  business: Business;
  allowExpandText?: boolean;
  allowExpandImage?: boolean;
}

export default function BusinessCard({ 
  business, 
  allowExpandText = false,
  allowExpandImage = true,
}: BusinessCardProps) {
  const [textExpanded, setTextExpanded] = useState(false);
  const [expandedImage, setExpandedImage] = useState<Media | null>(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  
  const maxLength = 150;
  const description = business.description || "";
  const truncatedDescription =
    description.length > maxLength && !textExpanded 
      ? description.substring(0, maxLength) + "..." 
      : description;

  const toggleTextExpanded = () => {
    setTextExpanded(prev => !prev);
  };

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

  // Handle expanded image navigation
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (expandedImageIndex - 1 + businessImages.length) % businessImages.length;
    setExpandedImageIndex(newIndex);
    setExpandedImage(businessImages[newIndex]);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (expandedImageIndex + 1) % businessImages.length;
    setExpandedImageIndex(newIndex);
    setExpandedImage(businessImages[newIndex]);
  };

  // Open expanded image with correct index
  const openExpandedImage = (image: Media) => {
    if (!allowExpandImage) return;
    
    const index = businessImages.findIndex(img => img.id === image.id);
    setExpandedImageIndex(index >= 0 ? index : 0);
    setExpandedImage(image);
  };

  return (
    <>
      <motion.div
        className="bg-dtup-beige rounded-3xl overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:shadow-md"
        style={{ minHeight: '26rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Business Images Carousel - expandable on hover */}
        <div 
          className="relative overflow-hidden business-image-carousel"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <div 
            className="transition-all duration-300 ease-in-out" 
            style={{ 
              height: isImageHovered ? '16rem' : '12rem'
            }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="h-full w-full"
            >
              {businessImages.map((image, index) => (
                <SwiperSlide key={`image-${index}`}>
                  <div 
                    className={`relative w-full h-full ${allowExpandImage ? 'cursor-pointer' : ''}`}
                    onClick={() => openExpandedImage(image)}
                  >
                    <Image
                      src={image.url || ''}
                      alt={image.alt || business.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        
        {/* Business Info */}
        <div className="p-6 flex flex-col flex-grow" style={{ minHeight: '14rem' }}>
          {/* Logo and Name */}
          <div className="flex items-center gap-3 mb-3 min-h-[3rem]">
            {businessLogo && (
              <div className="relative w-12 h-12 overflow-hidden rounded-full">
                <Image
                  src={businessLogo.url || ''}
                  alt={businessLogo.alt || `${business.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-2xl font-bold font-playfair">{business.name}</h3>
          </div>
          
          {/* Description */}
          <div className="min-h-[4.5rem] mb-4">
            <p className="text-gray-700">
              {truncatedDescription}
            </p>
          </div>
          
          {/* Expand button */}
          {allowExpandText && description.length > maxLength && (
            <button
              onClick={toggleTextExpanded}
              className="text-blue-600 hover:underline font-semibold mb-4"
            >
              {textExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}
          
          {/* Social Links */}
          <div className="mt-auto flex gap-3">
            {business.contact?.instagram && (
              <Link href={business.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
                <InstagramIcon />
              </Link>
            )}
            {business.contact?.facebook && (
              <Link href={business.contact.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                <FacebookIcon />
              </Link>
            )}
            {business.contact?.website && (
              <Link href={business.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                <WebsiteIcon />
              </Link>
            )}
            {business.contact?.phone && (
              <Link href={`tel:${business.contact.phone}`} className="text-green-600 hover:underline">
                <PhoneIcon />
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Expanded Image Modal with Navigation */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          {/* Image container */}
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={expandedImage.url || ''}
              alt={expandedImage.alt || ''}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain"
            />
            
            {/* Close button */}
            <button 
              className="absolute -top-4 -right-4 bg-white rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedImage(null);
              }}
            >
              <CloseIcon />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              {expandedImageIndex + 1} / {businessImages.length}
            </div>
          </div>

          {/* Navigation buttons - only show if there are multiple images */}
          {businessImages.length > 1 && (
            <>
              {/* Previous button - positioned at viewport edge */}
              <button 
                className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-all text-white"
                onClick={handlePrevImage}
              >
                <ChevronLeftIcon />
              </button>
              
              {/* Next button - positioned at viewport edge */}
              <button 
                className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-all text-white"
                onClick={handleNextImage}
              >
                <ChevronRightIcon />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
} 