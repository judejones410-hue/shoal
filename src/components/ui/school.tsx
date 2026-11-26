"use client";

import { useEffect, useRef } from "react";

/**
 * A school of small fish (boids) that swim together, ride the same flow as the particle field behind them,
 * and scatter away from the cursor. Transparent canvas, so it layers over anything.
 */
export default function School({ count = 46, color = "201, 242, 122" }: { count?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    type Fish = { x: number; y: number; vx: number; vy: number; s: number; t: number };
    let fish: Fish[] = [];

    const size = () => {
      const r = cv.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    // start them bunched up off to the left so they swim in as a group
    fish = Array.from({ length: count }, () => ({
      x: w * 0.15 + (Math.random() - 0.5) * 220,
      y: h * 0.4 + (Math.random() - 0.5) * 160,
      vx: 1.6 + Math.random() * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      s: 0.75 + Math.random() * 0.6,
      t: Math.random() * 10,
    }));

    const drawFish = (f: Fish) => {
      const a = Math.atan2(f.vy, f.vx);
      const sp = Math.hypot(f.vx, f.vy);
      const L = 18 * f.s;
      const beat = Math.sin(f.t) * (0.28 + sp * 0.06);
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(a);
      // body bends a little with the tail beat
      const bend = beat * L * 0.18;
      const g = ctx.createLinearGradient(L * 0.5, 0, -L * 0.5, 0);
      g.addColorStop(0, `rgba(${color}, 0.95)`);
      g.addColorStop(1, `rgba(${color}, 0.35)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(L * 0.5, 0);
      ctx.bezierCurveTo(L * 0.35, -L * 0.2, -L * 0.15, -L * 0.17, -L * 0.42, bend);
      ctx.bezierCurveTo(-L * 0.15, L * 0.17, L * 0.35, L * 0.2, L * 0.5, 0);
      ctx.fill();
      // tail fin
      ctx.translate(-L * 0.4, bend);
      ctx.rotate(beat * 1.4);
      ctx.fillStyle = `rgba(${color}, 0.45)`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-L * 0.18, -L * 0.05, -L * 0.3, -L * 0.2);
      ctx.quadraticCurveTo(-L * 0.22, 0, -L * 0.3, L * 0.2);
      ctx.quadraticCurveTo(-L * 0.18, L * 0.05, 0, 0);
      ctx.fill();
      ctx.restore();
      // eye
      ctx.fillStyle = "rgba(6, 8, 10, 0.9)";
      ctx.beginPath();
      ctx.arc(f.x + Math.cos(a) * L * 0.3 - Math.sin(a) * L * 0.05, f.y + Math.sin(a) * L * 0.3 + Math.cos(a) * L * 0.05, 1.1 * f.s, 0, Math.PI * 2);
      ctx.fill();
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of fish) {
        let ax = 0, ay = 0, cx = 0, cy = 0, sx = 0, sy = 0, n = 0;
        for (const o of fish) {
          if (o === f) continue;
          const dx = o.x - f.x;
          const dy = o.y - f.y;
          const d = dx * dx + dy * dy;
          if (d < 90 * 90) {
            ax += o.vx; ay += o.vy; cx += o.x; cy += o.y; n++;
            if (d < 22 * 22) { sx -= dx / (d + 1); sy -= dy / (d + 1); }
          }
        }
        if (n) {
          f.vx += (ax / n - f.vx) * 0.05 + (cx / n - f.x) * 0.0009;
          f.vy += (ay / n - f.vy) * 0.05 + (cy / n - f.y) * 0.0009;
        }
        f.vx += sx * 1.4;
        f.vy += sy * 1.4;
        // the same current as the particle field
        const ang = (Math.cos(f.x * 0.005) + Math.sin(f.y * 0.005)) * Math.PI;
        f.vx += Math.cos(ang) * 0.035;
        f.vy += Math.sin(ang) * 0.035;
        // scatter from the cursor
        const mx = f.x - mouse.x;
        const my = f.y - mouse.y;
        const md = Math.hypot(mx, my);
        if (md < 140) { f.vx += (mx / md) * 0.9; f.vy += (my / md) * 0.9; }
        const sp = Math.hypot(f.vx, f.vy) || 0.001;
        const lim = Math.min(4.5, Math.max(1.3, sp));
        f.vx = (f.vx / sp) * lim;
        f.vy = (f.vy / sp) * lim;
        f.x += f.vx;
        f.y += f.vy;
        f.t += 0.18 + sp * 0.06;
        const m = 30;
        if (f.x < -m) f.x = w + m;
        if (f.x > w + m) f.x = -m;
        if (f.y < -m) f.y = h + m;
        if (f.y > h + m) f.y = -m;
        drawFish(f);
      }
      raf = requestAnimationFrame(step);
    };

    if (reduced) fish.forEach(drawFish);
    else step();

    const host = cv.parentElement!;
    const move = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const leave = () => { mouse.x = mouse.y = -9999; };
    host.addEventListener("mousemove", move);
    host.addEventListener("mouseleave", leave);
    window.addEventListener("resize", size);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("mousemove", move);
      host.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", size);
    };
  }, [count, color]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
