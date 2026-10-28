import type { ReactNode } from "react";
import type { CaseStudy } from "@content/types";

interface BlockProps {
  label: string;
  children: ReactNode;
}

function Block({ label, children }: BlockProps) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-line py-4">
      <h3 className="text-sm font-medium text-sub">{label}</h3>
      <div>{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function CaseStudySection({ caseStudy }: { caseStudy: CaseStudy }) {
  const headingId = `case-${caseStudy.id}`;

  return (
    <section aria-labelledby={headingId} className="mt-16">
      <h2 id={headingId} className="mb-4 text-xl font-bold">
        {caseStudy.title}
      </h2>

      {caseStudy.requirement && (
        <Block label="요구사항">{caseStudy.requirement}</Block>
      )}
      {caseStudy.work && (
        <Block label="작업">
          <BulletList items={caseStudy.work} />
        </Block>
      )}
      {caseStudy.myContribution && (
        <Block label="기여">
          <BulletList items={caseStudy.myContribution} />
        </Block>
      )}
      {caseStudy.problem && <Block label="문제">{caseStudy.problem}</Block>}
      {caseStudy.attempts && (
        <Block label="시도">
          <ol className="list-decimal space-y-1 pl-5">
            {caseStudy.attempts.map((attempt) => (
              <li key={attempt.approach}>
                {attempt.approach} →{" "}
                <span className="text-sub">{attempt.outcome}</span>
              </li>
            ))}
          </ol>
        </Block>
      )}
      {caseStudy.solution && (
        <Block label="해결">
          <BulletList items={caseStudy.solution} />
        </Block>
      )}
      {caseStudy.result && (
        <Block label="결과">
          <BulletList items={caseStudy.result} />
        </Block>
      )}
      {caseStudy.learned && <Block label="배운 점">{caseStudy.learned}</Block>}
    </section>
  );
}
