"use client";

const links = [
  { href: "#timeline", label: "时光轴" },
  { href: "#gallery", label: "照片墙" },
  { href: "#messages", label: "留言墙" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b border-accent-soft/30">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-bold text-accent">
          那年那日
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
