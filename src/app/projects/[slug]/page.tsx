import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { profile } from "@content/profile";
import { findProject, projects } from "@content/projects";
import { CaseStudySection } from "@/components/project/CaseStudySection";
import { StickyBackBar } from "@/components/project/StickyBackBar";
import { shareMetadata } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = findProject(slug);
  if (!project) return {};

  const title = `${project.title} · ${profile.name}`;
  const description = `${project.summary} · ${project.status}`;

  return {
    title,
    description,
    ...shareMetadata({ title, description, path: `/projects/${project.slug}` }),
  };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = findProject(slug);
  if (!project) notFound();

  return (
    <>
      <StickyBackBar title={project.title} />

      <main className="page-container pt-14 pb-20">
        <header className="pb-12">
          <p className="text-sm text-sub">
            {project.organization} · {project.period}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4">
            {project.summary} ·{" "}
            <span className="text-accent">{project.status}</span>
          </p>
          {project.links.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                  >
                    {link.label}
                    <span className="sr-only"> (새 탭에서 열림)</span>
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>

        <section
          aria-labelledby="overview-heading"
          className="border-t border-line pt-12"
        >
          <h2
            id="overview-heading"
            className="mb-6 text-sm font-medium text-sub"
          >
            개요
          </h2>
          <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
            <dt className="text-sub">역할</dt>
            <dd>{project.role}</dd>
            {/* 팀 구성·기여도는 데이터에 두고 화면에서만 숨김
            <dt className="text-sub">팀</dt>
            <dd>
              {project.team} · 기여도 {project.contribution}%
            </dd>
            */}
            <dt className="text-sub">스택</dt>
            <dd>{project.stack.join(", ")}</dd>
          </dl>
          <ul className="mt-6 list-disc space-y-1.5 pl-5">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        {project.cases.map((caseStudy) => (
          <CaseStudySection key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </main>
    </>
  );
}
