"use client";
import { useEffect, useRef, useState } from "react";
import { site, ui } from "@/content/site";
import { Icon } from "./Icon";
export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setStatus("copied");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }
  return (
    <>
      <button
        className="button button-outline"
        onClick={copy}
        aria-label={status === "copied" ? ui.copied : ui.copyEmail}
      >
        <Icon name={status === "copied" ? "check" : "copy"} />
        {status === "copied" ? ui.copied : ui.copy}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied"
          ? ui.copied
          : status === "error"
            ? ui.copyFailed
            : ""}
      </span>
    </>
  );
}
