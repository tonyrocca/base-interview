"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Nav() {
  // Track scroll to swap nav style: transparent over hero, opaque after.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-colors duration-200 ${
        scrolled
          ? "border-b border-base-line/60 bg-white/95 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={`text-[24px] font-bold uppercase leading-none tracking-[0.02em] transition-colors ${
              scrolled ? "text-base-ink" : "text-white"
            }`}
          >
            Base
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-7 text-[14px] font-medium transition-colors md:flex ${
            scrolled ? "text-base-ink/80" : "text-white/85"
          }`}
        >
          <a
            href="#pricing"
            className={scrolled ? "hover:text-base-ink" : "hover:text-white"}
          >
            Pricing
          </a>
          <a
            href="#how"
            className={scrolled ? "hover:text-base-ink" : "hover:text-white"}
          >
            Learn
          </a>
          <a
            href="#"
            className={scrolled ? "hover:text-base-ink" : "hover:text-white"}
          >
            Tools
          </a>
          <a
            href="#stories"
            className={scrolled ? "hover:text-base-ink" : "hover:text-white"}
          >
            Reviews
          </a>
          <a
            href="#"
            className={scrolled ? "hover:text-base-ink" : "hover:text-white"}
          >
            Company
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className={`hidden h-10 items-center rounded-btn px-3 text-[14px] font-medium transition-colors md:inline-flex ${
              scrolled
                ? "border border-base-line text-base-ink hover:bg-base-cream"
                : "border border-white/40 text-white hover:bg-white/10"
            }`}
          >
            Sign in
          </a>
          <Link
            href="/onboarding"
            className="inline-flex h-10 items-center rounded-btn bg-base-green-mid px-3.5 text-[14px] font-semibold text-base-green-dark transition hover:bg-base-green-light"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export function BaseWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-[24px] font-bold uppercase leading-none tracking-[0.02em] ${className}`}
    >
      Base
    </span>
  );
}
