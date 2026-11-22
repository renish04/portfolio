import { geometry, layout, position, route, wrap, type Diagram } from "./types";
export function DiagramDesktop({
  diagram,
  id,
  title,
  miniature = false,
}: {
  diagram: Diagram;
  id: string;
  title: string;
  miniature?: boolean;
}) {
  const box = layout(diagram);
  const { width: w, height: h } = geometry;
  return (
    <svg
      className={`architecture-svg ${miniature ? "miniature" : ""}`}
      viewBox={`0 0 ${box.width} ${box.height}`}
      {...(miniature
        ? { "aria-hidden": true }
        : { role: "img", "aria-labelledby": `${id}-title ${id}-desc` })}
    >
      {!miniature && (
        <>
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-desc`}>{diagram.summary}</desc>
        </>
      )}
      <defs>
        <marker
          id={`${id}-arrow`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path
            d="M0 1 9 5 0 9"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="1.5"
          />
        </marker>
      </defs>
      {diagram.lanes.map((lane, i) => (
        <g key={lane}>
          <rect
            x={i * (w + geometry.laneGap) + 12}
            y="43"
            width={w + 24}
            height={box.height - 60}
            rx="8"
            className="lane-band"
          />
          {!miniature && (
            <text
              x={i * (w + geometry.laneGap) + 24}
              y="24"
              className="lane-label"
            >
              {lane}
            </text>
          )}
        </g>
      ))}
      <g className="diagram-edges">
        {diagram.edges.map((edge, i) => {
          const r = route(edge, diagram);
          return (
            <g
              key={`${edge.from}-${edge.to}`}
              data-from={edge.from}
              data-to={edge.to}
              className={`diagram-edge ${edge.dashed ? "feedback" : ""}`}
              style={{ "--edge-delay": `${i * 55}ms` } as React.CSSProperties}
            >
              <path
                d={r.d}
                fill="none"
                pathLength={edge.dashed ? undefined : 1}
                markerEnd={`url(#${id}-arrow)`}
              />
              {edge.label && !miniature && (
                <g
                  className="edge-label"
                  transform={`translate(${r.labelX},${r.labelY})${r.vertical ? " rotate(-90)" : ""}`}
                >
                  <rect
                    x={-edge.label.length * 3.2 - 5}
                    y="-11"
                    width={edge.label.length * 6.4 + 10}
                    height="17"
                    rx="4"
                  />
                  <text textAnchor="middle">{edge.label}</text>
                </g>
              )}
            </g>
          );
        })}
      </g>
      {diagram.nodes.map((node) => {
        const p = position(node),
          label = wrap(node.label, 26),
          sub = node.sub ? wrap(node.sub, 28) : [];
        return (
          <g
            key={node.id}
            className={`diagram-node kind-${node.kind}`}
            transform={`translate(${p.x},${p.y})`}
            {...(miniature
              ? {}
              : {
                  tabIndex: 0,
                  "data-node": node.id,
                  "aria-label": `${node.step}. ${node.label}${node.sub ? `. ${node.sub}` : ""}`,
                  "aria-describedby": `${id}-step-${node.step}`,
                })}
          >
            <rect width={w} height={h} rx="8" className="node-rect" />
            {node.kind === "llm" && (
              <rect width={w} height={h} rx="8" className="llm-tint" />
            )}
            {node.kind === "check" && (
              <rect
                x="4"
                y="4"
                width={w - 8}
                height={h - 8}
                rx="5"
                className="inner-check"
              />
            )}
            {!miniature && (
              <>
                <rect
                  x="12"
                  y="10"
                  width="26"
                  height="20"
                  rx="4"
                  className="node-badge"
                />
                <text x="25" y="24" textAnchor="middle" className="node-number">
                  {String(node.step).padStart(2, "0")}
                </text>
                <text x="14" y="50" className="node-label">
                  {label.map((line, j) => (
                    <tspan x="14" dy={j === 0 ? 0 : 17} key={line}>
                      {line}
                    </tspan>
                  ))}
                </text>
                {sub.length > 0 && (
                  <text
                    x="14"
                    y={label.length > 1 ? 85 : 73}
                    className="node-sub"
                  >
                    {sub.map((line, j) => (
                      <tspan x="14" dy={j === 0 ? 0 : 15} key={line}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )}
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
