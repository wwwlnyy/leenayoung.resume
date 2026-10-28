export type Project = {
  slug: string;
  title: string;
  organization: string;
  period: string;
  summary: string;
  stack: string[];
};

// 상세 블록(요구사항 → 작업 → 문제 → 해결 → 배운 점)은 페이지 작업 시 추가
export const projects: Project[] = [
  {
    slug: "easyplus",
    title: "이지플러스",
    organization: "(주)루트파인더즈",
    period: "2026.03 – 2026.06",
    summary: "시각장애인용 멀티미디어 앱 · 개발 참여 · 이후 정식 출시",
    stack: ["React Native", "TypeScript", "Zustand", "Axios"],
  },
  {
    slug: "scouter",
    title: "스카우터 v1",
    organization: "Yourssu",
    period: "2025.07 – 2026.06",
    summary: "동아리 리크루팅 자동화 B2B 인사관리 서비스 · v1 개발 참여 · 현재 v2로 개편",
    stack: ["React", "TypeScript", "TanStack Query", "Tailwind CSS"],
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
