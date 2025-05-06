import { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'bgColor'],
  },
  access: {
    // Public read access - authentication required
    read: ({ req: { user } }) => Boolean(user),
    // Only authenticated users can modify
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        description: 'The slug for the category - will be automatically populated when the title is changed'
      }
    },
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The image for the category in /comunidad'
      }
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