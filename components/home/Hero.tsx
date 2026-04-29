"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFlags } from "@/components/flags/FlagsProvider";

export function Hero() {
  const { path, setStep } = useFlags();
  const isEmailFirst = path === "C";

  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEmailFirst) {
      // Email captured here on the homepage. Jump the funnel state to
      // step 1 (Address) BEFORE navigating — FlagsProvider only reads URL
      // params on initial mount, so we update React state directly.
      setStep(1);
      const q = new URLSearchParams({ path: "C" });
      if (value) q.set("email", value);
      router.push(`/onboarding?${q.toString()}`);
    } else {
      // Other paths start at step 0 (Address screen). Reset in case the
      // user is coming back from a deep step.
      setStep(0);
      const q = new URLSearchParams();
      if (path !== "0") q.set("path", path);
      if (value) q.set("addr", value);
      const qs = q.toString();
      router.push(qs ? `/onboarding?${qs}` : "/onboarding");
    }
  }

  return (
    <section className="relative isolate -mt-[72px] flex min-h-[100svh] flex-col justify-end overflow-hidden bg-base-green-deep pt-[72px]">
      {/* Photo background */}
      <img
        src="/img/hero.avif"
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_60%]"
      />

      {/* Top fade — keeps the white nav legible against the sky */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[40%]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,21,9,0.7) 0%, rgba(4,21,9,0.2) 60%, rgba(4,21,9,0) 100%)",
        }}
      />

      {/* Bottom-left fade — keeps the headline + address bar legible without nuking the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(20deg, rgba(4,21,9,0.85) 0%, rgba(4,21,9,0.55) 30%, rgba(4,21,9,0) 65%)",
        }}
      />

      {/* Content — bottom-left, like Base */}
      <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-16 md:pb-24">
        {/* Stars */}
        <div className="mb-5 flex items-center gap-2 text-[13px] font-medium text-white">
          <span className="flex gap-0.5 text-[#fdb022]" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 0L13.09 6.26L20 7.27L15 12.14L16.18 19.02L10 15.77L3.82 19.02L5 12.14L0 7.27L6.91 6.26L10 0Z" />
              </svg>
            ))}
          </span>
          <span className="text-white/95">4.9 Google rating · 2,400+ reviews</span>
        </div>

        <h1
          className="max-w-[14ch] text-[40px] font-bold leading-[1.05] tracking-[-0.01em] text-white md:text-[56px] lg:text-[64px]"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
        >
          Save money. Stay powered.
        </h1>

        <p
          className="mt-5 max-w-[40ch] text-[16px] font-medium leading-[1.4] text-white/90 md:text-[18px]"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
        >
          The power company bringing affordable, reliable energy to homes
          across America.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-[520px]">
          <div className="flex h-[56px] items-center rounded-btn border border-white/40 bg-white/10 pl-4 pr-1.5 backdrop-blur-md transition focus-within:border-white">
            <span aria-hidden className="text-white/80">
              {isEmailFirst ? (
                // Mail icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6.75A2.75 2.75 0 015.75 4h12.5A2.75 2.75 0 0121 6.75v10.5A2.75 2.75 0 0118.25 20H5.75A2.75 2.75 0 013 17.25V6.75zm2.06 0a.75.75 0 00-.06.3v.21l7 4.55 7-4.55v-.21a.75.75 0 00-.06-.3l-7 4.55-6.88-4.55z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                // Pin icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </span>
            <input
              key={isEmailFirst ? "email" : "address"} // remount on path change
              type={isEmailFirst ? "email" : "text"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={
                isEmailFirst ? "Enter your email" : "Enter your home address"
              }
              className="flex-1 bg-transparent px-3 text-[15px] text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              className="h-[44px] rounded-btn bg-base-green-mid px-5 text-[14px] font-semibold text-base-green-dark transition hover:bg-base-green-light"
            >
              {isEmailFirst ? "Get my plan" : "See available plans"}
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[13px] text-white/85">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-base-green-mid" />
            {isEmailFirst
              ? "Even if you don't finish, we'll send your custom plan"
              : "Join 10,000+ homes powered by Base"}
          </div>
        </form>
      </div>
    </section>
  );
}
