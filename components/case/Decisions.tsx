import { type Project, ui } from "@/content/site";
import { CaseSection } from "./CaseSection";
import { Reveal } from "../Reveal";
export function Decisions({ items }: { items: Project["decisions"] }) {
  const visible = items.filter((item) => item.title && item.body);
  return visible.length ? (
    <CaseSection id="decisions" title={ui.decisions}>
      <div className="decisions">
        {visible.map((item, i) => (
          <Reveal key={item.title}>
            <article className="decision">
              <span className="mono muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p className="muted">{item.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </CaseSection>
  ) : null;
}
