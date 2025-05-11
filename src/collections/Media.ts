import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Media for businesses and categories',
    // Hide the Media collection from admin sidebar since it will be managed through other collections
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
    // Directory where files are stored (flat structure)
    staticDir: 'media',
    // Only allow specific image upload formats (PNG and JPEG/JPG)
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false, // Making this field optional to prevent validation errors
      admin: {
        description: 'Alternative text for the image for accessibility',
      },
    },
    // These fields store which entity the file belongs to (all hidden from edit forms)
    {
      name: 'entityType',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true, // Hidden from edit form
        description: 'Type of entity this file belongs to (business/category)',
      },
    },
    {
      name: 'entityId',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true, // Hidden from edit form
        description: 'ID of the related entity',
      },
    },
    {
      name: 'entityName',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true, // Hidden from edit form
        description: 'Name of the related entity (used for file naming)',
      },
    },
    // Field to store the original filename for reference (hidden)
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
          // Set default alt text if not provided
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
