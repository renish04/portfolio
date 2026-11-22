import { ui } from "@/content/site";
import { CaseSection } from "./CaseSection";
export function Limits({ items }: { items: string[] }) {
  return items.some(Boolean) ? (
    <CaseSection id="limits" title={ui.limits}>
      <ul className="square-list muted">
        {items.filter(Boolean).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </CaseSection>
  ) : null;
}
