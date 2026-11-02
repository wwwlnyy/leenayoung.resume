import type { CaseStudy } from "@content/types";
import { PrintComparison } from "./PrintComparison";
import { PrintImages } from "./PrintImages";
import { PrintBulletList, PrintRow } from "./PrintRow";

interface PrintCaseProps {
  caseStudy: CaseStudy;
  // 대표 화면으로 개요 페이지에 이미 쓴 이미지는 사례에서 생략
  showImages?: boolean;
}

// 사이트 CaseStudySection과 같은 블록 순서를 A4용 크기로 렌더링
export function PrintCase({ caseStudy, showImages = true }: PrintCaseProps) {
  return (
    <section aria-labelledby={`print-case-${caseStudy.id}`} className="mb-[6mm] last-of-type:mb-0">
      <h3 id={`print-case-${caseStudy.id}`} className="mb-[2mm] text-[11.5pt] font-bold">
        {caseStudy.title}
      </h3>

      {caseStudy.requirement && <PrintRow label="요구사항">{caseStudy.requirement}</PrintRow>}
      {caseStudy.problem && <PrintRow label="문제">{caseStudy.problem}</PrintRow>}
      {caseStudy.work && (
        <PrintRow label="작업">
          <PrintBulletList items={caseStudy.work} />
        </PrintRow>
      )}
      {caseStudy.myContribution && (
        <PrintRow label="기여">
          <PrintBulletList items={caseStudy.myContribution} />
        </PrintRow>
      )}
      {caseStudy.attempts && (
        <PrintRow label="시도">
          <ol className="list-decimal space-y-[0.8mm] pl-[4mm] marker:text-sub">
            {caseStudy.attempts.map((attempt) => (
              <li key={attempt.approach}>
                {attempt.approach} → <span className="text-sub">{attempt.outcome}</span>
              </li>
            ))}
          </ol>
        </PrintRow>
      )}
      {caseStudy.solution && (
        <PrintRow label="해결">
          <PrintBulletList items={caseStudy.solution} />
        </PrintRow>
      )}
      {(caseStudy.comparison || caseStudy.result) && (
        <PrintRow label="결과">
          {caseStudy.comparison && <PrintComparison comparison={caseStudy.comparison} />}
          {caseStudy.result && <PrintBulletList items={caseStudy.result} />}
        </PrintRow>
      )}
      {caseStudy.learned && <PrintRow label="배운 점">{caseStudy.learned}</PrintRow>}
      {showImages && caseStudy.images && (
        <PrintRow label="화면">
          <PrintImages images={caseStudy.images} />
        </PrintRow>
      )}
    </section>
  );
}
