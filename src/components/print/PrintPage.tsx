import type { ReactNode } from "react";
import { profile } from "@content/profile";

interface PrintPageProps {
  pageNumber: number;
  // 표지처럼 하단 folio를 숨겨야 하는 페이지용
  hideFolio?: boolean;
  children: ReactNode;
}

// A4 한 장. 넘친 내용은 잘리므로 export 스크립트의 넘침 검사로 확인
export function PrintPage({ pageNumber, hideFolio = false, children }: PrintPageProps) {
  return (
    <section className="page flex flex-col px-[18mm] pt-[18mm] pb-[18mm] text-[9.5pt] leading-[1.65]">
      {children}
      {!hideFolio && (
        <footer className="absolute inset-x-[18mm] bottom-[9mm] flex justify-between border-t border-line pt-[2.5mm] text-[7.5pt] text-sub">
          <span>{profile.name} 포트폴리오</span>
          <span>{pageNumber}</span>
        </footer>
      )}
    </section>
  );
}

interface PrintPageHeaderProps {
  // 상단 작은 라벨 (프로젝트명 등)
  eyebrow: string;
  title: string;
}

export function PrintPageHeader({ eyebrow, title }: PrintPageHeaderProps) {
  return (
    <header className="mb-[6mm]">
      <p className="text-[8pt] font-medium text-accent">{eyebrow}</p>
      <h2 className="mt-[1mm] text-[17pt] leading-tight font-bold">{title}</h2>
    </header>
  );
}
