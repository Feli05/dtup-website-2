import { CollectionConfig } from 'payload';

export const Businesses: CollectionConfig = {
  slug: 'businesses',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category'],
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
      name: 'name', 
      type: 'text', 
      required: true 
    },
    { 
      name: 'description', 
      type: 'textarea', 
      required: true 
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        description: 'The category this business belongs to'
      }
    },
    { 
      name: 'logo', 
      type: 'upload', 
      relationTo: 'media',
      required: false,
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        { 
          name: 'image', 
          type: 'upload', 
          relationTo: 'media', 
          required: true 
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text', required: false },
        { name: 'facebook', type: 'text', required: false },
        { name: 'website', type: 'text', required: false },
        { name: 'phone', type: 'text', required: false },
      ],
    },
  ],
  hooks: {
    // Only add business to category when created
    afterChange: [
      async ({ doc, req, operation }) => {
        const { payload } = req;
        
        try {
          if (operation === 'create' && doc.category) {
            // Get the category
            const category = await payload.findByID({
              collection: 'categories',
              id: doc.category,
            });
            
            if (category) {
              // Get current businesses array or initialize empty
              const businesses = Array.isArray(category.businesses) ? [...category.businesses] : [];
              
              // Add the business if not already there (prevent duplicates)
              if (!businesses.includes(doc.id)) {
                businesses.push(doc.id);
                
                // Update category
                await payload.update({
                  collection: 'categories',
                  id: doc.category,
                  data: { businesses },
                });
              }
            }
          }
        } catch (error) {
          console.error('Error adding business to category:', error);
        }
        
        return doc;
      },
    ],
    // After deleting a business, remove it from category only
    afterDelete: [
      async ({ doc, req }) => {
        const { payload } = req;
        
        try {
          // Remove from category
          if (doc.category) {
            // Get the category
            const category = await payload.findByID({
              collection: 'categories',
              id: doc.category,
            });
            
            if (category && Array.isArray(category.businesses)) {
              // Remove this business
              const updatedBusinesses = category.businesses.filter(id => String(id) !== String(doc.id));
              
              // Update category
              await payload.update({
                collection: 'categories',
                id: doc.category,
                data: { businesses: updatedBusinesses },
              });
            }
          }
        } catch (error) {
          console.error('Error removing business from category:', error);
        }
      },
    ],
  },
};