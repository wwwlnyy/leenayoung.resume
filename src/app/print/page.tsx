import type { Metadata } from "next";
import type { ReactNode } from "react";
import { profile } from "@content/profile";
import "./print.css";

export const metadata: Metadata = {
  title: `${profile.name} 포트폴리오`,
  robots: { index: false },
};

interface PrintPageProps {
  pageNumber: number;
  children: ReactNode;
}

function PrintPage({ pageNumber, children }: PrintPageProps) {
  return (
    <section className="page px-[18mm] pt-[20mm] pb-[16mm]">
      {children}
      <footer className="absolute inset-x-[18mm] bottom-[10mm] flex justify-between text-[8pt] text-sub">
        <span>{profile.name} 포트폴리오</span>
        <span>{pageNumber}</span>
      </footer>
    </section>
  );
}

export default function PrintRoute() {
  return (
    <main className="print-root">
      <PrintPage pageNumber={1}>
        <h1 className="text-[28pt] font-bold">{profile.name}</h1>
        <p className="mt-2 text-sub">{profile.role}</p>
      </PrintPage>
    </main>
  );
}
