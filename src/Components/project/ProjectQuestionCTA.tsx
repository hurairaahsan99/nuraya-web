import Link from "next/link";

export default function ProjectQuestionCTA() {
  return (
    <section
      className="w-full bg-[#F1EFE0] py-4 px-2 sm:px-2 md:px-2"
      aria-label="Contact CTA"
    >
      <div>
        {/* CTA box: dark blue #1F2667 + radial gradient pattern */}
        <div className="relative overflow-hidden md:h-[40vh] rounded-[24px] bg-[#1F2667] px-2 md:px-8 py-12 text-center sm:px-12 sm:py-14">
          {/* Radial gradient overlay as pattern */}
          <div
            className="absolute inset-0opacity-40"
            aria-hidden
            style={{
              background: `radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 50%),
                radial-gradient(ellipse 100% 100% at 30% 20%, rgba(0,0,0,0.15) 0%, transparent 40%),
                radial-gradient(ellipse 80% 80% at 70% 80%, rgba(0,0,0,0.1) 0%, transparent 45%)`,
            }}
          />

          <div className="relative z-10 flex flex-col items-center mt-5 md:mt-10 gap-6">
            <h3 className="hero-title text-[24px] font-normal text-[#F1EFE0] sm:text-[36px] md:text-[40px]">
              Have questions? Let&apos;s talk.
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="mailto:sayhi@nurayacollection.com"
                className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-[#F1EFE0] bg-transparent px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#F1EFE0] transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[#F1EFE0] focus:ring-offset-2 focus:ring-offset-transparent"
              >
                SCHEDULE A CALL
              </Link>
              <Link
                href="mailto:sayhi@nurayacollection.com"
                className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-[#F1EFE0] bg-transparent px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#F1EFE0] transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[#F1EFE0] focus:ring-offset-2 focus:ring-offset-transparent"
              >
                EMAIL US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
