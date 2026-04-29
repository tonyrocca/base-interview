"use client";

import { useState } from "react";

export function HowItWorks() {
  const [grid, setGrid] = useState<"on" | "off">("on");
  return (
    <section id="how" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-12 max-w-3xl">
          <div className="mb-3 tagline text-[14px] text-base-muted">
            How it works
          </div>
          <h2 className="text-[28px] font-bold leading-[1.15] text-base-ink md:text-[40px]">
            We earn from the grid, so you don&apos;t overpay.
          </h2>
          <p className="mt-4 text-[16px] font-medium leading-relaxed text-base-ink/70 md:text-[18px]">
            Cut costs on good days. Stay on through bad ones.
          </p>
        </div>

        <div className="overflow-hidden rounded-card bg-base-cream ring-1 ring-base-line/60">
          <div className="flex border-b border-base-line/60">
            <button
              onClick={() => setGrid("on")}
              className={`flex-1 px-5 py-4 text-[14px] font-semibold transition ${
                grid === "on"
                  ? "bg-base-green-deep text-white"
                  : "text-base-ink/60 hover:text-base-ink"
              }`}
            >
              Grid ON
            </button>
            <button
              onClick={() => setGrid("off")}
              className={`flex-1 px-5 py-4 text-[14px] font-semibold transition ${
                grid === "off"
                  ? "bg-base-green-deep text-white"
                  : "text-base-ink/60 hover:text-base-ink"
              }`}
            >
              Grid OFF
            </button>
          </div>
          <div className="grid gap-10 p-10 md:grid-cols-2 md:p-14">
            <div>
              <h3 className="text-[24px] font-bold leading-[1.2] text-base-ink md:text-[32px]">
                {grid === "on"
                  ? "Your battery helps balance the grid."
                  : "Your home stays on, automatically."}
              </h3>
              <p className="mt-4 text-[15px] font-medium leading-[1.5] text-base-ink/75">
                {grid === "on"
                  ? "When the grid is up, Base uses your battery to support Texas demand spikes — and we share that revenue back as a low, fixed rate."
                  : "When the grid drops, your battery kicks over instantly. Lights, fridge, AC, internet — no flicker, no fuss."}
              </p>
            </div>
            <div className="rounded-card bg-white p-6 ring-1 ring-base-line/60">
              <div className="flex items-center justify-between text-[12px] font-medium text-base-muted">
                <span>Battery state</span>
                <span className="font-semibold text-base-ink">
                  {grid === "on" ? "82%" : "97%"}
                </span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-base-ink/5">
                <div
                  className="h-full rounded-full bg-base-green-dark transition-all"
                  style={{ width: grid === "on" ? "82%" : "97%" }}
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <Stat label="Rate today" value="13.8¢" />
                <Stat
                  label="vs. market"
                  value="-22%"
                  accent
                />
                <Stat label="Backup" value="24h" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-card bg-base-cream p-3">
      <div className="tagline text-[10px] text-base-muted">{label}</div>
      <div
        className={`mt-1 text-[22px] font-bold leading-none ${
          accent ? "text-base-green-dark" : "text-base-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
