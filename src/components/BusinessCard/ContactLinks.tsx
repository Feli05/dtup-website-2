import Link from "next/link";
import { InstagramIcon, FacebookIcon, WebsiteIcon, PhoneIcon } from "@/components/ui/icons";
import type { Business } from "@/payload-types";

interface ContactLinksProps {
  contact: Business['contact'];
}

export default function ContactLinks({ contact }: ContactLinksProps) {
  if (!contact) return null;

  return (
    <div className="flex gap-3">
      {contact.instagram && (
        <Link 
          href={contact.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-pink-600 hover:opacity-80 transition-opacity"
        >
          <InstagramIcon />
        </Link>
      )}
      {contact.facebook && (
        <Link 
          href={contact.facebook} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-700 hover:opacity-80 transition-opacity"
        >
          <FacebookIcon />
        </Link>
      )}
      {contact.website && (
        <Link 
          href={contact.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:opacity-80 transition-opacity"
        >
          <WebsiteIcon />
        </Link>
      )}
      {contact.phone && (
        <Link 
          href={`tel:${contact.phone}`} 
          className="text-green-600 hover:opacity-80 transition-opacity"
        >
          <PhoneIcon />
        </Link>
      )}
    </div>
  );
} 