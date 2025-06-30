import { Playfair_Display, Markazi_Text, Inter } from 'next/font/google'

// Configure Playfair Display - Primary font used throughout the site
export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['serif']
})

// Configure Markazi Text - Used for specific elements like statistics
export const markaziText = Markazi_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-markazi',
  display: 'swap',
  preload: false, // Less critical, load after main font
  fallback: ['serif']
})

// Configure Inter - Currently imported but not heavily used
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
  fallback: ['sans-serif']
}) 