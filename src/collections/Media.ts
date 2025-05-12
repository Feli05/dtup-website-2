import type { CollectionConfig } from 'payload'
import path from 'path'

// URL builder for  media cloudflare r2
const getPublicUrl = (filename: string): string => {
  return `${process.env.S3_PUBLIC_URL}/${filename}`;
};

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Media for businesses and categories',
    hidden: true,
  },
  access: {
    // Public read access for media files - no authentication required
    read: () => true,
    // Only authenticated users can modify
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
    disableLocalStorage: true,
    imageSizes: [],
    // Add admin thumbnail to show images in the admin panel
    adminThumbnail: ({ doc }: { doc: any }) => {
      if (doc?.filename) {
        return getPublicUrl(doc.filename);
      }
      return '';
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false, 
      admin: {
        description: 'Alternative text for the image for accessibility',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Public URL of the image (automatically generated)',
      },
      hooks: {
        beforeChange: [() => undefined], 
        afterRead: [({ value, data }) => {
          if (data?.filename) {
            return getPublicUrl(data.filename);
          }
          return undefined;
        }],
      },
    },
    {
      name: 'entityType',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true, 
        description: 'Type of entity this file belongs to (business/category)',
      },
    },
    {
      name: 'entityId',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true, 
        description: 'ID of the related entity',
      },
    },
    {
      name: 'entityName',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true, 
        description: 'Name of the related entity (used for file naming)',
      },
    },
    {
      name: 'originalFilename',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true
      },
    }
  ],
  hooks: {
    // Make sure to provide default alt text if none is given
    beforeValidate: [
      async ({ data }) => {
        if (data) {
          if (!data.alt) {
            data.alt = 'Image';
          }
        }
        return data;
      }
    ],
    // Modify the filename using beforeOperation hook
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          // Generate a timestamped filename for uniqueness
          const timestamp = Date.now();
          const name = path.parse(req.file.name).name;
          const ext = path.parse(req.file.name).ext;
          req.file.name = `${timestamp}-${name}${ext}`;
        }
      }
    ]
  }
}
