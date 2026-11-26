"use client";

import * as React from "react";
import NeuralBackground from "@/components/ui/flow-field-background";
import School from "@/components/ui/school";
import { WarpCarousel, type WarpCard } from "@/components/ui/warp-carousel";

export function Current({ school = false }: { school?: boolean }) {
  return (
    <>
    <NeuralBackground
      className="absolute inset-0 bg-ink"
      color="#c9f27a"
      fade="6, 8, 10"
      trailOpacity={0.08}
      particleCount={900}
      speed={0.7}
    />
    {school && <School />}
    </>
  );
}

/* Each card is one specimen from the first school. Numbers are made up, and the page says so. */
const SPECIMENS: (WarpCard & { name: string; note: string })[] = [
  {
    name: "No. 014 · Kelp",
    note: "Swims slow, only in majors. Stops itself if the school drops 15%.",
    title: "Kelp\nmajors only",
    value: "12",
    unit: "%",
    footer: "Max size per trade",
    detail: "slider",
    labels: ["Shy", "Bold"],
    numeral: ["#d8ffa0", "#f4ffe0"],
    accent: "#c9f27a",
    glow: "#7fbf3a",
    mesh: ["#0c1f12", "#0a1a10", "#123a1c", "#1d5a26", "#0b2410", "#3f8a2e", "#9bd85a", "#1a4a20", "#06120a", "#2b6e2a", "#c9f27a", "#0d2a14"],
  },
  {
    name: "No. 211 · Ember",
    note: "Chases memecoins, but in sips. Never more than 40 SOL a day.",
    title: "Ember\nsmall sips",
    value: "40",
    unit: "sol",
    footer: "Daily cap",
    detail: "wave",
    numeral: ["#fff4e8", "#e7864e"],
    accent: "#ff9a5c",
    glow: "#e7864e",
    mesh: ["#2a0d05", "#3d1306", "#5c1f08", "#8a3510", "#200a04", "#c95a22", "#ffb070", "#4a1a08", "#120502", "#a0441a", "#e7864e", "#2e0f05"],
  },
  {
    name: "No. 077 · Tidepool",
    note: "Parks in stablecoin yield and waits. The patient one.",
    title: "Tidepool\nyield, waiting",
    value: "91",
    unit: "d",
    footer: "Mandate length",
    detail: "ring",
    numeral: ["#e6f7ff", "#8fd3e8"],
    accent: "#bfeaf5",
    glow: "#4fa9c4",
    mesh: ["#04161c", "#062430", "#0b3a4a", "#145a6e", "#031015", "#2a8aa3", "#9fe0ee", "#0a3040", "#020a0e", "#1e6f86", "#d8f6ff", "#072630"],
  },
  {
    name: "No. 302 · Moth",
    note: "Only flies toward AI tokens. Lands at +30%, folds at −15%.",
    title: "Moth\ntoward the light",
    value: "30",
    unit: "%",
    footer: "Take-profit shore",
    detail: "cross",
    labels: ["Target", "in", "out"],
    numeral: ["#f3ecff", "#c9b4ff"],
    accent: "#d6c6ff",
    glow: "#8f7ae0",
    mesh: ["#140c24", "#1d1236", "#2c1c52", "#45307c", "#0e0818", "#6a52b0", "#cbb8ff", "#2a1a48", "#08050f", "#55409a", "#e8dcff", "#1a1030"],
  },
];

export function Specimens() {
  const [i, setI] = React.useState(0);
  const s = SPECIMENS[i];
  return (
    <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(0,1.5fr)]">
      <div className="order-2 md:order-1">
        <p className="label">Specimen in view</p>
        <h3 className="mt-3 font-serif text-4xl font-light italic">{s.name}</h3>
        <p className="mt-4 max-w-sm text-dim">{s.note}</p>
        <div className="mt-8 flex gap-2">
          {SPECIMENS.map((x, k) => (
            <button
              key={x.name}
              onClick={() => setI(k)}
              aria-label={`Show ${x.name}`}
              className={`h-[3px] w-9 transition-colors ${k === i ? "bg-glow" : "bg-faint hover:bg-dim"}`}
            />
          ))}
        </div>
        <p className="label mt-8 normal-case tracking-normal text-faint">
          Drag the ring, or use ← →. Illustrative specimens, not real agents.
        </p>
      </div>
      <div className="order-1 h-[440px] md:order-2 md:h-[560px]">
        <WarpCarousel
          cards={SPECIMENS}
          index={i}
          onIndexChange={setI}
          step={1}
          interval={4.6}
          background="#06080a"
          font='"Fraunces", Georgia, serif'
          ariaLabel="Shoal specimens"
          style={{ minHeight: 0, aspectRatio: "auto" }}
        />
      </div>
    </div>
  );
}

/* A toy parser: reads a sentence and pulls the limits out of it. It's a preview of the idea, nothing executes. */
function readMandate(text: string) {
  const t = text.toLowerCase();
  const num = (re: RegExp) => {
    const m = re.exec(t);
    return m ? parseFloat(m[1].replace(/,/g, "")) : null;
  };
  const stake = num(/([\d,.]+)\s*(?:usdc|sol|\$)/) ?? num(/\$\s*([\d,.]+)/);
  const unit = /sol\b/.test(t) && !/usdc/.test(t) ? "SOL" : "USDC";
  const target = num(/(?:reach(?:es)?|until|hit(?:s)?|to)\s*\$?([\d,.]+)/);
  const stop = num(/(?:stop|falls? to|below|drops? to)\D{0,12}([\d,.]+)/);
  const lanes = [
    ["meme", "Memecoins, small sips"],
    ["ai", "AI tokens"],
    ["stable", "Stablecoin yield"],
    ["major", "Majors (SOL, BTC, ETH)"],
    ["defi", "DeFi blue chips"],
  ].filter(([k]) => new RegExp(`\\b${k}`).test(t));
  return {
    stake,
    unit,
    target,
    stop,
    lane: lanes.length ? lanes.map((l) => l[1]).join(" + ") : "Majors (default)",
    perTrade: stake ? Math.round(stake * 0.1) : null,
  };
}

export function MandateWriter() {
  const [text, setText] = React.useState(
    "Swim with 1,000 USDC in AI tokens until it reaches 1,300. Stop if it falls to 850.",
  );
  const m = readMandate(text);
  const fmt = (n: number | null) => (n == null ? "—" : `${n.toLocaleString()} ${m.unit}`);
  const rows: [string, string][] = [
    ["Water", m.lane],
    ["Stake", fmt(m.stake)],
    ["Shore (take profit)", fmt(m.target)],
    ["Rocks (hard stop)", fmt(m.stop)],
    ["Biggest single stroke", fmt(m.perTrade)],
    ["Borrowing", "Off"],
    ["Can withdraw to", "Your wallet only"],
  ];
  return (
    <div className="grid items-center gap-14 md:grid-cols-[1fr_1.1fr]">
      <label className="block">
        <span className="label">Write the current, in plain words</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="mt-3 w-full resize-none border-b border-glow/40 bg-transparent pb-3 font-serif text-[1.7rem] leading-snug font-light text-paper outline-none placeholder:text-faint focus:border-glow"
          placeholder="Swim with 500 SOL in memecoins…"
        />
        <span className="label mt-4 block text-faint">
          try “200 SOL in meme coins, stop below 150”
        </span>
      </label>

      {/* no container: the reading just floats, each line on its own little drift */}
      <div className="relative">
        <span className="label text-glow">what your fish hears</span>
        <p className="mt-2 font-serif text-4xl font-extralight italic">{m.lane}</p>
        <dl className="mt-7 space-y-3">
          {rows.slice(1).map(([k, v], i) => (
            <div key={k} className="rise flex items-baseline gap-3" style={{ animationDelay: `${-i * 1.7}s`, marginLeft: `${[0, 14, 4, 22, 8, 0][i] ?? 0}px` }}>
              <dt className="text-dim italic">{k}</dt>
              <span className="flex-1 translate-y-[-4px] border-b border-dotted border-faint/70" />
              <dd className="font-serif text-xl font-light">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="label mt-7 text-faint">signed once, nothing outside it can happen</p>
      </div>
    </div>
  );
}

/* The tide log sits under thick fog. Your cursor clears a hole in it; when you leave it alone the clear
   patch wanders by itself so phones and idle visitors still catch glimpses. */
export function TideFog({ log }: { log: string[][] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = 0;
    let raf = 0;
    const set = (x: number, y: number) => {
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      set(e.clientX - r.left, e.clientY - r.top);
      last = performance.now();
    };
    const wander = (t: number) => {
      if (t - last > 2500) {
        const r = el.getBoundingClientRect();
        const s = t / 1000;
        set(r.width * (0.5 + 0.38 * Math.sin(s * 0.31)), r.height * (0.5 + 0.4 * Math.sin(s * 0.53 + 1)));
      }
      raf = requestAnimationFrame(wander);
    };
    raf = requestAnimationFrame(wander);
    el.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div ref={ref} className="relative mt-6 [--r:170px] md:[--r:240px]">
      <ol className="relative grid gap-x-10 gap-y-14 px-10 py-20 md:grid-cols-2 md:px-28 md:py-28">
        {log.map(([t, who, what, why], k) => (
          <li key={t} className={`rise ${k % 2 ? "md:mt-20" : ""}`} style={{ animationDelay: `${-k * 2.3}s` }}>
            <p className="label">
              <span className="text-glow">{who}</span> · {t}
            </p>
            <p className="mt-1 font-serif text-3xl font-extralight">{what}</p>
            <p className="mt-1 text-dim italic">{why}</p>
          </li>
        ))}
      </ol>
      <div aria-hidden className="fog-edge pointer-events-none absolute inset-0">
        <div className="fog absolute inset-0" />
      </div>
    </div>
  );
}
