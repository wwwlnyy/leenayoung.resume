import type { Metadata } from "next";
import { profile } from "@content/profile";

export const SITE_URL = "https://leenayoung-resume.vercel.app";
export const SITE_TITLE = `${profile.name} · ${profile.role}`;
export const SITE_DESCRIPTION = "React · React Native 프론트엔드 개발자 이나영의 이력서와 포트폴리오";

// 하위 페이지가 openGraph·twitter를 지정하면 레이아웃 값이 통째로 덮이므로 공통 값을 함께 펼쳐 씀
const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE_TITLE} 포트폴리오`,
};

interface ShareMetadataInput {
  title: string;
  description: string;
  path: string;
}

export function shareMetadata({ title, description, path }: ShareMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE_TITLE,
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
