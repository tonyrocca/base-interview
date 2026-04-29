// ============================================================
// Feature flag system
// ============================================================
// Names + step counts mirror the implementation brief and the deck
// (DECK.md / SLIDES.md). Three experiments + control:
//
//   0 — Control            (9 steps)  baseline
//   A — Reorder            (7 steps)  the recommendation
//   B — Cut Overhead       (6 steps)  Reorder + cut motivation Q
//   C — Auto-fill Provider (5 steps)  Cut Overhead + ZIP-based provider lookup

export type PathId = "0" | "A" | "B" | "C";

export const PATH_IDS: PathId[] = ["0", "A", "B", "C"];

export type PathMeta = {
  id: PathId;
  name: string;
  tag: string;
  title: string;
  oneLiner: string;
  description: string;
  changes: string[];
  hypothesis: string;
  risk: "Very low" | "Low" | "Medium" | "Medium-high";
  shipTime: string;
  expectedLift: string;
  steps: number;
  recommended?: boolean;
};

export const PATHS: Record<PathId, PathMeta> = {
  "0": {
    id: "0",
    name: "Control",
    tag: "BASELINE",
    title: "Control",
    oneLiner: "Today's funnel — the 3.5% baseline.",
    description:
      "Address → 7 qualifying screens with 2 educational interstitials → bundled contact form (name + phone + email + TCPA) → video + schedule call.",
    changes: ["Baseline — no changes from production."],
    hypothesis:
      "What we're measuring against. The 19,000 qualified visitors who never give us contact info live in the gap between qualify and lead capture.",
    risk: "Very low",
    shipTime: "Already shipped",
    expectedLift: "0% (baseline)",
    steps: 9,
  },
  A: {
    id: "A",
    name: "Reorder",
    tag: "EXPERIMENT 1 · RECOMMENDED",
    title: "Reorder",
    oneLiner: "Same 6 fields. New order. Email up, phone down.",
    description:
      "Capture email at step 2 to route droppers into lifecycle. Combine motivation + provider on one screen. Show pricing before phone.",
    changes: [
      "Email captured at step 2 (was bundled at step 8)",
      "Why Base + Provider combined onto one screen",
      "Setup made optional with skip link",
      "Name + pricing preview before phone",
      "Phone deferred to schedule moment",
      "2 educational interstitials cut",
      "Mid-flow video cut",
    ],
    hypothesis:
      "Capturing email at step 2 routes qualified droppers into the existing lifecycle pipeline. Showing pricing before phone reduces the highest-friction step's abandon rate.",
    risk: "Low",
    shipTime: "2-3 weeks",
    expectedLift: "Qualify→Lead: 28% → ~50% + 5-10% recovered via email",
    steps: 7,
    recommended: true,
  },
  B: {
    id: "B",
    name: "Cut Overhead",
    tag: "EXPERIMENT 2",
    title: "Cut Overhead",
    oneLiner: "Reorder + cut motivation question. Compounds the lift.",
    description:
      "Builds on Reorder. Removes the Why Base motivation question (moved to post-lead lifecycle survey). Combines name + pricing + phone + schedule onto one final screen.",
    changes: [
      "Why Base motivation Q cut (moved to lifecycle survey)",
      "Name + pricing + phone + schedule combined on one screen",
      "All Reorder cuts retained",
    ],
    hypothesis:
      "Trust isn't earned mid-flow — it's earned pre-funnel (landing) and post-lead (lifecycle email). Cutting the motivation Q + compressing the final ask compounds Reorder's lift without hurting sales-call quality.",
    risk: "Low",
    shipTime: "3 weeks",
    expectedLift: "Qualify→Lead: ~55% (compounds on Reorder)",
    steps: 6,
  },
  C: {
    id: "C",
    name: "Email First",
    tag: "EXPERIMENT 3",
    title: "Email First",
    oneLiner: "Email captured before address. Maximum recovery upside.",
    description:
      "Email is asked at step 1, before the address. Every visitor who provides email is recoverable — even if their address falls outside Base's service area.",
    changes: [
      "Email captured at step 1 (before address)",
      "Address moved to step 2",
      "Combined name + pricing + phone + schedule (from Cut Overhead)",
      "Recovery channel unlocked for out-of-area visitors",
    ],
    hypothesis:
      "Capturing email before the address means even users whose address disqualifies them become recoverable leads. Bear case: ToFu drops because email feels too aggressive before any value is shown.",
    risk: "Medium",
    shipTime: "2 weeks",
    expectedLift: "Qualify→Lead: ~55% + recovery for out-of-area visitors",
    steps: 5,
  },
};

// ============================================================
// Granular flags within a path
// ============================================================

export type Flags = {
  // Visual / trust
  progressBar: boolean;
  timeRemaining: boolean;
  socialProof: boolean;
  whatNextHint: boolean;
  tcpaCollapsed: boolean;

  // Structure
  emailUpfront: boolean;
  phoneDeferred: boolean;
  combineSoftQuestions: boolean;
  smartDefaults: boolean;
  educationalInterstitials: boolean;
  videoStep: boolean;
  pricingPreview: boolean;

  // Copy
  trustFraming: boolean;
};

export const DEFAULT_FLAGS: Flags = {
  progressBar: false,
  timeRemaining: false,
  socialProof: false,
  whatNextHint: false,
  tcpaCollapsed: false,
  emailUpfront: false,
  phoneDeferred: false,
  combineSoftQuestions: false,
  smartDefaults: false,
  educationalInterstitials: true,
  videoStep: true,
  pricingPreview: false,
  trustFraming: false,
};

export const PATH_FLAGS: Record<PathId, Flags> = {
  "0": { ...DEFAULT_FLAGS },
  A: {
    ...DEFAULT_FLAGS,
    progressBar: true,
    timeRemaining: true,
    tcpaCollapsed: true,
    emailUpfront: true,
    phoneDeferred: true,
    combineSoftQuestions: true,
    educationalInterstitials: false,
    videoStep: false,
    pricingPreview: true,
  },
  B: {
    ...DEFAULT_FLAGS,
    progressBar: true,
    timeRemaining: true,
    tcpaCollapsed: true,
    emailUpfront: true,
    phoneDeferred: true,
    educationalInterstitials: false,
    videoStep: false,
    pricingPreview: true,
  },
  C: {
    ...DEFAULT_FLAGS,
    progressBar: true,
    timeRemaining: true,
    tcpaCollapsed: true,
    emailUpfront: true,
    phoneDeferred: true,
    educationalInterstitials: false,
    videoStep: false,
    pricingPreview: true,
  },
};
