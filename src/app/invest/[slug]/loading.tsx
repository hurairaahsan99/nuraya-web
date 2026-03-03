export default function ProjectPageLoading() {
  return (
    <div className="pt-4 animate-pulse">
      {/* Hero skeleton */}
      <section className="w-full px-4">
        <div className="relative mx-auto w-full min-h-[60vh] md:min-h-[80vh] rounded-[28px] overflow-hidden bg-[#2a2530]">
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20">
            <div />
            <div className="flex flex-col items-center gap-4">
              <div className="h-4 w-48 rounded bg-white/10" />
              <div className="h-6 w-64 rounded bg-white/15" />
              <div className="h-12 md:h-16 w-full max-w-[500px] rounded bg-white/10" />
              <div className="h-4 w-72 rounded bg-white/10" />
              <div className="h-11 w-32 rounded-full bg-white/10" />
            </div>
            <div className="flex items-center justify-center gap-4 pt-8">
              <div className="h-3 w-24 rounded bg-white/10" />
              <div className="h-3 w-28 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="w-full px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="h-10 w-48 rounded bg-[#E8E6DF] mx-auto mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-8 w-16 rounded bg-[#E8E6DF]" />
                <div className="h-4 w-20 rounded bg-[#E8E6DF]/80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video skeleton */}
      <section className="w-full px-4 py-8">
        <div className="mx-auto max-w-7xl rounded-[24px] overflow-hidden bg-[#E8E6DF] aspect-video" />
      </section>

      {/* Benefits skeleton */}
      <section className="w-full px-4 py-12 bg-[#F8F6F0]">
        <div className="mx-auto max-w-4xl">
          <div className="h-10 w-56 rounded bg-[#E8E6DF] mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="h-8 w-32 rounded bg-[#E8E6DF]" />
                <div className="h-4 w-full rounded bg-[#E8E6DF]/80" />
                <div className="h-4 w-[85%] rounded bg-[#E8E6DF]/60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visuals skeleton */}
      <section className="w-full px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="h-[70vh] lg:h-[70vh] rounded-[24px] bg-[#E8E6DF]" />
        </div>
      </section>

      {/* Resources skeleton */}
      <section className="w-full px-4 py-12 bg-[#F1EFE0]">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="h-10 w-48 rounded bg-[#E8E6DF]" />
            <div className="h-4 w-full rounded bg-[#E8E6DF]/80" />
            <div className="h-12 w-36 rounded-full bg-[#E8E6DF]" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:w-80">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-[#E8E6DF]" />
            ))}
          </div>
        </div>
      </section>

      {/* Question CTA skeleton */}
      <section className="w-full px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-[24px] h-[40vh] bg-[#1F2667]/80" />
      </section>

      {/* Terms skeleton */}
      <section className="w-full px-4 py-12 bg-[#F8F6F0]">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="h-10 w-64 rounded bg-[#E8E6DF]" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-[#E8E6DF] shrink-0" />
                <div className="h-5 flex-1 rounded bg-[#E8E6DF]/80" />
              </div>
            ))}
          </div>
          <div className="h-12 w-40 rounded-full bg-[#E8E6DF]" />
        </div>
      </section>

      {/* Invest CTA skeleton */}
      <section className="w-full px-4 py-12 bg-[#F1EFE0]">
        <div className="mx-auto max-w-2xl rounded-[24px] overflow-hidden border border-[#DAD6C8]">
          <div className="min-h-[200px] flex flex-col items-center justify-center gap-4 p-8">
            <div className="h-10 w-72 rounded bg-[#E8E6DF]" />
            <div className="h-12 w-40 rounded-full bg-[#E8E6DF]" />
          </div>
        </div>
      </section>
    </div>
  );
}
