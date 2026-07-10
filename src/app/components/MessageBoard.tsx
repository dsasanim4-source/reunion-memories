"use client";

import { useEffect, useState } from "react";
import { messages as seed, type Message } from "../data";

const STORAGE_KEY = "reunion-messages";

export default function MessageBoard() {
  const [list, setList] = useState<Message[]>(seed);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // 留言保存在浏览器本地（静态站点无后端），刷新后仍在本机可见。
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setList(JSON.parse(saved));
      } catch {
        /* 忽略损坏数据 */
      }
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const t = text.trim();
    if (!n || !t) return;
    const next = [{ name: n, text: t }, ...list];
    setList(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setName("");
    setText("");
  };

  return (
    <section id="messages" className="max-w-2xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        留言墙
      </h2>
      <p className="text-center text-foreground/60 mb-12">
        写下想对大家说的话（保存在你的浏览器中）
      </p>

      <form
        onSubmit={submit}
        className="bg-paper rounded-2xl p-6 shadow-md border border-accent-soft/40 mb-10"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="你的名字"
          className="w-full mb-3 px-4 py-2 rounded-lg border border-accent-soft/60 bg-white/70 focus:outline-none focus:border-accent"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="想说的话…"
          rows={3}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-accent-soft/60 bg-white/70 focus:outline-none focus:border-accent resize-none"
        />
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
        >
          留下祝福
        </button>
      </form>

      <ul className="space-y-4">
        {list.map((m, i) => (
          <li
            key={i}
            className="bg-white/70 rounded-xl px-5 py-4 shadow-sm border border-accent-soft/30"
          >
            <p className="text-foreground/80 leading-relaxed mb-2">
              「{m.text}」
            </p>
            <p className="text-sm text-accent font-medium">— {m.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
