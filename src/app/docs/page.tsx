import type { Metadata } from "next";
import { GITHUB, SITE } from "@/lib/links";

export const metadata: Metadata = { title: "Docs — Shoal" };

const CHAPTERS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "what",
    title: "What a Shoal fish is",
    body: (
      <>
        <p>
          Each Shoal fish is one collectible and one trading agent at the same time. Each specimen owns a small wallet of
          its own. Whoever keeps the specimen controls that wallet and writes the rules the agent follows.
        </p>
        <p>
          Sell the specimen and the agent goes with it, along with its tide log, so the next keeper can see every move
          it has ever made.
        </p>
      </>
    ),
  },
  {
    id: "current",
    title: "Writing a current",
    body: (
      <>
        <p>
          A current is one plain sentence: how much the fish can use, which waters it can swim in, where it stops
          for profit (the shore) and where it stops for safety (the rocks).
        </p>
        <p>
          The sentence is turned into hard limits you sign once: biggest single trade, daily cap, take-profit, stop,
          expiry and borrowing (always off at launch). The agent can suggest anything. Only trades inside the fence go
          through.
        </p>
      </>
    ),
  },
  {
    id: "waters",
    title: "The waters",
    body: (
      <ul>
        <li><b>Majors</b>: SOL, BTC and ETH, wrapped on Solana.</li>
        <li><b>Memecoins</b>: small sips only, with a tighter size cap by default.</li>
        <li><b>AI tokens</b>: a curated list, reviewed each month.</li>
        <li><b>Stablecoin yield</b>: parks idle funds in audited lending pools.</li>
        <li><b>Your own list</b>: any tokens you name, still inside the same fence.</li>
      </ul>
    ),
  },
  {
    id: "log",
    title: "The tide log",
    body: (
      <p>
        Every proposal is written down, including the ones that were refused and why. The log is public per specimen,
        so a good fish builds a reputation you can see before you buy it.
      </p>
    ),
  },
  {
    id: "drift",
    title: "$SHOAL",
    body: (
      <>
        <p>
          $SHOAL is the planned token of the school. The plan is a small fee (around 1%) on what the fish trade, with
          part of it buying $SHOAL back, and 10% of supply set aside for specimen keepers.
        </p>
        <p>None of this is final. No contract exists. Any address shared before an official announcement is fake.</p>
      </>
    ),
  },
  {
    id: "safety",
    title: "Safety & honesty",
    body: (
      <ul>
        <li>Shoal is a concept. Nothing on the site trades, and every number is illustrative.</li>
        <li>Agents can lose money. Limits reduce how much, they do not remove the risk.</li>
        <li>Only you can withdraw from your specimen’s wallet. The agent never can.</li>
        <li>We never DM first and never ask for a seed phrase.</li>
      </ul>
    ),
  },
];

export default function Docs() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:px-10">
      <header className="flex items-center justify-between">
        <a href="/" className="font-serif text-xl italic">
          shoal<span className="text-glow">.</span>
        </a>
        <nav className="flex gap-6 text-sm text-dim">
          <a href={SITE} className="hover:text-paper">Website</a>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-paper">GitHub</a>
        </nav>
      </header>

      <div className="mt-20 grid gap-14 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-10 md:self-start">
          <p className="label">the field notes</p>
          <ol className="mt-4 space-y-2">
            {CHAPTERS.map((c, k) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="flex gap-3 text-dim hover:text-paper">
                  <span className="w-6 font-serif text-glow italic">{k + 1}</span>
                  {c.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article>
          <h1 className="font-serif text-6xl leading-none font-extralight md:text-7xl">
            How the <em>school</em> swims.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-dim">
            Everything you need to know about Shoal, written for people, not lawyers. It’s a concept, and these
            notes describe the plan.
          </p>
          {CHAPTERS.map((c, k) => (
            <section key={c.id} id={c.id} className="mt-16 scroll-mt-10 border-t border-faint/40 pt-10">
              <p className="font-serif text-glow italic">Chapter {k + 1}</p>
              <h2 className="mt-2 font-serif text-4xl font-light">{c.title}</h2>
              <div className="mt-5 max-w-2xl space-y-4 text-paper/80 [&_b]:font-semibold [&_b]:text-paper [&_li]:pl-1 [&_ul]:list-['~__'] [&_ul]:space-y-2 [&_ul]:pl-5">
                {c.body}
              </div>
            </section>
          ))}
          <p className="label mt-20 text-faint">Last tidied November 2026.</p>
        </article>
      </div>
    </main>
  );
}
