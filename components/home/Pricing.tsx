/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="bg-base-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-14 max-w-3xl">
          <div className="mb-3 tagline text-[14px] text-base-muted">
            Membership
          </div>
          <h2 className="text-[28px] font-bold leading-[1.15] text-base-ink md:text-[40px]">
            A smarter way to power your home.
          </h2>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {/* Energy card */}
          <div className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-base-line/60">
            <img
              src="/img/family-cooking.avif"
              alt=""
              className="aspect-[3/2] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-8 md:p-10">
              <div className="tagline text-[12px] text-base-muted">
                Starting at
              </div>
              <div className="mt-1 text-[18px] font-medium text-base-ink">
                Energy
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-[80px] font-bold leading-none tracking-tight text-base-green-dark">
                  8¢
                </div>
                <div className="text-[18px] font-medium text-base-ink/60">
                  /kWh
                </div>
              </div>
              <p className="mt-2 text-[13px] text-base-muted">
                (before utility delivery charges)
              </p>

              <ul className="mt-7 space-y-2.5 text-[15px] text-base-ink/85">
                <Bullet>Fixed, low electricity rates. Guaranteed.</Bullet>
                <Bullet>Seamless provider switch</Bullet>
                <Bullet>24/7 access and monitoring</Bullet>
              </ul>

              <Link
                href="/onboarding"
                className="mt-auto inline-flex h-12 w-fit items-center gap-2 rounded-btn bg-base-green-mid px-5 text-[14px] font-semibold text-base-green-dark transition hover:bg-base-green-light"
                style={{ marginTop: "2.5rem" }}
              >
                Get started
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Backup card */}
          <div className="relative flex flex-col overflow-hidden rounded-card bg-base-green-deep text-white">
            <img
              src="/img/family-battery.avif"
              alt=""
              className="aspect-[3/2] w-full object-cover opacity-90"
            />
            <div className="flex flex-1 flex-col p-8 md:p-10">
              <div className="tagline text-[12px] text-base-green-light/70">
                Add whole-home backup
              </div>
              <div className="mt-1 text-[18px] font-medium">Energy + Backup</div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-card border border-white/15 p-4">
                  <div className="tagline text-[11px] text-white/55">
                    One-time
                  </div>
                  <div className="mt-1 text-[36px] font-bold leading-none">
                    $695
                  </div>
                  <div className="mt-1 text-[12px] text-white/65">
                    Battery installation
                  </div>
                </div>
                <div className="rounded-card border border-white/15 p-4">
                  <div className="tagline text-[11px] text-white/55">
                    Recurring
                  </div>
                  <div className="mt-1 text-[36px] font-bold leading-none">
                    $19
                  </div>
                  <div className="mt-1 text-[12px] text-white/65">
                    Battery membership / mo
                  </div>
                </div>
              </div>

              <ul className="mt-7 space-y-2.5 text-[15px] text-white/85">
                <Bullet variant="dark">
                  Automatic backup when the grid goes down
                </Bullet>
                <Bullet variant="dark">Compatible with solar systems</Bullet>
                <Bullet variant="dark">
                  Recharge with a portable generator
                </Bullet>
              </ul>

              <Link
                href="/onboarding"
                className="mt-auto inline-flex h-12 w-fit items-center gap-2 rounded-btn bg-base-green-mid px-5 text-[14px] font-semibold text-base-green-dark transition hover:bg-base-green-light"
                style={{ marginTop: "2.5rem" }}
              >
                Get started
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <li className="flex gap-2.5">
      <span
        aria-hidden
        className={`mt-1 inline-block h-4 w-4 flex-shrink-0 rounded-full ${
          variant === "dark"
            ? "bg-base-green-mid/30 text-base-green-mid"
            : "bg-base-green-light text-base-green-dark"
        }`}
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 p-[3px]">
          <path
            d="M3 8l3 3 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}
