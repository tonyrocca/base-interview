"use client";

import { useFlags } from "@/components/flags/FlagsProvider";
import { ALL_PATHS } from "@/components/funnel/paths";

export default function OnboardingPage() {
  const { path, step, setStep } = useFlags();
  const screens = ALL_PATHS[path];
  const total = screens.length;
  const ActiveScreen = screens[Math.min(step, total - 1)];

  return (
    <ActiveScreen
      next={() => setStep(Math.min(step + 1, total - 1))}
      back={() => setStep(Math.max(step - 1, 0))}
      setStep={(n: number) =>
        setStep(Math.min(Math.max(0, n), total - 1))
      }
      stepIndex={step}
      totalSteps={total}
    />
  );
}
