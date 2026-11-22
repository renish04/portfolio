import { hero, site, ui } from "@/content/site";
import { ButtonLink } from "../ButtonLink";
import { NowCard } from "./NowCard";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow mono muted">
          {site.availability && <span className="availability-dot" />}
          {site.role}
        </p>
        <h1 id="hero-title">
          {hero.lines.map((line, i) => (
            <span className="hero-line" key={line}>
              {line}
              {i < hero.lines.length - 1 && <br />}
            </span>
          ))}{" "}
          <em>{hero.accent}</em>
        </h1>
        {site.availability && (
          <p className="availability mono">{site.availability}</p>
        )}
        <div className="hero-bottom">
          <div className="hero-intro">
            <p className="muted">{hero.sub}</p>
            <div className="hero-actions">
              <ButtonLink href="#work" variant="primary">
                {ui.viewWork}
              </ButtonLink>
              <div className="socials">
                {[
                  {
                    href: site.github,
                    label: ui.github,
                    icon: "github" as const,
                  },
                  {
                    href: site.linkedin,
                    label: ui.linkedin,
                    icon: "linkedin" as const,
                  },
                  {
                    href: site.email ? `mailto:${site.email}` : "",
                    label: ui.email,
                    icon: "mail" as const,
                  },
                ].map((link) => (
                  <ButtonLink
                    key={link.label}
                    href={link.href}
                    external={link.icon !== "mail"}
                    icon={link.icon}
                    className="social-link"
                  >
                    <span className="social-label">{link.label}</span>
                    <span className="social-mobile sr-only">{link.label}</span>
                  </ButtonLink>
                ))}
              </div>
            </div>
          </div>
          <NowCard />
        </div>
      </div>
    </section>
  );
}
