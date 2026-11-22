import { ui } from "@/content/site";
import { CaseSection } from "./CaseSection";
export function Problem({ text }: { text: string }) {
  return text ? (
    <CaseSection id="problem" title={ui.problem}>
      <p className="muted">{text}</p>
    </CaseSection>
  ) : null;
}
