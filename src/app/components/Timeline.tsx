import { timeline } from "../data";

export default function Timeline() {
  return (
    <section id="timeline" className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        时光轴
      </h2>
      <p className="text-center text-foreground/60 mb-16">
        我们一起走过的重要时刻
      </p>

      <div className="relative">
        {/* 竖线 */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-accent-soft md:-translate-x-1/2" />

        <div className="space-y-12">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`relative flex items-start gap-6 md:gap-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* 圆点 */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-background md:-translate-x-1/2 mt-2" />

              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <span className="text-accent font-bold text-lg">
                  {item.year}
                </span>
                <h3 className="text-xl font-semibold mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
