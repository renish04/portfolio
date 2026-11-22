import { about, ui } from "@/content/site";
import { Section } from "../Section";
import { Skills } from "./Skills";
export function About() {
  return (
    <Section id="about" label={ui.sections.about}>
      <div className="about-grid">
        <p className="about-text">{about.text}</p>
        <div>
          <div className="education">
            <h3>{about.education.school}</h3>
            <p className="muted">{about.education.degree}</p>
            <p className="mono muted">{about.education.period}</p>
            <p className="mono">{about.education.cgpa}</p>
          </div>
          <Skills />
        </div>
      </div>
    </Section>
  );
}
