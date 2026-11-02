import Image from "next/image";
import type { ProjectImage } from "@content/types";

// PDF는 DPR 1로 렌더링되므로 인쇄 해상도를 위해 실제 표시 폭보다 크게 요청
const SIZES_PORTRAIT = "480px";
const SIZES_LANDSCAPE = "1600px";

interface PrintImagesProps {
  images: readonly ProjectImage[];
}

// 세로 모바일 캡처는 나란히, 가로 데스크톱 캡처는 내용 폭 전체로 표시
// lazy 로딩이면 화면 밖 페이지 이미지가 PDF에 빠지므로 eager로 고정
export function PrintImages({ images }: PrintImagesProps) {
  // 세로 캡처가 4장 이상이면 한 줄에 모두 들어가도록 좁힘
  const portraitCount = images.filter((image) => image.src.height >= image.src.width).length;
  const portraitWidth = portraitCount >= 4 ? "w-[30mm]" : "w-[44mm]";

  return (
    <div className="flex flex-wrap gap-[4mm]">
      {images.map((image) => {
        const isLandscape = image.src.width > image.src.height;

        return (
          <figure key={image.caption} className={isLandscape ? "w-full" : portraitWidth}>
            <Image
              src={image.src}
              alt={image.alt}
              sizes={isLandscape ? SIZES_LANDSCAPE : SIZES_PORTRAIT}
              loading="eager"
              className="w-full rounded-[2mm] border border-line"
            />
            <figcaption className="mt-[1.5mm] text-[8pt] text-sub">{image.caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
