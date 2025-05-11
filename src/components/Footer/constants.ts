// Footer navigation columns
interface FooterLinkType {
  label: string;
  href: string;
}

interface FooterColumnType {
  heading: string;
  links: FooterLinkType[];
}

export const LOGO = {
  src: "/DTUP-logo-RGB-01.png",
  alt: "De Todo Un Poco Logo",
};

export const FOOTER_LINKS: FooterColumnType[] = [
  {
    heading: "Redes",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/detodounpococr" },
      { label: "Instagram", href: "https://www.instagram.com/detodounpococr/" },
    ],
  },
  {
    heading: "Navegación",
    links: [
      { label: "Sobre Nosotras", href: "/sobre-nosotras" },
      { label: "Comunidad", href: "/comunidad" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    heading: "Diseñado por:",
    links: [
      { label: "felitrejos.com", href: "https://felitrejos.com" },
      { label: "ajha.ca", href: "https://ajha.ca" },
    ],
  },
];
