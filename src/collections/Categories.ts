import { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'bgColor'],
  },
  access: {
    // Public read access - no authentication required
    read: () => true,
    // Only authenticated users can modify
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { 
      name: 'title', 
      type: 'text', 
      required: true,
    },
    { 
      name: 'description', 
      type: 'textarea', 
      required: true,
    },
    { 
      name: 'bgColor', 
      type: 'text', 
      required: true,
      admin: {
        description: 'Background color in Tailwind format (e.g., bg-[#efefef])'
      }
    },
    { 
      name: 'businesses',
      type: 'relationship',
      relationTo: 'businesses',
      hasMany: true,
      admin: {
        description: 'Businesses in this category - will be automatically populated when businesses select this category'
      }
    }
  ],
};