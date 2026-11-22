import { type Project, ui } from "@/content/site";
import { CaseSection } from "./CaseSection";
export function Evidence({ metrics }: { metrics: Project["metrics"] }) {
  const visible = metrics.filter((item) => item.value.trim());
  return visible.length ? (
    <CaseSection id="evidence" title={ui.evidence}>
      <dl className="evidence">
        {visible.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>
              <span className="metric-value">{metric.value}</span>
              {metric.note && <span className="muted">{metric.note}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </CaseSection>
  ) : null;
}
