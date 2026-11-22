import { projects, ui } from "@/content/site";
import { ButtonLink } from "../ButtonLink";
export function CaseNav({ slug }: { slug: string }) {
  const index = projects.findIndex((project) => project.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length],
    next = projects[(index + 1) % projects.length];
  return (
    <nav className="case-nav" aria-label={ui.navigation[0].label}>
      <ButtonLink href="/#work">{ui.back}</ButtonLink>
      {projects.length > 1 && (
        <div className="case-nav-projects">
          {[
            { project: previous, label: ui.previous },
            { project: next, label: ui.next },
          ].map(({ project, label }) => (
            <a key={label} href={`/work/${project.slug}/`}>
              <span className="mono muted">{label}</span>
              <span className="case-nav-name">
                {project.name}
                <span aria-hidden="true"> ↗</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
