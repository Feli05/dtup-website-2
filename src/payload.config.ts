// storage-adapter-import-placeholder
import { buildConfig } from 'payload'
import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

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
      url: 'http://localhost:3000',
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
    url: process.env.MONGO_URI || 'mongodb://localhost/dtup-website',
  }),
  sharp,
  upload: {
    useTempFiles: true,
  },
  cors: [
    process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  ].filter(Boolean),
})
