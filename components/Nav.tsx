import { ThemeToggle } from "./ThemeToggle";
import { site, ui } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import Link from "next/link";
export function Nav() {
  return (
    <header className="nav">
      <nav aria-label={ui.navigationLabel} className="container nav-inner">
        <Link href="/" prefetch={false} className="wordmark">
          {site.name}
        </Link>
        <div className="nav-sections">
          {ui.navigation.map(({ id, label }) => (
            <a key={id} href={`/#${id}`}>
              {label}
            </a>
          ))}
        </div>
        <ButtonLink
          href={site.resumePath}
          external
          variant="outline"
          icon="download"
        >
          {ui.resume}
        </ButtonLink>
        <ThemeToggle />
      </nav>
    </header>
  );
}
