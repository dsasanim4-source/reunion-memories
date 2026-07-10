import { messages } from "../data";

export default function Closing() {
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
            className="bg-white/70 rounded-2xl px-6 py-5 shadow-sm border border-accent-soft/30"
          >
            <p className="text-sm text-accent font-medium mb-2">{m.name}</p>
            <p className="text-foreground/80 leading-relaxed text-lg">
              「{m.text}」
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
