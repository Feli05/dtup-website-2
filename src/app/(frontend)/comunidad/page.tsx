"use client";

import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";
import type { Category, Media } from "@/payload-types";

export default function CommunityPage() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return <p className="text-center py-12">Cargando categorías…</p>;
  }
  if (error) {
    return (
      <p className="text-center py-12 text-red-500">
        Error al cargar categorías: {error.message}
      </p>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Comunidad</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-12">
        Explora nuestras diferentes categorías de comunidad y encuentra
        información relevante para ti.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories!.map((cat: Category) => {
          // adjust these fields if your Category type differs
          const slug        = cat.slug;
          const title       = cat.title;
          const description = cat.description;
          const imgUrl      = (cat.image as Media).url;

          return (
            <Link
              key={slug}
              href={`/comunidad/${slug}`}
              className="block group"
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                {imgUrl && (
                  <div className="h-48 relative">
                    <Image
                      src={imgUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{title}</h2>
                  <p className="text-gray-600">{description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
