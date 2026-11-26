"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/* Ambient water sound, made in the browser: filtered noise that swells */
/* ------------------------------------------------------------------ */

function startWater() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ac = new AC();
  const len = ac.sampleRate * 4;
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    let last = 0;
    for (let i = 0; i < len; i++) {
      // brown noise: deep, soft rumble
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      d[i] = last * 3.2;
    }
  }
  const src = ac.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 420;
  const lfo = ac.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoGain = ac.createGain();
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain).connect(lp.frequency);
  const out = ac.createGain();
  out.gain.value = 0;
  out.gain.linearRampToValueAtTime(0.5, ac.currentTime + 3);
  src.connect(lp).connect(out).connect(ac.destination);
  src.start();
  lfo.start();
  return ac;
}

/* ------------------------------------------------------------------ */
/* The way in: a short "filling the water" count, then dive with or    */
/* without sound. Shown on every load.                                */
/* ------------------------------------------------------------------ */

export function Dive() {
  const [stage, setStage] = React.useState<"hidden" | "loading" | "ready" | "leaving">("loading");
  const [pct, setPct] = React.useState(0);
  const [sound, setSound] = React.useState<AudioContext | null>(null);
  const [muted, setMuted] = React.useState(true);

  React.useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    let p = 0;
    const id = setInterval(() => {
      // about 5 seconds to fill, with small uneven steps so it feels like real loading
      p = Math.min(100, p + Math.ceil(Math.random() * 3));
      setPct(p);
      if (p >= 100) {
        clearInterval(id);
        setStage("ready");
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  const enter = (withSound: boolean) => {
    if (withSound) {
      setSound(startWater());
      setMuted(false);
    }
    setStage("leaving");
    document.documentElement.style.overflow = "";
    setTimeout(() => setStage("hidden"), 1200);
  };

  const toggle = () => {
    if (!sound) {
      setSound(startWater());
      setMuted(false);
      return;
    }
    if (muted) sound.resume();
    else sound.suspend();
    setMuted(!muted);
  };

  return (
    <>
      {stage !== "hidden" && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
            stage === "leaving" ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"
          }`}
        >
          {/* two outlined fish circling each other */}
          <svg viewBox="-100 -100 200 200" className="absolute size-[min(80vw,520px)] animate-[spin_24s_linear_infinite] opacity-60" fill="none" stroke="#e9e4d8" strokeWidth="0.5">
            <path d="M60 -10 C 40 -40, -30 -40, -55 0 C -30 40, 40 40, 60 10 L 80 -12 L 78 12 Z" />
            <path d="M-60 10 C -40 40, 30 40, 55 0 C 30 -40, -40 -40, -60 -10 L -80 12 L -78 -12 Z" opacity="0.5" />
          </svg>
          <p className="relative font-serif text-6xl font-extralight italic md:text-7xl">
            shoal<span className="text-glow">.</span>
          </p>
          {stage === "loading" ? (
            <div className="relative mt-8 w-40">
              <div className="h-px bg-faint">
                <div className="h-px bg-glow transition-[width]" style={{ width: `${pct}%` }} />
              </div>
              <p className="label mt-3 text-center">filling the water · {pct}%</p>
            </div>
          ) : (
            <div className="relative mt-10 flex flex-col items-center gap-6">
              <button onClick={() => enter(true)} className="float-link text-3xl font-light hover:text-glow">
                Dive in with sound
              </button>
              <button onClick={() => enter(false)} className="label hover:text-paper">
                or dive in quietly
              </button>
            </div>
          )}
          <p className="label absolute bottom-8 px-6 text-center text-faint">best with headphones · the water hums softly</p>
        </div>
      )}

      <button
        onClick={toggle}
        className="fixed right-5 bottom-5 z-40 flex items-center gap-2 font-serif text-[15px] text-dim italic hover:text-paper md:right-10"
        aria-label={muted ? "Turn water sound on" : "Turn water sound off"}
      >
        <span className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[2px] rounded-full bg-glow"
              style={{ height: muted ? 3 : undefined, animation: muted ? "none" : `eq 1s ${i * 0.15}s ease-in-out infinite alternate` }}
            />
          ))}
        </span>
        sound {muted ? "off" : "on"}
      </button>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Section marker whose letters scramble into place when scrolled to.  */
/* ------------------------------------------------------------------ */

const GLYPHS = "~≈∿·°oO◦<>";

export function Marker({ n, children }: { n: string; children: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const [text, setText] = React.useState(children.replace(/\S/g, " "));
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let f = 0;
      id = window.setInterval(() => {
        f++;
        setText(
          children
            .split("")
            .map((ch, i) => (ch === " " || i < f / 2 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
            .join(""),
        );
        if (f / 2 > children.length) clearInterval(id);
      }, 35);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [children]);
  return (
    <p ref={ref} className="mb-6 flex items-baseline gap-3">
      <span className="font-serif text-glow italic">/{n}</span>
      <span className="label whitespace-pre">{text}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Depth gauge: how far down the page you've dived.                    */
/* ------------------------------------------------------------------ */

export function Depth() {
  const [d, setD] = React.useState(0);
  React.useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setD(max > 0 ? scrollY / max : 0);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 2xl:flex">
      <span className="label text-faint">surface</span>
      <div className="relative h-48 w-px bg-faint/60">
        <span className="absolute -left-[3px] size-[7px] rounded-full bg-glow shadow-[0_0_12px_#c9f27a]" style={{ top: `${d * 100}%` }} />
      </div>
      <span className="font-serif text-sm text-dim tabular-nums">−{Math.round(d * 240)} m</span>
    </div>
  );
}
