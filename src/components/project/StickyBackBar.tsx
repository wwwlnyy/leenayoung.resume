import Link from "next/link";

interface StickyBackBarProps {
  title: string;
}

// 스크롤 위치와 상관없이 항상 홈의 프로젝트 목록으로 돌아갈 수 있도록 상단 고정
export function StickyBackBar({ title }: StickyBackBarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
      <nav aria-label="프로젝트 탐색" className="page-container flex h-14 items-center gap-1">
        <Link
          href="/#projects"
          aria-label="프로젝트 목록으로 돌아가기"
          className="-ml-2 inline-flex size-10 items-center justify-center rounded-full text-sub transition-colors hover:bg-line/60 hover:text-ink"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <p className="text-sm font-medium">{title}</p>
      </nav>
    </header>
  );
}
