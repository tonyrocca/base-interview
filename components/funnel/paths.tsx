"use client";

import * as React from "react";
import {
  AddressInput,
  BatterySystemSelector,
  CalendarWidget,
  CheckList,
  CheckoutStep,
  ConfirmScreen,
  Field,
  Footer,
  Header,
  Helper,
  HowDidYouHearStep,
  IconPick,
  MaybeNeighbor,
  MaybeWhatNext,
  OptList,
  PricingPreviewCard,
  ProviderSelect,
  QuestionHead,
  RentConfirm,
  RentConfirmContactStep,
  RentOnePlanStep,
  RentQualifiedStep,
  RentSavingsCalculatorStep,
  Screen,
  ScreenScroll,
  SkipLink,
  StepNum,
  Sub,
  TCPABlock,
  Title,
  TrustStrip,
  type ScreenProps,
} from "./shared";
import { PathId } from "@/lib/flags";

// =============================================================================
// Brief-aligned step content — shared options
// =============================================================================

const WHY_BASE_FULL = [
  "Reliable backup power",
  "Lower bills",
  "Solar pairing",
  "EV charging",
  "Sustainability",
  "Just exploring",
];

// Reorder/Cut-Overhead use a collapsed 4-option set per brief
const WHY_BASE_COMPACT = [
  "Backup",
  "Savings",
  "Solar pairing",
  "EV charging",
];

const ENERGY_SETUP_OPTIONS = [
  "Standard setup",
  "Solar panels",
  "Generator",
  "EV / EV charger",
  "Pool / hot tub",
];

// =============================================================================
// VARIANT 0 — CONTROL (today's funnel) — 9 steps
// =============================================================================

const Control = {
  // 1 — Address
  S1_Address: ({ next }: ScreenProps) => (
    <Screen>
      <Header numerator={1} denominator={9} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Let&apos;s see if Base is available in your area.</Title>
        <Sub>Enter your home address to get started.</Sub>
        <AddressInput />
      </ScreenScroll>
      <Footer next={next} back={() => {}} ctaLabel="Continue" showBack={false} />
    </Screen>
  ),

  // 2 — Own/Rent (BRANCH POINT — "I rent" jumps to renter sub-flow)
  S2_OwnRent: ({ next, back, setStep }: ScreenProps) => (
    <Screen>
      <Header numerator={2} denominator={9} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>🎉 Great news. Base is available in your part of Pflugerville!</Title>
        <Sub>
          We&apos;ve got a few questions to make sure your home is a great fit
          for Base — no commitments.
        </Sub>
        <Sub bold>Do you own or rent your home?*</Sub>
        <OptList
          options={[
            { label: "I own my home", onClick: next },
            { label: "I rent", onClick: () => setStep(CONTROL_RENT_START) },
          ]}
        />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 3 — Why Base?
  S3_WhyBase: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={3} denominator={9} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>What brings you to Base?</Title>
        <Sub>Choose all that apply.</Sub>
        <CheckList options={WHY_BASE_FULL} />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 4 — Interstitial #1
  S4_Interstitial1: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={4} denominator={9} />
      <ScreenScroll>
        <div className="mt-3" />
        <div className="mb-4 flex h-32 items-center justify-center rounded-card bg-base-green-deep/5 text-[40px]">
          ⚡
        </div>
        <Title>Backup when the grid fails.</Title>
        <Sub>
          When the grid goes down, your battery kicks over instantly. Lights,
          fridge, AC, internet — no flicker, no fuss. Most outages are fully
          covered.
        </Sub>
        <Sub>
          We use the battery to support the Texas grid when it&apos;s up, and
          when it goes down, that energy powers your home.
        </Sub>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 5 — Provider
  S5_Provider: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={5} denominator={9} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>How do you get electricity today?*</Title>
        <OptList
          options={[
            { label: "I pick my own electricity plan", sub: "I can choose my electricity provider" },
            { label: "My electricity provider is assigned", sub: "I get electricity from my city or electric co-op and can't switch" },
            "I'm not sure",
          ]}
        />
        <div className="mt-4 rounded-card border border-base-line bg-white p-3.5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-base-muted">
            Your provider
          </div>
          <div className="mt-1.5 text-[13px] text-base-ink/60">
            Reliant Energy · TXU Energy · Direct Energy · Green Mountain ·
            Champion · Other
          </div>
        </div>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 6 — Energy Setup
  S6_Setup: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={6} denominator={9} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>What does your home energy setup look like?*</Title>
        <Sub>
          We&apos;ll make sure your backup setup plays nicely with the rest of
          your home.
        </Sub>
        <Helper>Choose as many as you like</Helper>
        <CheckList options={ENERGY_SETUP_OPTIONS} />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 7 — Interstitial #2
  S7_Interstitial2: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={7} denominator={9} />
      <ScreenScroll>
        <div className="mt-3" />
        <div className="mb-4 flex h-32 items-center justify-center rounded-card bg-base-green-deep/5 text-[40px]">
          🤝
        </div>
        <Title>Trusted by Texas homeowners.</Title>
        <Sub>
          10,000+ homes across Texas are powered by Base. Our members save an
          average of $200/mo and stay powered through the grid&apos;s worst
          days.
        </Sub>
        <Sub>
          You&apos;ll get stable rates, automatic backup, and peace of mind
          without overthinking it.
        </Sub>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 8 — Contact Info (the wall)
  S8_Contact: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={8} denominator={9} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Last step — save your progress.*</Title>
        <TCPABlock />
        <div className="mt-4 grid gap-3">
          <Field label="First name*" placeholder="Jane" />
          <Field label="Last name*" placeholder="Smith" />
          <Field label="Phone number*" placeholder="(201) 555-0123" type="tel" />
          <Field label="Email*" placeholder="name@example.com" type="email" />
        </div>
        <label className="mt-3 flex cursor-pointer items-start gap-2 text-[12px] text-base-muted">
          <input type="checkbox" className="mt-0.5" />
          <span>I agree to receive communications from Base Power.*</span>
        </label>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 9 — Video + Schedule
  S9_VideoSchedule: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={9} denominator={9} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>You&apos;re ready for backup power.</Title>
        <Sub>Watch this quick intro, then pick a time for your call.</Sub>
        <div className="mt-4 flex aspect-video items-center justify-center rounded-card bg-base-ink text-[14px] text-white/80">
          ▶ Base: What to expect (YouTube)
        </div>
        <div className="mt-4">
          <CalendarWidget />
        </div>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Submit" />
    </Screen>
  ),

  Confirm: () => <ConfirmScreen />,
};

// =============================================================================
// VARIANT 1 — REORDER (Path A) — 7 steps
// =============================================================================

const Reorder = {
  // 1 — Address
  S1_Address: ({ next }: ScreenProps) => (
    <Screen>
      <Header numerator={1} denominator={7} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Let&apos;s see if Base is available in your area.</Title>
        <Sub>Enter your home address to get started.</Sub>
        <AddressInput />
      </ScreenScroll>
      <Footer next={next} back={() => {}} ctaLabel="Continue" showBack={false} />
    </Screen>
  ),

  // 2 ★ Email (NEW POSITION)
  S2_Email: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={2} denominator={7} />
      <ScreenScroll>
        <div className="mt-3" />
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-base-green-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-base-green-deep">
          ★ New position
        </div>
        <Title>Where should we send your custom plan?</Title>
        <Sub>
          We&apos;ll have your savings estimate ready in just a few clicks.
        </Sub>
        <div className="mt-4 grid gap-3">
          <Field label="Email" placeholder="name@example.com" type="email" />
        </div>
        <Helper>
          No spam. We&apos;ll only use this to send your plan and pick up where
          you left off.
        </Helper>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 3 — Own/Rent (BRANCH POINT)
  S3_OwnRent: ({ next, back, setStep }: ScreenProps) => (
    <Screen>
      <Header numerator={3} denominator={7} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Do you own or rent your home?</Title>
        <OptList
          options={[
            { label: "I own my home", onClick: next },
            { label: "I rent", onClick: () => setStep(REORDER_RENT_START) },
          ]}
        />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 4 — Why Base + Provider (combined)
  S4_WhyProvider: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={4} denominator={7} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Tell us about your home</Title>
        <Sub bold>What matters most? <span className="font-normal text-base-muted">(pick any)</span></Sub>
        <CheckList options={WHY_BASE_COMPACT} />
        <Sub bold>Your electricity provider</Sub>
        <ProviderSelect detected="Reliant Energy" />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 5 — Energy Setup (optional)
  S5_Setup: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={5} denominator={7} />
      <ScreenScroll>
        <div className="mt-3" />
        <div className="flex items-baseline gap-2">
          <Title>Anything already powering your home?</Title>
          <span className="text-[12px] font-medium text-base-muted">(optional)</span>
        </div>
        <Sub>We&apos;ll confirm during your free photo review.</Sub>
        <CheckList options={ENERGY_SETUP_OPTIONS} />
        <SkipLink next={next} />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 6 ★ Name + Pricing Preview (NEW)
  S6_NamePricing: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={6} denominator={7} />
      <ScreenScroll>
        <div className="mt-3" />
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-base-green-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-base-green-deep">
          ★ New
        </div>
        <Title>Your custom plan, ready when you are.</Title>
        <PricingPreviewCard />
        <div className="mt-5 grid gap-3">
          <Field label="First name" placeholder="Tony" />
          <Field label="Last name" placeholder="Rocca" />
        </div>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="See next steps" />
    </Screen>
  ),

  // 7 ★ Phone + Schedule (NEW)
  S7_PhoneSchedule: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={7} denominator={7} />
      <ScreenScroll>
        <div className="mt-3" />
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-base-green-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-base-green-deep">
          ★ New
        </div>
        <Title>Pick a time for your call.</Title>
        <Sub>
          A Base advisor will walk you through your plan and answer questions.
        </Sub>
        <div className="mt-4">
          <CalendarWidget />
        </div>
        <div className="mt-5 grid gap-3">
          <Field
            label="What's the best number to text you the call link?"
            placeholder="(201) 555-0123"
            type="tel"
          />
        </div>
        <p className="mt-2 text-[11px] text-base-muted">
          By submitting, you agree to receive a one-time text with your call
          link. Reply STOP to opt out.
        </p>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Confirm appointment" />
    </Screen>
  ),

  Confirm: () => (
    <ConfirmScreen message="Your call link is on its way to your phone. We've also emailed your plan summary." />
  ),
};

// =============================================================================
// VARIANT 2 — CUT OVERHEAD — 6 steps
// =============================================================================

const CutOverhead = {
  // 1 — Address
  S1_Address: ({ next }: ScreenProps) => (
    <Screen>
      <Header numerator={1} denominator={6} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Let&apos;s see if Base is available in your area.</Title>
        <Sub>Enter your home address to get started.</Sub>
        <AddressInput />
      </ScreenScroll>
      <Footer next={next} back={() => {}} ctaLabel="Continue" showBack={false} />
    </Screen>
  ),

  // 2 — Email
  S2_Email: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={2} denominator={6} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Where should we send your custom plan?</Title>
        <Sub>
          We&apos;ll have your savings estimate ready in just a few clicks.
        </Sub>
        <div className="mt-4 grid gap-3">
          <Field label="Email" placeholder="name@example.com" type="email" />
        </div>
        <Helper>No spam. Only used to send your plan.</Helper>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 3 — Own/Rent (BRANCH POINT)
  S3_OwnRent: ({ next, back, setStep }: ScreenProps) => (
    <Screen>
      <Header numerator={3} denominator={6} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Do you own or rent your home?</Title>
        <OptList
          options={[
            { label: "I own my home", onClick: next },
            { label: "I rent", onClick: () => setStep(CUTOVERHEAD_RENT_START) },
          ]}
        />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 4 — Provider only (Why Base cut)
  S4_Provider: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={4} denominator={6} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Your electricity provider</Title>
        <Sub>We use this to set up your account once you join.</Sub>
        <ProviderSelect detected="Reliant Energy" />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 5 — Setup (optional)
  S5_Setup: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={5} denominator={6} />
      <ScreenScroll>
        <div className="mt-3" />
        <div className="flex items-baseline gap-2">
          <Title>Anything already powering your home?</Title>
          <span className="text-[12px] font-medium text-base-muted">(optional)</span>
        </div>
        <Sub>We&apos;ll confirm during your free photo review.</Sub>
        <CheckList options={ENERGY_SETUP_OPTIONS} />
        <SkipLink next={next} />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 6 — Combined: Name + Pricing + Phone + Schedule (one screen)
  S6_Combined: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={6} denominator={6} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Your plan, and book your advisor call.</Title>
        <Sub>One screen. Then you&apos;re done.</Sub>

        <div className="mt-4">
          <PricingPreviewCard />
        </div>

        <div className="mt-5 grid gap-3">
          <Field label="First name" placeholder="Tony" />
          <Field label="Last name" placeholder="Rocca" />
        </div>

        <div className="mt-5">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-base-muted">
            Pick a time for your call
          </div>
          <CalendarWidget />
        </div>

        <div className="mt-5 grid gap-3">
          <Field label="Phone (text only)" placeholder="(201) 555-0123" type="tel" />
        </div>
        <p className="mt-2 text-[11px] text-base-muted">
          We&apos;ll text the call link. Reply STOP to opt out.
        </p>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Confirm appointment" />
    </Screen>
  ),

  Confirm: () => (
    <ConfirmScreen message="Your call link is on its way to your phone. Plan summary in your inbox." />
  ),
};

// =============================================================================
// VARIANT 3 — EMAIL FIRST — 5 steps
// Email captured before address. Every visitor becomes recoverable —
// even those whose address falls outside Base's service area.
// =============================================================================

const EmailFirst = {
  // 1 ★ — Email (NEW POSITION: before address)
  S1_Email: ({ next }: ScreenProps) => (
    <Screen>
      <Header numerator={1} denominator={5} />
      <ScreenScroll>
        <div className="mt-3" />
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-base-green-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-base-green-deep">
          ★ Email first
        </div>
        <Title>See if Base is right for your home.</Title>
        <Sub>
          Drop your email and we&apos;ll send your custom plan + savings
          estimate, even if you don&apos;t finish today.
        </Sub>
        <div className="mt-4 grid gap-3">
          <Field label="Email" placeholder="name@example.com" type="email" />
        </div>
        <Helper>No spam. Only used to send your plan.</Helper>
      </ScreenScroll>
      <Footer next={next} back={() => {}} ctaLabel="Continue" showBack={false} />
    </Screen>
  ),

  // 2 — Address
  S2_Address: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={2} denominator={5} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Now let&apos;s see if Base is available in your area.</Title>
        <Sub>Enter your home address to confirm Base serves your area.</Sub>
        <AddressInput />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 3 — Own/Rent (BRANCH POINT)
  S3_OwnRent: ({ next, back, setStep }: ScreenProps) => (
    <Screen>
      <Header numerator={3} denominator={5} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Do you own or rent your home?</Title>
        <OptList
          options={[
            { label: "I own my home", onClick: next },
            { label: "I rent", onClick: () => setStep(EMAILFIRST_RENT_START) },
          ]}
        />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 4 — Setup (optional)
  S4_Setup: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={4} denominator={5} />
      <ScreenScroll>
        <div className="mt-3" />
        <div className="flex items-baseline gap-2">
          <Title>Anything already powering your home?</Title>
          <span className="text-[12px] font-medium text-base-muted">(optional)</span>
        </div>
        <Sub>We&apos;ll confirm during your free photo review.</Sub>
        <CheckList options={ENERGY_SETUP_OPTIONS} />
        <SkipLink next={next} />
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Continue" />
    </Screen>
  ),

  // 5 — Combined: Name + Pricing + Phone + Schedule
  S5_Combined: ({ next, back }: ScreenProps) => (
    <Screen>
      <Header numerator={5} denominator={5} />
      <ScreenScroll>
        <div className="mt-3" />
        <Title>Your plan, and book your advisor call.</Title>
        <Sub>One screen. Then you&apos;re done.</Sub>

        <div className="mt-4">
          <PricingPreviewCard />
        </div>

        <div className="mt-5 grid gap-3">
          <Field label="First name" placeholder="Tony" />
          <Field label="Last name" placeholder="Rocca" />
        </div>

        <div className="mt-5">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-base-muted">
            Pick a time for your call
          </div>
          <CalendarWidget />
        </div>

        <div className="mt-5 grid gap-3">
          <Field label="Phone (text only)" placeholder="(201) 555-0123" type="tel" />
        </div>
        <p className="mt-2 text-[11px] text-base-muted">
          We&apos;ll text the call link. Reply STOP to opt out.
        </p>
      </ScreenScroll>
      <Footer next={next} back={back} ctaLabel="Confirm appointment" />
    </Screen>
  ),

  Confirm: () => (
    <ConfirmScreen message="Your call link is on its way to your phone. Plan summary in your inbox." />
  ),
};

// =============================================================================
// REGISTRY
// =============================================================================

type ScreenComponent = (p: ScreenProps) => React.ReactElement;

// =============================================================================
// Rent flow — identical 5 screens reused across all 4 paths.
// Renters get an Energy-only path (no battery install in rentals), so the
// experiments (A/B/C) don't apply — same renter sub-flow regardless of path.
// =============================================================================
const RENT_FLOW: ScreenComponent[] = [
  RentQualifiedStep,
  RentConfirmContactStep,
  RentOnePlanStep,
  RentSavingsCalculatorStep,
  RentConfirm,
];

// Rent-start indices: the position in each path's array where rent flow begins.
// Each path's S_OwnRent uses these to setStep() when "I rent" is clicked.
// Owner-flow length differs per path, so the rent start differs.
//
// Path 0 (Control): 12 owner screens [0-11] → rent starts at 12
// Path A (Reorder): 9  owner screens [0-8]  → rent starts at 9
// Path B (CutOverhead): 8 owner screens [0-7] → rent starts at 8
// Path C (Auto-fill): 7 owner screens [0-6] → rent starts at 7
const CONTROL_OWNER: ScreenComponent[] = [
  Control.S1_Address,
  Control.S2_OwnRent,
  Control.S3_WhyBase,
  Control.S4_Interstitial1,
  Control.S5_Provider,
  Control.S6_Setup,
  Control.S7_Interstitial2,
  Control.S8_Contact,
  Control.S9_VideoSchedule,
  HowDidYouHearStep,
  CheckoutStep,
  Control.Confirm,
];
export const CONTROL_RENT_START = CONTROL_OWNER.length;

const REORDER_OWNER: ScreenComponent[] = [
  Reorder.S1_Address,
  Reorder.S2_Email,
  Reorder.S3_OwnRent,
  Reorder.S4_WhyProvider,
  Reorder.S5_Setup,
  Reorder.S6_NamePricing,
  Reorder.S7_PhoneSchedule,
  CheckoutStep,
  Reorder.Confirm,
];
export const REORDER_RENT_START = REORDER_OWNER.length;

const CUTOVERHEAD_OWNER: ScreenComponent[] = [
  CutOverhead.S1_Address,
  CutOverhead.S2_Email,
  CutOverhead.S3_OwnRent,
  CutOverhead.S4_Provider,
  CutOverhead.S5_Setup,
  CutOverhead.S6_Combined,
  CheckoutStep,
  CutOverhead.Confirm,
];
export const CUTOVERHEAD_RENT_START = CUTOVERHEAD_OWNER.length;

const EMAILFIRST_OWNER: ScreenComponent[] = [
  EmailFirst.S1_Email,
  EmailFirst.S2_Address,
  EmailFirst.S3_OwnRent,
  EmailFirst.S4_Setup,
  EmailFirst.S5_Combined,
  CheckoutStep,
  EmailFirst.Confirm,
];
export const EMAILFIRST_RENT_START = EMAILFIRST_OWNER.length;

export const ALL_PATHS: Record<PathId, ScreenComponent[]> = {
  "0": [...CONTROL_OWNER, ...RENT_FLOW],
  A: [...REORDER_OWNER, ...RENT_FLOW],
  B: [...CUTOVERHEAD_OWNER, ...RENT_FLOW],
  C: [...EMAILFIRST_OWNER, ...RENT_FLOW],
};
