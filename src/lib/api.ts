import type { Category } from "@/payload-types";
import { getPayload } from "payload";
import configPromise from "@payload-config";

// Fetch all categories (with their nested businesses)
export async function fetchCategories(): Promise<Category[]> {
  const payload = await getPayload({ config: configPromise });
  const categories = await payload.find({
    collection: "categories",
    depth: 1,
  });
  
  return categories.docs;
}

