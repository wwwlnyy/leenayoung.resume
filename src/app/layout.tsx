import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, shareMetadata } from "@/lib/site";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  ...shareMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
