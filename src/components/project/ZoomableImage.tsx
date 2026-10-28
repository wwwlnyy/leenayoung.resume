"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@content/types";

// 확대 보기에서 실제로 그려지는 폭 기준. 세로 캡처는 화면 높이에 맞춰져 폭이 좁고,
// 가로 캡처는 1024px까지만 받아 레티나 PC에서 4K(w=3840) 요청이 나가지 않게 함
const ZOOM_SIZES_PORTRAIT = "(min-width: 640px) 480px, 100vw";
const ZOOM_SIZES_LANDSCAPE = "(min-width: 1024px) 1024px, 100vw";

interface ZoomableImageProps {
  image: ProjectImage;
  sizes: string;
}

// 썸네일을 누르면 네이티브 <dialog>로 크게 표시. Esc·닫기 버튼·바깥 영역 클릭으로 닫힘
// 확대 이미지는 열려 있을 때만 렌더링해 같은 alt가 DOM에 두 번 존재하지 않게 함
export function ZoomableImage({ image, sizes }: ZoomableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
  }, [isOpen]);

  const close = () => dialogRef.current?.close();

  return (
    <>
      {/* 버튼 이름 = 이미지 alt + "크게 보기". aria-label을 쓰면 alt가 읽히지 않으므로 숨김 텍스트로 덧붙임 */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line transition-opacity hover:opacity-90"
      >
        <Image src={image.src} alt={image.alt} sizes={sizes} className="w-full" />
        <span className="sr-only">, 크게 보기</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={image.caption}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/80"
      >
        {isOpen && (
          <>
            <div className="flex h-dvh w-screen flex-col items-center justify-center gap-3 px-4 pt-16 pb-4" onClick={close}>
              <Image
                src={image.src}
                alt={image.alt}
                sizes={image.src.width > image.src.height ? ZOOM_SIZES_LANDSCAPE : ZOOM_SIZES_PORTRAIT}
                className="max-h-[calc(100dvh-8rem)] w-auto max-w-full rounded-lg object-contain"
                onClick={(event) => event.stopPropagation()}
              />
              <p className="text-sm text-paper">{image.caption}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="fixed top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-paper/15 text-paper transition-colors hover:bg-paper/25"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
