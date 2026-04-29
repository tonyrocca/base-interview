"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flags, PATHS, PATH_IDS } from "@/lib/flags";
import { useFlags } from "./FlagsProvider";

const FLAG_GROUPS: Array<{
  title: string;
  items: Array<{ key: keyof Flags; label: string; help: string }>;
}> = [
  {
    title: "Visual / trust",
    items: [
      { key: "progressBar", label: "Real progress bar", help: "Filled bar instead of mini segmented dots." },
      { key: "timeRemaining", label: "Time-remaining hint", help: "\"~Ns left\" estimate next to step counter." },
      { key: "socialProof", label: "Local social proof", help: "Neighbor chip on key steps." },
      { key: "whatNextHint", label: '"What\'s next" preview', help: "Subtle next-step hint at bottom of each screen." },
      { key: "tcpaCollapsed", label: "Collapse TCPA legalese", help: "Hide phone-disclosure block behind a toggle." },
    ],
  },
  {
    title: "Structure",
    items: [
      { key: "emailUpfront", label: "Email upfront", help: "Capture email at step 1 of qualifying." },
      { key: "phoneDeferred", label: "Defer phone", help: "Capture phone at the schedule-call moment, not w/ name." },
      { key: "combineSoftQuestions", label: "Combine soft questions", help: "Reason + provider on one screen." },
      { key: "smartDefaults", label: "Smart defaults from address", help: "Auto-detect provider; remove the question." },
      { key: "educationalInterstitials", label: "Educational interstitials", help: "Two text-heavy explainer screens mid-flow." },
      { key: "videoStep", label: "YouTube video step", help: "\"What to expect with Base Power\" video page." },
      { key: "pricingPreview", label: "Pricing preview", help: "Show plan/price teaser before phone capture." },
    ],
  },
  {
    title: "Copy",
    items: [
      { key: "trustFraming", label: '"Save your progress" framing', help: "Reframes contact step around saving progress." },
    ],
  },
];

export function FlagsPanel() {
  const { path, setPath, flags, setFlag, resetToPathDefaults, step, setStep } =
    useFlags();
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<"paths" | "flags" | "info">("paths");
  const router = useRouter();

  const handleReset = () => {
    setPath("0");
    setStep(0);
    try {
      window.localStorage.removeItem("base-funnel-flags-v1");
    } catch {
      // ignore
    }
    router.push("/");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Trigger when collapsed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[var(--base-ink)] px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-[var(--base-ink-2)]"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-[var(--base-green)]" />
          Experiments · {path}
        </button>
      )}

      {open && (
        <div className="w-[300px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
          {/* Header */}
          <div className="flex items-center justify-between bg-[var(--base-ink)] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-[var(--base-green)]" />
              <div className="text-sm font-semibold">Experiments</div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="rounded-md px-2 py-1 text-[11px] font-medium text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="Reset demo"
                title="Reset demo & back to homepage"
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-1.5 py-1 text-white/70 hover:text-white"
                aria-label="Collapse"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-black/5 bg-[var(--base-cream)]/40 text-xs font-medium">
            {(
              [
                { id: "paths", label: "Paths" },
                { id: "flags", label: "Flags" },
                { id: "info", label: "About" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-2.5 ${
                  tab === t.id
                    ? "bg-white text-[var(--base-ink)]"
                    : "text-[var(--base-muted)] hover:text-[var(--base-ink)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {tab === "paths" && (
              <div className="p-2">
                <div className="space-y-1">
                  {PATH_IDS.map((id) => {
                    const p = PATHS[id];
                    const active = id === path;
                    return (
                      <button
                        key={id}
                        onClick={() => setPath(id)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          active
                            ? "bg-[var(--base-ink)] text-white"
                            : "text-[var(--base-ink)] hover:bg-[var(--base-cream)]"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="font-medium">{p.title}</span>
                          {p.recommended && (
                            <span
                              className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                active
                                  ? "bg-[var(--base-green)] text-[var(--base-ink)]"
                                  : "bg-[var(--base-green)]/30 text-[var(--base-ink-2)]"
                              }`}
                            >
                              ★ Rec
                            </span>
                          )}
                        </span>
                        <span
                          className={`text-xs font-mono ${active ? "text-white/60" : "text-[var(--base-muted)]"}`}
                        >
                          {p.id}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === "flags" && (
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs uppercase tracking-wider text-[var(--base-muted)]">
                    Granular flags
                  </div>
                  <button
                    onClick={resetToPathDefaults}
                    className="text-xs font-medium text-[var(--base-ink)] underline-offset-2 hover:underline"
                  >
                    reset to {path}
                  </button>
                </div>

                <p className="mb-3 text-xs text-[var(--base-muted)]">
                  Override what each path enables. Useful for isolating a single
                  change (e.g., "did the progress bar do this, or the email
                  reorder?").
                </p>

                {FLAG_GROUPS.map((group) => (
                  <div key={group.title} className="mb-4 last:mb-0">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--base-muted)]">
                      {group.title}
                    </div>
                    <div className="space-y-1.5">
                      {group.items.map((it) => (
                        <FlagToggle
                          key={String(it.key)}
                          flagKey={it.key}
                          label={it.label}
                          help={it.help}
                          value={flags[it.key]}
                          onChange={(v) => setFlag(it.key, v)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "info" && (
              <div className="p-4 text-xs leading-relaxed text-[var(--base-ink-2)]">
                <div className="mb-2 text-sm font-semibold text-[var(--base-ink)]">
                  Every step must earn its place.
                </div>
                <p className="mb-2.5">
                  Live demo for Base Power's growth case. Switch between
                  today&apos;s flow and four proposed redesigns. Each variant
                  is graded against one question:{" "}
                  <b>does every step earn its place — or is it tax?</b>
                </p>

                <div className="mb-3 rounded-lg bg-[var(--base-cream)]/80 p-2.5">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--base-muted)]">
                    The recommendation
                  </div>
                  <div className="text-[var(--base-ink)]">
                    <b>Path A · Reorder.</b> Pulls email upfront for recovery,
                    defers phone to the schedule moment, cuts 2 interstitials +
                    1 video. Same data captured by the end.
                  </div>
                </div>

                <div className="mb-2">
                  <div className="mb-1 font-semibold text-[var(--base-ink)]">
                    The four experiments
                  </div>
                  <ul className="space-y-0.5">
                    <li>
                      <b>A · Reorder</b> — same data, new order (★ rec)
                    </li>
                    <li>
                      <b>D · Polish</b> — same fields, better hand-holding
                    </li>
                    <li>
                      <b>C · Auto-fill</b> — provider from address
                    </li>
                    <li>
                      <b>B · Delete</b> — skip qualification, qualify on call
                    </li>
                  </ul>
                </div>

                <p className="mb-2">
                  <b>Wave plan:</b> A (Wks 1-3) → D layered (4-5) → C @ 25%
                  (6-8) → B kill-switch test (9-12).
                </p>

                <p className="mb-2">
                  <b>Guardrails — kill any test if:</b> install-qual ↓ &gt;5%
                  abs · sales-call book ↓ &gt;10% rel · cost-per-install ↑
                  &gt;5%.
                </p>

                <p className="text-[10px] text-[var(--base-muted)]">
                  Production swap-out: replace <code className="rounded bg-black/5 px-1">FlagsProvider</code>{" "}
                  body with a Statsig / LaunchDarkly / GrowthBook fetch. State
                  is persisted to localStorage; active variant syncs into{" "}
                  <code className="rounded bg-black/5 px-1">?path=</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FlagToggle({
  flagKey,
  label,
  help,
  value,
  onChange,
}: {
  flagKey: keyof Flags;
  label: string;
  help: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={`flag-${String(flagKey)}`}
      className="flex cursor-pointer items-start justify-between gap-3 rounded-md px-2 py-1.5 hover:bg-[var(--base-cream)]/60"
    >
      <div className="flex-1">
        <div className="text-[13px] font-medium text-[var(--base-ink)]">
          {label}
        </div>
        <div className="text-[11px] leading-snug text-[var(--base-muted)]">
          {help}
        </div>
      </div>
      <button
        id={`flag-${String(flagKey)}`}
        role="switch"
        aria-checked={value}
        onClick={(e) => {
          e.preventDefault();
          onChange(!value);
        }}
        className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition ${
          value ? "bg-[var(--base-ink)]" : "bg-black/15"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
            value ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}
