"use client";

import Image from "next/image";
import { useContent } from "../content-context";
import { Editable } from "./Editable";
import { palette, type Member } from "../data";

export default function Members() {
  const { content, editing, update } = useContent();
  const members = content.members;

  const setMember = (i: number, patch: Partial<Member>) => {
    const next = members.map((m, idx) => (idx === i ? { ...m, ...patch } : m));
    update({ members: next });
  };

  const addMember = () => {
    const color = palette[members.length % palette.length];
    update({
      members: [...members, { name: "新成员", title: "", quote: "", color }],
    });
  };

  const removeMember = (i: number) => {
    update({ members: members.filter((_, idx) => idx !== i) });
  };

  return (
    <section id="members" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        成员图鉴
      </h2>
      <p className="text-center text-foreground/60 mb-16">
        本群{members.length}位重量级人物，一个都不能少
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {members.map((m, i) => (
          <div
            key={i}
            className="relative bg-paper rounded-2xl p-5 text-center shadow-md border border-accent-soft/40 hover:shadow-lg transition-shadow"
          >
            {editing && (
              <button
                onClick={() => removeMember(i)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center hover:bg-rose-600"
                title="删除这个成员"
              >
                ✕
              </button>
            )}
            <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-accent-soft/50">
              {m.avatar ? (
                <Image
                  src={m.avatar}
                  alt={m.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${m.color} flex items-center justify-center`}
                >
                  <span className="text-2xl font-bold text-white/80">
                    {m.name.slice(0, 1)}
                  </span>
                </div>
              )}
            </div>
            <div className="font-bold text-lg">
              <Editable
                value={m.name}
                onChange={(v) => setMember(i, { name: v })}
                inputClassName="text-center"
              />
            </div>
            {(editing || m.title) && (
              <div className="text-accent text-sm font-medium mb-2 mt-1">
                <Editable
                  value={m.title}
                  onChange={(v) => setMember(i, { title: v })}
                  placeholder="江湖称号"
                  inputClassName="text-center"
                />
              </div>
            )}
            {(editing || m.quote) && (
              <div className="text-foreground/60 text-sm leading-snug">
                {editing ? (
                  <Editable
                    value={m.quote}
                    onChange={(v) => setMember(i, { quote: v })}
                    placeholder="口头禅"
                    inputClassName="text-center"
                  />
                ) : (
                  <>「{m.quote}」</>
                )}
              </div>
            )}
          </div>
        ))}

        {editing && (
          <button
            onClick={addMember}
            className="rounded-2xl border-2 border-dashed border-accent/40 text-accent/70 hover:border-accent hover:text-accent min-h-[180px] flex items-center justify-center text-lg"
          >
            ＋ 添加成员
          </button>
        )}
      </div>
    </section>
  );
}
