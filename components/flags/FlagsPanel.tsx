"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PATHS, PATH_IDS } from "@/lib/flags";
import { useFlags } from "./FlagsProvider";

export function FlagsPanel() {
  const { path, setPath, setStep } = useFlags();
  const [open, setOpen] = useState(true);
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

          {/* Path list — single section, no tabs */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
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
        </div>
      )}
    </div>
  );
}
