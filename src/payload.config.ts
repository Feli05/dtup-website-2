// storage-adapter-import-placeholder
import { buildConfig } from 'payload'
import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Businesses } from './collections/Businesses'
import { Categories } from './collections/Categories'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    // Disable admin in production - local development only
    disable: process.env.NODE_ENV === 'production',
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Only enable live preview in development
    ...(process.env.NODE_ENV !== 'production' && {
      livePreview: {
        url: 'http://localhost:3000',
        collections: [Businesses.slug, Categories.slug],
      }
    })
  },
  collections: [Users, Media, Businesses, Categories],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGO_URI || false,
  }),
  sharp,
  upload: {
    useTempFiles: true,
  },
  plugins: [
    s3Storage({
      collections: {
        media: {
          // Disable access control for media collection
          disablePayloadAccessControl: true
        }
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET || '',
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true,
      },
      clientUploads: false
    }),
  ],
  cors: [
    process.env.NODE_ENV === 'production' 
      ? 'https://detodounpococr.netlify.app'
      : 'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    process.env.NODE_ENV === 'production' 
      ? 'https://detodounpococr.netlify.app'
      : 'http://localhost:3000',
  ].filter(Boolean),
})
