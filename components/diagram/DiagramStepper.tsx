import { ui } from "@/content/site";
import type { Diagram } from "./types";
export function DiagramStepper({
  diagram,
  id,
}: {
  diagram: Diagram;
  id: string;
}) {
  const nodes = [...diagram.nodes].sort((a, b) => a.step - b.step);
  return (
    <ol className="diagram-steps" aria-label={ui.steps}>
      {nodes.map((node, index) => {
        const showLane = index === 0 || nodes[index - 1].lane !== node.lane;
        const notes = diagram.edges.filter(
          (edge) => edge.from === node.id && edge.label,
        );
        return (
          <li
            key={node.id}
            id={`${id}-step-${node.step}`}
            data-legend-node={node.id}
          >
            {showLane && (
              <p className="step-lane mono muted">{diagram.lanes[node.lane]}</p>
            )}
            <div className={`step-node kind-${node.kind}`}>
              <span className="step-number mono">
                {String(node.step).padStart(2, "0")}
              </span>
              <div>
                <p className="step-title">{node.label}</p>
                {node.sub && <p className="muted step-sub">{node.sub}</p>}
                {notes.map((edge) => (
                  <p key={edge.to} className="edge-note">
                    {edge.dashed ? "↺ " : ""}
                    {edge.label}
                  </p>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
