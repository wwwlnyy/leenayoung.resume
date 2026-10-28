import mailEditor from "../../img/project/scouter/mail-editor.jpg";
import type { Project } from "../types";

export const scouter: Project = {
  slug: "scouter",
  title: "스카우터 v1",
  organization: "Yourssu · 교내 IT 동아리 프로젝트",
  period: "2025.07 – 2026.06",
  role: "프론트엔드 개발",
  status: "v1 개발 참여 · 현재 v2로 개편",
  summary: "동아리 리크루팅 자동화 B2B 인사관리 서비스",
  keywords: ["관심사 분리", "서버 상태 관리", "코드 리뷰"],
  stack: ["React", "TypeScript", "TanStack Query", "Tailwind CSS"],
  team: "디자이너 겸 PM 1 · FE 2 · BE 2",
  contribution: 30,
  highlights: [
    "메일 템플릿 조회·저장·수정·삭제 구현",
    "예약 페이지 개발",
    "읽기 전용 · 편집 모드에 대응하는 컴포넌트 설계",
  ],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/yourssu/Yourssu-Scouter-Frontend",
    },
  ],
  pending: [
    "v1 화면 (본인 PR 첨부 이미지, v1 피그마, v1 커밋 로컬 실행 중 하나)",
  ],
  cases: [
    {
      id: "mail-variables",
      title: "메일 변수 치환 로직 분리",
      requirement:
        "메일 발송 시 수신인별로 파트명, 지원자명 등의 변수를 치환해야 함",
      work: [
        "변수 치환 로직을 컴포넌트에서 분리",
        "Context API와 전용 인터페이스로 설계",
      ],
      images: [
        {
          src: mailEditor,
          alt: "스카우터 메일 전송 화면. 가운데 에디터에 지원자별 탭과 변수 칩이 들어간 본문이 있고, 오른쪽 변수 리스트에서 파트 담당자, 면접 장소, 지원자별 면접 날짜를 입력한다",
          caption: "메일 전송 화면 (v1 개발 당시 PR 첨부 화면)",
        },
      ],
    },
    {
      id: "component-split",
      title: "역할 단위 컴포넌트 분리",
      // work: ["첫 작업에서 약 80개의 코드 리뷰 코멘트를 받아 팀 컨벤션에 맞게 반영"],
      problem:
        "비슷한 디자인의 Input을 하나로 합쳤다가 props와 분기가 비대해짐",
      solution: [
        '"디자인이 같다고 같은 컴포넌트일 필요는 없다"는 리뷰 피드백 반영',
        "역할 단위로 분리하고, 겹치는 부분만 공통 로직으로 추상화",
      ],
    },
    {
      id: "server-state",
      title: "서버 상태 무결성",
      problem: "클라이언트에서 임의로 데이터를 수정해 서버 원본과 불일치",
      solution: [
        "setQueryData와 invalidateQueries의 차이를 학습해 업데이트 로직 수정",
      ],
    },
    {
      id: "batch-delete",
      title: "예약 메일 일괄 삭제 개선",
      problem:
        "예약 메일 여러 개를 삭제할 때 삭제 요청마다 목록 쿼리를 무효화해, 삭제 개수만큼 목록을 다시 불러옴",
      solution: [
        "mutateAsync와 Promise.all로 삭제 요청을 한꺼번에 처리",
        "모든 삭제가 끝난 뒤 목록 쿼리를 한 번만 무효화",
      ],
    },
    {
      id: "data-fetching",
      title: "불필요한 연산 제거와 병렬 페칭",
      requirement:
        "메일 작성 시 선택한 파트에 맞춰 보내는 사람 · 받는 사람 · 숨은 참조를 자동으로 채워야 함",
      problem:
        "액티브 멤버 전체를 받아 파트 · 역할별로 클라이언트에서 여러 번 필터링하고, useSuspenseQuery를 연달아 호출해 앞 요청이 끝나야 다음 요청이 시작되는 워터폴 발생",
      solution: [
        "API의 partId 파라미터로 필요한 파트의 지원자 · 멤버만 요청해 클라이언트 필터링 제거",
        "useSuspenseQueries로 요청을 묶어 병렬 페칭",
        "필터링 로직이 사라지면서 별도 훅 없이 컴포넌트 안에서 단순하게 관리",
      ],
      learned:
        "로직을 훅으로 감싸 숨기기보다 로직 자체를 단순하게 만드는 것이 먼저라는 리뷰 피드백을 반영",
    },
  ],
};
