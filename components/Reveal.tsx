"use client";
import { useEffect, useRef } from "react";
export function Reveal({
  children,
  className = "",
  trackSections = false,
}: {
  children: React.ReactNode;
  className?: string;
  trackSections?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!trackSections || !("IntersectionObserver" in window)) return;
    const links = [
      ...(ref.current?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]') ??
        []),
    ];
    const targets = links
      .map((link) => document.getElementById(link.hash.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (active)
          links.forEach((link) => {
            if (link.hash === `#${active.target.id}`)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
      },
      { rootMargin: "-80px 0px -50% 0px", threshold: 0 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [trackSections]);
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.animate(
            [
              { opacity: 0.3, transform: "translateY(8px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 400, easing: "ease-out" },
          );
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
