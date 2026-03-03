"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProjectQuestionCTA from "@/Components/project/ProjectQuestionCTA";
import { useAuth, toAuthUser } from "@/contexts/AuthContext";
import { login } from "@/lib/api";

const ACCENT = "#C14D1C";
const DARK_BG = "#1F2667";
const CARD_BG = "#F1EFE0";

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const emailValid = !email.trim() ? false : validateEmail(email);
  const passwordValid = password.length >= 1;
  const formFilled = email.trim() !== "" && password.length >= 1;
  const formValid = emailValid && passwordValid;
  const showEmailError = submitAttempted && !emailValid;
  const showPasswordError = submitAttempted && !passwordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setApiError(null);
    if (!validateEmail(email) || !password) return;
    setSubmitting(true);
    const result = await login({
      identifier: email.trim(),
      password,
    });
    setSubmitting(false);
    if (result.ok) {
      setUser(toAuthUser(result.data.user), result.data.jwt);
      router.replace("/");
      return;
    }
    const msg =
      result.error?.error?.message ?? "Invalid email or password. Please try again.";
    setApiError(msg);
  };

  return (
    <div className="min-h-screen flex flex-col mt-2 mx-4">
      <section
        className="relative flex flex-col rounded-[20px] md:pb-30 items-center px-4 pt-8 pb-12 sm:px-6 md:px-8 lg:px-10 overflow-hidden"
        style={{ background: DARK_BG }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Back button (top-left) + Nuraya (center) */}
          <div className="relative w-full flex items-center justify-center min-h-[52px] mb-6">
            <Link
              href="/"
              className="absolute left-0 inline-flex items-center gap-1.5 rounded-full border border-[#F1EFE0]/40 bg-black/20 px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-[#F1EFE0] transition-opacity hover:opacity-90"
            >
              <span aria-hidden>‹</span> Back
            </Link>
            <span className="hero-title text-[28px] sm:text-[36px] font-light tracking-tight text-[#F1EFE0]">
              Nuraya
            </span>
          </div>

          {/* Form card */}
          <div
            className="w-full max-w-[580px]  rounded-[20px] p-6 sm:p-8 shadow-lg mt-20 overflow-hidden"
            style={{ background: CARD_BG }}
          >
            <h1 className="hero-title text-[22px] sm:text-[26px] font-normal text-[#151515] text-center flex items-center justify-center gap-1.5 flex-wrap">
              Log In To Your Account
              <Image
                src="/pntr.png"
                alt=""
                width={24}
                height={24}
                className="inline-block shrink-0"
                aria-hidden
              />
            </h1>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-[#4D4842] mb-1"
                >
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  className="w-full border-0 border-b border-[#DAD6C8] bg-transparent px-0 py-2 text-[#151515] placeholder:text-[#7D7872] focus:border-[#4D4842] focus:outline-none"
                />
                {showEmailError && (
                  <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                    Enter valid Email address
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-[#4D4842] mb-1"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  className="w-full border-0 border-b border-[#DAD6C8] bg-transparent px-0 py-2 text-[#151515] placeholder:text-[#7D7872] focus:border-[#4D4842] focus:outline-none"
                />
                <div className="mt-1 flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium transition-opacity hover:opacity-90"
                    style={{ color: ACCENT }}
                  >
                    Forget Password?
                  </Link>
                </div>
                {showPasswordError && (
                  <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                    Enter valid password
                  </p>
                )}
              </div>

              {apiError && (
                <p className="text-sm" style={{ color: ACCENT }}>
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                disabled={!formFilled || submitting}
                className={`w-full rounded-full py-3.5 text-sm font-medium uppercase tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F1EFE0] ${formFilled && !submitting ? "transition-opacity hover:opacity-90" : "cursor-not-allowed opacity-70"}`}
                style={{ background: formFilled && !submitting ? DARK_BG : "#B0B0C0" }}
              >
                {submitting ? "Logging in…" : "LOG IN"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#4D4842]">
              New to investing with us?{" "}
              <Link
                href="/signup"
                className="font-medium underline transition-opacity hover:opacity-90"
                style={{ color: ACCENT }}
              >
                Create your account
              </Link>
            </p>
          </div>
        </div>
      </section>

      <ProjectQuestionCTA />
    </div>
  );
}
