import type { Experience, SkillGroup, Strength } from "./types";

// 공개 사이트에도 렌더링되므로 전화번호는 여기 두지 않음 (PDF 전용으로 별도 관리)
export const profile = {
  name: "이나영",
  role: "Frontend Developer",
  email: "wwwlnyy@gmail.com",
  github: "https://github.com/wwwlnyy",
};

export const intro =
  "사용자가 불편함을 느끼는 지점을 먼저 찾고 해결하는 프론트엔드 개발자입니다. 시각장애인용 앱 '이지플러스' 개발에 참여하며, 개발자에게 직관적인 UI가 모든 사용자에게 자연스럽지는 않다는 것을 VoiceOver·TalkBack 실기기 테스트로 직접 확인했습니다. 웹(React)과 앱(React Native)을 모두 실서비스로 경험했고, 플랫폼에 관계없이 편하게 쓸 수 있는 화면을 만드는 데 집중하고 있습니다.";

export const strengths: readonly Strength[] = [
  {
    title: "피드백을 적극적으로 수용하되, 검토한 뒤 받아들입니다.",
    body: "동아리 Yourssu 첫 작업에서 약 80개의 코드 리뷰 코멘트를 받았습니다. 코멘트를 그대로 따르기보다 리뷰어가 어떤 문제를 보고 남긴 의견인지 먼저 파악하고, 이해되지 않거나 더 나은 방법이 있다고 생각될 때는 질문하며 논의한 뒤 반영합니다.",
  },
  {
    title: "문제와 아이디어를 근거와 함께 먼저 제안합니다.",
    body: "인턴십 중 이지플러스 커머스 기능을 개발하며, 리뷰 작성 버튼 위치처럼 구매 흐름에서 불편한 지점을 발견하면 다른 쇼핑몰 앱 사례를 근거로 팀의 공감을 얻어 기획에 제안했습니다. API 스펙이 맞지 않을 때도 필요한 이유를 정리해 백엔드 팀에 직접 요청했습니다.",
  },
  {
    title: "AI 도구로 팀의 개발 속도를 높입니다.",
    body: "이지플러스에서 두 달간 20여 개 화면을 만들어야 했을 때, 반복되는 화면 생성 작업을 Claude Code 스킬로 자동화했습니다. 이후 스킬이 공통 컴포넌트까지 활용하도록 확장해, 화면마다 직접 손대야 하는 작업을 줄이는 데 기여했습니다.",
  },
];

export const experiences: readonly Experience[] = [
  {
    title: "(주)루트파인더즈",
    role: "ICT 인턴 · 프론트엔드",
    period: "2026.03 – 2026.06",
    description:
      "시각장애인용 멀티미디어 앱 '이지플러스' (React Native) 개발 참여 · 이후 정식 출시",
  },
  {
    title: "Yourssu",
    role: "숭실대 IT 동아리 · 프론트엔드",
    period: "2025.04 – 2026.06",
    description: "스카우터 v1, 리크루팅 랜딩페이지 개발",
  },
  {
    title: "42 Seoul",
    role: "소프트웨어 교육 과정",
    period: "2023.01 – 2025.03",
    description:
      "C 시스템 프로그래밍부터 웹 서비스까지 동료 학습 기반 프로젝트 수행",
  },
];

// 개발 외 활동. 진행 중인 활동을 먼저 둠
export const otherActivities: readonly Experience[] = [
  {
    title: "성북구 한책추진단",
    role: "운영위원 · 주민 주도 지역 독서운동",
    period: "2024 – 현재",
    description:
      "다양한 세대의 주민들과 후보 도서를 읽고 토의하며 '성북구 한 책' 선정에 참여 (2025년 선정 도서: 조승리 『이 지랄맞음이 쌓여 축제가 되겠지』). 2025년부터 운영위원으로 구와 함께 사업 기획에 참여. 청수도서관 아르바이트(2025.06 – 07)",
  },
  {
    title: "아름다운서당 20기",
    role: "대학생 리더십 교육 과정 · 25주",
    period: "2025.07 – 2026.02",
    description:
      "매주 동서양 인문고전을 읽고 에세이를 쓰며 토론, 그중 3편을 20기 활동집에 수록. 4박 5일 겨울캠프에서 '산업 AX'를 주제로 자동차 산업의 AI 전환을 팀으로 탐구하고 발표",
  },
  {
    title: "숭실대학교 중앙도서관 독서지기",
    role: "중앙도서관 독서 프로그램 운영 보조",
    period: "2025.03 – 2026.02",
    description:
      "독서 행사 운영을 보조하며 직접 참여하고, 학생 독서후기 심사와 도서관 SNS 추천 책 · 프로그램 후기 작성을 맡음. 독서토론 프로그램 '숭실고독' 참여. 고전 콘서트(2025.05)에서 고등학생 대상 『일리아스』 독서토론 퍼실리테이터로, 토론 질문을 직접 준비해 다른 진행자들과 미리 검토하고 학생들의 의견을 이어 주며 토론을 진행",
  },
];

export const education: Experience = {
  title: "숭실대학교",
  role: "컴퓨터학부",
  period: "2021.03 – 2027.02 졸업예정",
};

export const skills: readonly SkillGroup[] = [
  { category: "Language", items: ["TypeScript", "JavaScript"] },
  { category: "Framework", items: ["React", "React Native"] },
  {
    category: "State / Data",
    items: ["TanStack Query", "Zustand", "Context API", "Axios"],
  },
  { category: "Style", items: ["Tailwind CSS", "Styled-Components"] },
  { category: "Tool", items: ["Git", "Figma", "Notion", "Claude Code"] },
];
