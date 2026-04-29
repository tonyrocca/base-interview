import type { Metadata } from "next";
import "./globals.css";
import { FlagsProvider } from "@/components/flags/FlagsProvider";
import { ConditionalFlagsPanel } from "@/components/flags/ConditionalFlagsPanel";

export const metadata: Metadata = {
  title: "Base Power · Funnel Experiments",
  description:
    "Candidate prototype for Base Power's onboarding funnel — switch between four redesigns and the baseline.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FlagsProvider>
          {children}
          <ConditionalFlagsPanel />
        </FlagsProvider>
      </body>
    </html>
  );
}
