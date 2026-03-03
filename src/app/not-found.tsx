import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 bg-[#F1EFE0]">
      <div className="max-w-[520px] w-full rounded-[20px] p-8 sm:p-12 text-center shadow-lg border border-[#DAD6C8]/60 bg-[#F8F6F0]">
        <p className="text-[#4D4842] text-sm uppercase tracking-[0.2em] mb-2">
          Page not found
        </p>
        <h1 className="hero-title text-[80px] sm:text-[120px] font-extralight leading-none text-[#151515] mb-4">
          404
        </h1>
        <p className="text-[#4D4842] text-base sm:text-lg leading-relaxed mb-8">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#1F2667] px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-[#F1EFE0] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#1F2667]/50 focus:ring-offset-2 focus:ring-offset-[#F8F6F0]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
