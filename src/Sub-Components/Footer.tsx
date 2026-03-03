"use client";

import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

const cards = [
  {
    title: "Invest in Nuraya",
    body: "Explore partnership & investment opportunities",
    href: "/#invest",
  },
  {
    title: "Nuru Marrakesh",
    body: "Check out our exclusive luxury hotel in the heart of Marrakesh",
    href: "/stay",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto pb-3.5 pt-2">
      <div className="rounded-[20px] bg-[#B43011] px-6 py-12 sm:px-10 md:px-16 lg:px-8">
        {/* Top section: logo | social | cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Left: brand */}
          <div className="md:col-span-4 lg:col-span-3">
            <Link
              href="/"
              className="hero-title text-[28px] sm:text-[40px] font-normal text-[#F1EFE0] tracking-tight"
            >
              Nuraya
            </Link>
          </div>

          {/* Middle: social */}
          <nav
            className="flex flex-col gap-2 md:col-span-3"
            aria-label="Social links"
          >
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium uppercase tracking-wider text-[#F1EFE0] transition-opacity hover:opacity-90"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right: two cards */}
          <div className="grid gap-6 sm:grid-cols-2 md:col-span-5 lg:col-span-6">
            {cards.map(({ title, body, href }) => (
              <Link
                key={title}
                href={href}
                className="block rounded-[10px] bg-[#F1EFE0]/10 p-5 backdrop-blur-lg transition-opacity hover:opacity-95 border border-[#F1EFE0]/20"
              >
                <span className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wider text-[#F1EFE0]">
                  {title}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="mt-2 text-[13px] leading-relaxed text-[#F1EFE0]">
                  {body}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom strip: copyright (left) | email (center) | legal (right) */}
        <div className="mt-24 pt-8">
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
            <span className="text-[12px] uppercase tracking-wider text-[#F1EFE0] sm:justify-self-start">
              Copyright © 2025
            </span>
            <a
              href="mailto:sayhi@nurayacollection.com"
              className="text-[12px] uppercase tracking-wider text-[#F1EFE0] transition-opacity hover:opacity-90 sm:justify-self-center"
            >
              SAYHI@NURAYACOLLECTION.COM
            </a>
            <nav
              className="flex flex-wrap items-center gap-4 sm:gap-6 sm:justify-self-end"
              aria-label="Legal"
            >
              <Link
                href="/terms"
                className="text-[12px] uppercase tracking-wider text-[#F1EFE0] transition-opacity hover:opacity-90"
              >
                Terms and Conditions
              </Link>
              <Link
                href="/privacy"
                className="text-[12px] uppercase tracking-wider text-[#F1EFE0] transition-opacity hover:opacity-90"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
