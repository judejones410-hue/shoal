import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Current, MandateWriter, Specimens } from "@/components/live";

const LOG = [
  ["04:12", "Kelp", "Bought 1.2 SOL", "inside limits"],
  ["04:31", "Moth", "Skipped a trade", "would break the 10% stroke"],
  ["05:02", "Ember", "Sold 30% of a bag", "daily cap reached, resting"],
  ["06:47", "Tidepool", "Moved 400 USDC to yield", "inside limits"],
  ["07:15", "Moth", "Hit the shore, +30%", "mandate finished, swam home"],
];

const FAQ = [
  ["Is any of this live?", "No. Driftlings is a concept. No agents trade, no mint is open, and every number on this page is made up to show the idea."],
  ["Can a Driftling lose money?", "In the real thing, yes. Limits shrink the damage, they don’t remove it. Nothing here is financial advice."],
  ["Who holds the money?", "The plan: each Driftling gets its own wallet that only you can withdraw from. The agent can trade inside your limits and nothing else."],
  ["What’s $DRIFT?", "A planned token for the school. No supply, date or contract exists yet. If someone DMs you one, it’s a scam. We never DM first."],
];

export default function Home() {
  return (
    <main className="overflow-x-clip">
      {/* ---------- hero: the current ---------- */}
      <section className="relative h-[100svh] min-h-[620px]">
        <Current />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,rgba(6,8,10,0.92),transparent_60%)]" />

        <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 md:px-10">
          <a href="#" className="font-serif text-xl italic">
            driftlings<span className="text-glow">.</span>
          </a>
          <nav className="hidden gap-8 text-sm text-dim md:flex">
            <a href="#school" className="hover:text-paper">The school</a>
            <a href="#write" className="hover:text-paper">Write a current</a>
            <a href="#log" className="hover:text-paper">Tide log</a>
            <a href="#drift" className="hover:text-paper">$DRIFT</a>
          </nav>
          <a href="#write" className="rounded-full border border-paper/30 px-4 py-1.5 text-sm hover:border-glow hover:text-glow">
            Join the waitlist
          </a>
        </header>

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 max-w-3xl px-5 pb-14 md:px-10 md:pb-20">
          <p className="label">A field guide · first school · 8,888 specimens</p>
          <h1 className="mt-5 font-serif text-[clamp(3rem,8vw,6.8rem)] leading-[0.92] font-extralight tracking-tight">
            Small minds,
            <br />
            <em className="font-light">strong <span className="scribble">currents</span>.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-paper/75">
            A Driftling is a tiny trading agent with its own wallet. You write the current it swims in. It never
            leaves the water you drew.
          </p>
        </div>

        <p className="label absolute right-5 bottom-6 z-10 hidden md:right-10 md:block">
          Move your cursor through the water ↯
        </p>
      </section>

      {/* ---------- the school ---------- */}
      <section id="school" className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-serif text-5xl leading-[1.02] font-extralight md:text-6xl">
            Every one is <em>a little different.</em>
          </h2>
          <p className="max-w-xs text-dim">
            Each Driftling is born with a temperament, the waters it likes and how hard it swims. You can change the
            current. You can’t change its nature.
          </p>
        </div>
        <Specimens />
      </section>

      {/* ---------- how ---------- */}
      <section className="border-y border-faint/40 bg-deep">
        <div className="mx-auto grid max-w-6xl md:grid-cols-3">
          {[
            ["i.", "You write the current", "One sentence. How much, which waters, where the shore is, where the rocks are."],
            ["ii.", "It becomes a fence", "Your sentence turns into hard limits you sign once. Size per trade, daily cap, stop, expiry."],
            ["iii.", "It swims, you watch", "Every stroke is written to the tide log. Pause it, pull it home or sell it with its history."],
          ].map(([n, h, p], k) => (
            <div key={n} className={`px-5 py-12 md:px-10 md:py-16 ${k ? "border-t border-faint/40 md:border-t-0 md:border-l" : ""}`}>
              <span className="font-serif text-3xl text-glow italic">{n}</span>
              <h3 className="mt-6 text-xl font-semibold">{h}</h3>
              <p className="mt-3 text-dim">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- write ---------- */}
      <section id="write" className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
        <div className="mb-10 max-w-2xl">
          <p className="label">Try it, nothing is sent anywhere</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.02] font-extralight md:text-6xl">
            Say it like you’d <em>say it to a friend.</em>
          </h2>
        </div>
        <MandateWriter />
      </section>

      {/* ---------- log ---------- */}
      <section id="log" className="mx-auto max-w-6xl px-5 pb-24 md:px-10 md:pb-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-serif text-5xl leading-[1.02] font-extralight">
              The tide <em>log.</em>
            </h2>
            <p className="mt-5 max-w-xs text-dim">
              Every move and every move it <em>didn’t</em> make, with the reason. A Driftling that says no is doing
              its job.
            </p>
            <p className="label mt-6 text-faint">Sample entries · not real activity</p>
          </div>
          <ol className="font-mono text-[13px]">
            {LOG.map(([t, who, what, why]) => (
              <li key={t} className="grid grid-cols-[3.5rem_5.5rem_1fr] gap-3 border-b border-faint/40 py-4 md:grid-cols-[4rem_7rem_1fr_auto]">
                <span className="text-faint">{t}</span>
                <span className="text-glow">{who}</span>
                <span>{what}</span>
                <span className="col-span-3 text-dim md:col-span-1 md:text-right">{why}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- $DRIFT ---------- */}
      <section id="drift" className="relative border-t border-faint/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">
          <div>
            <p className="font-serif text-[clamp(5rem,14vw,11rem)] leading-none font-extralight italic">
              $DRIFT
            </p>
            <p className="label mt-4">Planned · Solana · not live</p>
          </div>
          <div className="self-end">
            <p className="text-xl leading-relaxed text-paper/85">
              The school’s token. The idea: a small fee on what Driftlings trade flows back to the school, and early
              holders of a specimen get a share of the first $DRIFT.
            </p>
            <ul className="mt-8 space-y-3 text-dim">
              <li className="flex gap-3"><ArrowUpRight className="mt-1 size-4 shrink-0 text-glow" /> Fee details published before anything trades</li>
              <li className="flex gap-3"><ArrowUpRight className="mt-1 size-4 shrink-0 text-glow" /> No contract address exists yet, so ignore any you see</li>
              <li className="flex gap-3"><ArrowDownRight className="mt-1 size-4 shrink-0 text-rust" /> Tokens can go to zero. Treat this as a story, not a promise</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-10 md:pb-32">
        <h2 className="font-serif text-4xl font-extralight">Fair questions</h2>
        <div className="mt-8">
          {FAQ.map(([q, a]) => (
            <details key={q} className="border-b border-faint/40 py-5">
              <summary className="flex items-center justify-between gap-6 text-lg">
                {q}
                <span className="plus font-serif text-2xl text-glow transition-transform">+</span>
              </summary>
              <p className="mt-3 max-w-xl text-dim">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-faint/40 px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
          <p className="font-serif text-3xl italic">
            driftlings<span className="text-glow">.</span>
          </p>
          <p className="max-w-md text-sm text-faint">
            A concept. Nothing here is live, investment advice, an offer or a promise of returns. We never DM first.
          </p>
        </div>
      </footer>
    </main>
  );
}
