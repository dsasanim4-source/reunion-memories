"use client";

import { useContent } from "../content-context";
import { Editable } from "./Editable";
import { type TimelineItem } from "../data";

export default function Timeline() {
  const { content, editing, update } = useContent();
  const timeline = content.timeline;

  const setItem = (i: number, patch: Partial<TimelineItem>) => {
    update({
      timeline: timeline.map((t, idx) => (idx === i ? { ...t, ...patch } : t)),
    });
  };
  const addItem = () =>
    update({
      timeline: [...timeline, { year: "年份", title: "标题", desc: "发生了啥…" }],
    });
  const removeItem = (i: number) =>
    update({ timeline: timeline.filter((_, idx) => idx !== i) });

  return (
    <section id="timeline" className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        黑历史编年史
      </h2>
      <p className="text-center text-foreground/60 mb-16">
        那些年我俩一起干过的蠢事，一件都跑不掉
      </p>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-accent-soft md:-translate-x-1/2" />

        <div className="space-y-12">
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`relative flex items-start gap-6 md:gap-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-background md:-translate-x-1/2 mt-2" />

              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                {editing && (
                  <button
                    onClick={() => removeItem(i)}
                    className="mb-1 text-xs text-rose-500 hover:underline"
                  >
                    删除这条
                  </button>
                )}
                <div className="text-accent font-bold text-lg">
                  <Editable
                    value={item.year}
                    onChange={(v) => setItem(i, { year: v })}
                  />
                </div>
                <div className="text-xl font-semibold mt-1 mb-2">
                  <Editable
                    value={item.title}
                    onChange={(v) => setItem(i, { title: v })}
                  />
                </div>
                <div className="text-foreground/70 leading-relaxed">
                  <Editable
                    value={item.desc}
                    onChange={(v) => setItem(i, { desc: v })}
                    multiline
                  />
                </div>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>

        {editing && (
          <div className="text-center mt-10">
            <button
              onClick={addItem}
              className="px-6 py-2 rounded-full border-2 border-dashed border-accent/40 text-accent/70 hover:border-accent hover:text-accent"
            >
              ＋ 加一段黑历史
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
