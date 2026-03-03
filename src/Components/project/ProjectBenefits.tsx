import Image from "next/image";
import type { ProjectBenefit } from "@/lib/projectsData";

type Props = {
  benefits: ProjectBenefit[];
};

export default function ProjectBenefits({ benefits }: Props) {
  return (
    <section
      className="w-full bg-[#F1EFE0] py-16 px-6 sm:px-10 md:px-16 lg:px-24"
      aria-label="What investors can expect"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-12 text-start md:text-center hero-title text-[32px] font-normal text-[#C92600] sm:text-[40px] md:text-[48px]">
          What Investors Can Expect
        </h2>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {benefits.slice(0, 2).map((benefit) => (
            <div
              key={benefit.title}
              className="flex md:flex-row flex-col items-start md:justify-start justify-center gap-5"
            >
              <Image
                src={benefit.icon}
                alt=""
                width={56}
                height={56}
                className="h-26 w-26 shrink-0 object-contain md:h-22 md:w-22"
                aria-hidden
              />
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="hero-title text-[24px] font-extralight text-[#383430] sm:text-[28px]">
                  {benefit.title}
                </h3>
                <p className="max-w-[420px] md:text-[17px] text-[15px] leading-relaxed text-[#383430CC]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
          <div
            className="col-span-1 my-8 h-px w-full bg-[#DAD6C8] md:col-span-2"
            aria-hidden
          />
          {benefits.slice(2, 4).map((benefit) => (
            <div
              key={benefit.title}
              className="flex md:flex-row flex-col items-start md:justify-start justify-center gap-5"
            >
              <Image
                src={benefit.icon}
                alt=""
                width={56}
                height={56}
                className="h-26 w-26 shrink-0 object-contain md:h-22 md:w-22"
                aria-hidden
              />
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="hero-title text-[24px] font-extralight text-[#383430] sm:text-[28px]">
                  {benefit.title}
                </h3>
                <p className="max-w-[420px] md:text-[17px] text-[15px] leading-relaxed text-[#383430CC]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
