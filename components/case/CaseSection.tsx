import { Reveal } from "../Reveal";
export function CaseSection({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`case-section ${className}`}
      aria-labelledby={`${id}-heading`}
      data-case-section
    >
      <Reveal>
        <h2 id={`${id}-heading`}>{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
