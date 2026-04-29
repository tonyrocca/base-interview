"use client";

import * as React from "react";
import { useFlags } from "@/components/flags/FlagsProvider";

export type ScreenProps = {
  next: () => void;
  back: () => void;
  setStep: (n: number) => void;
  stepIndex: number;
  totalSteps: number;
};

// ============================================================
// Screen scaffolding (slim progress bar + boxed BASE logo +
// "Talk to an Energy Advisor" CTA, all on a cream surface).
// Mirrors Base Power's actual funnel chrome.
// ============================================================

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-base-cream">
      {children}
    </div>
  );
}

export function ScreenScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-[640px] px-6 py-6">{children}</div>
    </div>
  );
}

// ============================================================
// BASE wordmark — boxed, rounded-rect outline (used in funnel header)
// ============================================================

export function BaseLogoBoxed({
  variant = "ink",
}: {
  variant?: "ink" | "white";
}) {
  const stroke = variant === "white" ? "border-white" : "border-base-ink";
  const text = variant === "white" ? "text-white" : "text-base-ink";
  return (
    <span
      className={`inline-flex h-9 items-center rounded-md border-[2px] px-2.5 text-[16px] font-extrabold tracking-[0.04em] ${stroke} ${text}`}
    >
      BASE
    </span>
  );
}

// ============================================================
// Header — slim progress bar + boxed logo + "Talk to an Advisor"
// ============================================================

export function Header({
  numerator,
  denominator,
}: {
  numerator: number;
  denominator: number;
}) {
  const pct = Math.round((numerator / denominator) * 100);

  return (
    <header className="sticky top-0 z-20 bg-base-cream">
      {/* Slim dark-green progress bar at the very top */}
      <div className="h-[3px] w-full bg-base-ink/10">
        <div
          className="h-full bg-base-green-deep transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <BaseLogoBoxed />
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="hidden h-10 items-center rounded-md border border-base-green-deep/50 px-3.5 text-[13px] font-semibold text-base-green-deep transition hover:bg-base-green-deep hover:text-white sm:inline-flex"
        >
          Talk to an Energy Advisor
        </a>
      </div>
    </header>
  );
}

// ============================================================
// Footer — back + CTA buttons
// ============================================================

export function Footer({
  next,
  back,
  ctaLabel = "OK",
  showBack = true,
  showSkip = false,
}: {
  next: () => void;
  back: () => void;
  ctaLabel?: string;
  showBack?: boolean;
  showSkip?: boolean;
}) {
  // Base's actual buttons are small rectangular pills (~6px radius), not full-pill.
  // CTA: lime green-20 bg, dark-green text, weight 700.
  return (
    <div className="border-t border-base-line/40 bg-base-cream">
      <div className="mx-auto flex w-full max-w-[640px] items-center gap-2 px-6 py-5">
        {showBack && (
          <button
            onClick={back}
            aria-label="Back"
            className="inline-flex h-10 items-center justify-center rounded-md border border-base-line bg-white px-3 text-[14px] font-medium text-base-ink hover:bg-white"
          >
            ‹
          </button>
        )}
        {showSkip && (
          <button
            onClick={next}
            className="inline-flex h-10 items-center rounded-md text-[13px] font-medium text-base-muted hover:text-base-ink hover:underline"
          >
            Skip
          </button>
        )}
        <button
          onClick={next}
          className="inline-flex h-11 items-center rounded-md bg-base-green-mid px-5 text-[14px] font-bold text-base-green-deep shadow-sm transition hover:bg-base-green-light"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Common content blocks
// ============================================================

// Headline — Base's flow uses two flavors:
//   - "question" (default) : dark gray-black, bold, ~30-32px
//   - "interstitial"       : dark green, bold, ~28-32px (used on educational screens)
export function Title({
  children,
  variant = "question",
}: {
  children: React.ReactNode;
  variant?: "question" | "interstitial";
}) {
  return (
    <h2
      className={`text-[28px] font-bold leading-[1.2] sm:text-[30px] ${
        variant === "interstitial"
          ? "text-base-green-deep"
          : "text-base-ink"
      }`}
    >
      {children}
    </h2>
  );
}

export function Sub({
  children,
  bold = false,
}: {
  children: React.ReactNode;
  bold?: boolean;
}) {
  return (
    <p
      className={`mt-3 text-[15px] leading-relaxed text-base-ink/80 ${
        bold ? "font-semibold text-base-ink" : ""
      }`}
    >
      {children}
    </p>
  );
}

export function Helper({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 text-[12px] text-[var(--base-muted)]">{children}</p>
  );
}

// Step badge — small dark-green rounded-square w/ white digit
// (matches Base's in-form step indicator, e.g. "5 Last step…")
export function StepNum({ n }: { n: number }) {
  return (
    <span className="mr-2 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-base-green-deep text-[12px] font-bold text-white">
      {n}
    </span>
  );
}

// Question header — step badge + bold title (Base's standard form header)
export function QuestionHead({
  step,
  optional = false,
  title,
}: {
  step: number;
  optional?: boolean;
  title: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline">
      <StepNum n={step} />
      <h2 className="text-[26px] font-bold leading-[1.2] text-base-green-deep sm:text-[30px]">
        {optional && (
          <span className="font-medium text-base-green-deep/70">Optional - </span>
        )}
        {title}
      </h2>
    </div>
  );
}

// Option list — Base uses radio-card style with circular ring + dot
// when selected. Each option may carry its own onClick (used for branching:
// e.g. "I rent" jumps to the renter sub-flow via setStep).
export function OptList({
  options,
  selectedIndex,
}: {
  options: Array<
    string | { label: string; sub?: string; onClick?: () => void }
  >;
  selectedIndex?: number;
}) {
  return (
    <div className="mt-5 space-y-2.5">
      {options.map((o, i) => {
        const item = typeof o === "string" ? { label: o } : o;
        const isSel = selectedIndex === i;
        return (
          <button
            key={i}
            type="button"
            onClick={item.onClick}
            className={`flex w-full items-center gap-3 rounded-md border px-4 py-4 text-left transition ${
              isSel
                ? "border-base-green-deep bg-white ring-1 ring-base-green-deep"
                : "border-base-line bg-white hover:border-base-green-deep/60"
            }`}
          >
            <span
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                isSel
                  ? "border-base-green-deep"
                  : "border-base-line"
              }`}
            >
              {isSel && (
                <span className="h-2.5 w-2.5 rounded-full bg-base-green-deep" />
              )}
            </span>
            <div className="min-w-0">
              <div className="text-[16px] font-bold text-base-ink">
                {item.label}
              </div>
              {item.sub && (
                <div className="mt-0.5 text-[13px] text-base-muted">
                  {item.sub}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function IconPick({
  options,
}: {
  options: Array<{ glyph: string; label: string; spanTwo?: boolean }>;
}) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {options.map((o, i) => (
        <button
          key={i}
          type="button"
          className={`flex flex-col items-start gap-2 rounded-card border border-base-line bg-white p-3.5 text-left text-base-ink transition hover:border-base-ink hover:bg-base-cream/40 ${
            o.spanTwo ? "col-span-2" : ""
          }`}
        >
          <span className="text-xl">{o.glyph}</span>
          <span className="text-[13px] font-medium">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

// Underline-only line input — Base's actual contact form style.
// Big text, label above, single bottom border (no box).
export function Field({
  label,
  placeholder,
  type = "text",
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-[14px] font-medium text-base-green-deep/80">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1.5 w-full border-b-[1.5px] border-base-line/80 bg-transparent px-0 pb-2 pt-1 text-[24px] font-bold text-base-green-deep placeholder:font-normal placeholder:text-base-green-deep/30 focus:border-base-green-deep focus:outline-none"
      />
    </label>
  );
}

export function NeighborChip() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-base-green-light px-3 py-1 text-[11px] font-medium text-base-green-deep">
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-base-green-dark" />
      400 neighbors in Pflugerville already joined
    </div>
  );
}

export function MaybeNeighbor() {
  const { flags } = useFlags();
  if (!flags.socialProof) return null;
  return (
    <div className="mb-3">
      <NeighborChip />
    </div>
  );
}

export function MaybeWhatNext({ children }: { children: React.ReactNode }) {
  const { flags } = useFlags();
  if (!flags.whatNextHint) return null;
  return (
    <div className="mt-5 rounded-xl border border-dashed border-base-line px-3.5 py-2.5 text-[12px] text-base-ink/70">
      <b className="font-semibold text-base-ink">Next:</b> {children}
    </div>
  );
}

export function TCPABlock({
  short = "By providing your contact information and clicking 'OK,' you agree to receive — at the phone number below — calls, text messages, and prerecorded voice messages from Base Power, Inc. regarding our services. Consent is not a condition of any purchase.",
}: {
  short?: string;
}) {
  const { flags } = useFlags();
  if (flags.tcpaCollapsed) {
    return (
      <details className="mt-3 rounded-xl border border-base-line bg-white px-3.5 py-2.5 text-[11px] text-base-muted">
        <summary className="cursor-pointer font-medium text-base-ink/80">
          Why we ask for your phone
        </summary>
        <p className="mt-2 leading-relaxed">{short}</p>
      </details>
    );
  }
  return (
    <div className="mt-3 rounded-xl bg-base-cream px-3.5 py-2.5 text-[11px] leading-relaxed text-base-muted">
      {short}
    </div>
  );
}

export function PriceBlock() {
  return (
    <div className="mt-4 rounded-2xl border border-base-line bg-white p-4 text-[14px]">
      <div className="flex items-center justify-between border-b border-base-line/60 pb-2.5">
        <span className="text-base-muted">Single Battery — 24h</span>
        <span className="font-medium text-base-ink">$695 install</span>
      </div>
      <div className="flex items-center justify-between border-b border-base-line/60 py-2.5">
        <span className="text-base-muted">Recurring</span>
        <span className="font-medium text-base-ink">$19/mo · 10yr</span>
      </div>
      <div className="flex items-center justify-between pt-2.5">
        <span className="text-base-muted">All-in rate</span>
        <span className="font-display text-[20px] text-base-green-dark">
          13.8¢/kWh
        </span>
      </div>
    </div>
  );
}

// Confirmation screen — shared across paths
export function ConfirmScreen({
  message = "A Base Energy Advisor will reach out within 24 hours.",
}: {
  message?: string;
}) {
  return (
    <Screen>
      <ScreenScroll>
        <div className="pt-20" />
        <Title>You&apos;re all set, Tony.</Title>
        <Sub>{message}</Sub>
      </ScreenScroll>
    </Screen>
  );
}

// ============================================================
// Step pill — used in brief-aligned step headers
// ============================================================

export function StepPill({
  n,
  label,
  highlight = false,
}: {
  n: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
        highlight
          ? "bg-base-green-light text-base-green-deep"
          : "bg-base-cream text-base-muted"
      }`}
    >
      Step {n}
      {label && <span className="text-base-green-dark">· {label}</span>}
    </span>
  );
}

// ============================================================
// Multi-select checkbox list — for Why Base, Energy Setup
// ============================================================

export function CheckList({
  options,
  selected = [],
}: {
  options: string[];
  selected?: string[];
}) {
  return (
    <div className="mt-4 space-y-2">
      {options.map((o) => {
        const isSelected = selected.includes(o);
        return (
          <label
            key={o}
            className="flex w-full cursor-pointer items-center gap-3 rounded-card border border-base-line bg-white px-4 py-3 text-[15px] text-base-ink transition hover:border-base-ink hover:bg-base-cream/40"
          >
            <span
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                isSelected
                  ? "border-base-green-dark bg-base-green-dark text-white"
                  : "border-base-line bg-white"
              }`}
            >
              {isSelected && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="flex-1 font-medium">{o}</span>
          </label>
        );
      })}
    </div>
  );
}

// ============================================================
// Provider dropdown — used in Control + Reorder + Cut Overhead
// ============================================================

export function ProviderSelect({
  detected,
}: {
  detected?: string;
}) {
  return (
    <div className="mt-3 rounded-card border border-base-line bg-white p-3.5">
      {detected && (
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-base-green-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-base-green-deep">
          ✓ Auto-detected from address
        </div>
      )}
      <div className="text-[15px] font-medium text-base-ink">
        {detected || "Select your provider"}
      </div>
      <button
        type="button"
        className="mt-2 text-[12px] font-medium text-base-green-dark underline-offset-2 hover:underline"
      >
        {detected ? "Different provider" : "Choose..."}
        <span className="ml-1">▾</span>
      </button>
    </div>
  );
}

// ============================================================
// Plan tiers — single source of truth for pricing throughout the funnel
// ============================================================

export type PlanId = "energy" | "battery1" | "battery2";

export const PLANS: {
  id: PlanId;
  name: string;
  shortName: string;
  blurb: string;
  install: number;
  monthly: number;
  savings: number; // estimated $/mo savings vs current bill
  hours?: string;
  badge?: string;
}[] = [
  {
    id: "energy",
    name: "Energy plan",
    shortName: "Energy only",
    blurb: "Just the rate. No backup hardware.",
    install: 0,
    monthly: 0,
    savings: 60,
  },
  {
    id: "battery1",
    name: "Single Battery",
    shortName: "Single",
    blurb: "Up to 24 hours of outage protection.",
    install: 695,
    monthly: 19,
    savings: 200,
    hours: "24 hours",
  },
  {
    id: "battery2",
    name: "Double Battery",
    shortName: "Double",
    blurb: "Up to 48 hours of outage protection.",
    install: 995,
    monthly: 29,
    savings: 240,
    hours: "48 hours",
    badge: "Most popular",
  },
];

export function getPlan(id: PlanId) {
  return PLANS.find((p) => p.id === id) ?? PLANS[1];
}

function fmtUSD(n: number) {
  return n === 0 ? "$0" : `$${n.toLocaleString()}`;
}

// ============================================================
// Pricing preview card — used in Reorder, Cut Overhead, Auto-fill
// Accepts a plan id; defaults to "battery1" (Base's most popular bundle).
// ============================================================

export function PricingPreviewCard({
  address = "4205 Arthurs Flight Path",
  detectedProvider,
  showChangeLink = false,
  plan = "battery1",
}: {
  address?: string;
  detectedProvider?: string;
  showChangeLink?: boolean;
  plan?: PlanId;
}) {
  const p = getPlan(plan);
  return (
    <div className="rounded-card bg-base-green-deep p-4 text-white">
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-base-green-mid px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-base-green-deep">
        Your plan
      </div>
      <div className="text-[18px] font-bold leading-tight">{p.name}</div>
      <div className="mt-0.5 text-[12px] text-white/70">at {address}</div>

      {detectedProvider && (
        <div className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-[12px]">
          <span className="text-white/85">
            We detected <b>{detectedProvider}</b> as your provider —
          </span>
          {showChangeLink ? (
            <button
              type="button"
              className="ml-1 font-semibold text-base-green-mid underline-offset-2 hover:underline"
            >
              looks right? [Change]
            </button>
          ) : (
            <span className="ml-1 text-white/60">looks right?</span>
          )}
        </div>
      )}

      <div className="mt-4 space-y-1.5 text-[13px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <span className="text-white/75">Energy plan</span>
          <span className="font-semibold">8¢/kWh</span>
        </div>
        {p.install > 0 && (
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-white/75">
              {p.id === "battery2"
                ? "Battery installation (2 units, one-time)"
                : "Battery installation (one-time)"}
            </span>
            <span className="font-semibold">{fmtUSD(p.install)}</span>
          </div>
        )}
        {p.monthly > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-white/75">Battery membership</span>
            <span className="font-semibold">{fmtUSD(p.monthly)}/mo</span>
          </div>
        )}
        {p.install === 0 && (
          <div className="flex items-center justify-between">
            <span className="text-white/75">Hardware</span>
            <span className="font-semibold text-white/70">No battery</span>
          </div>
        )}
      </div>

      <div className="mt-3 rounded-lg bg-base-green-mid/20 px-3 py-2 text-[12px] font-medium text-base-green-light">
        💚 Estimated <b>{fmtUSD(p.savings)}/mo</b> savings vs your current bill
      </div>
    </div>
  );
}

// ============================================================
// Calendar widget — time slots for tomorrow
// ============================================================

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

export function CalendarWidget({
  selected,
}: {
  selected?: string;
}) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateLabel = tomorrow.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-card border border-base-line bg-white p-4">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-base-muted">
        Tomorrow
      </div>
      <div className="mb-3 text-[15px] font-bold text-base-ink">
        {dateLabel}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {TIME_SLOTS.map((t) => {
          const isSelected = t === selected;
          return (
            <button
              key={t}
              type="button"
              className={`rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                isSelected
                  ? "bg-base-green-deep text-white"
                  : "border border-base-line bg-white text-base-ink hover:border-base-ink hover:bg-base-cream/40"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Address step input — shared, simple text field
// ============================================================

export function AddressInput({
  defaultValue = "4205 Arthurs Flight Path, Pflugerville, TX 78660",
}: {
  defaultValue?: string;
}) {
  return (
    <div className="mt-4">
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-base-muted">
          Home address
        </span>
        <div className="mt-1.5 flex items-center gap-2 rounded-btn border border-base-line bg-white px-3 py-3 focus-within:border-base-ink">
          <span aria-hidden className="text-base-muted">
            📍
          </span>
          <input
            type="text"
            defaultValue={defaultValue}
            placeholder="Street address, city, state, ZIP"
            className="flex-1 bg-transparent text-[15px] text-base-ink placeholder:text-base-ink/40 focus:outline-none"
          />
        </div>
      </label>
      <p className="mt-2 text-[12px] text-base-muted">
        We use this to confirm Base is available in your area.
      </p>
    </div>
  );
}

// ============================================================
// Skip link — for optional steps in Reorder/Cut Overhead/Auto-fill
// ============================================================

export function SkipLink({ next }: { next: () => void }) {
  return (
    <button
      onClick={next}
      type="button"
      className="mt-3 text-[13px] font-medium text-base-muted underline-offset-2 hover:text-base-ink hover:underline"
    >
      Skip this step →
    </button>
  );
}

// ============================================================
// Trust strip — "24/7 support · Loved by 10k+ members · 100% renewable"
// Used at top of product/checkout-style pages
// ============================================================

export function TrustStrip() {
  return (
    <div className="border-b border-base-line/40 bg-white">
      <div className="mx-auto flex max-w-[640px] items-center justify-around gap-6 px-6 py-3 text-[13px] font-medium text-base-ink">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[14px]">
            💬
          </span>
          24/7 support
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-100 text-[14px]">
            ❤
          </span>
          10k+ members
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-[14px]">
            🌱
          </span>
          100% renewable
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Battery system selector — Single Battery vs Double Battery
// Mirrors Base Power's actual product configurator screen.
// ============================================================

type BatterySystem = "single" | "double";

const SYSTEMS: {
  id: BatterySystem;
  name: string;
  hours: string;
  install: string;
  monthly: string;
  term: string;
  recommended?: boolean;
}[] = [
  {
    id: "double",
    name: "Double Battery",
    hours: "Up to 48 hours of outage protection.",
    install: "$995",
    monthly: "$29/mo",
    term: "10 years",
    recommended: true,
  },
  {
    id: "single",
    name: "Single Battery",
    hours: "Up to 24 hours of outage protection.",
    install: "$695",
    monthly: "$19/mo",
    term: "10 years",
  },
];

export function BatterySystemSelector() {
  const [selected, setSelected] = React.useState<BatterySystem>("double");
  return (
    <div className="space-y-3">
      {SYSTEMS.map((s) => {
        const isSel = selected === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelected(s.id)}
            className={`group flex w-full overflow-hidden rounded-2xl border-[1.5px] text-left transition ${
              isSel
                ? "border-base-green-deep bg-white ring-1 ring-base-green-deep/20"
                : "border-base-line bg-white hover:border-base-green-deep/40"
            }`}
          >
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                    isSel
                      ? "border-base-green-deep"
                      : "border-base-line"
                  }`}
                >
                  {isSel && (
                    <span className="h-2.5 w-2.5 rounded-full bg-base-green-deep" />
                  )}
                </span>
                <div>
                  <div className="text-[18px] font-bold text-base-ink">
                    {s.name}
                  </div>
                  <div className="mt-0.5 text-[13px] text-base-muted">
                    {s.hours}
                  </div>
                </div>
              </div>

              <div className="mt-2 border-t border-base-line/60 pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[15px] font-bold text-base-ink">
                      Installation fee
                    </div>
                    <div className="text-[12px] text-base-muted">
                      One-time fee for installation
                    </div>
                  </div>
                  <div className="text-[16px] font-bold text-base-ink">
                    {s.install}
                  </div>
                </div>
              </div>

              <div className="border-t border-base-line/60 pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[15px] font-bold text-base-ink">
                      Recurring monthly fee
                    </div>
                    <div className="text-[12px] text-base-muted">
                      Term length: {s.term}
                    </div>
                  </div>
                  <div className="text-[16px] font-bold text-base-ink">
                    {s.monthly}
                  </div>
                </div>
              </div>
            </div>

            {/* Battery photo placeholder — uses brand colors as a stand-in */}
            <div
              className="hidden w-[200px] flex-shrink-0 sm:block"
              style={{
                background:
                  s.id === "double"
                    ? "linear-gradient(135deg, #d6c9a8 0%, #c2b290 100%)"
                    : "linear-gradient(135deg, #c0a888 0%, #a8957a 100%)",
              }}
            >
              <div className="flex h-full items-center justify-center gap-1.5 px-3">
                {[...Array(s.id === "double" ? 2 : 1)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[70%] w-12 rounded bg-white shadow-md ring-1 ring-black/10"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, #f5f4ee 0%, #ddd9cf 100%)",
                    }}
                  >
                    <div className="mx-auto mt-2 h-1 w-3 rounded-full bg-red-500/70" />
                    <div className="mt-2 grid h-3/4 grid-cols-3 gap-px px-1">
                      {[...Array(15)].map((_, j) => (
                        <div key={j} className="bg-black/5" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// "How did you hear about Base?" — typeahead-style dropdown
// Optional step in the Base funnel
// ============================================================

const HEARD_FROM = [
  "Friend or neighbor",
  "Google search",
  "Social media (Instagram, TikTok, X)",
  "Podcast",
  "News article",
  "Direct mail",
  "Yard sign",
  "Other",
];

export function HowDidYouHearStep({ next, back }: ScreenProps) {
  const [open, setOpen] = React.useState(false);
  const [picked, setPicked] = React.useState<string | null>(null);
  return (
    <Screen>
      <Header numerator={6} denominator={7} />
      <ScreenScroll>
        <div className="pt-12" />
        <QuestionHead
          step={6}
          optional
          title="how did you hear about Base?"
        />
        <div className="mt-12 max-w-[560px]">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between border-b-[1.5px] border-base-line/80 bg-transparent px-0 pb-2 pt-1 text-left text-[24px] font-medium text-base-green-deep/40 hover:border-base-green-deep"
          >
            <span className={picked ? "text-base-green-deep" : ""}>
              {picked ?? "Type or select an option"}
            </span>
            <span className="text-base-green-deep/60">⌄</span>
          </button>
          {open && (
            <div className="mt-2 max-h-72 overflow-y-auto rounded-md border border-base-line bg-white shadow-md">
              {HEARD_FROM.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    setPicked(o);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-2.5 text-left text-[15px] text-base-ink hover:bg-base-cream"
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="OK" />
    </Screen>
  );
}

// ============================================================
// Boxed input — Base's "Confirm your contact information" form
// uses bordered fields in a centered card (different from the
// "Last step" line-input style). Same component, different look.
// ============================================================

export function BoxedField({
  label,
  placeholder,
  type = "text",
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-bold text-base-muted">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-md border border-base-line bg-white px-4 py-3.5 text-[16px] text-base-ink placeholder:text-base-ink/30 focus:border-base-green-deep focus:outline-none focus:ring-1 focus:ring-base-green-deep/40"
      />
    </label>
  );
}

// ============================================================
// RENTER BRANCH — 5 screens
// User picks "I rent" on the own/rent step → diverts to this
// energy-only mini-flow. Identical across all experiment paths
// (rent has no battery option, so there's no experiment).
// ============================================================

// Qualified interstitial — "Great! You are qualified for Base Energy"
export function RentQualifiedStep({ next, back }: ScreenProps) {
  return (
    <Screen>
      <Header numerator={1} denominator={4} />
      <ScreenScroll>
        <div className="pt-10" />
        <h2 className="text-[28px] font-bold leading-[1.2] text-base-green-deep sm:text-[30px]">
          Great! You are qualified for Base Energy.
        </h2>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-base-green-deep/80">
          <p>
            Base Energy is our low-rate power plan built to save you money
            without surprises.
          </p>
          <ul className="space-y-2">
            <li>• Low, fixed rates—save up to 15%</li>
            <li>• Guaranteed below-market rates at renewal</li>
            <li>• Simple, predictable bills</li>
            <li>• A Texas-based company working to support the grid</li>
          </ul>
          <p className="italic">
            If you were hoping to get a Base battery, we don&apos;t currently
            install in rentals — but you can still get the same low rate
            through our energy plan.
          </p>
          <p>Tap &ldquo;Submit&rdquo; to view your plan options.</p>
        </div>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Submit" />
    </Screen>
  );
}

// Confirm contact info — boxed inputs, centered card, TCPA disclaimer
export function RentConfirmContactStep({ next, back }: ScreenProps) {
  return (
    <Screen>
      <Header numerator={2} denominator={4} />
      <ScreenScroll>
        <div className="pt-6" />
        <div className="mx-auto w-full max-w-[680px] rounded-2xl bg-white p-8 shadow-sm ring-1 ring-base-line/60 sm:p-10">
          <h2 className="text-[26px] font-bold leading-[1.2] text-base-ink sm:text-[28px]">
            Confirm your contact information
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-base-muted">
            We&apos;ll use this information to reach out to you about your
            energy plan and anything related to your home and Base Power.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <BoxedField label="First name*" />
            <BoxedField label="Last name*" />
          </div>
          <div className="mt-5">
            <BoxedField label="Email*" type="email" />
          </div>
          <div className="mt-5">
            <BoxedField label="Phone number*" type="tel" />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={next}
              type="button"
              className="inline-flex h-11 items-center rounded-md bg-base-green-mid px-5 text-[14px] font-bold text-base-green-deep shadow-sm transition hover:bg-base-green-light"
            >
              Continue
            </button>
            <button
              onClick={back}
              type="button"
              className="text-[14px] font-bold text-base-green-deep underline-offset-2 hover:underline"
            >
              Back
            </button>
          </div>

          <p className="mt-6 text-[12px] leading-relaxed text-base-muted">
            By providing your contact information and clicking
            &ldquo;Continue&rdquo; you agree to receive—at the phone number
            above—calls, text messages, and prerecorded voice messages from
            Base Power, Inc. regarding our services. Consent is not a
            condition of any purchase.
          </p>
        </div>
      </ScreenScroll>
    </Screen>
  );
}

// "One plan. One rate." — Energy-only summary card with line items
export function RentOnePlanStep({ next, back }: ScreenProps) {
  return (
    <Screen>
      <Header numerator={3} denominator={4} />
      <TrustStrip />
      <ScreenScroll>
        <div className="pt-4" />
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[12px] font-bold text-base-ink ring-1 ring-base-line">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-blue-600 ring-1 ring-base-line">
            G
          </span>
          4.9 stars{" "}
          <span className="text-[#fdb022]">★★★★★</span>
        </div>
        <h2 className="mt-2 text-[34px] font-bold leading-[1.1] text-base-ink sm:text-[40px]">
          One plan. One rate.
        </h2>
        <p className="mt-3 text-[14px] text-base-muted">
          Questions about your rate or how switching works? Call us at{" "}
          <a
            href="tel:7373830077"
            className="font-medium text-base-ink underline-offset-2 hover:underline"
          >
            737-383-0077
          </a>
          .
        </p>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-base-line/60 sm:p-8">
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-base-muted">
            Base Energy
          </div>
          <h3 className="mt-2 text-[24px] font-bold leading-[1.2] text-base-ink sm:text-[26px]">
            Your energy plan for {ADDRESS}.
          </h3>

          <div className="mt-6 space-y-5">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-[16px] font-bold text-base-ink">
                  Base energy charge ⓘ
                </div>
                <div className="mt-1 text-[13px] text-base-muted">
                  Est. Oncor delivery charge ⓘ
                </div>
              </div>
              <div className="text-right">
                <div className="text-[18px] font-bold text-base-green-deep">
                  8¢ / kWh
                </div>
                <div className="mt-1 text-[13px] font-medium text-base-muted">
                  + 5.8¢ / kWh
                </div>
              </div>
            </div>
            <div className="flex items-baseline justify-between border-t border-base-line/60 pt-5">
              <div>
                <div className="text-[16px] font-bold text-base-ink">
                  All-in rate
                </div>
                <div className="mt-1 text-[13px] text-base-muted">
                  At 2,000 kWh
                </div>
              </div>
              <div className="text-[20px] font-bold text-base-green-deep">
                13.8¢ / kWh
              </div>
            </div>
            <div className="text-right text-[13px] font-medium text-base-ink">
              Learn more ⌄
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {NEIGHBOR_INITIALS.map((n) => (
                <span
                  key={n}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-base-green-deep bg-base-green-light text-[10px] font-bold text-base-green-deep ring-2 ring-white"
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="text-[13px] leading-snug text-base-muted">
              <b className="text-base-ink">400+ neighbors</b> in Pflugerville
              have
              <br />
              already joined Base
            </div>
          </div>

          <button
            onClick={next}
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-base-green-mid py-3.5 text-[16px] font-bold text-base-green-deep transition hover:bg-base-green-light"
          >
            Continue
            <span aria-hidden>›</span>
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={back}
            type="button"
            className="text-[13px] font-medium text-base-muted underline-offset-2 hover:text-base-ink hover:underline"
          >
            ‹ Back
          </button>
        </div>
      </ScreenScroll>
    </Screen>
  );
}

// Savings calculator — dark-green card with bill input + market comparison
export function RentSavingsCalculatorStep({ next, back }: ScreenProps) {
  const [bill, setBill] = React.useState(161);
  const baseEstimate = Math.round(bill * 0.75);
  const savePct = Math.round((1 - baseEstimate / bill) * 100);

  const COMPARES = [
    { name: "Base", rate: "13.8 ¢/kWh", monthly: baseEstimate, color: "bg-base-green-mid" },
    { name: "Gexa", rate: "17.9 ¢/kWh", monthly: Math.round(bill * 0.97), color: "bg-base-green-mid/30" },
    { name: "TXU Energy", rate: "18.4 ¢/kWh", monthly: bill, color: "bg-base-green-mid/30" },
  ];

  return (
    <Screen>
      <Header numerator={4} denominator={4} />
      <ScreenScroll>
        <div className="pt-4" />
        <div className="rounded-2xl bg-base-green-deep p-6 text-white sm:p-8">
          <h2 className="text-[28px] font-bold leading-[1.15] sm:text-[32px]">
            Savings calculator
          </h2>
          <div className="mt-3 flex items-start gap-2 text-[13px] text-base-green-light">
            <span aria-hidden>🏠</span>
            <div>
              <div className="font-bold">{ADDRESS}, PFLUGERVILLE, TX 78660</div>
              <div className="text-white/70">~2,205 ft²</div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block">
              <span className="text-[13px] font-bold text-white">
                Enter your current monthly bill ⓘ
              </span>
              <div className="mt-2 flex items-center rounded-full bg-white px-5 py-3.5">
                <span className="text-[24px] font-bold text-base-muted">$</span>
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(Math.max(0, +e.target.value || 0))}
                  className="flex-1 bg-transparent text-[24px] font-bold text-base-muted focus:outline-none"
                />
                <span className="text-[14px] text-base-muted">/month</span>
              </div>
            </label>
            <div className="mt-2 text-[12px] text-white/70">
              Est. 875 kWh/mo for your home
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-base-green-deep p-5 ring-1 ring-white/10">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  Save up to
                </div>
                <div className="mt-1 text-[32px] font-bold text-base-green-light">
                  +{savePct}%
                </div>
                <div className="text-[11px] text-white/70">based on est. usage</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  Base estimate
                </div>
                <div className="mt-1 text-[32px] font-bold text-white">
                  ${baseEstimate}
                </div>
                <div className="text-[11px] text-white/70">/ month</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  Current bill
                </div>
                <div className="mt-1 text-[32px] font-bold text-white">
                  ${bill}
                </div>
                <div className="text-[11px] text-white/70">/ month</div>
              </div>
            </div>

            <div className="mt-6 text-[10px] font-bold uppercase tracking-wider text-white/70">
              Monthly cost & rate comparison ⓘ
            </div>
            <div className="mt-3 space-y-3">
              {COMPARES.map((c) => {
                const w = Math.round((c.monthly / bill) * 100);
                return (
                  <div key={c.name} className="flex items-center gap-3 text-[12px]">
                    <div className="w-20 flex-shrink-0">
                      <div className="font-bold text-white">{c.name}</div>
                      <div className="text-white/60">{c.rate}</div>
                    </div>
                    <div className="relative flex-1">
                      <div className="h-1.5 rounded-full bg-white/15">
                        <div
                          className={`h-full rounded-full ${c.color}`}
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 flex-shrink-0 text-right font-bold text-white">
                      ${c.monthly}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={next}
            type="button"
            className="mt-6 inline-flex items-center rounded-full bg-base-green-mid px-6 py-3 text-[14px] font-bold text-base-green-deep transition hover:bg-base-green-light"
          >
            Continue
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={back}
            type="button"
            className="text-[13px] font-medium text-base-muted underline-offset-2 hover:text-base-ink hover:underline"
          >
            ‹ Back
          </button>
        </div>
      </ScreenScroll>
    </Screen>
  );
}

// Renter confirm — final "you're all set" screen for the rent path
export function RentConfirm() {
  return (
    <ConfirmScreen message="A Base Energy advisor will reach out to confirm your switch and walk through the timing. Plan summary in your inbox." />
  );
}

// ============================================================
// Checkout step — final confirmation page.
// Mirrors Base's actual production checkout: ENERGY rate card on
// top (locked-in with the green-ring radio + EFL link), then
// YOUR SYSTEM confirmation card with line-items, neighbor avatars,
// and a full-width lime Continue button INSIDE the card.
// ============================================================

const NEIGHBOR_INITIALS = ["DG", "JB", "CP"];
const ZIP = "78660";
const ADDRESS = "4205 ARTHURS FLIGHT PATH";

export function CheckoutStep({
  next,
  back,
  stepIndex,
  totalSteps,
}: ScreenProps) {
  const [tier, setTier] = React.useState<PlanId>("battery2");
  const p = getPlan(tier);
  const isEnergyOnly = p.install === 0;

  return (
    <Screen>
      <Header numerator={stepIndex + 1} denominator={totalSteps - 1} />
      <ScreenScroll>
        {/* Tier toggle — small pills above the energy card.
            Lets the user switch between Single / Double / Energy-only.
            Not in Base's actual screenshot (their selection happens earlier),
            but exposed here so the prototype shows all three options. */}
        <div className="pt-2">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-base-muted">
            System tier
          </div>
          <div className="grid grid-cols-3 gap-2">
            {PLANS.map((opt) => {
              const isSel = tier === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTier(opt.id)}
                  className={`relative rounded-md border-[1.5px] px-3 py-2.5 text-left transition ${
                    isSel
                      ? "border-base-green-deep bg-white"
                      : "border-base-line bg-white/60 hover:border-base-green-deep/40"
                  }`}
                >
                  {opt.badge && (
                    <span className="absolute -top-2 left-2 rounded-full bg-base-green-mid px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-base-green-deep">
                      {opt.badge}
                    </span>
                  )}
                  <div className="text-[12px] font-medium text-base-muted">
                    {opt.shortName}
                  </div>
                  <div className="mt-0.5 text-[15px] font-bold text-base-ink">
                    {opt.install > 0 ? fmtUSD(opt.install) : "Energy only"}
                  </div>
                  <div className="text-[11px] text-base-muted">
                    {opt.monthly > 0 ? `+ ${fmtUSD(opt.monthly)}/mo` : "no membership"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ENERGY section */}
        <div className="mt-8 text-[12px] font-bold uppercase tracking-[0.2em] text-base-muted">
          Energy
        </div>
        <h2 className="mt-2 text-[26px] font-bold leading-[1.2] text-base-ink sm:text-[28px]">
          Your all-in rate for {ZIP}
        </h2>

        <div className="mt-4 rounded-2xl border-[1.5px] border-base-green-deep/80 px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-base-green-deep">
                <span className="h-2.5 w-2.5 rounded-full bg-base-green-deep" />
              </span>
              <div>
                <div className="text-[24px] font-bold leading-none text-base-ink">
                  13.8¢
                  <span className="text-[14px] font-medium text-base-muted">
                    /kWh
                  </span>
                </div>
                <div className="mt-1.5 text-[12px] text-base-muted">
                  8¢/kWh + Oncor delivery fees
                </div>
              </div>
            </div>
            <div className="text-right text-[12px] leading-snug text-base-muted">
              <div>Fixed rate, 36-month term</div>
              <div>Below market average rate guaranteed on renewal</div>
              <div>Optional solar buyback rate of 4¢/kWh</div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="mt-1 inline-block font-medium text-base-green-deep underline-offset-2 hover:underline"
              >
                Review EFLs here
              </a>
            </div>
          </div>
        </div>

        {/* YOUR SYSTEM section */}
        <div className="mt-8 text-[12px] font-bold uppercase tracking-[0.2em] text-base-muted">
          Your system
        </div>
        <h2 className="mt-2 text-[24px] font-bold leading-[1.2] text-base-ink sm:text-[26px]">
          Confirm your preferred system for {ADDRESS}
        </h2>

        <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-base-line/60">
          <div className="space-y-5">
            {!isEnergyOnly && (
              <Row
                title="Installation fee"
                sub="One-time battery fee"
                value={fmtUSD(p.install)}
              />
            )}
            {!isEnergyOnly && (
              <Row
                title="Recurring monthly fee"
                sub={
                  <>
                    Paid monthly with energy bill
                    <br />
                    Term length: 10 years
                  </>
                }
                value={`${fmtUSD(p.monthly)}/month`}
                divider
              />
            )}
            <Row
              title="All-in rate"
              sub="At 2,000 kWh"
              value="13.8¢/kWh"
              divider={!isEnergyOnly}
            />
          </div>

          {/* Avatar pills + neighbor proof */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {NEIGHBOR_INITIALS.map((n) => (
                <span
                  key={n}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-base-green-deep bg-base-green-light text-[10px] font-bold text-base-green-deep ring-2 ring-white"
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="text-[13px] leading-snug text-base-muted">
              <b className="text-base-ink">400+ neighbors</b> in Pflugerville
              have
              <br />
              already joined Base
            </div>
          </div>

          {/* Continue button INSIDE the card — matches Base's pattern */}
          <button
            onClick={next}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-base-green-mid py-3.5 text-[16px] font-bold text-base-green-deep transition hover:bg-base-green-light"
          >
            Continue
            <span aria-hidden>›</span>
          </button>
        </div>

        {/* Back link — small, secondary */}
        <div className="mt-4">
          <button
            onClick={back}
            type="button"
            className="text-[13px] font-medium text-base-muted underline-offset-2 hover:text-base-ink hover:underline"
          >
            ‹ Back
          </button>
        </div>
      </ScreenScroll>
    </Screen>
  );
}

// Row — line-item used inside the system confirmation card.
function Row({
  title,
  sub,
  value,
  divider = false,
}: {
  title: string;
  sub: React.ReactNode;
  value: string;
  divider?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 ${
        divider ? "border-t border-base-line/60 pt-5" : ""
      }`}
    >
      <div>
        <div className="text-[16px] font-bold text-base-ink">{title}</div>
        <div className="mt-0.5 text-[12px] leading-snug text-base-muted">
          {sub}
        </div>
      </div>
      <div className="text-[20px] font-bold text-base-green-deep">{value}</div>
    </div>
  );
}
