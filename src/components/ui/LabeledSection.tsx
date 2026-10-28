import type { ReactNode } from "react";
import { LABELED_GRID } from "@/lib/layout";

interface LabeledSectionProps {
  id: string;
  label: string;
  children: ReactNode;
}

// 이력서와 같은 좌측 라벨 / 우측 내용 2단 구조. 좁은 화면에서는 위아래로 쌓임
export function LabeledSection({ id, label, children }: LabeledSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${LABELED_GRID} gap-y-8 border-t border-line py-12`}
    >
      <h2 id={headingId} className="text-sm font-medium text-sub">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}
