"use client";

import * as React from "react";
import NeuralBackground from "@/components/ui/flow-field-background";
import { WarpCarousel, type WarpCard } from "@/components/ui/warp-carousel";

export function Current() {
  return (
    <NeuralBackground
      className="absolute inset-0 bg-ink"
      color="#c9f27a"
      fade="6, 8, 10"
      trailOpacity={0.08}
      particleCount={900}
      speed={0.7}
    />
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
          ariaLabel="Driftling specimens"
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
    <div className="grid gap-px bg-faint/40 md:grid-cols-2">
      <label className="block bg-ink p-6 md:p-8">
        <span className="label">Write the current, in plain words</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="mt-4 w-full resize-none bg-transparent font-serif text-2xl leading-snug font-light text-paper outline-none placeholder:text-faint"
          placeholder="Swim with 500 SOL in memecoins…"
        />
        <span className="mt-4 block text-sm text-faint">
          Try: “200 SOL in meme coins, stop below 150”
        </span>
      </label>
      <div className="bg-deep p-6 md:p-8">
        <div className="flex items-baseline justify-between">
          <span className="label">What the Driftling hears</span>
          <span className="label text-glow">● preview</span>
        </div>
        <dl className="mt-5">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-dashed border-faint/50 py-2.5 text-[15px]">
              <dt className="text-dim">{k}</dt>
              <dd className="text-right font-mono text-[13px]">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-faint">
          You sign this once. Anything outside it simply can’t happen.
        </p>
      </div>
    </div>
  );
}
