import type { Metadata } from "next";
import { education, otherActivities, profile } from "@content/profile";
import { minorProjects } from "@content/projects";
import { easyplus } from "@content/projects/easyplus";
import { scouter } from "@content/projects/scouter";
import type { CaseStudy, Project } from "@content/types";
import { PrintCase } from "@/components/print/PrintCase";
import { PrintPage, PrintPageHeader } from "@/components/print/PrintPage";
import { PrintProjectOverview } from "@/components/print/PrintProjectOverview";
import { PrintRow } from "@/components/print/PrintRow";
import { SiteQr } from "@/components/print/SiteQr";
import { SITE_URL } from "@/lib/site";
import "./print.css";

export const metadata: Metadata = {
  title: `${profile.name} 포트폴리오`,
  robots: { index: false },
};

// 페이지 번호. 목차와 folio가 같은 값을 쓰도록 한곳에서 관리
const PAGE = {
  cover: 1,
  toc: 2,
  easyplusOverview: 3,
  easyplusGame: 4,
  easyplusCommerce: 5,
  scouterOverview: 6,
  scouterCases: 7,
  closing: 8,
} as const;

const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

// 전화번호는 PDF 전용. 공개 레포·배포 사이트에 노출되지 않도록 .env.local에만 두고,
// 값이 없으면(배포 환경) 표지에서 행 자체를 렌더링하지 않음
const PRINT_PHONE = process.env.PRINT_PHONE;

function findCase(project: Project, id: string): CaseStudy {
  const found = project.cases.find((caseStudy) => caseStudy.id === id);
  if (!found) throw new Error(`[print] ${project.slug}에 사례 ${id}가 없음`);
  return found;
}

const easyplusCases = {
  game: findCase(easyplus, "game-state"),
  accessibility: findCase(easyplus, "accessibility"),
  commerce: findCase(easyplus, "commerce"),
  productivity: findCase(easyplus, "productivity"),
};

const scouterCases = {
  mail: findCase(scouter, "mail-variables"),
  troubleshooting: [
    "component-split",
    "server-state",
    "batch-delete",
    "data-fetching",
  ].map((id) => findCase(scouter, id)),
};

interface TocEntry {
  project: Project;
  startPage: number;
  sections: readonly { title: string; page: number }[];
}

const TOC: readonly TocEntry[] = [
  {
    project: easyplus,
    startPage: PAGE.easyplusOverview,
    sections: [
      { title: "개요", page: PAGE.easyplusOverview },
      {
        title: `${easyplusCases.game.title} · ${easyplusCases.accessibility.title}`,
        page: PAGE.easyplusGame,
      },
      {
        title: `${easyplusCases.commerce.title} · ${easyplusCases.productivity.title}`,
        page: PAGE.easyplusCommerce,
      },
    ],
  },
  {
    project: scouter,
    startPage: PAGE.scouterOverview,
    sections: [
      { title: "개요", page: PAGE.scouterOverview },
      {
        title: `${scouterCases.mail.title} · 트러블슈팅`,
        page: PAGE.scouterCases,
      },
    ],
  },
];

function CoverPage() {
  return (
    <PrintPage pageNumber={PAGE.cover} hideFolio>
      <div className="mt-auto mb-auto">
        <p className="text-[10pt] font-medium text-accent">Portfolio</p>
        <h1 className="mt-[3mm] text-[40pt] leading-none font-bold tracking-tight">
          {profile.name}
        </h1>
        <p className="mt-[4mm] text-[13pt] text-sub">
          {profile.role} · React, React Native
        </p>
      </div>

      <dl className="grid grid-cols-[22mm_1fr] gap-y-[2mm] border-t border-ink pt-[5mm] text-[9.5pt]">
        {PRINT_PHONE && (
          <>
            <dt className="text-sub">Phone</dt>
            <dd>{PRINT_PHONE}</dd>
          </>
        )}
        <dt className="text-sub">Email</dt>
        <dd>{profile.email}</dd>
        <dt className="text-sub">GitHub</dt>
        <dd>{profile.github.replace(/^https?:\/\//, "")}</dd>
        <dt className="text-sub">Site</dt>
        <dd>
          <a href={SITE_URL}>{SITE_HOST}</a>
        </dd>
        <dt className="text-sub">학력</dt>
        <dd>
          {education.title} {education.role} · {education.period}
        </dd>
      </dl>
    </PrintPage>
  );
}

function TocPage() {
  return (
    <PrintPage pageNumber={PAGE.toc}>
      <PrintPageHeader eyebrow="Contents" title="목차" />

      {TOC.map(({ project, startPage, sections }) => (
        <section
          key={project.slug}
          aria-labelledby={`toc-${project.slug}`}
          className="mb-[10mm] border-t border-ink pt-[4mm]"
        >
          <div className="flex items-baseline justify-between">
            <h3 id={`toc-${project.slug}`} className="text-[14pt] font-bold">
              {project.title}
            </h3>
            <span className="text-[11pt] font-medium text-accent">
              {startPage}
            </span>
          </div>
          <p className="mt-[1mm] text-sub">
            {project.organization} · {project.period} · {project.role}
          </p>
          <p className="mt-[1mm]">
            {project.keywords.map((keyword) => `#${keyword}`).join("  ")}
          </p>

          <ol className="mt-[3mm]">
            {sections.map((section) => (
              <li
                key={section.title}
                className="flex justify-between border-t border-line py-[1.8mm]"
              >
                <span>{section.title}</span>
                <span className="text-sub">{section.page}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <section
        aria-labelledby="toc-others"
        className="border-t border-ink pt-[4mm]"
      >
        <div className="flex items-baseline justify-between">
          <h3 id="toc-others" className="text-[14pt] font-bold">
            그 외 프로젝트 · 활동
          </h3>
          <span className="text-[11pt] font-medium text-accent">
            {PAGE.closing}
          </span>
        </div>
      </section>
    </PrintPage>
  );
}

function ClosingPage() {
  return (
    <PrintPage pageNumber={PAGE.closing}>
      <PrintPageHeader eyebrow="Others" title="그 외 프로젝트 · 활동" />

      <section aria-labelledby="closing-projects" className="mb-[6mm]">
        <h3 id="closing-projects" className="mb-[2mm] text-[11.5pt] font-bold">
          그 외 프로젝트
        </h3>
        {minorProjects.map((project) => (
          <PrintRow key={project.title} label={project.period}>
            <p className="font-medium">
              {project.title}{" "}
              <span className="font-normal text-sub">
                · {project.organization}
              </span>
            </p>
            <p>{project.summary}</p>
          </PrintRow>
        ))}
      </section>

      <section aria-labelledby="closing-activities">
        <h3
          id="closing-activities"
          className="mb-[2mm] text-[11.5pt] font-bold"
        >
          그 외 활동
        </h3>
        {otherActivities.map((activity) => (
          <PrintRow key={activity.title} label={activity.period}>
            <p className="font-medium">
              {activity.title}{" "}
              <span className="font-normal text-sub">· {activity.role}</span>
            </p>
            {activity.description && <p>{activity.description}</p>}
          </PrintRow>
        ))}
      </section>

      <section
        aria-labelledby="closing-contact"
        className="mt-auto mb-[10mm] border-t border-ink pt-[6mm]"
      >
        <h2 id="closing-contact" className="text-[17pt] font-bold">
          감사합니다
        </h2>
        <div className="mt-[5mm] flex items-end justify-between">
          <dl className="grid grid-cols-[18mm_1fr] gap-y-[1.5mm]">
            <dt className="text-sub">Email</dt>
            <dd>{profile.email}</dd>
            <dt className="text-sub">GitHub</dt>
            <dd>{profile.github.replace(/^https?:\/\//, "")}</dd>
            <dt className="text-sub">Site</dt>
            <dd>
              <a href={SITE_URL}>{SITE_HOST}</a>
            </dd>
          </dl>
          <figure className="text-center">
            <SiteQr
              url={SITE_URL}
              label={`포트폴리오 사이트 ${SITE_HOST} QR 코드`}
            />
            <figcaption className="mt-[1.5mm] text-[7.5pt] text-sub">
              사이트에서 더 보기
            </figcaption>
          </figure>
        </div>
      </section>
    </PrintPage>
  );
}

export default function PrintRoute() {
  return (
    <main className="print-root">
      <CoverPage />
      <TocPage />

      <PrintPage pageNumber={PAGE.easyplusOverview}>
        <PrintProjectOverview
          project={easyplus}
          images={[
            ...(easyplusCases.game.images ?? []),
            ...(easyplusCases.commerce.images ?? []),
          ]}
        />
      </PrintPage>
      <PrintPage pageNumber={PAGE.easyplusGame}>
        <PrintPageHeader eyebrow={easyplus.title} title="상태 설계와 접근성" />
        <PrintCase caseStudy={easyplusCases.game} showImages={false} />
        <PrintCase caseStudy={easyplusCases.accessibility} />
      </PrintPage>
      <PrintPage pageNumber={PAGE.easyplusCommerce}>
        <PrintPageHeader eyebrow={easyplus.title} title="커머스와 팀 생산성" />
        <PrintCase caseStudy={easyplusCases.commerce} showImages={false} />
        <PrintCase caseStudy={easyplusCases.productivity} />
      </PrintPage>

      <PrintPage pageNumber={PAGE.scouterOverview}>
        <PrintProjectOverview
          project={scouter}
          images={scouterCases.mail.images ?? []}
        />
      </PrintPage>
      <PrintPage pageNumber={PAGE.scouterCases}>
        <PrintPageHeader eyebrow={scouter.title} title="설계와 트러블슈팅" />
        <PrintCase caseStudy={scouterCases.mail} showImages={false} />
        {scouterCases.troubleshooting.map((caseStudy) => (
          <PrintCase key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </PrintPage>

      <ClosingPage />
    </main>
  );
}
