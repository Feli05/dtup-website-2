// Data shapes used by Hero
export interface HeroImageConfig {
    src: string
    alt: string
  }
  
  export interface HighlightConfig {
    color: string
    strokeWidth: number
    animationDuration: number
    iterations: number
    animationDelay: number
  }
  
  export interface HeroContent {
    title: string
    highlightText: string
    description: string
    ctaLabel: string
    ctaHref: string
  }
  