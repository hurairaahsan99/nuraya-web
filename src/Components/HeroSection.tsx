import { useBrandColors } from "@/hooks/useBrandColors";
import Button from "@/Sub-Components/Button";

const HeroSection = () => {
  const heroData = {
    title: (
      <>
        Co-own Luxury <br /> Hospitality Across Africa.
      </>
    ),
    description:
      "Discover the Nuraya Collection portfolio and become a co-owner in our design-led luxury hotels.",
    image: "/heroImage.png",
    buttonText: "Explore Opportunities",
    buttonLink: "/learn-more",
  };
  const { titleColor, subtitleColor } = useBrandColors();
  return (
    <section id="hero-section" className="w-full" aria-label="Hero">
      {/* Mobile: ~70% viewport height, centered content. Desktop (md+): fixed aspect ratio, left-aligned */}
      <div
        className="relative mx-auto w-full max-w-(--hero-max-width) overflow-hidden rounded-(--hero-border-radius) bg-cover bg-center bg-no-repeat min-h-[70vh] md:min-h-0 md:aspect-1880/958"
        style={{ backgroundImage: `url(${heroData.image})` }}
      >
        <div className="absolute top-[20%] left-1/2 flex w-full max-w-[85%] -translate-x-1/2 flex-col items-center gap-4 p-6 text-center sm:max-w-[75%] sm:p-8 md:left-0 md:max-w-[65%] md:translate-x-0 md:items-start md:p-10 md:text-left lg:p-12">
          <h1
            className="hero-title text-4xl font-normal leading-tight sm:text-2xl md:text-2xl lg:text-3xl xl:text-6xl"
            style={{ color: titleColor }}
          >
            {heroData.title}
          </h1>
          <p
            className="max-w-2xl uppercase text-sm sm:text-base md:text-sm"
            style={{ color: subtitleColor }}
          >
            {heroData.description}
          </p>
          <Button
            title={heroData.buttonText}
            variant={1}
            href={heroData.buttonLink}
            className="uppercase text-[12px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
