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
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
      collections: [Businesses.slug, Categories.slug],
    }
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
    process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  ].filter(Boolean),
})
