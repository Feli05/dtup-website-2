"use client";

import { useState } from "react";
import CategoriesHero from "@/components/Categories/Hero";
import BusinessCarousel from "@/components/Categories/BusinessCarousel";
import BusinessCard from "@/components/BusinessCard";
import { Button } from "@/components/ui/button";
import { Business, Category } from "@/payload-types";

interface CategoryPageProps {
  categories: Category[];
  businesses: Business[];
}

export default function CategoryPage({ categories, businesses }: CategoryPageProps) {
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = async (query: string, categoryId?: string) => {
    if (!query && !categoryId) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      const params = new URLSearchParams();
      if (query) params.append('search', query);
      if (categoryId) params.append('category', categoryId);
      
      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      
      setSearchResults(data.businesses || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleReset = () => {
    setHasSearched(false);
    setSearchResults([]);
  };
  
  return (
    <main className="bg-dtup-beige-light">
      {/* Hero Section with Search */}
      <CategoriesHero categories={categories} onSearch={handleSearch} />

      {isSearching ? (
        <div className="container mx-auto py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" />
        </div>
      ) : hasSearched ? (
        <div className="container mx-auto py-8">
          {searchResults.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Resultados de búsqueda</h2>
                <Button variant="outline" onClick={handleReset}>
                  Volver a categorías
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((business) => (
                  <BusinessCard 
                    key={business.id} 
                    business={business} 
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">No se encontraron resultados</h2>
              <p className="text-gray-600 mb-6">Intente con diferentes términos de búsqueda</p>
              <Button onClick={handleReset}>
                Volver a categorías
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Business Carousels - One per Category */}
          <div className="w-full overflow-visible">
            {categories.map((category) => {
              // Extract businesses from category object
              const categoryBusinesses = category.businesses
                ? category.businesses
                    .filter(business => typeof business === 'object')
                    .map(business => business as Business)
                : [];
              
              return (
                <BusinessCarousel
                  key={category.id}
                  title={category.title}
                  businesses={categoryBusinesses}
                  categorySlug={category.slug}
                  maxItems={6}
                />
              );
            })}
          </div>
        </>
      )}
    </main>
  );
} 