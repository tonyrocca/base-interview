/* eslint-disable @next/next/no-img-element */

const LOGOS = [
  { src: "/img/press-bloomberg.avif", alt: "Bloomberg" },
  { src: "/img/press-nbc.avif", alt: "NBC News" },
  { src: "/img/press-dmn.avif", alt: "Dallas Morning News" },
  { src: "/img/press-statesman.avif", alt: "Austin American-Statesman" },
];

export function Press() {
  return (
    <section className="border-b border-base-line/60 bg-white py-12">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-8 text-center text-[12px] font-bold uppercase tracking-[0.2em] text-base-muted tagline">
          Featured across national news and media
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
          {LOGOS.map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              className="h-7 w-auto opacity-80 grayscale md:h-8"
            />
          ))}
          <span className="text-[18px] font-bold uppercase text-base-ink/70">
            WSJ
          </span>
        </div>
      </div>
    </section>
  );
}
