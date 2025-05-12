import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.S3_PUBLIC_URL,
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
