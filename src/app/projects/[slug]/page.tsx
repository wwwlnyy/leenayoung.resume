import Link from "next/link";
import { notFound } from "next/navigation";
import { findProject, projects } from "@content/projects";
import { CaseStudySection } from "@/components/project/CaseStudySection";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = findProject(slug);
  if (!project) notFound();

  return (
    <main className="page-container pt-8 pb-20">
      <Link
        href="/"
        aria-label="홈으로"
        className="-ml-2 inline-flex size-10 items-center justify-center rounded-full text-sub transition-colors hover:bg-line/60 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>

      <p className="mt-8 text-sm text-sub">
        {project.organization} · {project.period}
      </p>
      <h1 className="mt-2 text-3xl font-bold">{project.title}</h1>
      <p className="mt-4">
        {project.summary} · <span className="text-accent">{project.status}</span>
      </p>

      <dl className="mt-8 grid grid-cols-[6rem_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-sub">역할</dt>
        <dd>{project.role}</dd>
        <dt className="text-sub">팀</dt>
        <dd>
          {project.team} · 기여도 {project.contribution}%
        </dd>
        <dt className="text-sub">스택</dt>
        <dd>{project.stack.join(", ")}</dd>
      </dl>

      <section aria-labelledby="highlights-heading" className="mt-12">
        <h2 id="highlights-heading" className="text-sm font-medium text-sub">
          주요 작업
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      {project.cases.map((caseStudy) => (
        <CaseStudySection key={caseStudy.id} caseStudy={caseStudy} />
      ))}
    </main>
  );
}
