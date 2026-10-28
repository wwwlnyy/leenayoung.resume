import { notFound } from "next/navigation";
import { findProject, projects } from "@content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = findProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm text-sub">
        {project.organization} · {project.period}
      </p>
      <h1 className="mt-2 text-3xl font-bold">{project.title}</h1>
      <p className="mt-4">{project.summary}</p>
    </main>
  );
}
