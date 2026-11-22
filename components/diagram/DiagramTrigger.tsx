"use client";
import { useEffect, useRef } from "react";
export function DiagramTrigger({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let observer: IntersectionObserver | undefined;
    if (
      "IntersectionObserver" in window &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            el.classList.add("diagram-entered");
            observer?.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(el);
    }
    function highlight(event: Event) {
      const target = (event.target as Element).closest("[data-node]");
      const id = target?.getAttribute("data-node");
      el!.classList.toggle("has-active-node", !!id);
      el!
        .querySelectorAll("[data-node], [data-from], [data-legend-node]")
        .forEach((item) => {
          item.classList.toggle(
            "connected",
            !!id &&
              [
                item.getAttribute("data-node"),
                item.getAttribute("data-from"),
                item.getAttribute("data-to"),
                item.getAttribute("data-legend-node"),
              ].includes(id),
          );
        });
    }
    function clear() {
      el!.classList.remove("has-active-node");
    }
    el.addEventListener("pointerover", highlight);
    el.addEventListener("focusin", highlight);
    el.addEventListener("pointerleave", clear);
    el.addEventListener("focusout", clear);
    return () => {
      observer?.disconnect();
      el.removeEventListener("pointerover", highlight);
      el.removeEventListener("focusin", highlight);
      el.removeEventListener("pointerleave", clear);
      el.removeEventListener("focusout", clear);
    };
  }, []);
  return (
    <div ref={ref} className="diagram-interactive">
      {children}
    </div>
  );
}
