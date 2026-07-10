import { site } from "../data";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-accent-soft/40 py-10 text-center">
      <p className="text-foreground/60 text-sm">
        {site.title} · {site.subtitle}
      </p>
      <p className="text-foreground/40 text-xs mt-2">
        愿时光温柔，愿我们常聚 · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
