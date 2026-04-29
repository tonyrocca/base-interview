const STORIES = [
  {
    name: "Bob A.",
    location: "Waxahachie, TX",
    quote:
      "Compared to running my generator every storm, Base is a no-brainer. Cheaper, quieter, and I never think about it.",
  },
  {
    name: "Maria P.",
    location: "Cypress, TX",
    quote:
      "We were skeptical at first — sounded too good. Three months in and our bill is down 39%.",
  },
  {
    name: "Nikki & Mike",
    location: "Pflugerville, TX",
    quote:
      "After 2021 we swore never again. Now if the grid drops, we don't even notice until our neighbors text us.",
  },
];

export function Stories() {
  return (
    <section id="stories" className="bg-base-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-12 max-w-3xl">
          <div className="mb-3 tagline text-[14px] text-base-muted">
            Member stories
          </div>
          <h2 className="text-[28px] font-bold leading-[1.15] text-base-ink md:text-[40px]">
            Real people, paying less and worrying less.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {STORIES.map((s) => (
            <figure
              key={s.name}
              className="flex h-full flex-col rounded-card bg-white p-7 ring-1 ring-base-line/60"
            >
              <div className="flex gap-0.5 text-[#fdb022]" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 0L13.09 6.26L20 7.27L15 12.14L16.18 19.02L10 15.77L3.82 19.02L5 12.14L0 7.27L6.91 6.26L10 0Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 text-[18px] font-medium leading-[1.4] text-base-ink">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-7 text-[13px] font-medium text-base-muted">
                <div className="font-semibold text-base-ink">{s.name}</div>
                <div>{s.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
