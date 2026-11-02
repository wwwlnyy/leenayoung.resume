import type { Comparison } from "@content/types";

interface ComparisonCellProps {
  label: string;
  value: string;
  detail: string;
  isAfter?: boolean;
}

function ComparisonCell({ label, value, detail, isAfter = false }: ComparisonCellProps) {
  return (
    <div className={`rounded-[2mm] border px-[4mm] py-[3mm] ${isAfter ? "border-accent" : "border-line"}`}>
      <p className={`text-[8pt] font-medium ${isAfter ? "text-accent" : "text-sub"}`}>{label}</p>
      <p className={`mt-[0.5mm] text-[16pt] leading-tight font-bold ${isAfter ? "text-accent" : ""}`}>{value}</p>
      <p className="mt-[1mm] text-[8.5pt] leading-[1.5] text-sub">{detail}</p>
    </div>
  );
}

// 작업 전후를 나란히 놓은 비교 박스
export function PrintComparison({ comparison }: { comparison: Comparison }) {
  return (
    <figure className="mb-[2.5mm]">
      <figcaption className="mb-[1.5mm] font-medium">{comparison.metric}</figcaption>
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-x-[3mm]">
        <ComparisonCell label="이전" value={comparison.before} detail={comparison.beforeDetail} />
        <span aria-hidden="true" className="self-center text-[12pt] text-sub">
          →
        </span>
        <ComparisonCell label="이후" value={comparison.after} detail={comparison.afterDetail} isAfter />
      </div>
    </figure>
  );
}
