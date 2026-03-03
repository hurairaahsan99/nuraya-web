"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectVisual } from "@/lib/projectsData";

type Props = {
  visuals: ProjectVisual[];
  altPrefix?: string;
};

export default function ProjectVisuals({
  visuals,
  altPrefix = "Project visual",
}: Props) {
  const [index, setIndex] = useState(0);
  const current = visuals[index];
  const prev = () => setIndex((i) => (i === 0 ? visuals.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === visuals.length - 1 ? 0 : i + 1));

  if (!current) return null;

  return (
    <section className="w-full" aria-label="Project visuals">
      <div>
        {/* Outer rounded container: blurred bg + content */}
        <div className="relative h-[70vh] lg:h-[70vh] overflow-hidden rounded-[24px] border border-[#DAD6C8] bg-[#E8E6DF] shadow-sm">
          {/* Blurred background (same image as current slide) — reduced blur ~20% */}
          <div className="absolute inset-0 z-0">
            <Image
              src={current.image}
              alt=""
              fill
              className="object-cover scale-105 blur-sm"
              aria-hidden
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Content — above blur */}
          <div className="relative z-10 flex mt:4 md:mt-5 flex-col gap-8 py-10 px-6 sm:px-10 md:flex-row md:items-center md:justify-between  md:py-14 md:px-12 lg:px-20 lg:mr-26">
            {/* Left: title, description, nav buttons */}
            <div className="flex flex-col gap-6 md:gap-10 md:max-w-[45%]">
              <div className="flex flex-col gap-3 md:gap-5">
                <h2 className="hero-title text-[34px] font-normal text-[#F1EFE0] sm:text-[36px] md:text-[44px]">
                  {current.title}
                </h2>
                <p className="text-[16px] md:text-[18px] leading-relaxed w-[90%] text-[#F1EFE0]/85">
                  {current.description}
                </p>
              </div>

              {/* Nav buttons: no background, transparent with light border */}
              <div className="hidden items-center gap-3 md:flex">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous visual"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F1EFE0] bg-transparent text-[#F1EFE0] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#F1EFE0] focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next visual"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F1EFE0] bg-transparent text-[#F1EFE0] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#F1EFE0] focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: framed sharp image — explicit width on desktop so it doesn't collapse */}
            <div className="relative z-10 flex w-full shrink-0 justify-center md:w-[35%] md:min-w-[320px] lg:min-w-[400px] lg:min-h-100">
              <div className="relative w-full overflow-hidden rounded-[20px] border-8 border-white bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] aspect-3/2 max-w-[560px]">
                <Image
                  src={current.image}
                  alt={`${altPrefix} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 48vw"
                />
              </div>
            </div>
          </div>

          {/* Mobile: nav below frame — no background */}
          <div className="relative z-10 flex justify-center gap-3 pb-8 pt-2 md:hidden">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous visual"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#F1EFE0] bg-transparent text-[#F1EFE0] transition-opacity hover:opacity-90"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next visual"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#F1EFE0] bg-transparent text-[#F1EFE0] transition-opacity hover:opacity-90"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
