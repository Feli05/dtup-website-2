import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Only authenticated users can see users - authentication required
    read: ({ req: { user } }) => Boolean(user),
    
    // Only allow creating if there are no existing users
    create: async ({ req }) => {
      const { payload } = req;
      
      // Check if any users exist
      const existingUsers = await payload.find({
        collection: 'users',
        limit: 1,
      });
      
      // Only allow creation if no users exist
      return existingUsers.totalDocs === 0;
    },
    
    // Only allow self-update
    update: ({ req: { user }, id }) => {
      if (!user) return false;
      
      // Users can only update themselves
      return user.id === id;
    },
    
    // No deleting users
    delete: () => false,
  },
  fields: [
    // Email added by default by the auth feature
  ],
}
