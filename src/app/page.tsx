import { education, experiences, profile, skills, strengths } from "@content/profile";
import { minorProjects, projects } from "@content/projects";
import { ExperienceList } from "@/components/home/ExperienceList";
import { Hero } from "@/components/home/Hero";
import { HomeSection } from "@/components/home/HomeSection";
import { ProjectCard } from "@/components/home/ProjectCard";

export default function Home() {
  return (
    <div className="page-container pt-20 pb-16">
      <Hero />

      <main>
        <HomeSection id="strengths" label="강점">
          <ol className="space-y-6">
            {strengths.map((strength, index) => (
              <li key={strength.title} className="grid grid-cols-[2rem_1fr]">
                <span aria-hidden="true" className="font-bold text-accent tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold">{strength.title}</h3>
                  <p className="mt-1 leading-relaxed text-sub">{strength.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </HomeSection>

        <HomeSection id="projects" label="프로젝트">
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <ul className="mt-8 space-y-2">
            {minorProjects.map((project) => (
              <li key={project.title} className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p>
                  <span className="font-bold">{project.title}</span>
                  <span className="text-sub"> · {project.summary}</span>
                </p>
                <p className="text-sm text-sub tabular-nums">{project.period}</p>
              </li>
            ))}
          </ul>
        </HomeSection>

        <HomeSection id="experience" label="경력 · 활동">
          <ExperienceList items={experiences} />
        </HomeSection>

        <HomeSection id="education" label="학력">
          <ExperienceList items={[education]} />
        </HomeSection>

        <HomeSection id="skills" label="기술 스택">
          <dl className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-2">
            {skills.map((group) => (
              <div key={group.category} className="contents">
                <dt className="text-sm text-sub">{group.category}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </HomeSection>
      </main>

      <footer className="border-t border-line pt-8 text-sm text-sub">
        <a href={`mailto:${profile.email}`} className="link-underline">
          {profile.email}
        </a>
        <span aria-hidden="true"> · </span>
        <a href={profile.github} className="link-underline" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  );
}
