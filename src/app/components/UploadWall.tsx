"use client";

import { useCallback, useEffect, useState } from "react";
import { cloudinary } from "../data";

type Item = {
  url: string;
  type: "image" | "video";
  id: string;
};

const configured = Boolean(cloudinary.cloudName && cloudinary.uploadPreset);

export default function UploadWall() {
  const [items, setItems] = useState<Item[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [listWarning, setListWarning] = useState(false);

  // 把新条目合并进列表（去重，新的排前面）
  const mergeItems = useCallback((incoming: Item[]) => {
    setItems((prev) => {
      const map = new Map<string, Item>();
      for (const it of [...incoming, ...prev]) map.set(it.id, it);
      return Array.from(map.values());
    });
  }, []);

  // 拉取该标签下所有已上传的图片/视频，实现「所有人都能看到」。
  const fetchItems = useCallback(async () => {
    if (!configured) return;
    try {
      const base = `https://res.cloudinary.com/${cloudinary.cloudName}`;
      // 加时间戳 + no-store 绕过 CDN/浏览器缓存，避免拿到开权限前的旧结果
      const bust = `?_=${Date.now()}`;
      const [imgRes, vidRes] = await Promise.all([
        fetch(`${base}/image/list/${cloudinary.tag}.json${bust}`, {
          cache: "no-store",
        }).catch(() => null),
        fetch(`${base}/video/list/${cloudinary.tag}.json${bust}`, {
          cache: "no-store",
        }).catch(() => null),
      ]);
      // 两个接口都没成功 → 很可能是 Resource list 权限没开
      if (!imgRes?.ok && !vidRes?.ok) {
        setListWarning(true);
        return;
      }
      const out: Item[] = [];
      if (imgRes?.ok) {
        const data = await imgRes.json();
        for (const r of data.resources ?? []) {
          out.push({
            id: r.public_id,
            type: "image",
            url: `${base}/image/upload/f_auto,q_auto,w_800/v${r.version}/${r.public_id}.${r.format}`,
          });
        }
      }
      if (vidRes?.ok) {
        const data = await vidRes.json();
        for (const r of data.resources ?? []) {
          out.push({
            id: r.public_id,
            type: "video",
            url: `${base}/video/upload/v${r.version}/${r.public_id}.${r.format}`,
          });
        }
      }
      out.sort((a, b) => (a.id < b.id ? 1 : -1));
      if (out.length > 0) {
        setListWarning(false);
        mergeItems(out);
      }
    } catch {
      // 静默失败，不影响上传
    }
  }, [mergeItems]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    const total = files.length;
    let ok = 0;
    const fresh: Item[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setStatus(`上传中… (${i + 1}/${total}) ${file.name}`);
      const isVideo = file.type.startsWith("video/");
      const endpoint = `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/${
        isVideo ? "video" : "image"
      }/upload`;
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", cloudinary.uploadPreset);
      form.append("tags", cloudinary.tag);
      try {
        const res = await fetch(endpoint, { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error?.message || "上传被拒绝");
        }
        // 用返回的直链立刻显示，不依赖列表接口
        fresh.push({
          id: data.public_id,
          type: isVideo ? "video" : "image",
          url: data.secure_url,
        });
        ok += 1;
      } catch (err) {
        setError(
          `「${file.name}」上传失败：${
            err instanceof Error ? err.message : "未知错误"
          }`
        );
      }
    }

    if (fresh.length > 0) mergeItems(fresh);
    setUploading(false);
    setStatus(ok > 0 ? `✅ 成功上传 ${ok} 个文件` : "");
    e.target.value = "";
    // 稍后再从服务器同步一次（拿别人传的）
    setTimeout(fetchItems, 3000);
  };

  return (
    <section id="wall" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        大家的照片墙
      </h2>
      <p className="text-center text-foreground/60 mb-10">
        谁都能传，传完所有人都看得到
      </p>

      {!configured ? (
        <div className="max-w-xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center text-amber-800">
          <p className="font-medium mb-1">上传功能尚未配置</p>
          <p className="text-sm">
            需要在 <code>src/app/data.ts</code> 里填好 Cloudinary 配置（详见
            README）。
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mb-10">
            {/* 用 label 包住 input，点击由浏览器原生处理，最稳 */}
            <label
              className={`px-8 py-3 rounded-full bg-accent text-white font-medium transition-colors cursor-pointer ${
                uploading ? "opacity-60 pointer-events-none" : "hover:bg-accent/90"
              }`}
            >
              {uploading ? "上传中…" : "＋ 上传照片 / 视频"}
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={onPick}
                disabled={uploading}
              />
            </label>
            <p className="text-xs text-foreground/40 mt-3">
              支持一次选多个文件 · 图片和视频都行
            </p>
            <button
              onClick={() => fetchItems()}
              className="text-xs text-accent underline mt-2 hover:opacity-70"
            >
              刷新照片墙
            </button>
            {status && (
              <p className="text-sm text-foreground/70 mt-3">{status}</p>
            )}
            {error && <p className="text-sm text-rose-500 mt-3">{error}</p>}
          </div>

          {listWarning && items.length === 0 && (
            <div className="max-w-xl mx-auto mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center text-amber-800 text-sm">
              <p className="font-medium mb-1">照片能上传，但列表暂时读不出来</p>
              <p>
                需要在 Cloudinary 后台 Settings → Security 里打开 “Resource
                list”。你自己刚上传的仍会立即显示在下面。
              </p>
            </div>
          )}

          {items.length === 0 ? (
            <p className="text-center text-foreground/50">
              还没有照片，点上面的按钮来当第一个吧！
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-md"
                >
                  {it.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.url}
                      alt="回忆"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={it.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
