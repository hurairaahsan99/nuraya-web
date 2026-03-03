"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  fullName: string;
  email: string;
  country: string;
  hotel: string;
  investorType: string;
  interestLevel: string;
  message?: string;
};

const requiredFields: (keyof Inputs)[] = [
  "fullName",
  "email",
  "country",
  "hotel",
  "investorType",
  "interestLevel",
];

export default function InvestForm() {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      hotel: "Nuru Marrakesh",
      investorType: "Accredited",
      interestLevel: "Under $10k",
    },
  });

  const values = watch();

  const allFilled = requiredFields.every((key) => {
    const v = values[key];
    return typeof v === "string" && v.trim() !== "";
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setSubmitAttempted(false);
    console.log("Form Data:", data);
    reset({
      fullName: "",
      email: "",
      country: "",
      hotel: "Nuru Marrakesh",
      investorType: "Accredited",
      interestLevel: "Under $10k",
      message: "",
    });
    setShowSuccess(true);
  };

  const onError = () => {
    setSubmitAttempted(true);
  };

  // Show error banner only when user hit submit and there are validation errors.
  const showErrorBanner = submitAttempted && Object.keys(errors).length > 0;

  return (
    <section
      id="invest"
      className="w-full bg-[#F1EFE0] py-20 px-6 sm:px-12 md:px-16 lg:px-12"
    >
      <div className="mx-auto grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24">
        {/* Left Column */}
        <div className="flex flex-col">
          <h2 className="hero-title text-[48px] leading-[1.1] text-[#383430] sm:text-[56px] font-normal tracking-tight mb-8">
            Invest in the Future of
            <br />
            African Hospitality
          </h2>

          <div className="flex flex-col gap-6 max-w-[480px]">
            <p className="font-ui text-[15px] leading-relaxed text-[#383430CC]">
              Join a new generation of purpose-driven investors.
            </p>

            <p className="font-ui text-[15px] leading-[1.6] text-[#383430CC]">
              Whether you&apos;re seasoned or new to the world of hospitality
              investing, the Nuraya Fund is your chance to build wealth, support
              culture-forward travel, and be part of something transformative.
            </p>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div>
          {showErrorBanner && (
            <div className="mb-10 flex items-center gap-2 bg-[#FA111133] px-4 py-3 text-[13px] text-[#FA1111]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M8 4V8M8 11.5H8.01"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              Please fill all necessary fields.
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-10"
            noValidate
          >
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full border-b bg-transparent pb-3 text-[15px] text-[#4D4842] placeholder:text-[#7D7872] focus:border-[#4D4842] focus:outline-none ${
                  errors.fullName ? "border-[#D35B3B]" : "border-[#DAD6C8]"
                }`}
                {...register("fullName", { required: true })}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="text"
                placeholder="Enter your email"
                className={`w-full border-b bg-transparent pb-3 text-[15px] text-[#4D4842] placeholder:text-[#7D7872] focus:border-[#4D4842] focus:outline-none ${
                  errors.email ? "border-[#D35B3B]" : "border-[#DAD6C8]"
                }`}
                {...register("email", {
                  required: true,
                })}
              />
            </div>

            {/* Country */}
            <div>
              <input
                type="text"
                placeholder="Enter your country of residence"
                className={`w-full border-b bg-transparent pb-3 text-[15px] text-[#4D4842] placeholder:text-[#7D7872] focus:border-[#4D4842] focus:outline-none ${
                  errors.country ? "border-[#D35B3B]" : "border-[#DAD6C8]"
                }`}
                {...register("country", { required: true })}
              />
            </div>

            {/* Hotel Select */}
            <div className="flex flex-col gap-3">
              <label className="text-[13px] text-[#7D7872]">
                Select a hotel you want to invest in:
              </label>
              <div className="relative">
                <select
                  className={`w-full appearance-none border-b bg-transparent pb-3 pr-8 text-[15px] text-[#4D4842] focus:border-[#4D4842] focus:outline-none ${
                    errors.hotel ? "border-[#D35B3B]" : "border-[#DAD6C8]"
                  }`}
                  {...register("hotel", { required: true })}
                >
                  <option value="Nuru Marrakesh">Nuru Marrakesh</option>
                  <option value="Nahla Cape Town">Nahla Cape Town</option>
                  <option value="Niva Zanzibar">Niva Zanzibar</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1 text-[#4D4842]">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 2-Col Selects: Investor Type & Interest Level */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {/* Investor Type */}
              <div className="flex flex-col gap-3">
                <label className="text-[13px] text-[#7D7872]">
                  Select investor type:
                </label>
                <div className="relative">
                  <select
                    className={`w-full appearance-none border-b bg-transparent pb-3 pr-8 text-[15px] text-[#4D4842] focus:border-[#4D4842] focus:outline-none ${
                      errors.investorType
                        ? "border-[#D35B3B]"
                        : "border-[#DAD6C8]"
                    }`}
                    {...register("investorType", { required: true })}
                  >
                    <option value="Accredited">Accredited</option>
                    <option value="Non-Accredited">Non-Accredited</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1 text-[#4D4842]">
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Interest Level */}
              <div className="flex flex-col gap-3">
                <label className="text-[13px] text-[#7D7872]">
                  Select interest level:
                </label>
                <div className="relative">
                  <select
                    className={`w-full appearance-none border-b bg-transparent pb-3 pr-8 text-[15px] text-[#4D4842] focus:border-[#4D4842] focus:outline-none ${
                      errors.interestLevel
                        ? "border-[#D35B3B]"
                        : "border-[#DAD6C8]"
                    }`}
                    {...register("interestLevel", { required: true })}
                  >
                    <option value="Under $10k">Under $10k</option>
                    <option value="$10k - $50k">$10k - $50k</option>
                    <option value="$50k - $100k">$50k - $100k</option>
                    <option value="Over $100k">Over $100k</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1 text-[#4D4842]">
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <input
                type="text"
                placeholder="Enter your message (optional)"
                className="w-full border-b border-[#DAD6C8] bg-transparent pb-3 text-[15px] text-[#4D4842] placeholder:text-[#7D7872] focus:border-[#4D4842] focus:outline-none"
                {...register("message")}
              />
            </div>

            {/* Submit & Terms */}
            <div className="mt-2 flex flex-col gap-5 text-center">
              <button
                type="submit"
                className={`h-[52px] w-full rounded-full px-8 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D15535] focus:ring-offset-2 focus:ring-offset-[#F1EFE0] ${
                  allFilled
                    ? "bg-[#B43011] hover:opacity-90"
                    : "cursor-not-allowed bg-[#E59A83] opacity-80"
                }`}
                disabled={!allFilled}
              >
                SUBMIT INTEREST
              </button>
              <p className="text-[13px] text-[#7D7872]">
                By pressing Submit, you agree to our{" "}
                <a href="#" className="text-[#4D4842] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#4D4842] hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Success modal — centered overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#D9D9D9]/40 p-4">
          <div
            className="w-full max-w-[400px] rounded-[20px] bg-[#F8F5EC] p-8 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <h3
              id="success-title"
              className="hero-title text-center text-xl font-bold text-[#B43011]"
            >
              Great!
            </h3>
            <p className="mt-4 text-center text-[15px] leading-relaxed text-[#4B5281]">
              You have successfully submit your
              <br />
              request.
            </p>
            <p className="mt-4 text-center text-[15px] leading-relaxed text-[#B43011]">
              Our team will contact you soon.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mx-auto mt-8 flex h-12 min-w-[120px] items-center justify-center rounded-full bg-[#2E3368] px-8 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#2E3368] focus:ring-offset-2 focus:ring-offset-[#F8F5EC]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
