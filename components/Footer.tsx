import { site, ui } from "@/content/site";
export function Footer() {
  return (
    <footer className="container footer mono muted">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <span>{ui.footer}</span>
    </footer>
  );
}
