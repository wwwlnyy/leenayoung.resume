import type { MinorProject, Project } from "../types";
import { easyplus } from "./easyplus";
import { scouter } from "./scouter";

export const projects: readonly Project[] = [easyplus, scouter];

export const minorProjects: readonly MinorProject[] = [
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
