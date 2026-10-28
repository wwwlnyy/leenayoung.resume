// 사용법: pnpm build && pnpm start 로 서버를 띄운 뒤 pnpm export:pdf
// BASE_URL 환경변수로 대상 서버를 바꿀 수 있음 (기본 http://localhost:3000)
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUTPUT_PATH = "exports/portfolio.pdf";

interface OverflowReport {
  index: number;
  overflow: number;
}

async function main(): Promise<void> {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/print`, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.evaluate(() => document.fonts.ready);

    const overflows: OverflowReport[] = await page.$$eval(".page", (pages) =>
      pages
        .map((el, i) => ({ index: i + 1, overflow: el.scrollHeight - el.clientHeight }))
        .filter((report) => report.overflow > 0),
    );
    if (overflows.length > 0) {
      for (const { index, overflow } of overflows) {
        console.error(`[export-pdf] ${index}페이지가 ${overflow}px 넘침`);
      }
      process.exitCode = 1;
      return;
    }

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await page.pdf({ path: OUTPUT_PATH, format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log(`[export-pdf] ${OUTPUT_PATH} 저장 완료`);
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error("[export-pdf] 실패:", error);
  process.exitCode = 1;
});
