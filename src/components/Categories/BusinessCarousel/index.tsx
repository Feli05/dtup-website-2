import type { BusinessCarouselProps } from "./types";
import CustomCarousel from "@/components/ui/CustomCarousel";
import BusinessCard from "@/components/BusinessCard";
import { Business } from "@/payload-types";

export default function BusinessCarousel({ businesses = [], title, categorySlug, maxItems }: BusinessCarouselProps) {
  // Limit businesses to maxItems
  const displayBusinesses = businesses.slice(0, maxItems);

  const renderBusinessCard = (business: Business, index: number) => (
    <BusinessCard business={business} />
  );

  return (
    <CustomCarousel
      title={title}
      items={displayBusinesses}
      renderItem={renderBusinessCard}
      slidesPerView={{ mobile: 1.3, desktop: 3.3 }}
      viewMoreHref={`/comunidad/${categorySlug}`}
    />
  );
} 