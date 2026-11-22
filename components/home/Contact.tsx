import { site, ui } from "@/content/site";
import { Section } from "../Section";
import { ButtonLink } from "../ButtonLink";
import { CopyEmail } from "../CopyEmail";
export function Contact() {
  return (
    <Section id="contact" label={ui.sections.contact} className="contact">
      <h3>{ui.contact}</h3>
      {site.email && (
        <div className="email-row">
          <a className="email-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <CopyEmail />
        </div>
      )}
      <div className="contact-links">
        <ButtonLink href={site.github} external icon="github">
          {ui.github}
        </ButtonLink>
        <ButtonLink href={site.linkedin} external icon="linkedin">
          {ui.linkedin}
        </ButtonLink>
        <ButtonLink href={site.resumePath} external icon="download">
          {ui.resume}
        </ButtonLink>
      </div>
    </Section>
  );
}
