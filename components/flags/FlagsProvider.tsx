"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_FLAGS,
  Flags,
  PATH_FLAGS,
  PathId,
  PATH_IDS,
} from "@/lib/flags";

type Ctx = {
  path: PathId;
  setPath: (p: PathId) => void;
  flags: Flags;
  setFlag: <K extends keyof Flags>(key: K, value: Flags[K]) => void;
  resetToPathDefaults: () => void;
  step: number;
  setStep: (n: number) => void;
};

const FlagsCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "base-funnel-flags-v1";

type Persisted = { path: PathId; flags: Flags };

function isValidPath(v: string): v is PathId {
  return (PATH_IDS as readonly string[]).includes(v);
}

export function FlagsProvider({ children }: { children: React.ReactNode }) {
  const [path, setPathState] = useState<PathId>("0");
  const [flags, setFlags] = useState<Flags>(DEFAULT_FLAGS);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from URL (?path=A) or localStorage on mount
  useEffect(() => {
    let initialPath: PathId = "0";
    let initialFlags: Flags = DEFAULT_FLAGS;

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const urlPath = url.searchParams.get("path");
      const urlStep = url.searchParams.get("step");
      if (urlPath && isValidPath(urlPath)) {
        initialPath = urlPath;
        initialFlags = PATH_FLAGS[urlPath];
        if (urlStep) {
          const n = parseInt(urlStep, 10);
          if (!Number.isNaN(n) && n >= 0) setStep(n);
        }
      } else {
        try {
          const stored = window.localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored) as Persisted;
            if (parsed.path && isValidPath(parsed.path)) {
              initialPath = parsed.path;
              initialFlags = parsed.flags ?? PATH_FLAGS[parsed.path];
            }
          }
        } catch {
          // ignore
        }
      }
    }

    setPathState(initialPath);
    setFlags(initialFlags);
    setHydrated(true);
  }, []);

  // Persist on change (post-hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ path, flags } satisfies Persisted),
      );
    } catch {
      // ignore
    }

    // Sync ?path= in URL without scrolling / navigating
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("path", path);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }, [path, flags, hydrated]);

  const setPath = useCallback((p: PathId) => {
    setPathState(p);
    setFlags(PATH_FLAGS[p]);
    setStep(0);
  }, []);

  const setFlag = useCallback(
    <K extends keyof Flags>(key: K, value: Flags[K]) => {
      setFlags((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetToPathDefaults = useCallback(() => {
    setFlags(PATH_FLAGS[path]);
  }, [path]);

  const value = useMemo<Ctx>(
    () => ({
      path,
      setPath,
      flags,
      setFlag,
      resetToPathDefaults,
      step,
      setStep,
    }),
    [path, setPath, flags, setFlag, resetToPathDefaults, step],
  );

  return <FlagsCtx.Provider value={value}>{children}</FlagsCtx.Provider>;
}

export function useFlags() {
  const ctx = useContext(FlagsCtx);
  if (!ctx) throw new Error("useFlags must be used inside FlagsProvider");
  return ctx;
}
