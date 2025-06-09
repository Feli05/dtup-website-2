import type { Business } from "@/payload-types";

export interface BusinessCarouselProps {
  businesses: Business[];
  title: string;
  categorySlug: string;
  maxItems: number;
}
