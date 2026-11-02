import type { ReactNode } from "react";

interface PrintRowProps {
  label: string;
  children: ReactNode;
}

// 이력서와 같은 좌측 라벨 / 우측 내용 2단 행
export function PrintRow({ label, children }: PrintRowProps) {
  return (
    <div className="grid grid-cols-[22mm_1fr] gap-x-[5mm] border-t border-line py-[2.6mm]">
      <h3 className="text-[8.5pt] font-medium text-sub">{label}</h3>
      <div>{children}</div>
    </div>
  );
}

export function PrintBulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-[0.8mm] pl-[4mm] marker:text-sub">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
