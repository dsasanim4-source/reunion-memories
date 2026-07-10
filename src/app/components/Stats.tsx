import { stats } from "../data";

export default function Stats() {
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
            className="bg-paper rounded-2xl p-6 text-center shadow-md border border-accent-soft/40"
          >
            <div className="text-3xl md:text-4xl font-bold text-accent tabular-nums mb-2">
              {s.value}
            </div>
            <div className="text-sm text-foreground/60 leading-snug">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
