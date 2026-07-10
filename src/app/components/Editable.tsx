"use client";

import { useContent } from "../content-context";

// 可编辑文本：编辑模式下渲染为输入框/文本域，否则渲染原文。
export function Editable({
  value,
  onChange,
  multiline = false,
  placeholder = "点击编辑…",
  className = "",
  inputClassName = "",
}: {
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}) {
  const { editing } = useContent();

  if (!editing) {
    return <span className={className}>{value || placeholder}</span>;
  }

  const base =
    "bg-white/90 border border-accent/40 rounded px-2 py-1 text-foreground focus:outline-none focus:border-accent w-full";

  if (multiline) {
    return (
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={`${base} resize-y ${inputClassName}`}
      />
    );
  }

  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${base} ${inputClassName}`}
    />
  );
}
