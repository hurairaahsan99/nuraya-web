import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projectsData";

type Props = Pick<
  Project,
  | "fullName"
  | "tagline"
  | "price"
  | "heroImage"
  | "heroSubtitleLeft"
  | "heroSubtitleRight"
  | "heroBottomLine1"
  | "heroBottomLine2"
  | "comingSoon"
>;

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0 text-[#F1EFE0]/70">
      <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="currentColor" />
    </svg>
  );
}

export default function ProjectHero({
  fullName,
  tagline,
  heroImage,
  heroSubtitleLeft,
  heroSubtitleRight,
  heroBottomLine1,
  heroBottomLine2,
  comingSoon,
}: Props) {
  return (
    <section className="w-full" aria-label={`${fullName} hero`}>
      <div className="relative mx-auto w-fullmin-h-[60vh] md:min-h-[80vh] rounded-[28px] overflow-hidden">
        <Image
          src={heroImage}
          alt={fullName}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/20" />

        <div className="relative z-10 flex flex-col md:mt-20 min-h-[60vh] md:min-h-[80vh] justify-between p-6 sm:p-10 md:p-14 lg:p-20">
          <div aria-hidden className="shrink-0" />
          <div className="flex flex-col items-center text-center shrink-0">
            <div className="mb-4 items-center justify-center block md:hidden">
              <Image
                src="/heromobile.png"
                alt=""
                width={48}
                height={48}
                className="h-15 w-15 object-contain"
                aria-hidden
              />
            </div>
            {/* Subtitle row: left · "Own part of" · right — responsive, sides can wrap */}
            <div className="flex w-full max-w-[900px] items-baseline justify-center gap-3 sm:gap-4 md:gap-6 px-2 flex-wrap">
              <span className="text-[10px] uppercase hidden md:block tracking-[0.2em] text-[#F1EFE0]/70 sm:text-[11px] md:text-[13px] max-w-[200px] md:max-w-[240px] text-left md:text-right wrap-break-word">
                {heroSubtitleLeft}
              </span>
              <span className="hero-title text-[28px] leading-tight text-[#F1EFE0] sm:text-[36px] md:text-[42px] lg:text-[48px] shrink-0">
                Own part of
              </span>
              <span className="text-[10px] uppercase hidden md:block tracking-[0.2em] text-[#F1EFE0]/70 sm:text-[11px] md:text-[13px] max-w-[200px] md:max-w-[240px] text-right wrap-break-word">
                {heroSubtitleRight}
              </span>
            </div>

            <h1 className="hero-title mt-1 text-[32px] leading-tight text-[#F1EFE0] sm:text-[56px] md:text-[72px] lg:text-[90px] xl:text-[110px] xl:leading-[1.1] max-w-[1400px]">
              {fullName}
            </h1>

            <p className="mt-4 md:mt-5 max-w-[420px] text-[11px] uppercase leading-relaxed tracking-[0.14em] text-[#F1EFE0]/85 sm:text-[13px]">
              {tagline}
            </p>

            <div className="mt-4 md:mt-6">
              {comingSoon ? (
                <span className="inline-flex items-center justify-center rounded-full border border-[#F1EFE0]/60 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#F1EFE0]/70">
                  Coming Soon
                </span>
              ) : (
                <Link
                  href="/#invest"
                  className="inline-flex items-center justify-center rounded-full border border-[#F1EFE0] bg-transparent px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#F1EFE0] transition-opacity hover:opacity-85"
                >
                  Invest Now
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-8 md:pt-10 sm:gap-6 shrink-0">
            <StarIcon />
            <span className="flex flex-col items-center">
              <span className="text-[12px] text-[#F1EFE0]/90 md:text-2xl text-center wrap-break-word max-w-[140px] sm:max-w-none">
                {heroBottomLine1}
              </span>
              <span
                className="mt-1 h-px w-40 bg-[#F1EFE0]/50 shrink-0"
                aria-hidden
              />
            </span>
            <StarIcon />
            <span className="flex flex-col items-center">
              <span className="text-[12px] text-[#F1EFE0]/90 md:text-2xl text-center wrap-break-word max-w-[140px] sm:max-w-none">
                {heroBottomLine2}
              </span>
              <span
                className="mt-1 h-px w-20 bg-[#F1EFE0]/50 shrink-0"
                aria-hidden
              />
            </span>
            <StarIcon />
          </div>
        </div>
      </div>
    </section>
  );
}
