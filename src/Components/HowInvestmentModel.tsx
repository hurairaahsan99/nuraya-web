"use client";

import { useState } from "react";

const ACCORDION_ITEMS = [
  {
    id: "item-01",
    number: "01",
    title: "Spot Hidden Gems",
    description:
      "We acquire and transform underutilized or undervalued boutique hotel properties into high-performing, story-driven luxury experiences.",
  },
  {
    id: "item-02",
    number: "02",
    title: "Revive & Rebrand",
    description:
      "Our team reimagines each property with design-led renovations and the Nuraya Collection brand identity.",
  },
  {
    id: "item-03",
    number: "03",
    title: "In-House Excellence",
    description:
      "Hotel operations, guest experience, and marketing are managed in-house under one cohesive brand.",
  },
  {
    id: "item-04",
    number: "04",
    title: "Expand with Strategy",
    description:
      "We scale the collection with a clear pipeline of acquisitions and operational excellence.",
  },
];

function IconPlus() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 6v16M6 14h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMinus() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 14h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HowInvestmentModel() {
  const [openId, setOpenId] = useState<string | null>(ACCORDION_ITEMS[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="w-full min-h-[420px] bg-[#F1EFE0]"
      aria-label="Our Investment Model"
    >
      <div className="mx-auto grid grid-cols-1 items-start gap-20 px-6 py-12 md:grid-cols-[48%_52%] md:mx-10 md:mr-30 md:py-[72px]">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <h2 className="hero-title text-4xl font-normal leading-tight text-[#D15535] md:text-[56px]">
            Our Investment Model
          </h2>
          <p className="text-lg leading-normal text-[#4D4842]">
            We follow a simple, vertically integrated approach.
          </p>
          <p className="text-base leading-normal text-[#4D4842]">
            Our in-house team manages hotel operations, guest experience, and
            marketing — all under the Nuraya Collection brand.
          </p>
          <a
            href="/investment-details"
            className="mt-2 inline-flex h-12 w-1/2 min-w-fit cursor-pointer items-center justify-center rounded-[28px] bg-[#D15535] px-7 text-sm font-medium uppercase tracking-wide text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D35B3B]"
          >
            Get Investment Details
          </a>
        </div>

        {/* Right column: accordion */}
        <div
          className="flex flex-col"
          role="region"
          aria-label="Investment model steps"
        >
          {ACCORDION_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const triggerId = `${item.id}-trigger`;

            return (
              <div key={item.id} className="border-none p-0 m-0">
                {index > 0 && (
                  <hr className="my-0 h-px border-0 bg-[#DAD6C8] ml-[68px]" />
                )}
                <button
                  id={triggerId}
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-3 border-none bg-transparent py-4 pl-0 text-left font-inherit text-inherit hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D35B3B]"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                >
                  <span className=" h-auto hero-title font-light text-xl border border-[#D35B3B] rounded-full p-4 md:border-none md:text-[30px] text-[#D35B3B]">
                    {item.number}
                  </span>
                  <span className="flex-1 hero-title text-[26px] font-normal text-[#4D4842] md:text-[34px]">
                    {item.title}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center text-[#D35B3B]">
                    {isOpen ? <IconMinus /> : <IconPlus />}
                  </span>
                </button>
                <div
                  id={panelId}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                >
                  <div className="pb-4 pl-[52px] md:pl-20">
                    <p className="m-0 text-base leading-normal text-[#7D7872]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
