import Image from "next/image";
import { members } from "../data";

export default function Members() {
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
            className="bg-paper rounded-2xl p-5 text-center shadow-md border border-accent-soft/40 hover:shadow-lg transition-shadow"
          >
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
            <h3 className="font-bold text-lg">{m.name}</h3>
            {m.title && (
              <p className="text-accent text-sm font-medium mb-2">{m.title}</p>
            )}
            {m.quote && (
              <p className="text-foreground/60 text-sm leading-snug">
                「{m.quote}」
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
