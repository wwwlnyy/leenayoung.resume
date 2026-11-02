import QRCode from "qrcode";

interface SiteQrProps {
  url: string;
  label: string;
}

// 빌드 시점에 SVG로 생성해 이미지 요청 없이 PDF에 벡터로 들어가게 함
export async function SiteQr({ url, label }: SiteQrProps) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 0,
    color: { dark: "#1a1a1a", light: "#ffffff" },
  });

  return (
    <div
      role="img"
      aria-label={label}
      className="size-[28mm] [&>svg]:size-full"
      // qrcode 라이브러리가 만든 SVG 문자열. 입력은 코드에 고정된 사이트 URL뿐
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
