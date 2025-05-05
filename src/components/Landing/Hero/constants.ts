import type { HeroImageConfig, HighlightConfig, HeroContent } from "./types"

// The main title
export const HERO_CONTENT: HeroContent = {
  title: "Conoce a Martha y Carolina",
  highlightText: "De Todo Un Poco",
  description:
    "es un grupo cerrado en Facebook, creado en agosto de 2016 por Martha Lacayo y Carolina Aguirre, conocido como el 'Google' tico. Este proyecto nació con la idea de compartir recetas, películas y consejos. Gracias al apoyo constante de la comunidad, evolucionó hasta convertirse en una plataforma dinámica y versátil, que ofrece entrevistas en vivo, talleres exclusivos, vídeos promocionales y más, conectando a miles de personas en Costa Rica y otros países.",
  ctaLabel: "SABER MÁS",
  ctaHref: "/sobre-nosotras",
}

// How the highlighted phrase should animate
export const HIGHLIGHT_CONFIG: HighlightConfig = {
  color: "#FFE5B4",
  strokeWidth: 2,
  animationDuration: 800,
  iterations: 1,
  animationDelay: 300,
}

// The photo we parallax on scroll
export const HERO_IMAGE: HeroImageConfig = {
  src: "/martha-y-caro-1.jpg",
  alt: "Martha y Carolina",
}
