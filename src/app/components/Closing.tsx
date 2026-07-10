"use client";

import { useContent } from "../content-context";
import { Editable } from "./Editable";
import { type Message } from "../data";

export default function Closing() {
  const { content, editing, update } = useContent();
  const messages = content.messages;

  const setMsg = (i: number, patch: Partial<Message>) => {
    update({
      messages: messages.map((m, idx) => (idx === i ? { ...m, ...patch } : m)),
    });
  };
  const addMsg = () =>
    update({ messages: [...messages, { name: "署名", text: "想说的话…" }] });
  const removeMsg = (i: number) =>
    update({ messages: messages.filter((_, idx) => idx !== i) });

  return (
    <section id="closing" className="max-w-2xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        最后说点正经的
      </h2>
      <p className="text-center text-foreground/60 mb-12">
        （就这一次，别习惯了）
      </p>

      <ul className="space-y-5">
        {messages.map((m, i) => (
          <li
            key={i}
            className="relative bg-white/70 rounded-2xl px-6 py-5 shadow-sm border border-accent-soft/30"
          >
            {editing && (
              <button
                onClick={() => removeMsg(i)}
                className="absolute top-3 right-3 text-xs text-rose-500 hover:underline"
              >
                删除
              </button>
            )}
            <div className="text-sm text-accent font-medium mb-2">
              <Editable
                value={m.name}
                onChange={(v) => setMsg(i, { name: v })}
                placeholder="署名"
              />
            </div>
            <div className="text-foreground/80 leading-relaxed text-lg">
              {editing ? (
                <Editable
                  value={m.text}
                  onChange={(v) => setMsg(i, { text: v })}
                  multiline
                />
              ) : (
                <>「{m.text}」</>
              )}
            </div>
          </li>
        ))}
      </ul>

      {editing && (
        <div className="text-center mt-8">
          <button
            onClick={addMsg}
            className="px-6 py-2 rounded-full border-2 border-dashed border-accent/40 text-accent/70 hover:border-accent hover:text-accent"
          >
            ＋ 加一句
          </button>
        </div>
      )}
    </section>
  );
}
