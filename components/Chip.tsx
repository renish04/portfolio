export function Chip({ children }: { children: string }) {
  return children ? <span className="chip">{children}</span> : null;
}
