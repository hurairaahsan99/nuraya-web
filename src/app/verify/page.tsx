"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ProjectQuestionCTA from "@/Components/project/ProjectQuestionCTA";
import { useAuth, toAuthUser } from "@/contexts/AuthContext";
import {
  getPendingVerify,
  clearPendingVerify,
  verifyOtp,
  sendEmailConfirmation,
} from "@/lib/api";

const ACCENT = "#C14D1C";
const DARK_BG = "#1F2667";
const CARD_BG = "#F1EFE0";
const RESEND_COOLDOWN_SEC = 20;

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useAuth();
  const email = searchParams.get("email") ?? "";

  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [resendSec, setResendSec] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendSec <= 0) return;
    const t = setInterval(() => setResendSec((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendSec]);

  const code = digits.join("");
  const allFilled = digits.every((d) => d !== "");
  const codeValid = allFilled && code.length === 6;

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const arr = value.slice(0, 6).split("");
      const next = [...digits];
      arr.forEach((c, i) => {
        if (index + i < 6) next[index + i] = /^\d$/.test(c) ? c : "";
      });
      setDigits(next);
      const focusIdx = Math.min(index + arr.length, 5);
      inputRefs.current[focusIdx]?.focus();
      return;
    }
    if (value !== "" && !/^\d$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setVerifyError(null);
    if (!codeValid) return;
    const verifyEmail = email.trim() || undefined;
    setVerifying(true);
    const otpResult = await verifyOtp(verifyEmail ?? "", code);
    if (otpResult.ok) {
      setUser(toAuthUser(otpResult.data.user), otpResult.data.jwt);
      clearPendingVerify();
      router.replace("/");
      return;
    }
    const pending = getPendingVerify();
    if (pending && (!verifyEmail || pending.email === verifyEmail)) {
      setUser(toAuthUser(pending.user), pending.jwt);
      clearPendingVerify();
      router.replace("/");
      return;
    }
    setVerifying(false);
    setVerifyError(
      otpResult.status === 404 || otpResult.status === 405
        ? "Verification session expired. Please sign up again."
        : otpResult.message ?? "Invalid code. Please try again or resend."
    );
  };

  const handleResend = async () => {
    if (resendSec > 0) return;
    const verifyEmail = email.trim();
    if (!verifyEmail) {
      setVerifyError("Email is missing. Go back and sign up again.");
      return;
    }
    const sent = await sendEmailConfirmation(verifyEmail);
    setResendSec(RESEND_COOLDOWN_SEC);
    if (!sent.ok) setVerifyError("Resend failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex flex-col mt-2 mx-4">
      <section
        className="relative flex flex-col rounded-[20px] md:pb-30 items-center px-4 pt-8 pb-12 sm:px-6 md:px-8 lg:px-10 overflow-hidden"
        style={{ background: DARK_BG }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="relative w-full flex items-center justify-center min-h-[52px] mb-6">
            <Link
              href="/signup"
              className="absolute left-0 inline-flex items-center gap-1.5 rounded-full border border-[#F1EFE0]/40 bg-black/20 px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-[#F1EFE0] transition-opacity hover:opacity-90"
            >
              <span aria-hidden>‹</span> Back
            </Link>
            <span className="hero-title text-[28px] sm:text-[36px] font-light tracking-tight text-[#F1EFE0]">
              Nuraya
            </span>
          </div>

          <div
            className="w-full max-w-[580px] rounded-[20px] p-6 sm:p-8 shadow-lg mt-20 overflow-hidden"
            style={{ background: CARD_BG }}
          >
            <h1 className="hero-title text-[22px] sm:text-[26px] font-normal text-[#151515] text-center flex items-center justify-center gap-1.5 flex-wrap">
              Verify Code
              <Image
                src="/pntr.png"
                alt=""
                width={24}
                height={24}
                className="inline-block shrink-0"
                aria-hidden
              />
            </h1>
            <p className="mt-3 text-center text-sm text-[#4D4842]">
              We&apos;ve sent a 6-digit code to {email || "your email"}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div className="flex justify-center gap-2 sm:gap-3">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-11 h-12 sm:w-12 sm:h-14 rounded-lg border border-[#DAD6C8] bg-[#F8F6F0] text-center text-lg font-medium text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#4D4842]/30 focus:border-[#4D4842]"
                    aria-label={`Digit ${i + 1}`}
                  />
                ))}
              </div>
              {submitAttempted && !codeValid && !verifyError && (
                <p className="text-center text-sm" style={{ color: ACCENT }}>
                  Please enter all 6 digits.
                </p>
              )}
              {verifyError && (
                <p className="text-center text-sm" style={{ color: ACCENT }}>
                  {verifyError}
                </p>
              )}

              <button
                type="submit"
                disabled={!allFilled || verifying}
                className={`w-full rounded-full py-3.5 text-sm font-medium uppercase tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F1EFE0] ${allFilled ? "transition-opacity hover:opacity-90" : "cursor-not-allowed opacity-70"}`}
                style={{ background: allFilled && !verifying ? DARK_BG : "#B0B0C0" }}
              >
                {verifying ? "Verifying…" : "Verify Code"}
              </button>

              <p className="text-center text-sm text-[#4D4842]">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendSec > 0}
                  className="font-medium transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ color: ACCENT }}
                >
                  Resend code link
                </button>
                {resendSec > 0 && (
                  <span className="ml-1 text-[#4D4842]">
                    ({resendSec} sec)
                  </span>
                )}
              </p>
            </form>
          </div>
        </div>
      </section>

      <ProjectQuestionCTA />
    </div>
  );
}

function VerifyFallback() {
  return (
    <div className="min-h-screen flex flex-col mt-2 mx-4">
      <section
        className="relative flex flex-col rounded-[20px] md:pb-30 items-center px-4 pt-8 pb-12 sm:px-6 md:px-8 lg:px-10 overflow-hidden"
        style={{ background: DARK_BG }}
      >
        <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[200px]">
          <p className="text-[#F1EFE0] text-sm">Loading…</p>
        </div>
      </section>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyFallback />}>
      <VerifyContent />
    </Suspense>
  );
}
