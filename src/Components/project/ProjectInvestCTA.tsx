import Link from "next/link";

type Props = {
  name: string;
  fullName: string;
  price: string;
  image: string;
  comingSoon?: boolean;
};

const TILES = "/tiles.png";

export default function ProjectInvestCTA({
  name,
  fullName,
  price,
  image,
  comingSoon,
}: Props) {
  return (
    <section
      className="w-full bg-[#F1EFE0] py-8 px-2 sm:px-4 md:px-4 lg:px-4"
      aria-label="Ready to invest"
    >
      <div>
        {/* Four-sided tiles frame: top, left, right, bottom – border 50px on mobile, 100px on md+ */}
        <div className="grid overflow-hidden rounded-[24px] grid-cols-[50px_1fr_50px] grid-rows-[50px_1fr_50px] md:grid-cols-[100px_1fr_100px] md:grid-rows-[100px_1fr_100px]">
          {/* Top */}
          <div
            aria-hidden
            className="col-span-3 h-[50px] bg-repeat-x md:h-[100px]"
            style={{ backgroundImage: `url(${TILES})` }}
          />
          {/* Left */}
          <div
            aria-hidden
            className="w-[50px] bg-repeat-y md:w-[100px]"
            style={{ backgroundImage: `url(${TILES})` }}
          />
          {/* Center: beige content */}
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 bg-[#F1EFE0] px-6 py-12 text-center sm:gap-8 sm:px-10 sm:py-16 md:gap-10 md:py-20">
            <h2 className="hero-title text-[28px] font-normal leading-tight text-[#D15535] sm:text-[36px] md:text-[44px]">
              Ready to invest in {name}?
            </h2>
            {comingSoon ? (
              <span className="inline-flex items-center justify-center rounded-full border-2 border-[#D15535] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#D15535] sm:px-10 sm:py-4">
                Coming Soon
              </span>
            ) : (
              <Link
                href="/#invest"
                className="inline-flex items-center justify-center rounded-full bg-[#B43011] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#D15535] focus:ring-offset-2 focus:ring-offset-[#F1EFE0] sm:px-10 sm:py-4"
              >
                INVEST NOW
              </Link>
            )}
          </div>
          {/* Right */}
          <div
            aria-hidden
            className="w-[50px] bg-repeat-y md:w-[100px]"
            style={{ backgroundImage: `url(${TILES})` }}
          />
          {/* Bottom */}
          <div
            aria-hidden
            className="col-span-3 h-[50px] bg-repeat-x md:h-[100px]"
            style={{ backgroundImage: `url(${TILES})` }}
          />
        </div>
      </div>
    </section>
  );
}
