import { CollectionConfig } from 'payload';

// Define type for context to share between hooks
interface CategoryDeleteContext {
  imagesToDelete?: string[];
}

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
        description: 'Main category image (recommended size: 16:9 ratio, minimum 1200x675px)'
      }
    },
    { 
      name: 'bgColor', 
      type: 'text', 
      required: true,
      admin: {
        description: 'Background color in Tailwind format (e.g., #efefef)'
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
  hooks: {
    // Ensure slug is properly set before creating/updating
    beforeValidate: [
      ({ data }) => {
        // If slug isn't manually provided, generate it from the title
        if (data && data.title && (!data.slug || data.slug === '')) {
          data.slug = data.title.toLowerCase().replace(/\s+/g, '-');
        }
        return data;
      }
    ],
    // Set metadata on the uploaded media when creating/updating a category
    afterChange: [
      async ({ doc, req, operation }) => {
        const { payload } = req;
        
        // Only update media metadata if we have an image
        if (doc.image) {
          try {
            // Get the image ID, whether it's an object or ID
            const imageId = typeof doc.image === 'object' 
              ? doc.image.id 
              : doc.image;
            
            // Update the media document with category metadata
            await payload.update({
              collection: 'media',
              id: imageId,
              data: {
                alt: `${doc.title} category image`,
                entityType: 'category',
                entityName: doc.title,
                entityId: doc.id
              }
            });
          } catch (error) {
            console.error('Error updating media metadata:', error);
          }
        }
        
        return doc;
      }
    ],
    // Before deleting a category, collect media to delete
    beforeDelete: [
      async ({ req, id, context }) => {
        const { payload } = req;
        const ctx = context as CategoryDeleteContext;
        
        try {
          // Get the category with populated image
          const category = await payload.findByID({
            collection: 'categories',
            id,
            depth: 1, // Load relationships
          });
          
          // Initialize array to store IDs
          ctx.imagesToDelete = [];
          
          // Add image ID if it exists
          if (category && category.image) {
            const imageId = typeof category.image === 'object' 
              ? category.image.id.toString() // Ensure it's a string
              : String(category.image);      // Convert to string if it's not
            
            ctx.imagesToDelete.push(imageId);
          }
        } catch (error) {
          console.error('Error preparing category media for deletion:', error);
        }
      }
    ],
    // After deletion, clean up media
    afterDelete: [
      async ({ req, context }) => {
        const { payload } = req;
        const ctx = context as CategoryDeleteContext;
        
        try {
          // Delete all associated media files
          if (ctx.imagesToDelete && ctx.imagesToDelete.length > 0) {
            for (const imageId of ctx.imagesToDelete) {
              await payload.delete({
                collection: 'media',
                id: imageId,
              });
            }
          }
        } catch (error) {
          console.error('Error deleting category images:', error);
        }
      }
    ]
  }
};