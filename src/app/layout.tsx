import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { profile } from "@content/profile";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description: "React · React Native 프론트엔드 개발자 이나영의 이력서와 포트폴리오",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
