import Image from "next/image";
import { type Project, ui } from "@/content/site";
import { ButtonLink } from "../ButtonLink";
import { Chip } from "../Chip";
export function CaseHeader({ project }: { project: Project }) {
  return (
    <header className="case-header">
      <ButtonLink href="/#work">← {ui.navigation[0].label}</ButtonLink>
      <p className="mono muted case-eyebrow">
        {ui.caseStudy} {project.index}
      </p>
      <h1>{project.name}</h1>
      {project.tagline && <p className="case-tagline">{project.tagline}</p>}
      <dl className="case-facts">
        {project.role && (
          <div>
            <dt className="mono muted">{ui.role}</dt>
            <dd>{project.role}</dd>
          </div>
        )}
        {project.period && (
          <div>
            <dt className="mono muted">{ui.period}</dt>
            <dd>{project.period}</dd>
          </div>
        )}
        {project.stack.some(Boolean) && (
          <div>
            <dt className="mono muted">{ui.stack}</dt>
            <dd className="chips">
              {project.stack.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </dd>
          </div>
        )}
        {(project.github || project.demo) && (
          <div>
            <dt className="mono muted">{ui.links}</dt>
            <dd className="case-links">
              <ButtonLink href={project.github} external icon="github">
                {ui.github}
              </ButtonLink>
              <ButtonLink href={project.demo} external icon="arrow">
                {ui.demo}
              </ButtonLink>
            </dd>
          </div>
        )}
      </dl>
      {project.screenshots.filter(Boolean).map((src, i) => (
        <figure key={src} className="case-screenshot">
          <Image
            src={src}
            width={1440}
            height={900}
            loading="lazy"
            alt={`${project.name} ${i + 1}`}
          />
        </figure>
      ))}
    </header>
  );
}
