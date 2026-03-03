import Link from "next/link";
import { GrShare } from "react-icons/gr";
import type { ProjectResource } from "@/lib/projectsData";

const THEME_COLOR = "#D15535";

type Props = {
  resources: ProjectResource[];
  projectName: string;
};

export default function ProjectResources({ resources, projectName }: Props) {
  return (
    <section
      className="w-full bg-[#F1EFE0] py-16 px-6 sm:px-10 md:px-16 lg:px-24"
      aria-label="Resources"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Left column: title, subtitle, CTA button */}
          <div className="flex flex-col">
            <h2 className="hero-title text-[36px] font-normal text-[#C92600] sm:text-[40px] md:text-[48px]">
              Resources Section
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#383430]">
              We follow a simple, vertically integrated approach.
            </p>
            <Link
              href="/#invest"
              className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-[#C92600] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#D35B3B] focus:ring-offset-2 focus:ring-offset-[#F1EFE0]"
            >
              Invest in {projectName}
            </Link>
          </div>

          {/* Right column: resource links with share icon */}
          <div className="flex flex-col">
            {resources.map((item, index) => (
              <div key={item.id}>
                <Link
                  href={item.href}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D35B3B]"
                >
                  <span className="hero-title text-[24px] font-normal text-[#383430] md:text-[24px]">
                    {item.title}
                  </span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center"
                    aria-hidden
                  >
                    <GrShare size={22} style={{ color: "#C92600" }} />
                  </span>
                </Link>
                {index < resources.length - 1 && (
                  <hr className="border-0 h-px bg-[#DAD6C8]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
