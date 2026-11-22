import type { Diagram, DiagramEdge, DiagramNode } from "@/content/site";
export type { Diagram, DiagramEdge, DiagramNode };
export const geometry = {
  width: 220,
  height: 112,
  laneGap: 64,
  rowGap: 64,
  top: 66,
  left: 24,
};
export function position(node: DiagramNode) {
  return {
    x: geometry.left + node.lane * (geometry.width + geometry.laneGap),
    y: geometry.top + node.row * (geometry.height + geometry.rowGap),
  };
}
export function layout(diagram: Diagram) {
  const occupied = new Set<string>();
  const ids = new Set(diagram.nodes.map((node) => node.id));
  for (const node of diagram.nodes) {
    const slot = `${node.lane},${node.row}`;
    if (occupied.has(slot))
      throw new Error(`Duplicate diagram position: ${slot}`);
    if (node.lane < 0 || node.lane >= diagram.lanes.length || node.row < 0)
      throw new Error(`Invalid diagram position: ${node.id}`);
    occupied.add(slot);
  }
  for (const edge of diagram.edges)
    if (!ids.has(edge.from) || !ids.has(edge.to))
      throw new Error("Unknown diagram edge endpoint");
  return {
    width:
      diagram.lanes.length * (geometry.width + geometry.laneGap) -
      geometry.laneGap +
      geometry.left * 2 +
      22,
    height:
      geometry.top +
      (Math.max(...diagram.nodes.map((n) => n.row)) + 1) *
        (geometry.height + geometry.rowGap) +
      30,
  };
}
export function wrap(text: string, limit = 26) {
  const lines: string[] = [];
  for (const word of text.split(" ")) {
    const last = lines[lines.length - 1];
    if (last && last.length + word.length + 1 <= limit)
      lines[lines.length - 1] += ` ${word}`;
    else lines.push(word);
  }
  return lines;
}
export function route(edge: DiagramEdge, diagram: Diagram) {
  const from = diagram.nodes.find((n) => n.id === edge.from)!;
  const to = diagram.nodes.find((n) => n.id === edge.to)!;
  const a = position(from),
    b = position(to),
    { width: w, height: h } = geometry;
  if (edge.dashed && from.lane > to.lane) {
    const floor = layout(diagram).height - 20,
      gutter = b.x + w + 32;
    return {
      d: `M${a.x + w / 2},${a.y + h} V${floor} H${gutter} V${b.y + h / 2} H${b.x + w}`,
      labelX: (a.x + w / 2 + gutter) / 2,
      labelY: floor - 10,
    };
  }
  if (from.lane === to.lane) {
    if (edge.dashed) {
      const gutter = a.x + w + 30;
      return {
        d: `M${a.x + w},${a.y + h / 2} H${gutter} V${b.y + h / 2} H${b.x + w}`,
        labelX: gutter - 6,
        labelY: (a.y + b.y + h) / 2,
        vertical: true,
      };
    }
    return {
      d: `M${a.x + w / 2},${a.y + h} V${b.y}`,
      labelX: a.x + w / 2 + 12,
      labelY: (a.y + h + b.y) / 2,
    };
  }
  const forward = from.lane < to.lane;
  const startX = forward ? a.x + w : a.x,
    endX = forward ? b.x : b.x + w;
  const channel = (startX + endX) / 2;
  return {
    d: `M${startX},${a.y + h / 2} H${channel} V${b.y + h / 2} H${endX}`,
    labelX: channel,
    labelY: Math.min(a.y, b.y) + h / 2 - 12,
  };
}
