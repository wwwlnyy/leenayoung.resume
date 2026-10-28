import type { ProjectImage } from "@content/types";
import { ZoomableImage } from "./ZoomableImage";

interface CaseImagesProps {
  images: readonly ProjectImage[];
}

// 세로 모바일 캡처는 여러 장을 나란히, 가로 데스크톱 캡처는 내용 폭 전체로 표시
export function CaseImages({ images }: CaseImagesProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => {
        const isLandscape = image.src.width > image.src.height;

        return (
          <figure key={image.caption} className={isLandscape ? "w-full" : "w-[calc(50%-0.5rem)] sm:w-44"}>
            <ZoomableImage
              image={image}
              sizes={isLandscape ? "(min-width: 768px) 600px, 100vw" : "(min-width: 640px) 176px, 45vw"}
            />
            <figcaption className="mt-2 text-sm text-sub">{image.caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
