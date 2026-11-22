import Image from "next/image";
import { hero, site } from "@/content/site";
export function NowCard() {
  const rows = hero.now.filter((row) => row.value);
  if (!rows.length && !site.photo) return null;
  return (
    <aside className="now-card">
      {site.photo && (
        <Image
          src={site.photo}
          alt={site.name}
          width={96}
          height={96}
          className="portrait"
        />
      )}
      <dl>
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="mono muted">{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
