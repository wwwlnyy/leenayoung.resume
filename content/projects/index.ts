import type { MinorProject, Project } from "../types";
import { easyplus } from "./easyplus";
import { scouter } from "./scouter";

export const projects: readonly Project[] = [easyplus, scouter];

export const minorProjects: readonly MinorProject[] = [
  {
    title: "포트폴리오 사이트",
    organization: "개인 프로젝트",
    period: "2026.10",
    summary:
      "Next.js 기반 포트폴리오 사이트. 데이터 파일 하나로 사이트와 A4 PDF를 함께 렌더링하고, Playwright로 PDF 내보내기와 페이지 넘침 검사를 자동화",
  },
  {
    title: "Yourssu 랜딩페이지",
    organization: "Yourssu",
    period: "2026.02",
    summary: "리크루팅을 위한 Yourssu 웹페이지 프론트엔드 개발",
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
