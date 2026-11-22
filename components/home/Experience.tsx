import { experience, ui } from "@/content/site";
import { Section } from "../Section";
import { Reveal } from "../Reveal";
import { ButtonLink } from "../ButtonLink";
export function Experience() {
  return experience.length ? (
    <Section id="experience" label={ui.sections.experience}>
      <div className="timeline">
        {experience.map((entry) => (
          <Reveal key={entry.company}>
            <article className="timeline-entry">
              <div className="experience-top">
                <div>
                  <h3>{entry.company}</h3>
                  <p>{entry.role}</p>
                  <p className="muted">{entry.place}</p>
                </div>
                <p className="mono muted">{entry.period}</p>
              </div>
              {entry.summary && (
                <p className="experience-summary">{entry.summary}</p>
              )}
              <ButtonLink href={entry.link.href} external icon="arrow">
                {entry.link.label}
              </ButtonLink>
              {entry.bullets.length > 0 && (
                <ul className="square-list muted experience-bullets">
                  {entry.bullets.filter(Boolean).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  ) : null;
}
