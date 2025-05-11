import Link from 'next/link';
import BusinessCard from '@/components/BusinessCard';
import { CategorySlugProps } from './types';
import { Business } from '@/payload-types';
import { ChevronLeftIcon } from '@/components/ui/icons';

export default function CategorySlug({ category }: CategorySlugProps) {
  // Extract businesses from category
  const businesses = category.businesses
    ? category.businesses
        .filter(business => typeof business === 'object')
        .map(business => business as Business)
    : [];

  return (
    <div>
      {/* Hero section with gradient background and navigation */}
      <div 
        className="w-full py-16 md:py-24 mt-24 md:mt-16" 
        style={{ 
          background: category.bgColor 
        }}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="md:flex md:items-start">
            {/* Navigation back button */}
            <div className="mb-6 md:mb-0 md:mr-8 md:pt-2">
              <Link 
                href="/comunidad" 
                className="inline-flex items-center gap-1 text-gray-800 hover:opacity-80 transition-opacity"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                <span>Volver</span>
              </Link>
            </div>
            
            {/* Hero content */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">{category.title}</h1>
              <p className="text-lg text-gray-800 max-w-3xl mx-auto md:mx-0">{category.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Businesses list */}
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businesses.map((business) => (
                <BusinessCard 
                  key={business.id} 
                  business={business} 
                  allowExpandText={true}
                  allowExpandImage={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">Aún no hay negocios en esta categoría</h2>
              <p className="text-gray-600">Estamos trabajando para agregar más negocios pronto.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 