import Image from "next/image";
import type { ProjectStat } from "@/lib/projectsData";

type Props = {
  name: string;
  stats: ProjectStat[];
};

export default function ProjectStats({ name, stats }: Props) {
  return (
    <section
      className="w-full bg-[#F1EFE0] py-16"
      aria-label="Project in numbers"
    >
      <div>
        {/* Title with left/right decorative images */}
        <div className="mb-12 flex items-center justify-center gap-3 sm:gap-4">
          <Image
            src="/pntl.png"
            alt=""
            width={48}
            height={48}
            className="h-8 w-8 object-contain sm:h-10 sm:w-10"
            aria-hidden
          />
          <h2 className="text-center hero-title text-[32px] font-normal text-[#C92600] sm:text-[40px] md:text-[48px]">
            Project in Numbers
          </h2>
          <Image
            src="/pntr.png"
            alt=""
            width={48}
            height={48}
            className="h-8 w-8 object-contain sm:h-10 sm:w-10"
            aria-hidden
          />
        </div>

        {/* Stats: each row = icon left, title + subtitle right; whole block centered */}
        <div className="flex md:flex-row flex-col flex-wrap md:items-center md:justify-center items-center justify-start gap-8 md:gap-16">
          {stats.map((stat) => (
            <div
              key={stat.subtitle}
              className="flex md:flex-row flex-col items-center md:justify-center justify-start gap-2"
            >
              <Image
                src={stat.icon}
                alt=""
                width={56}
                height={56}
                className="h-18 w-18 shrink-0 object-contain md:h-22 md:w-22"
                aria-hidden
              />
              <div className="flex flex-col items-start justify-center gap-4 md:gap-5 text-left">
                <span className="hero-title text-[28px] leading-none text-[#383430] sm:text-[36px] md:text-[40px]">
                  {stat.title}
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#383430CC]">
                  {stat.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
