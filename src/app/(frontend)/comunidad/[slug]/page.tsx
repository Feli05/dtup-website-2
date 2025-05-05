import { notFound } from 'next/navigation';
import Link from 'next/link';

// Valid category slugs
const validSlugs = [
  'moda',
  'salud',
  'comida',
  'servicios',
  'vivienda',
  'bienestar',
  'entretenimiento',
  'logistica',
];

// Type for category content
type CategoryContent = {
  title: string;
  description: string;
  imageUrl?: string;
};

// Sample content for categories
const categoryContent: Record<string, CategoryContent> = {
  moda: {
    title: 'Moda',
    description: 'Descubre las últimas tendencias de moda en nuestra comunidad.',
    imageUrl: '/images/categories/moda.jpg'
  },
  salud: {
    title: 'Salud',
    description: 'Información y recursos sobre salud y bienestar.',
    imageUrl: '/images/categories/salud.jpg'
  },
  comida: {
    title: 'Comida',
    description: 'Explora la gastronomía y recetas de nuestra comunidad.',
    imageUrl: '/images/categories/comida.jpg'
  },
  servicios: {
    title: 'Servicios',
    description: 'Servicios disponibles en nuestra comunidad.',
    imageUrl: '/images/categories/servicios.jpg'
  },
  vivienda: {
    title: 'Vivienda',
    description: 'Información sobre vivienda y alojamiento.',
    imageUrl: '/images/categories/vivienda.jpg'
  },
  bienestar: {
    title: 'Bienestar',
    description: 'Recursos para mejorar tu bienestar físico y mental.',
    imageUrl: '/images/categories/bienestar.jpg'
  },
  entretenimiento: {
    title: 'Entretenimiento',
    description: 'Actividades de ocio y entretenimiento en la comunidad.',
    imageUrl: '/images/categories/entretenimiento.jpg'
  },
  logistica: {
    title: 'Logística',
    description: 'Información sobre logística y transportes.',
    imageUrl: '/images/categories/logistica.jpg'
  }
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Check if the slug is valid
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const content = categoryContent[slug];

  return (
    <div className="container mx-auto py-12">
      <nav className="mb-8">
        <Link href="/comunidad" className="text-blue-600 hover:underline">
          ← Volver a categorías
        </Link>
      </nav>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{content.title}</h1>
        
        {content.imageUrl && (
          <div className="mb-8">
            <img 
              src={content.imageUrl} 
              alt={content.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="prose max-w-none">
          <p className="text-lg">{content.description}</p>
          
          {/* Placeholder for dynamic content that would come from a CMS */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contenido de {content.title}</h2>
            <p>Contenido específico para esta categoría iría aquí. Este podría ser cargado desde tu CMS Payload.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 