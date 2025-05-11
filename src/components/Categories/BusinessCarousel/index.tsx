"use client";

import { motion } from "framer-motion";
import type { BusinessCarouselProps } from "./types";
import CustomCarousel from "@/components/ui/CustomCarousel";
import BusinessCard from "@/components/BusinessCard";
import { Business } from "@/payload-types";

export default function BusinessCarousel({ businesses = [] }: BusinessCarouselProps) {
  // Early return if no businesses
  if (businesses.length === 0) {
    return null;
  }

  const renderBusinessCard = (business: Business, index: number) => (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <BusinessCard business={business} allowExpandText={false} allowExpandImage={false} />
    </motion.div>
  );

  return (
    <CustomCarousel
      title="Añadidos recientemente"
      items={businesses}
      renderItem={renderBusinessCard}
      slidesPerView={{ mobile: 1.3, desktop: 3.3 }}
    />
  );
} 