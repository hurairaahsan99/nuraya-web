"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "@/Sub-Components/Button";
import { useBrandColors } from "@/hooks/useBrandColors";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [{ label: "Stay", href: "/stay", arrow: true }];

const mobileMenuItemsLoggedOut = [
  { label: "Stay", href: "/stay" },
  { label: "Invest Now", href: "/invest" },
  { label: "Log In", href: "/login" },
];

const mobileMenuItemsLoggedIn = [
  { label: "Stay", href: "/stay" },
  { label: "Invest Now", href: "/invest" },
  { label: "My Profile", href: "/profile" },
  { label: "Log Out", href: "#", isAction: true },
];

const PROFILE_MENU_BG = "#631103";

function ProfileAvatar({ email }: { email: string }) {
  const initial = (email?.charAt(0) ?? "U").toUpperCase();
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
      style={{ background: "#C14D1C" }}
      aria-hidden
    >
      {initial}
    </div>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen && !profileOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen, profileOpen]);

  const { titleColor } = useBrandColors();
  const isOnWhiteBg = isScrolled && isPastHero;
  const textColor = isOnWhiteBg ? "#383430" : titleColor;
  const buttonStyle = isOnWhiteBg
    ? { border: "1.5px solid #383430", color: "#383430" }
    : { color: titleColor };
  const borderColor = isOnWhiteBg ? "#383430" : "#F1EFE0";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-99 flex w-full items-center justify-between px-6 py-4 pt-6 transition-all duration-300 ease-out md:px-8 lg:px-10 ${
        isScrolled ? "bg-transparent backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="hero-title text-[30px] font-light tracking-tight transition-colors duration-300 md:text-[42px]"
        style={{ color: textColor }}
      >
        Nuraya
      </Link>

      {/* Desktop right section */}
      <div className="hidden md:flex items-center gap-10">
        <nav className="flex items-center gap-8" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider transition-colors duration-300 hover:opacity-80"
              style={{ color: textColor }}
            >
              <span>{link.label}</span>
              {link.arrow && (
                <span>
                  <MdOutlineArrowOutward />
                </span>
              )}
            </Link>
          ))}
        </nav>
        <Button
          title="Invest Now"
          variant={1}
          href="/invest"
          style={
            isScrolled
              ? buttonStyle
              : { color: titleColor, border: `1.5px solid ${titleColor}` }
          }
        />
        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border-2 px-1 py-1 pr-2 transition-opacity hover:opacity-90 focus:outline-none"
              style={{ borderColor, background: "rgba(0,0,0,0.05)" }}
              aria-expanded={profileOpen}
              aria-label="Profile menu"
            >
              <ProfileAvatar email={user.email} />
              <span className="sr-only">Menu</span>
              {profileOpen ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  style={{ color: textColor }}
                  aria-hidden
                >
                  <path
                    d="M2 2L16 16M16 2L2 16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  style={{ color: textColor }}
                  aria-hidden
                >
                  <path
                    d="M1 1H17M1 7H17M1 13H17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
            {profileOpen && (
              <nav
                className="absolute right-0 top-[calc(100%+10px)] z-100 min-w-[180px] overflow-hidden rounded-2xl shadow-xl"
                style={{ background: PROFILE_MENU_BG }}
                aria-label="Profile menu"
              >
                <Link
                  href="/profile"
                  className="block border-b border-[#F1EFE0]/20 px-5 py-4 text-[13px] font-normal uppercase tracking-widest text-[#F1EFE0] transition-opacity hover:opacity-80"
                  onClick={() => setProfileOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  className="block w-full px-5 py-4 text-left text-[13px] font-normal uppercase tracking-widest text-[#F1EFE0] transition-opacity hover:opacity-80"
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                >
                  Log Out
                </button>
              </nav>
            )}
          </div>
        ) : (
          <Button
            title="Log In"
            icon={<RxPerson size={20} />}
            variant={1}
            href="/login"
            style={
              isScrolled
                ? buttonStyle
                : { color: titleColor, border: `1.5px solid ${titleColor}` }
            }
          />
        )}
      </div>

      {/* Mobile: profile pill or hamburger */}
      <div className="relative md:hidden" ref={menuRef}>
        {user ? (
          <>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border-2 px-1 py-1 pr-2 transition-opacity hover:opacity-90 focus:outline-none"
              style={{ borderColor, background: "rgba(0,0,0,0.05)" }}
            >
              <ProfileAvatar email={user.email} />
              {mobileMenuOpen ? (
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ color: textColor }} aria-hidden>
                  <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" style={{ color: textColor }} aria-hidden>
                  <path d="M1 1H17M1 7H17M1 13H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
            {mobileMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-100 overflow-hidden rounded-2xl shadow-xl" style={{ background: PROFILE_MENU_BG }}>
                <div className="flex flex-col">
                  {mobileMenuItemsLoggedIn.map((item, i) => (
                    <div key={item.label}>
                      {i > 0 && <div className="mx-4 h-px bg-[#F1EFE0]/20" />}
                      {item.isAction ? (
                        <button
                          type="button"
                          className="block w-full px-5 py-4 text-left text-[13px] font-normal uppercase tracking-widest text-[#F1EFE0] transition-opacity hover:opacity-80"
                          onClick={() => {
                            logout();
                            setMobileMenuOpen(false);
                          }}
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-5 py-4 text-[13px] font-normal uppercase tracking-widest text-[#F1EFE0] transition-opacity hover:opacity-80"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-opacity hover:opacity-80 focus:outline-none"
              style={{ borderColor: textColor, color: textColor }}
            >
              {mobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                  <path d="M1 1H17M1 7H17M1 13H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
            {mobileMenuOpen && (
              <nav
                className="absolute right-0 top-[calc(100%+10px)] z-100 min-w-[180px] overflow-hidden rounded-2xl shadow-xl"
                style={{ background: PROFILE_MENU_BG }}
                aria-label="Mobile navigation"
              >
                {mobileMenuItemsLoggedOut.map((item, i) => (
                  <div key={item.href}>
                    {i > 0 && <div className="mx-4 h-px bg-[#F1EFE0]/20" />}
                    <Link
                      href={item.href}
                      className="block px-5 py-4 text-[13px] font-normal uppercase tracking-widest text-[#F1EFE0] transition-opacity hover:opacity-80"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>
            )}
          </>
        )}
      </div>
    </header>
  );
}
