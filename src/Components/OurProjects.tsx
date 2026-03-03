"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { getProjects, getCardImageUrl, type ApiProjectListItem } from "@/lib/api";

const CARD_IMAGE_PLACEHOLDER = "/p1.png";

type ProjectCard = {
  subtitle: string;
  title: string;
  price: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
};

function ArrowLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

type OurProjectsProps = {
  variant?: "default" | "onDark";
};

export default function OurProjects({ variant = "default" }: OurProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);
  const isOnDark = variant === "onDark";

  useEffect(() => {
    getProjects().then((res) => {
      setLoading(false);
      if (!res.ok || !res.data?.length) {
        setProjects([]);
        return;
      }
      setProjects(
        res.data.map((p: ApiProjectListItem) => {
          const resolved = getCardImageUrl(p.cardImage);
          return {
            subtitle: p.location,
            title: p.name,
            price: p.price,
            description: p.tagline,
            buttonText: p.comingSoon ? "Coming Soon" : "Invest Now",
            buttonLink: `/invest/${p.slug}`,
            image: resolved || CARD_IMAGE_PLACEHOLDER,
          };
        })
      );
    });
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section
      className={`w-full py-8 md:py-16 ${isOnDark ? "bg-[#1F2667] rounded-[20px]" : "bg-[#F1EFE0]"}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div aria-hidden />
          <span
            className={`text-center hero-title text-4xl font-extralight sm:text-4xl md:text-6xl ${isOnDark ? "text-[#F1EFE0]" : "text-[#C14D1C]"}`}
          >
            Our projects
          </span>
          <div className="items-center justify-end gap-3 hidden md:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous projects"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-transparent transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 md:h-12 md:w-12 ${
                isOnDark
                  ? "border-[#F1EFE0]/60 text-[#F1EFE0] focus:ring-[#F1EFE0] focus:ring-offset-[#1F2667]"
                  : "border-[#7D7872]/60 text-[#4D4842] focus:ring-[#D15535] focus:ring-offset-[#F1EFE0]"
              }`}
              style={
                isOnDark
                  ? undefined
                  : { boxShadow: "4px -4px 12px rgba(0,0,0,0.12)" }
              }
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next projects"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-transparent transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 md:h-12 md:w-12 ${
                isOnDark
                  ? "border-[#F1EFE0]/60 text-[#F1EFE0] focus:ring-[#F1EFE0] focus:ring-offset-[#1F2667]"
                  : "border-[#7D7872]/60 text-[#4D4842] focus:ring-[#D15535] focus:ring-offset-[#F1EFE0]"
              }`}
              style={
                isOnDark
                  ? undefined
                  : { boxShadow: "4px -4px 12px rgba(0,0,0,0.12)" }
              }
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex flex-col gap-6 md:flex-row md:-mx-4 md:overflow-x-auto md:pb-4 scrollbar-hide md:gap-8 md:px-4"
        >
          {loading && (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative flex h-[480px] w-full max-w-[340px] mx-auto shrink-0 overflow-hidden rounded-[32px] bg-[#252525] md:mx-0 md:h-[520px] md:w-[360px] animate-pulse"
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-[#333]" />
                  <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-6 pt-8">
                    <div className="flex flex-col gap-3">
                      <div className="h-3 w-24 rounded bg-white/10" />
                      <div className="flex items-center justify-between gap-3">
                        <div className="h-8 flex-1 max-w-[200px] rounded bg-white/10" />
                        <div className="h-6 w-20 shrink-0 rounded-full bg-white/10" />
                      </div>
                      <div className="h-4 w-full rounded bg-white/10" />
                      <div className="h-4 w-3/4 rounded bg-white/10" />
                      <div className="mt-4 h-11 w-28 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {!loading && projects.length === 0 && (
            <div className="flex w-full items-center justify-center py-12 text-[#4D4842]">
              No projects yet.
            </div>
          )}
          {!loading &&
            projects.map((project, index) => (
              <article
                key={`${project.subtitle}-${project.title}-${index}`}
                className="relative flex h-[480px] w-full max-w-[340px] mx-auto shrink-0 overflow-hidden rounded-[32px] bg-[#151515] text-[#F1EFE0CC] shadow-lg snap-start md:mx-0 md:h-[520px] md:max-w-none md:w-[360px]"
              >
                <Image
                  src={project.image || CARD_IMAGE_PLACEHOLDER}
                  alt={project.title}
                  fill
                  priority={false}
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0" />

                <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-6 pt-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-wide">
                        {project.subtitle}
                      </span>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="hero-title flex-1 min-w-0 text-3xl font-normal text-[#F1EFE0]">
                          {project.title}
                        </h3>
                        <span className="shrink-0 inline-flex rounded-full bg-[rgba(0,0,0,0.35)] px-3 py-1 text-[10px] font-normal text-[#F1EFE0] md:text-[14px]">
                          {project.price}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-4">
                      <Link
                        href={project.buttonLink}
                        className="inline-flex items-center justify-center rounded-full border border-[#F1EFE0] px-9 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#F1EFE0] transition-opacity hover:opacity-80"
                      >
                        {project.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
