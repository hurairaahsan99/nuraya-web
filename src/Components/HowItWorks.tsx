import Image from "next/image";

type Step = {
  number: string;
  title: string;
  description: string;
  showBadgeBorder?: boolean;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Browse Projects",
    description: "Explore upcoming Nuraya Collection hotels.",
  },
  {
    number: "02",
    title: "Submit Your Details",
    description: "Share your contact info and investment interest.",
  },
  {
    number: "03",
    title: "Review Terms & Documents",
    description: "Access the investor deck, financials, and agreements.",
  },
  {
    number: "04",
    title: "Invest & Become a Co-Owner",
    description: "Sign, fund, and receive your ownership certificate.",
  },
];

type HowItWorksStepProps = Step;

const HowItWorksStep = ({
  number,
  title,
  description,
  showBadgeBorder = true,
}: HowItWorksStepProps) => {
  return (
    <div className="flex items-start gap-6">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full text-[18px] md:text-3xl font-light text-accent hero-title ${
          showBadgeBorder ? "border border-accent" : ""
        }`}
      >
        {number}
      </div>
      <div className="flex-1">
        <h3 className="hero-title text-[28px] tracking-tightest leading-tight text-text">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#7d7872]">
          {description}
        </p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="w-full bg-(--bg) py-16">
      <div className="mx-auto flex flex-col gap-12 px-6 md:px-12 lg:px-16">
        <h2 className="hero-title text-[40px] leading-[1.05] tracking-[-0.03em] text-primary sm:text-[48px] md:text-[56px] text-center">
          How It Works
        </h2>

        <div className="grid items-center gap-12 md:grid-cols-12">
          {/* Left: steps */}
          <div className="md:col-span-7 space-y-8">
            {steps.map((step, index) => (
              <div key={step.number}>
                <HowItWorksStep {...step} />
                {index < steps.length - 1 && (
                  <hr className="mt-6 h-px border-0 bg-divider" />
                )}
              </div>
            ))}
          </div>

          {/* Right: single photo card */}
          <div className="md:col-span-5 mt-4 md:mt-0 hidden md:block">
            <div className="flex justify-center md:justify-end">
              <div className="overflow-hidden rounded-[28px]">
                <Image
                  src="/howitworks.png"
                  alt="How investing with Nuraya works"
                  width={520}
                  height={880}
                  className="h-full w-full md:h-[490px] md:w-[490px] object-cover"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;