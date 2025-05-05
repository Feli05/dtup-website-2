import { HoverLink } from "./HoverLink";

export function LinkSection({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { to: string; text: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <h3 className="text-xl mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map(({ to, text }) => (
          <li key={text}>
            <HoverLink
              href={to}
              className={external ? "" : "transition-colors hover:text-black/90"}
              isExternal={external}
            >
              {text}
            </HoverLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
