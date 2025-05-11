import type { ServicesData } from "./types"

/**  
 * Mock data—replace this with a real Payload CMS fetch  
 * in fetchServices() when you're ready.  
 */
export const DEFAULT_SERVICES: ServicesData = {
  row1: [
    { title: "Moda y Accesorios",       description: "Descubre las últimas tendencias",    bgColor: "bg-[#FFB0B0]" },
    { title: "Salud y Bienestar",        description: "Servicios para su bienestar",         bgColor: "bg-[#709FB0]" },
    { title: "Gastronomía",              description: "Experiencias culinarias únicas",      bgColor: "bg-[#A0C1B8]" },
    { title: "Servicios Profesionales",  description: "Expertos calificados",                bgColor: "bg-[#F4EBC1]" },
  ],
  row2: [
    { title: "Hogar y Mantenimiento",    description: "Soluciones para su hogar",            bgColor: "bg-[#DEAA79]" },
    { title: "Tecnología",               description: "Innovación digital",                  bgColor: "bg-[#FFE6A9]" },
    { title: "Ocio y Entretenimiento",   description: "Experiencias memorables",             bgColor: "bg-[#B1C29E]" },
    { title: "Otros Servicios",          description: "Descubre más opciones",               bgColor: "bg-[#659287]" },
  ],
}

/**  
 * Stub: fetch from CMS  
 * TODO: swap this out for your Payload CMS client  
 */
export async function fetchServices(): Promise<ServicesData> {
  // e.g. `return await payload.find({ collection: 'services' })`
  return Promise.resolve(DEFAULT_SERVICES)
}
