"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PROJECTS } from "@/lib/projectsData";
import { COUNTRIES, COUNTRY_PHONE } from "@/lib/constants";
import OurProjects from "@/Components/OurProjects";
import { register, setPendingVerify, sendEmailConfirmation } from "@/lib/api";

const ACCENT = "#C14D1C";
const DARK_BG = "#1F2667";
const CARD_BG = "#F1EFE0";
const BTN_BG = "#8B8BAE";
const BTN_FADED = "#B0B0C0";

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const PASSWORD_SYMBOLS = "!@#$%^&*";
function validatePassword(value: string): {
  valid: boolean;
  message: string;
} {
  if (!value.trim()) return { valid: false, message: "Password is required." };
  if (value.length < 8)
    return { valid: false, message: "Password must be at least 8 characters, with an uppercase letter, a number, and a symbol (! @ # $ % ^ & *)." };
  if (!/[A-Z]/.test(value))
    return { valid: false, message: "Password must be at least 8 characters, with an uppercase letter, a number, and a symbol (! @ # $ % ^ & *)." };
  if (!/[0-9]/.test(value))
    return { valid: false, message: "Password must be at least 8 characters, with an uppercase letter, a number, and a symbol (! @ # $ % ^ & *)." };
  const hasSymbol = [...PASSWORD_SYMBOLS].some((s) => value.includes(s));
  if (!hasSymbol)
    return { valid: false, message: "Password must be at least 8 characters, with an uppercase letter, a number, and a symbol (! @ # $ % ^ & *)." };
  return { valid: true, message: "" };
}

function getInvestmentOptions() {
  const seen = new Set<string>();
  return PROJECTS.filter((p) => {
    if (seen.has(p.fullName)) return false;
    seen.add(p.fullName);
    return true;
  }).map((p) => ({ value: p.fullName, label: p.fullName }));
}
const INVESTMENT_OPTIONS = getInvestmentOptions();

export default function SignupPage() {
  const router = useRouter();
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<string>(COUNTRY_PHONE[0].code);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentInterest, setInvestmentInterest] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const phoneDigitsOnly = /^[\d\s\-]*$/.test(phone);
  const amountNumeric =
    investmentAmount.trim() !== "" &&
    !isNaN(Number(investmentAmount.replace(/[,\s$]/g, ""))) &&
    Number(investmentAmount.replace(/[,\s$]/g, "")) > 0;

  const emailValid = !email.trim() ? false : validateEmail(email);
  const passwordResult = validatePassword(password);
  const passwordValid = passwordResult.valid;
  const confirmValid = confirmPassword.trim() !== "" && confirmPassword === password;
  const firstNameValid = firstName.trim() !== "";
  const lastNameValid = lastName.trim() !== "";
  const dateValid = dateOfBirth.trim() !== "";
  const phoneValid = phone.trim() !== "" && phoneDigitsOnly;
  const countryValid = country.trim() !== "";
  const amountValid = investmentAmount.trim() !== "" && amountNumeric;
  const interestValid = investmentInterest.trim() !== "";

  const allValid =
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    dateValid &&
    phoneValid &&
    countryValid &&
    amountValid &&
    interestValid &&
    passwordValid &&
    confirmValid &&
    termsAccepted;

  const allFilled =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    dateOfBirth.trim() !== "" &&
    phone.trim() !== "" &&
    country !== "" &&
    investmentAmount.trim() !== "" &&
    investmentInterest !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    termsAccepted;

  const showFirstNameError = submitAttempted && !firstNameValid;
  const showLastNameError = submitAttempted && !lastNameValid;
  const showEmailError = submitAttempted && !emailValid;
  const showDateError = submitAttempted && !dateValid;
  const showPhoneError = submitAttempted && !phoneValid;
  const showCountryError = submitAttempted && !countryValid;
  const showAmountError = submitAttempted && !amountValid;
  const showInterestError = submitAttempted && !interestValid;
  const showPasswordError = submitAttempted && !passwordValid;
  const showConfirmError = submitAttempted && (!confirmPassword.trim() || confirmPassword !== password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setApiError(null);
    if (!allValid) return;
    const username =
      email.trim().replace(/@.*$/, "").replace(/\W/g, "") || "user" + Date.now();
    const uniqueUsername = `${username}_${Date.now()}`;
    setSubmitting(true);
    const amountNum = amountNumeric
      ? Number(investmentAmount.replace(/[,\s$]/g, ""))
      : undefined;
    const result = await register({
      username: uniqueUsername,
      email: email.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dateOfBirth: dateOfBirth.trim() || undefined,
      phoneCountry: phoneCountry || undefined,
      phone: phone.trim() || undefined,
      country: country || undefined,
      investmentAmount: amountNum,
      investmentInterest: investmentInterest || undefined,
      termsAccepted,
    });
    setSubmitting(false);
    if (result.ok) {
      setPendingVerify(email.trim(), result.data.jwt, result.data.user);
      await sendEmailConfirmation(email.trim());
      router.push(`/verify?email=${encodeURIComponent(email.trim())}`);
      return;
    }
    const msg = result.error?.error?.message ?? "Sign up failed. Please try again.";
    setApiError(msg);
  };

  const inputErrorClass = "border-[#C14D1C]";
  const inputBaseClass = "w-full rounded-lg border bg-[#F8F6F0] px-3 py-2.5 text-[#151515] placeholder:text-[#7D7872] focus:outline-none focus:ring-2 focus:ring-[#4D4842]/30";

  return (
    <>
      <div
        className="min-h-screen flex flex-col mt-2 mx-4 rounded-[20px]"
        style={{ background: DARK_BG }}
      >
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden />

        <section className="relative z-10 flex flex-col items-center px-4 pt-8 pb-30 sm:px-6 md:px-8 lg:px-10">
          <div className="relative w-full flex flex-col items-center ">
            <div className="relative w-full flex items-center justify-center min-h-[52px] mb-6">
              <Link
                href="/"
                className="absolute left-0 inline-flex items-center gap-1.5 rounded-full border border-[#F1EFE0]/40 bg-black/20 px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-[#F1EFE0] transition-opacity hover:opacity-90 shadow-none"
                style={{ boxShadow: "none" }}
              >
                <span aria-hidden>‹</span> Back
              </Link>
              <span className="hero-title text-[28px] sm:text-[36px] font-light tracking-tight text-[#F1EFE0]">
                Nuraya
              </span>
            </div>

            <div
              className="w-full rounded-[20px] p-6 sm:p-8 shadow-lg overflow-hidden md:mt-20 max-w-[780px]"
              style={{ background: CARD_BG }}
            >
              <h1 className="hero-title text-[22px] sm:text-[26px] font-normal text-[#151515] text-center flex items-center justify-center gap-1.5 flex-wrap">
                Became a part of Nuraya!
                <Image
                  src="/pntr.png"
                  alt=""
                  width={24}
                  height={24}
                  className="inline-block shrink-0"
                  aria-hidden
                />
              </h1>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label
                      htmlFor="signup-firstName"
                      className="block text-sm font-medium text-[#4D4842] mb-1"
                    >
                      First Name*
                    </label>
                    <input
                      id="signup-firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className={`${inputBaseClass} ${showFirstNameError ? inputErrorClass : "border-[#DAD6C8]"}`}
                    />
                    {showFirstNameError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        First name is required.
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="signup-lastName"
                      className="block text-sm font-medium text-[#4D4842] mb-1"
                    >
                      Last Name*
                    </label>
                    <input
                      id="signup-lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className={`${inputBaseClass} ${showLastNameError ? inputErrorClass : "border-[#DAD6C8]"}`}
                    />
                    {showLastNameError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        Last name is required.
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="signup-email"
                      className="block text-sm font-medium text-[#4D4842] mb-1"
                    >
                      Email*
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className={`${inputBaseClass} ${showEmailError ? inputErrorClass : "border-[#DAD6C8]"}`}
                    />
                    {showEmailError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        {!email.trim()
                          ? "Email is required."
                          : "Enter a valid email address."}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="signup-dob"
                      className="block text-sm font-medium text-[#4D4842] mb-1"
                    >
                      Date Of Birth*
                    </label>
                    <div className="relative">
                      <input
                        id="signup-dob"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        max={new Date().toISOString().slice(0, 10)}
                        className={`${inputBaseClass} pr-10 ${showDateError ? inputErrorClass : "border-[#DAD6C8]"}`}
                        aria-label="Date of birth"
                      />
                      <span
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7D7872]"
                        aria-hidden
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </span>
                    </div>
                    {showDateError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        Date of birth is required.
                      </p>
                    )}
                  </div>
                  {/* Row: Phone (with flag + dial code) | Country of residence */}
                  <div>
                    <label className="block text-sm font-medium text-[#4D4842] mb-1">
                      Phone*
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={phoneCountry}
                        onChange={(e) => setPhoneCountry(e.target.value)}
                        className={`shrink-0 rounded-lg border bg-[#F8F6F0] pl-2 pr-8 py-2.5 text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#4D4842]/30 min-w-0 ${showPhoneError ? "border-[#C14D1C]" : "border-[#DAD6C8]"}`}
                        aria-label="Country and dial code"
                      >
                        {COUNTRY_PHONE.map(({ name, code, flag }) => (
                          <option key={`${name}-${code}`} value={code}>
                            {flag} {code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Number"
                        className={`flex-1 min-w-0 ${inputBaseClass} ${showPhoneError ? inputErrorClass : "border-[#DAD6C8]"}`}
                        aria-label="Phone number"
                      />
                    </div>
                    {showPhoneError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        {!phone.trim()
                          ? "Phone number is required."
                          : "Phone number must contain only digits."}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="signup-country"
                      className="block text-sm font-medium text-[#4D4842] mb-1"
                    >
                      Country of residence*
                    </label>
                    <select
                      id="signup-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={`${inputBaseClass} ${showCountryError ? inputErrorClass : "border-[#DAD6C8]"}`}
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {showCountryError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        Country selection is required.
                      </p>
                    )}
                  </div>
                  {/* Row: Investment Amount | Which investment */}
                  <div>
                    <label
                      htmlFor="signup-amount"
                      className="block text-sm font-medium text-[#4D4842] mb-1"
                    >
                      Investment Amount*
                    </label>
                    <input
                      id="signup-amount"
                      type="text"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="eg. $10000"
                      className={`${inputBaseClass} ${showAmountError ? inputErrorClass : "border-[#DAD6C8]"}`}
                    />
                    {showAmountError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        {!investmentAmount.trim()
                          ? "Investment amount is required."
                          : "Investment amount must be a valid number."}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="signup-interest"
                      className="block text-sm font-medium text-[#4D4842] mb-1"
                    >
                      Which investment are you interested?*
                    </label>
                    <select
                      id="signup-interest"
                      value={investmentInterest}
                      onChange={(e) => setInvestmentInterest(e.target.value)}
                      className={`${inputBaseClass} ${showInterestError ? inputErrorClass : "border-[#DAD6C8]"}`}
                    >
                      <option value="">Select investment</option>
                      {INVESTMENT_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {showInterestError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        Please select an investment option.
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="signup-password"
                      className="block text-sm font-medium text-[#4D4842] mb-1"
                    >
                      Enter Password
                    </label>
                    <div className="relative">
                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={`${inputBaseClass} pr-10 ${showPasswordError ? inputErrorClass : "border-[#DAD6C8]"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D7872] hover:text-[#4D4842]"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {showPasswordError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        {passwordResult.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="signup-confirm"
                      className="block text-sm font-medium text-[#4D4842] mb-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="signup-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Password"
                        className={`${inputBaseClass} pr-10 ${showConfirmError ? inputErrorClass : "border-[#DAD6C8]"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D7872] hover:text-[#4D4842]"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {showConfirmError && (
                      <p className="mt-1 text-sm" style={{ color: ACCENT }}>
                        {!confirmPassword.trim()
                          ? "Password is required."
                          : "Passwords do not match."}
                      </p>
                    )}
                  </div>
                </div>

                {apiError && (
                  <p className="mt-4 text-center text-sm" style={{ color: ACCENT }}>
                    {apiError}
                  </p>
                )}
                <div className="mt-6 flex items-start gap-2">
                  <input
                    id="signup-terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#DAD6C8] text-[#C14D1C] focus:ring-[#C14D1C]"
                  />
                  <label
                    htmlFor="signup-terms"
                    className="text-sm text-[#4D4842]"
                  >
                    By continuing, you agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium underline"
                      style={{ color: ACCENT }}
                    >
                      Term & Conditions
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!allFilled || submitting}
                  className={`mt-6 w-full rounded-full py-3.5 text-sm font-medium uppercase tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F1EFE0] ${allFilled && !submitting ? "transition-opacity hover:opacity-90" : "cursor-not-allowed opacity-70"}`}
                  style={{ background: allFilled && !submitting ? DARK_BG : BTN_FADED }}
                >
                  {submitting ? "Creating…" : "Create an account"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#4D4842]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium underline transition-opacity hover:opacity-90"
                  style={{ color: ACCENT }}
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="relative z-10 my-10 mt-10 mx-4">
        <OurProjects variant="onDark" />
      </div>
    </>
  );
}
