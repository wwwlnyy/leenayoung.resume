import Link from "next/link";
import type { Project } from "@content/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  const headingId = `project-${project.slug}`;

  return (
    <article aria-labelledby={headingId} className="rounded-xl border border-line p-6 sm:p-8">
      <p className="text-sm text-sub">
        {project.organization} · {project.period}
      </p>
      <h3 id={headingId} className="mt-2 text-2xl font-bold">
        <Link href={href} className="hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2">
        {project.summary} · <span className="text-accent">{project.status}</span>
      </p>

      <dl className="mt-5 grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
        <dt className="text-sub">역할</dt>
        <dd>{project.role}</dd>
        <dt className="text-sub">팀</dt>
        <dd>
          {project.team} · 기여도 {project.contribution}%
        </dd>
        <dt className="text-sub">스택</dt>
        <dd>{project.stack.join(", ")}</dd>
      </dl>

      <ul className="mt-5 list-disc space-y-1 pl-5">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1 font-medium text-accent hover:underline"
      >
        {project.title} 자세히 보기
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
