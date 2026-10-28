import Link from "next/link";
import { profile } from "@content/profile";
import { projects } from "@content/projects";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">{profile.name}</h1>
      <p className="mt-2 text-sub">{profile.role}</p>

      <section aria-labelledby="projects-heading" className="mt-16 border-t border-line pt-8">
        <h2 id="projects-heading" className="text-sm font-medium text-sub">
          프로젝트
        </h2>
        <ul className="mt-4 space-y-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
