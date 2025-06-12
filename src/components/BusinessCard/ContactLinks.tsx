import { memo } from "react";
import Link from "next/link";
import { InstagramIcon, FacebookIcon, WebsiteIcon, PhoneIcon } from "@/components/ui/icons";
import type { Business } from "@/payload-types";

interface ContactLinksProps {
  contact: Business['contact'];
}

const ContactLinks = memo(function ContactLinks({ contact }: ContactLinksProps) {
  if (!contact) return null;

  const links = [
    {
      href: contact.instagram,
      icon: InstagramIcon,
      className: "text-pink-600 hover:opacity-80 transition-opacity",
      external: true
    },
    {
      href: contact.facebook,
      icon: FacebookIcon,
      className: "text-blue-700 hover:opacity-80 transition-opacity",
      external: true
    },
    {
      href: contact.website,
      icon: WebsiteIcon,
      className: "text-blue-600 hover:opacity-80 transition-opacity",
      external: true
    },
    {
      href: contact.phone ? `tel:${contact.phone}` : null,
      icon: PhoneIcon,
      className: "text-green-600 hover:opacity-80 transition-opacity",
      external: false
    }
  ].filter(link => link.href);

  if (links.length === 0) return null;

  return (
    <div className="flex gap-3">
      {links.map((link, index) => {
        const IconComponent = link.icon;
        const linkProps = link.external 
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {};
        
        return (
          <Link 
            key={index}
            href={link.href!} 
            className={link.className}
            {...linkProps}
          >
            <IconComponent />
          </Link>
        );
      })}
    </div>
  );
});

export default ContactLinks; 