export type IconName =
  "arrow" | "github" | "linkedin" | "mail" | "download" | "copy" | "check";
const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M6 18 18 6M6 6h12v12" />,
  github: (
    <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.4c0-1 .1-1.4-.5-2 3.3-.4 6.7-1.6 6.7-7.3A5.7 5.7 0 0 0 19.7 5c.2-.5.7-2.1-.2-4 0 0-1.3-.4-4.2 1.6a14.5 14.5 0 0 0-7.6 0C4.8.6 3.5 1 3.5 1c-.9 1.9-.4 3.5-.2 4A5.7 5.7 0 0 0 1.8 9c0 5.7 3.4 6.9 6.7 7.3-.5.5-.6 1.1-.5 2v3" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
};
export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
