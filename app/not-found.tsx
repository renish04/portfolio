import { ui } from "@/content/site";
import { ButtonLink } from "@/components/ButtonLink";
export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="mono muted">{ui.notFound.code}</p>
      <h1>{ui.notFound.title}</h1>
      <ButtonLink href="/#work">{ui.back}</ButtonLink>
    </div>
  );
}
