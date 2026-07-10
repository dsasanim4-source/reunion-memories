import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "发小天团 · 十几个人从小闹到大的搞笑纪录片",
  description: "记录我们这帮发小干过的那些傻事：成员图鉴、黑历史、名场面、说不完的糗事。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col paper-grain">{children}</body>
    </html>
  );
}
