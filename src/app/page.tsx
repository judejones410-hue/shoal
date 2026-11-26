import { ArrowDownRight } from "lucide-react";
import { GITHUB, SITE } from "@/lib/links";
import { Current, MandateWriter, Specimens, TideFog } from "@/components/live";
import { Depth, Dive, Marker } from "@/components/dive";

const LOG = [
  ["04:12", "Kelp", "Bought 1.2 SOL", "inside limits"],
  ["04:31", "Moth", "Skipped a trade", "would break the 10% stroke"],
  ["05:02", "Ember", "Sold 30% of a bag", "daily cap reached, resting"],
  ["06:47", "Tidepool", "Moved 400 USDC to yield", "inside limits"],
  ["07:15", "Moth", "Hit the shore, +30%", "mandate finished, swam home"],
];

const FAQ = [
  ["Is any of this live?", "No. Shoal is a concept. No agents trade, no mint is open, and every number on this page is made up to show the idea."],
  ["Can a fish lose money?", "In the real thing, yes. Limits shrink the damage, they don’t remove it. Nothing here is financial advice."],
  ["Who holds the money?", "The plan: each fish gets its own wallet that only you can withdraw from. The agent can trade inside your limits and nothing else."],
  ["What’s $SHOAL?", "A planned token for the school. No supply, date or contract exists yet. If someone DMs you one, it’s a scam. We never DM first."],
];

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Dive />
      <Depth />
      {/* ---------- hero: the current ---------- */}
      <section className="relative h-[100svh] min-h-[620px]">
        <Current school />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,rgba(6,8,10,0.92),transparent_60%)]" />

        <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 md:px-10">
          <a href="#" className="font-serif text-xl italic">
            shoal<span className="text-glow">.</span>
          </a>
          <nav className="hidden gap-7 font-serif text-[17px] font-light text-dim italic lg:flex">
            {[
              ["#school", "the school"],
              ["#write", "write a current"],
              ["#log", "tide log"],
              ["#drift", "$SHOAL"],
              ["/docs", "docs"],
            ].map(([h, l], k) => (
              <a key={h} href={h} className="group hover:text-paper">
                <sup className="mr-1 text-[10px] text-glow/70 not-italic group-hover:text-glow">0{k + 1}</sup>
                {l}
              </a>
            ))}
            <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-paper">github ↗</a>
          </nav>
          <a href="#write" className="float-link text-xl text-paper hover:text-glow">
            swim with us
          </a>
        </header>

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 max-w-3xl px-5 pb-14 md:px-10 md:pb-20">
          <p className="label">A field guide · first school · 8,888 specimens</p>
          <h1 className="relative mt-5 font-serif text-[clamp(3rem,8vw,6.8rem)] leading-[0.92] font-extralight tracking-tight">
            {["Small", "minds,"].map((w, k) => (
              <span key={w} className="word mr-[0.22em]" style={{ animationDelay: `${0.2 + k * 0.18}s, ${k * 0.6}s` }}>
                {w}
              </span>
            ))}
            <br />
            <em className="font-light">
              <span className="word mr-[0.22em]" style={{ animationDelay: "0.65s, 1.2s" }}>strong</span>
              <span className="word scribble" style={{ animationDelay: "0.85s, 1.8s" }}>currents.</span>
            </em>
            <svg
              aria-hidden
              viewBox="0 0 800 260"
              preserveAspectRatio="none"
              className="stream absolute -inset-x-6 inset-y-0 h-full w-[calc(100%+3rem)] mix-blend-screen"
              fill="none"
              stroke="#c9f27a"
              strokeLinecap="round"
            >
              <path d="M-20 70 C 140 20, 260 130, 420 80 S 700 30, 820 95" strokeWidth="1.2" opacity="0.8" />
              <path d="M-20 150 C 160 110, 300 210, 470 150 S 690 120, 820 175" strokeWidth="0.9" opacity="0.55" style={{ animationDelay: "-2s", animationDuration: "7.5s" }} />
              <path d="M-20 215 C 120 190, 330 250, 500 205 S 720 190, 820 230" strokeWidth="0.7" opacity="0.4" style={{ animationDelay: "-4s", animationDuration: "9s" }} />
            </svg>
          </h1>
          <p className="mt-6 max-w-md text-lg text-paper/75">
            Each Shoal fish is a tiny trading agent with its own wallet. You write the current it swims in. It never
            leaves the water you drew.
          </p>
        </div>

        <p className="label absolute right-5 bottom-16 z-10 hidden md:right-10 md:block">
          Move your cursor through the water ↯
        </p>
      </section>

      {/* ---------- the school ---------- */}
      <section id="school" className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
        <Marker n="01">the school</Marker>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-serif text-5xl leading-[1.02] font-extralight md:text-6xl">
            Every one is <em>a little different.</em>
          </h2>
          <p className="max-w-xs text-dim">
            Each fish is born with a temperament, the waters it likes and how hard it swims. You can change the
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
        <Marker n="02">write a current</Marker>
        <div className="mb-10 max-w-2xl">
          <p className="label">Try it, nothing is sent anywhere</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.02] font-extralight md:text-6xl">
            Say it like you’d <em>say it to a friend.</em>
          </h2>
        </div>
        <MandateWriter />
      </section>

      {/* ---------- log: hidden in fog ---------- */}
      <section id="log" className="relative mx-auto max-w-6xl px-5 pb-28 md:px-10 md:pb-36">
        <Marker n="03">the tide log</Marker>
        <div className="max-w-xl">
          <h2 className="font-serif text-5xl leading-[1.02] font-extralight md:text-6xl">
            The tide <em>log.</em>
          </h2>
          <p className="mt-5 max-w-sm text-dim">
            Every move, and every move it <em>didn’t</em> make, is written down somewhere in the fog. A fish that
            says no is doing its job.
          </p>
        </div>

        <TideFog log={LOG} />
        <p className="label mt-8 text-center text-faint">move through the fog to read it · sample entries, not real activity</p>
      </section>

      {/* ---------- $SHOAL ---------- */}
      <section id="drift" className="relative isolate overflow-hidden border-t border-faint/40">
        <div className="absolute inset-0 -z-10 opacity-60">
          <Current />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_50%,rgba(6,8,10,0.85),rgba(6,8,10,0.35)_70%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-28 md:grid-cols-[1.1fr_1fr] md:px-10 md:py-40">
          <div>
            <Marker n="04">the token</Marker>
            <p className="font-serif text-[clamp(5rem,15vw,12rem)] leading-[0.85] font-extralight italic">
              $SHOAL
            </p>
            <p className="float-link mt-10 text-2xl font-light text-paper/90">
              still forming in the deep · Solana · not live yet
            </p>
          </div>
          <div>
            <p className="font-serif text-2xl leading-snug font-light">
              The school’s token. A small fee on what the fish trade flows back to the school, and early keepers of a
              specimen get a share of the first $SHOAL.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                ["10%", "for specimen keepers"],
                ["1%", "planned trading fee"],
                ["0", "contracts live today"],
              ].map(([n, l]) => (
                <div key={l} className="rise" style={{ animationDelay: `-${n.length * 3}s` }}>
                  <span className="block font-serif text-6xl font-extralight text-glow">{n}</span>
                  <span className="mt-2 block text-[15px] leading-tight text-dim italic">{l}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 flex gap-3 text-sm text-dim">
              <ArrowDownRight className="mt-0.5 size-4 shrink-0 text-rust" />
              Tokens can go to zero. Any contract address you see before launch is fake.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-28 md:grid-cols-[1fr_1.6fr] md:px-10 md:py-36">
        <div>
          <h2 className="font-serif text-5xl leading-[1.02] font-extralight">
            Fair <em>questions.</em>
          </h2>
          <p className="mt-5 max-w-xs text-dim">
            Anything else, the <a href="/docs" className="text-paper underline decoration-glow underline-offset-4">docs</a> go deeper.
          </p>
        </div>
        <div>
          {FAQ.map(([q, a], k) => (
            <details key={q} className="group border-t border-faint/40 py-6 last:border-b">
              <summary className="flex items-baseline gap-5">
                <span className="font-serif text-glow italic">{["i", "ii", "iii", "iv"][k]}.</span>
                <span className="flex-1 font-serif text-2xl font-light">{q}</span>
                <span className="plus font-serif text-3xl leading-none font-extralight text-glow transition-transform">+</span>
              </summary>
              <p className="mt-4 max-w-lg pl-9 text-dim">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-faint/40 px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
          <p className="font-serif text-3xl italic">
            shoal<span className="text-glow">.</span>
          </p>
          <nav className="flex gap-6 font-serif text-lg italic">
            <a href={SITE} className="hover:text-glow">Website ↗</a>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-glow">GitHub ↗</a>
            <a href="/docs" className="hover:text-glow">Docs</a>
          </nav>
          <p className="max-w-md text-sm text-faint">
            A concept. Nothing here is live, investment advice, an offer or a promise of returns. We never DM first.
          </p>
        </div>
      </footer>
    </main>
  );
}
