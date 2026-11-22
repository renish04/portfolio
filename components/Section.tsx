import { Reveal } from "./Reveal";
export function Section({
  id,
  label,
  children,
  className = "",
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`section ${className}`}
    >
      <Reveal>
        <div className="section-label">
          <h2 id={`${id}-title`} className="mono">
            {label}
          </h2>
          <span />
        </div>
      </Reveal>
      {children}
    </section>
  );
}
