import type { Project, ProjectImage } from "@content/types";
import { PrintImages } from "./PrintImages";
import { PrintBulletList, PrintRow } from "./PrintRow";

interface PrintProjectOverviewProps {
  project: Project;
  images: readonly ProjectImage[];
}

// 프로젝트 첫 장: 이름 · 상태 · 기본 정보 · 핵심 작업 · 대표 화면
export function PrintProjectOverview({ project, images }: PrintProjectOverviewProps) {
  return (
    <>
      <header className="mb-[8mm]">
        <p className="text-[8.5pt] text-sub">
          {project.organization} · {project.period}
        </p>
        <h2 className="mt-[2mm] text-[26pt] leading-tight font-bold tracking-tight">{project.title}</h2>
        <p className="mt-[2mm] text-[10.5pt]">
          {project.summary} · <span className="text-accent">{project.status}</span>
        </p>
      </header>

      <PrintRow label="역할">{project.role}</PrintRow>
      <PrintRow label="팀 · 기여도">
        {project.team} · 기여도 {project.contribution}%
      </PrintRow>
      <PrintRow label="스택">{project.stack.join(" · ")}</PrintRow>
      <PrintRow label="링크">
        {/* 스토어 URL은 길고 인코딩돼 있어 PDF 안에서 누르는 링크로만 둠 */}
        <ul className="flex gap-x-[5mm]">
          {project.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-accent underline underline-offset-2">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </PrintRow>
      <PrintRow label="핵심 작업">
        <PrintBulletList items={project.highlights} />
      </PrintRow>
      {images.length > 0 && (
        <PrintRow label="대표 화면">
          <PrintImages images={images} />
        </PrintRow>
      )}
    </>
  );
}
