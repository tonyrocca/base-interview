"use client";

import { useEffect, useState } from "react";
import { FlagsPanel } from "./FlagsPanel";

/** Hides the panel when ?clean=1 is in the URL — for clean screenshots. */
export function ConditionalFlagsPanel() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    setHidden(url.searchParams.get("clean") === "1");
  }, []);
  if (hidden) return null;
  return <FlagsPanel />;
}
