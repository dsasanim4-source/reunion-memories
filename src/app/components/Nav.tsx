"use client";

const links = [
  { href: "#members", label: "图鉴" },
  { href: "#stats", label: "数字" },
  { href: "#timeline", label: "黑历史" },
  { href: "#gallery", label: "名场面" },
  { href: "#wall", label: "照片墙" },
  { href: "#quiz", label: "小测验" },
  { href: "#closing", label: "心里话" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b border-accent-soft/30">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-bold text-accent">
          发小天团
        </a>
        <ul className="flex gap-6 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-foreground/70 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
