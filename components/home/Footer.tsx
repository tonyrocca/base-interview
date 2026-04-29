export function Footer() {
  return (
    <footer className="bg-base-green-deep py-16 text-white/85">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-12 px-6 md:grid-cols-5">
        <div className="col-span-2">
          <span className="text-[28px] font-bold uppercase leading-none tracking-[0.02em] text-white">
            Base
          </span>
          <p className="mt-5 max-w-xs text-[14px] font-medium leading-relaxed text-white/70">
            205 E Riverside Dr, Suite 100
            <br />
            Austin, TX 78704
          </p>
          <p className="mt-3 text-[14px] font-medium text-white/70">
            <a href="#" className="hover:text-white">
              team@basepowercompany.com
            </a>
          </p>
        </div>

        <FooterCol
          heading="How it works"
          items={["Whole-home backup", "Home energy", "How Base works"]}
        />
        <FooterCol heading="Members" items={["Stories", "Reviews"]} />
        <FooterCol heading="Company" items={["About", "Careers", "Help"]} />
      </div>

      <div className="mx-auto mt-12 max-w-[1280px] border-t border-white/10 px-6 pt-6 text-[11px] font-medium text-white/45">
        <p>
          PUCT License #10338 · Base Power, Inc · Base Texas REP, LLC ·
          Demonstration only — this is a candidate prototype.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <div>
      <div className="tagline text-[12px] text-white/55">{heading}</div>
      <ul className="mt-4 space-y-2.5 text-[14px] font-medium">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-white">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
