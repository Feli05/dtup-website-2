import { CollectionConfig } from 'payload';

// Define context type for business hooks
interface BusinessContext {
  doc?: {
    name?: string;
    id?: string;
  };
}

// Define context for delete operation
interface BusinessDeleteContext {
  mediaToDelete?: string[];
}

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
      admin: {
        description: 'Business logo image (recommended size: square, minimum 400x400px)'
      }
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
      admin: {
        description: 'Images of the business (recommended size: 16:9 ratio, minimum 1200x675px)'
      },
      fields: [
        { 
          name: 'image', 
          type: 'upload', 
          relationTo: 'media', 
          required: true,
          admin: {
            description: 'Select or upload an image'
          }
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
    // Only add business to category when created and update media metadata
    afterChange: [
      async ({ doc, req, operation }) => {
        const { payload } = req;
        
        // Process category relationship
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
        
        // Update logo metadata if exists
        if (doc.logo) {
          try {
            // Get the logo ID, whether it's an object or ID
            const logoId = typeof doc.logo === 'object' 
              ? doc.logo.id 
              : doc.logo;
            
            // Update the media document with business metadata
            await payload.update({
              collection: 'media',
              id: logoId,
              data: {
                alt: `${doc.name} logo`,
                entityType: 'business',
                entityName: doc.name,
                entityId: doc.id
              }
            });
          } catch (error) {
            console.error('Error updating logo metadata:', error);
          }
        }
        
        // Update image metadata for each image
        if (Array.isArray(doc.images) && doc.images.length > 0) {
          for (const [index, imageItem] of doc.images.entries()) {
            if (imageItem.image) {
              try {
                // Get the image ID, whether it's an object or ID
                const imageId = typeof imageItem.image === 'object' 
                  ? imageItem.image.id 
                  : imageItem.image;
                
                // Update the media document with business metadata
                await payload.update({
                  collection: 'media',
                  id: imageId,
                  data: {
                    alt: `${doc.name} image ${index + 1}`,
                    entityType: 'business',
                    entityName: doc.name,
                    entityId: doc.id
                  }
                });
              } catch (error) {
                console.error(`Error updating image metadata for index ${index}:`, error);
              }
            }
          }
        }
        
        return doc;
      },
    ],
    // Before deleting a business, collect media IDs
    beforeDelete: [
      async ({ req, id, context }) => {
        const { payload } = req;
        const ctx = context as BusinessDeleteContext;
        
        try {
          // Get the business to find all associated media
          const business = await payload.findByID({
            collection: 'businesses',
            id,
            depth: 2, // Load relationships
          });
          
          if (business) {
            // Initialize array for media IDs to delete
            ctx.mediaToDelete = [];
            
            // Add logo to delete list if exists
            if (business.logo && typeof business.logo === 'object') {
              ctx.mediaToDelete.push(business.logo.id.toString());
            }
            
            // Add all business images to delete list
            if (Array.isArray(business.images)) {
              business.images.forEach(imageItem => {
                if (imageItem.image && typeof imageItem.image === 'object' && ctx.mediaToDelete) {
                  ctx.mediaToDelete.push(imageItem.image.id.toString());
                }
              });
            }
          }
        } catch (error) {
          console.error('Error preparing business media for deletion:', error);
        }
      }
    ],
    // After deleting a business, remove it from category and delete associated media
    afterDelete: [
      async ({ doc, req, context }) => {
        const { payload } = req;
        const ctx = context as BusinessDeleteContext;
        
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
          
          // Delete all associated media files
          if (ctx.mediaToDelete && ctx.mediaToDelete.length > 0) {
            for (const mediaId of ctx.mediaToDelete) {
              await payload.delete({
                collection: 'media',
                id: mediaId,
              });
            }
          }
        } catch (error) {
          console.error('Error cleaning up after business deletion:', error);
        }
      }
    ]
  }
};