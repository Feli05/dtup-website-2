import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'pub-ebd681fe60f74c0694eac1ef832ed477.r2.dev',
      },
    ],
  },
  serverExternalPackages: ['@payloadcms/next'],
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
