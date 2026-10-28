import type { ReactNode } from "react";

interface HomeSectionProps {
  id: string;
  label: string;
  children: ReactNode;
}

// 이력서와 같은 좌측 라벨 / 우측 내용 2단 구조. 좁은 화면에서는 위아래로 쌓임
export function HomeSection({ id, label, children }: HomeSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="grid gap-6 border-t border-line py-12 md:grid-cols-[9rem_1fr] md:gap-10"
    >
      <h2 id={headingId} className="text-sm font-medium text-sub">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}
