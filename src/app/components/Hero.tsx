"use client";

import { useEffect, useState } from "react";
import { site } from "../data";

// 计算从认识那天到现在的天数，实时跳动。
function useDaysKnown(metDate: string) {
  const [days, setDays] = useState<number | null>(null);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - new Date(metDate).getTime();
      setDays(Math.floor(diff / 86400000));
      setSecs(Math.floor((diff % 86400000) / 1000));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [metDate]);

  return { days, secs };
}

export default function Hero() {
  const { days, secs } = useDaysKnown(site.metDate);

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-soft/40 via-transparent to-transparent" />
      <div className="relative animate-float-up">
        <p className="text-accent tracking-[0.3em] text-sm mb-4">
          BEST FRIENDS · 塑料兄弟情
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          {site.title}
        </h1>
        <p className="text-lg md:text-2xl text-foreground/70 mb-8">
          {site.subtitle}
        </p>
        <p className="max-w-xl mx-auto text-foreground/70 leading-relaxed mb-12">
          {site.intro}
        </p>

        {days !== null && (
          <div className="inline-flex flex-col items-center bg-paper/80 backdrop-blur rounded-2xl px-10 py-6 shadow-lg shadow-accent/10 border border-accent-soft/50">
            <span className="text-xs text-foreground/50 mb-3 tracking-widest">
              {site.metLabel}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-bold text-accent tabular-nums">
                {days.toLocaleString()}
              </span>
              <span className="text-lg text-foreground/60">天</span>
            </div>
            <span className="text-xs text-foreground/40 mt-2 tabular-nums">
              外加 {secs} 秒，还在继续
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
