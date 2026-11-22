import { ui } from "@/content/site";
import { Icon, type IconName } from "./Icon";
export function ButtonLink({
  href,
  children,
  external = false,
  variant = "text",
  icon,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "text" | "primary" | "outline";
  icon?: IconName;
  className?: string;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      className={`${variant === "text" ? "text-link" : `button button-${variant}`} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {icon && <Icon name={icon} />}
      {external && <span className="sr-only"> {ui.newTab}</span>}
    </a>
  );
}
