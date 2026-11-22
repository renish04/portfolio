import { type Project, ui } from "@/content/site";
import { Reveal } from "../Reveal";
export function caseSections(project: Project) {
  return [
    { id: "problem", label: ui.problem, show: !!project.problem },
    {
      id: "architecture",
      label: ui.architecture,
      show: project.diagram.nodes.length > 0,
    },
    {
      id: "decisions",
      label: ui.decisions,
      show: project.decisions.some((item) => item.title && item.body),
    },
    {
      id: "evidence",
      label: ui.evidence,
      show: project.metrics.some((metric) => metric.value.trim()),
    },
    { id: "limits", label: ui.limits, show: project.limits.some(Boolean) },
  ].filter((section) => section.show);
}
export function SideIndex({ project }: { project: Project }) {
  return (
    <aside className="side-index">
      <Reveal trackSections>
        <nav aria-label={ui.index}>
          <p className="mono muted">{ui.index}</p>
          <ul>
            {caseSections(project).map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  {...(i === 0 ? { "aria-current": "location" as const } : {})}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>
    </aside>
  );
}
