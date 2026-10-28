"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ProjectImage } from "@content/types";

interface ZoomableImageProps {
  image: ProjectImage;
  sizes: string;
}

// 썸네일을 누르면 네이티브 <dialog>로 크게 표시. Esc·닫기 버튼·바깥 영역 클릭으로 닫힘
export function ZoomableImage({ image, sizes }: ZoomableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`${image.caption} 크게 보기`}
        className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line transition-opacity hover:opacity-90"
      >
        <Image src={image.src} alt={image.alt} sizes={sizes} className="w-full" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={image.caption}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/80"
      >
        <div className="flex h-dvh w-screen flex-col items-center justify-center gap-3 px-4 pt-16 pb-4" onClick={close}>
          <Image
            src={image.src}
            alt={image.alt}
            sizes="100vw"
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
      </dialog>
    </>
  );
}
