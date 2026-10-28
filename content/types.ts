export interface Attempt {
  readonly approach: string;
  readonly outcome: string;
}

// 블록 순서: 요구사항 → 작업 → 문제 → 시도 → 해결 → 결과 → 배운 점
// 비어 있는 블록은 렌더링하지 않음
export interface CaseStudy {
  readonly id: string;
  readonly title: string;
  readonly keywords: readonly string[];
  readonly requirement?: string;
  readonly work?: readonly string[];
  // 팀 작업과 본인 기여를 구분해야 할 때만 사용
  readonly myContribution?: readonly string[];
  readonly problem?: string;
  readonly attempts?: readonly Attempt[];
  readonly solution?: readonly string[];
  readonly result?: readonly string[];
  readonly learned?: string;
  // 아직 확인되지 않은 내용. 렌더링하지 않고 작업 목록으로만 사용
  readonly pending?: readonly string[];
}

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly organization: string;
  readonly period: string;
  readonly role: string;
  // 출시·개편 등 현재 상태 표기 (예: "개발 참여 · 이후 정식 출시")
  readonly status: string;
  readonly summary: string;
  readonly keywords: readonly string[];
  readonly stack: readonly string[];
  readonly team: string;
  readonly contribution: number;
  readonly highlights: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly cases: readonly CaseStudy[];
  readonly pending?: readonly string[];
}

// 상세 페이지 없이 목록에만 짧게 나오는 프로젝트
export interface MinorProject {
  readonly title: string;
  readonly organization: string;
  readonly period: string;
  readonly summary: string;
}

export interface Strength {
  readonly title: string;
  readonly body: string;
}

export interface Experience {
  readonly title: string;
  readonly role: string;
  readonly period: string;
  readonly description?: string;
}

export interface SkillGroup {
  readonly category: string;
  readonly items: readonly string[];
}
