# DTUP Website CMS

This project uses Payload CMS 3.33 with Next.js 15 and is deployed on Netlify.

## Package Manager

This project uses **pnpm** for dependency management due to compatibility requirements with Payload CMS 3.33 and Next.js 15.

## Local Development

To run the project locally:

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production  
- `pnpm run start` - Start production server
- `pnpm run clean` - Clean install (removes node_modules and reinstalls)
- `pnpm run generate:types` - Generate Payload types
- `pnpm run generate:importmap` - Generate Payload import map

## Admin Panel

Access the Payload CMS admin panel at:
- **Local:** `http://localhost:3000/admin`
- **Production:** `https://detodounpococr.netlify.app/admin`

## Deployment

This project deploys automatically to Netlify using pnpm and the Next.js plugin. The deployment is configured in `netlify.toml` to:

- Use pnpm for dependency management
- Install dependencies with `pnpm install`  
- Build with `pnpm run build`
- Use the Next.js Netlify plugin for optimal performance

### Environment Variables

Make sure to set the following environment variables in your Netlify dashboard:

- `NEXT_PUBLIC_PAYLOAD_URL` - Your site URL (e.g., `https://detodounpococr.netlify.app`)
- `PAYLOAD_SECRET` - Your Payload secret key
- `MONGO_URI` - Your MongoDB connection string
- `S3_*` variables - Your S3 storage configuration

## Collections

This project includes the following Payload collections:

- **Users** - Authentication and admin access
- **Media** - File uploads with S3 storage
- **Businesses** - Business directory entries  
- **Categories** - Business categorization

## Tech Stack

- **Frontend:** Next.js 15, React 19, TailwindCSS
- **CMS:** Payload CMS 3.33
- **Database:** MongoDB
- **Storage:** AWS S3 (Cloudflare R2)
- **Deployment:** Netlify
- **Package Manager:** pnpm
