"use client";

import Image from "next/image";

const PARAGRAPHS = [
  "I started Nuraya Fund to extend a new kind of invitation—one that opens the door to ownership in Africa's luxury hospitality space for discerning investors who want to co-own experiential properties that deliver measurable returns.",
  "For too long, access to this asset class has been limited to a select few. Through the Nuraya Capital Fund, investors around the world—whether writing small or large checks—can now claim a stake in design-forward, culturally rooted boutique hotels that blend authentic experiences with exceptional financial performance.",
  "By pooling capital, we're building a focused portfolio where unforgettable guest experiences translate directly into real investor value.",
  "This is more than access—it's a chance to reshape African hospitality while building lasting wealth in a high-growth, opportunity-rich market.",
];

export default function FounderMessage() {
  return (
    <section
      className="relative w-full bg-ivory py-20"
      aria-labelledby="founder-message-heading"
    >
      <div className="relative mx-auto max-w-[1100px] px-6">
        <h2
          id="founder-message-heading"
          className="hero-title text-center text-4xl font-normal text-primary md:text-[56px]"
        >
          Founder&apos;s Message
        </h2>

        {/* Wrapper so decorative trees have a positioning context and sit behind card */}
        <div className="relative mt-10 min-h-[400px]">
          {/* Decorative trees - absolutely positioned behind the card, visible from sm up */}
          <div
            className="pointer-events-none absolute inset-0 z-0  hidden
            md:block"
            aria-hidden
          >
            {/* Left: top-left of card, ~20px further left */}
            <Image
              src="/left.png"
              alt=""
              width={240}
              height={360}
              className="absolute left-0 top-[-150px] h-auto w-36 -translate-x-10 opacity-50 sm:w-44 md:w-52 md:-translate-x-7 lg:w-60 lg:-translate-x-13"
              aria-hidden
            />
            {/* Right: smaller, full image at bottom-right of Founder's Message */}
            <Image
              src="/right.png"
              alt=""
              width={240}
              height={360}
              className="absolute bottom-0 right-0 h-auto w-24 translate-x-4 opacity-50 sm:w-28 md:w-32 md:translate-x-15"
              aria-hidden
            />
          </div>

          {/* Main card: outer = paper + shadow; inner = red border frame */}
          <article
            role="article"
            className="
  relative z-10 mx-auto max-w-[900px] rounded-sm
  bg-[#FAF9F7]
  px-6 py-8
  shadow-[0_12px_32px_rgba(20,16,14,0.1)]
  sm:px-8 sm:py-10 md:px-10 md:py-12
  before:absolute before:inset-0 before:rounded-sm
  before:bg-[radial-gradient(#000_1px,transparent_1px)]
  before:bg-size-[3px_3px]
  before:opacity-[0.04]
  before:content-['']
"
          >
            {/* Inner red border frame (inset from card edges) */}
            <div className="rounded border border-primary bg-white/95 p-6 sm:p-8 md:p-10">
              <div className="font-ui text-base leading-[1.55] text-text">
                {PARAGRAPHS.map((p, i) => (
                  <p key={i} className="mb-5 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex items-end gap-4">
                <Image
                  src="/founderMsg.png"
                  alt="Founder Chidi Ashley"
                  width={72}
                  height={72}
                  className="h-[72px] min-w-fit shrink-0 rounded object-cover grayscale"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
