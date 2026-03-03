import Link from "next/link";
import type { ProjectTerm } from "@/lib/projectsData";

type Props = {
  name: string;
  terms: ProjectTerm[];
};

export default function ProjectTerms({ name, terms }: Props) {
  return (
    <section
      className="w-full bg-[#F1EFE0] py-16 px-6 sm:px-10 md:px-16 lg:px-24"
      aria-label="Investor requirements"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Title + intro — top center */}
        <div className="mx-auto max-w-[640px] md:text-center text-start">
          <h2 className="hero-title text-[32px] font-normal text-[#C92600] sm:text-[40px] md:text-[48px]">
            Investor Requirements
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#7D7872]">
            We believe true luxury is ease — a seamless experience where every
            detail is intentional, every gesture is thoughtful, and every moment
            feels effortlessly perfect.
          </p>
        </div>

        {/* List: bullet + question (red) | answer (gray); separator between items */}
        <ul className="mt-12 flex flex-col">
          {terms.map((term, index) => (
            <li key={term.label}>
              {index > 0 && <hr className="border-0 h-px bg-[#DAD6C8]" />}
              <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:items-start md:gap-10 md:py-6">
                <div className="flex items-baseline gap-3">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-[#C92600]"
                    aria-hidden
                  />
                  <span className="hero-title text-[22px] md:pl-10 font-normal text-[#C92600] sm:text-[20px] md:text-[22px]">
                    {term.label}
                  </span>
                </div>
                <p className="text-[15px] w-[80%] leading-relaxed text-[#7D7872] pl-5 md:pl-0 md:pt-0.5">
                  {term.value}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Centered Invest now button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/#invest"
            className="inline-flex items-center justify-center rounded-full bg-[#D15535] px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#D35B3B] focus:ring-offset-2 focus:ring-offset-[#F1EFE0]"
          >
            Invest now
          </Link>
        </div>
      </div>
    </section>
  );
}
