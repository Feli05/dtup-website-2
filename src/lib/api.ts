const BASE = process.env.NEXT_PUBLIC_PAYLOAD_URL!;
import { Category } from "@/payload-types";

// Fetch all categories (with their nested businesses)
export async function fetchCategories() {
  const res = await fetch(`${BASE}/api/categories?depth=1`, {
    headers: {
      "Authorization": `categories API-Key ${process.env.NEXT_PUBLIC_PAYLOAD_API_KEY}`,
    }
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const json = await res.json();
  return json.docs as Category[];
}

