import { ui } from "@/content/site";
import type { Diagram as DiagramData } from "./types";
import { DiagramDesktop } from "./DiagramDesktop";
import { DiagramStepper } from "./DiagramStepper";
import { DiagramTrigger } from "./DiagramTrigger";
export function Diagram({
  diagram,
  id,
  title,
  miniature = false,
}: {
  diagram: DiagramData;
  id: string;
  title: string;
  miniature?: boolean;
}) {
  if (!diagram.nodes.length) return null;
  if (miniature)
    return <DiagramDesktop diagram={diagram} id={id} title={title} miniature />;
  return (
    <div className="diagram-container">
      <DiagramTrigger>
        <div className="diagram-desktop">
          <DiagramDesktop diagram={diagram} id={id} title={title} />
          <ul className="kind-legend mono muted" aria-label={ui.stack}>
            {ui.kinds.map((kind) => (
              <li key={kind}>
                <span className={`kind-swatch kind-${kind}`} />
                {kind}
              </li>
            ))}
          </ul>
        </div>
        <DiagramStepper diagram={diagram} id={id} />
      </DiagramTrigger>
    </div>
  );
}
