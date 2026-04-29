import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Press } from "@/components/home/Press";
import { Pricing } from "@/components/home/Pricing";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Stories } from "@/components/home/Stories";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Press />
      <Pricing />
      <HowItWorks />
      <Stories />
      <Footer />
    </main>
  );
}
