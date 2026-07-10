"use client";

import { useEffect, useState } from "react";
import { useContent } from "../content-context";
import { Editable } from "./Editable";
import { site } from "../data";

// 倒数到下次聚会。返回剩余天/时/分/秒，到期返回 null。
function useCountdown(target: string) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = new Date(target.replace(/-/g, "/")).getTime() - Date.now();
      setLeft(diff > 0 ? diff : 0);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (left === null) return undefined;
  if (left <= 0) return null;
  return {
    days: Math.floor(left / 86400000),
    hours: Math.floor((left % 86400000) / 3600000),
    mins: Math.floor((left % 3600000) / 60000),
    secs: Math.floor((left % 60000) / 1000),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl font-bold text-accent tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-foreground/60 mt-1">{label}</span>
    </div>
  );
}

export default function Hero() {
  const { content, editing, update } = useContent();
  const cd = useCountdown(content.reunionDate);

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-soft/40 via-transparent to-transparent" />
      <div className="relative animate-float-up w-full max-w-2xl">
        <p className="text-accent tracking-[0.3em] text-sm mb-4">
          BEST FRIENDS · 塑料兄弟情
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          <Editable
            value={content.title}
            onChange={(v) => update({ title: v })}
            inputClassName="text-center text-4xl"
          />
        </h1>
        <div className="text-lg md:text-2xl text-foreground/70 mb-8">
          <Editable
            value={content.subtitle}
            onChange={(v) => update({ subtitle: v })}
            inputClassName="text-center"
          />
        </div>
        <div className="max-w-xl mx-auto text-foreground/70 leading-relaxed mb-8">
          <Editable
            value={content.intro}
            onChange={(v) => update({ intro: v })}
            multiline
          />
        </div>

        {editing && (
          <div className="max-w-xl mx-auto mb-8 text-left bg-paper/70 rounded-xl p-4 border border-accent-soft/40">
            <label className="text-sm text-foreground/60 block mb-1">
              下次聚会日期（格式 2026-10-01 18:00）
            </label>
            <Editable
              value={content.reunionDate}
              onChange={(v) => update({ reunionDate: v })}
            />
          </div>
        )}

        {cd === null ? (
          <div className="inline-flex bg-paper/80 backdrop-blur rounded-2xl px-10 py-6 shadow-lg shadow-accent/10 border border-accent-soft/50">
            <span className="text-2xl font-bold text-accent">
              {site.reunionArrived}
            </span>
          </div>
        ) : cd ? (
          <div className="inline-flex flex-col items-center bg-paper/80 backdrop-blur rounded-2xl px-8 py-6 shadow-lg shadow-accent/10 border border-accent-soft/50">
            <span className="text-xs text-foreground/50 mb-3 tracking-widest">
              {site.reunionLabel}
            </span>
            <div className="flex gap-5 md:gap-7">
              <Unit value={cd.days} label="天" />
              <Unit value={cd.hours} label="时" />
              <Unit value={cd.mins} label="分" />
              <Unit value={cd.secs} label="秒" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
