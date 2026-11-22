import Image from "next/image";
import { type Project, ui } from "@/content/site";
import { Chip } from "../Chip";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";
import { Diagram } from "../diagram/Diagram";
export function ProjectRow({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="project-row">
        <div className="project-info">
          <span className="mono muted">{project.index}</span>
          <h3>{project.name}</h3>
          {project.tagline && (
            <p className="project-tagline">{project.tagline}</p>
          )}
          {project.highlights.length > 0 && (
            <ul className="square-list muted">
              {project.highlights.filter(Boolean).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {project.stack.length > 0 && (
            <div className="chips">
              {project.stack.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          )}
          <div className="project-actions">
            <ButtonLink
              href={`/work/${project.slug}/`}
              icon="arrow"
              className="accent-link"
            >
              {ui.readCase}
            </ButtonLink>
            <ButtonLink href={project.github} external icon="github">
              {ui.github}
            </ButtonLink>
            <ButtonLink href={project.demo} external icon="arrow">
              {ui.demo}
            </ButtonLink>
          </div>
        </div>
        <div className="project-visual" aria-hidden="true">
          {project.screenshots[0] ? (
            <Image
              src={project.screenshots[0]}
              width={640}
              height={400}
              loading="lazy"
              alt=""
            />
          ) : (
            <Diagram
              diagram={project.diagram}
              id={`mini-${project.slug}`}
              title={project.name}
              miniature
            />
          )}
        </div>
      </article>
    </Reveal>
  );
}
