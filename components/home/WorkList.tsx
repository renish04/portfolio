import { projects, ui } from "@/content/site";
import { Section } from "../Section";
import { ProjectRow } from "./ProjectRow";
export function WorkList() {
  return projects.length ? (
    <Section id="work" label={ui.sections.work}>
      <div className="work-list">
        {projects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  ) : null;
}
