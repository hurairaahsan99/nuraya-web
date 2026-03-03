"use client";

import { useState } from "react";
import Image from "next/image";

/** Extract YouTube video ID from any pasted link (watch, youtu.be, embed, with or without https/www). */
function getYouTubeId(url: string): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();
  if (/youtube\.com\/watch\?.*v=/i.test(trimmed)) {
    const m = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  }
  if (/youtu\.be\//i.test(trimmed)) {
    const m = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
    return m ? m[1] : null;
  }
  if (/youtube\.com\/embed\//i.test(trimmed)) {
    const m = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
    return m ? m[1] : null;
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  return null;
}

type Props = {
  /** YouTube URL from admin (paste any link: watch, youtu.be, embed, or just video ID) */
  youtubeUrl?: string;
  /** Optional title for the section */
  title?: string;
};

export default function ProjectVideo({ youtubeUrl, title = "Project video" }: Props) {
  const [playing, setPlaying] = useState(false);
  const videoId = youtubeUrl ? getYouTubeId(youtubeUrl) : null;

  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <section className="w-full px-4 py-8 md:py-12" aria-label={title}>
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[24px] border border-[#DAD6C8] bg-[#E8E6DF] aspect-video">
        {!playing ? (
          <>
            <div className="absolute inset-0 z-0">
              <Image
                src={thumbnailUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                unoptimized
              />
              <div className="absolute inset-0 " aria-hidden />
            </div>
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 z-10 flex items-center justify-center transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#F1EFE0] focus:ring-offset-4 focus:ring-offset-[#151515]"
              aria-label="Play video"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F1EFE0]/95 text-[#151515] shadow-lg transition-transform hover:scale-105 md:h-24 md:w-24">
                <svg
                  className="ml-1 h-8 w-8 md:h-10 md:w-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </span>
            </button>
          </>
        ) : (
          <iframe
            src={embedUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
    </section>
  );
}
