"use client";

import { useContent } from "../content-context";
import { Editable } from "./Editable";
import { type Stat } from "../data";

export default function Stats() {
  const { content, editing, update } = useContent();
  const stats = content.stats;

  const setStat = (i: number, patch: Partial<Stat>) => {
    update({ stats: stats.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  };
  const addStat = () => update({ stats: [...stats, { value: "0", label: "新数据" }] });
  const removeStat = (i: number) =>
    update({ stats: stats.filter((_, idx) => idx !== i) });

  return (
    <section id="stats" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        我们的数字
      </h2>
      <p className="text-center text-foreground/60 mb-12">
        一些经不起推敲但绝对真实的统计
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="relative bg-paper rounded-2xl p-6 text-center shadow-md border border-accent-soft/40"
          >
            {editing && (
              <button
                onClick={() => removeStat(i)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center hover:bg-rose-600"
              >
                ✕
              </button>
            )}
            <div className="text-3xl md:text-4xl font-bold text-accent tabular-nums mb-2">
              <Editable
                value={s.value}
                onChange={(v) => setStat(i, { value: v })}
                inputClassName="text-center"
              />
            </div>
            <div className="text-sm text-foreground/60 leading-snug">
              <Editable
                value={s.label}
                onChange={(v) => setStat(i, { label: v })}
                inputClassName="text-center"
              />
            </div>
          </div>
        ))}
        {editing && (
          <button
            onClick={addStat}
            className="rounded-2xl border-2 border-dashed border-accent/40 text-accent/70 hover:border-accent hover:text-accent min-h-[120px] flex items-center justify-center"
          >
            ＋ 加一项
          </button>
        )}
      </div>
    </section>
  );
}
