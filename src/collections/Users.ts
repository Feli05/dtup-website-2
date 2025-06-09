import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Allow admin access for authenticated users
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user), // Simplified - allow authenticated users to create
    update: ({ req: { user }, id }) => {
      if (!user) return false;
      return user.id === id; // Users can only update themselves
    },
    delete: () => false, // No deleting users
  },
  fields: [
    // Email added by default by the auth feature
  ],
}
