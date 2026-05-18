"use client";

import { useEffect, useRef, useState } from "react";

const heroStats = [
  ["93%", "Pricing accuracy"],
  ["96%", "Vehicle condition"],
  ["94%", "On-time delivery"],
  ["91%", "Communication"],
  ["13.7k", "Total reviews"],
];

const badges = [
  { icon: "/images/star.svg", label: "Highly Trusted", tone: "bg-[#1f359866] text-[#a3b4fe]" },
  { icon: "/images/check4.svg", label: "FMCSA Verified", tone: "bg-[#62616166] text-neutral-100" },
  { icon: "/images/hear.svg", label: "Customer Favorite", tone: "bg-[#b9563e80] text-[#ff8484]" },
];

const authorizedPartnersCopy = [
  'Our "Authorized Partners" are businesses in a wide variety of industries who pay us to participate in our Authorized Partner Program. Here is a list of our current Authorized Partners.',
];

export function HeroSection() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isTooltipOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!tooltipRef.current?.contains(event.target as Node)) {
        setIsTooltipOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsTooltipOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isTooltipOpen]);

  return (
    <section className="absolute left-0 top-[131px] w-full overflow-hidden text-white">
      <img className="absolute inset-0 h-full w-full object-cover" src="/images/hero-section.png" alt="" />
      <div className="absolute inset-0" />

      <div className="relative flex flex-col gap-16 pt-20">
        <div className="absolute left-0 top-0 flex w-full justify-center bg-white/30 px-2.5 py-[5px] backdrop-blur-[2px]">
          <p className="text-sm leading-5">
            We are not a government agency and may be paid by companies displayed. <span className="font-bold underline">How It Works</span>
          </p>
        </div>

        <div className="flex items-center gap-5 px-[100px]">
          <img className="size-20 rounded-md object-cover" src="/images/background.png" alt="Rimberio Auto Transport" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <h1 className="font-header text-[32px] font-semibold leading-[1.2]">Rimberio Auto Transport</h1>
              <div ref={tooltipRef} className="relative flex shrink-0 items-center">
                <button
                  type="button"
                  aria-expanded={isTooltipOpen}
                  aria-controls="hero-authorized-partners-tooltip"
                  aria-label="Show authorized partners information"
                  onClick={() => setIsTooltipOpen((current) => !current)}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a5b36]"
                >
                  <img className="size-6" src="/images/leading-icon-9.svg" alt="" />
                </button>

                {isTooltipOpen ? (
                  <div
                    id="hero-authorized-partners-tooltip"
                    role="dialog"
                    aria-label="Authorized partners information"
                    className="absolute left-1/2 top-[34px] z-20 w-[min(450px,calc(100vw-40px))] -translate-x-[24px] rounded-md bg-white px-4 py-3 text-[#2a2a2a] shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
                  >
                    <div className="absolute left-[24px] top-0 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                    <div className="flex items-start gap-3">
                      <div className="text-[12px] leading-8">
                        {authorizedPartnersCopy.map((line) => (
                          <p key={line}>
                            Our <span className="font-semibold text-[#2563eb] underline underline-offset-2">&quot;Authorized Partners&quot;</span> are businesses in a wide variety of industries who pay us to participate in our <span className="font-semibold text-[#2563eb] underline underline-offset-2">Authorized Partner Program</span>. Here is a list of our current <span className="font-semibold text-[#2563eb] underline underline-offset-2">Authorized Partners</span>.
                          </p>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsTooltipOpen(false)}
                        className="shrink-0 rounded-full p-1 text-[#6d6d6d] transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3598]/40"
                        aria-label="Close authorized partners tooltip"
                      >
                        <span aria-hidden="true" className="block text-base leading-none">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <img key={index} className="size-[18px]" src="/images/star.svg" alt="" />
                ))}
              </div>
              <span className="text-base font-semibold leading-5">4.8</span>
              <span className="text-sm leading-5">(2,100)</span>
            </div>

            <div className="flex items-start gap-2">
              {badges.map((badge) => (
                <div key={badge.label} className={`flex h-7 items-center gap-1.5 rounded-full px-2.5 py-2 ${badge.tone}`}>
                  <img className="size-4" src={badge.icon} alt="" />
                  <span className="font-header text-xs font-semibold leading-5">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end gap-1">
              <span className="text-base font-bold leading-6">Trust Score</span>
              <span className="text-sm leading-5">6 platforms · 13,700+ reviews</span>
            </div>
            <div className="relative size-[126px]">
              <img className="absolute inset-0 size-full" src="/images/ellipse-5.svg" alt="" />
              <img className="absolute inset-0 size-full" src="/images/ellipse-6.svg" alt="" />
              <span className="font-header absolute left-[35px] top-[23px] text-5xl font-semibold leading-[1.2]">96</span>
              <span className="font-header absolute left-[18px] top-[73px] text-sm font-semibold leading-5 text-green-500">Highly Trusted</span>
            </div>
          </div>
        </div>

        <div className="flex border-t border-white/25 bg-black/10 px-[100px] backdrop-blur-[6px]">
          {heroStats.map(([value, label], index) => (
            <div key={label} className={`flex flex-1 flex-col px-6 py-7 ${index ? "border-l border-white/25" : ""}`}>
              <span className="font-header text-[32px] font-semibold leading-[1.2]">{value}</span>
              <span className="font-header text-sm font-semibold leading-5 text-emerald-50">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
