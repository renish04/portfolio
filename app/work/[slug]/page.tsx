import { notFound } from "next/navigation";
import { projects, ui } from "@/content/site";
import { CaseHeader } from "@/components/case/CaseHeader";
import { Problem } from "@/components/case/Problem";
import { Decisions } from "@/components/case/Decisions";
import { Evidence } from "@/components/case/Evidence";
import { Limits } from "@/components/case/Limits";
import { CaseNav } from "@/components/case/CaseNav";
import { SideIndex } from "@/components/case/SideIndex";
import { CaseSection } from "@/components/case/CaseSection";
import { Diagram } from "@/components/diagram/Diagram";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) notFound();
  return pageMetadata(
    `${project.name} ${ui.caseTitle}`,
    project.tagline,
    `/work/${slug}/`,
  );
}
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) notFound();
  return (
    <div className="container case-layout">
      <SideIndex project={project} />
      <div className="case-content">
        <CaseHeader project={project} />
        <Problem text={project.problem} />
        {project.diagram.nodes.length > 0 && (
          <CaseSection
            id="architecture"
            title={ui.architecture}
            className="architecture-section"
          >
            <Diagram
              diagram={project.diagram}
              id={project.slug}
              title={`${project.name} ${ui.architecture}`}
            />
            <p className="diagram-caption mono muted">{ui.caption}</p>
          </CaseSection>
        )}
        <Decisions items={project.decisions} />
        <Evidence metrics={project.metrics} />
        <Limits items={project.limits} />
        <CaseNav slug={project.slug} />
      </div>
    </div>
  );
}
