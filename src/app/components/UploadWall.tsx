"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cloudinary } from "../data";

type Item = {
  url: string;
  type: "image" | "video";
  id: string;
};

const configured = Boolean(cloudinary.cloudName && cloudinary.uploadPreset);

export default function UploadWall() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 拉取该标签下所有已上传的图片/视频，实现「所有人都能看到」。
  const fetchItems = useCallback(async () => {
    if (!configured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const base = `https://res.cloudinary.com/${cloudinary.cloudName}`;
      const [imgRes, vidRes] = await Promise.all([
        fetch(`${base}/image/list/${cloudinary.tag}.json`).catch(() => null),
        fetch(`${base}/video/list/${cloudinary.tag}.json`).catch(() => null),
      ]);
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
      // 按创建时间新→旧（public_id 里没时间，这里用 version 近似）
      out.sort((a, b) => (a.id < b.id ? 1 : -1));
      setItems(out);
    } catch {
      setError("加载失败，稍后再试试");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || !configured) return;
    setError(null);
    setUploading(true);
    setProgress(0);
    const total = files.length;
    let done = 0;

    for (const file of Array.from(files)) {
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
        if (!res.ok) throw new Error();
      } catch {
        setError(`「${file.name}」上传失败（可能太大或格式不支持）`);
      }
      done += 1;
      setProgress(Math.round((done / total) * 100));
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    // Cloudinary 列表有几秒缓存延迟，稍等再刷新
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
            需要在 <code>src/app/data.ts</code> 里填好 Cloudinary 的 cloudName
            和 uploadPreset（详见 README）。
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mb-10">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-colors disabled:opacity-60"
            >
              {uploading ? `上传中… ${progress}%` : "＋ 上传照片 / 视频"}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              hidden
              onChange={(e) => handleFiles(e.target.files)}
            />
            <p className="text-xs text-foreground/40 mt-3">
              支持一次选多个文件 · 图片和视频都行
            </p>
            {error && (
              <p className="text-sm text-rose-500 mt-3">{error}</p>
            )}
          </div>

          {loading ? (
            <p className="text-center text-foreground/50">加载中…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-foreground/50">
              还没有人上传，来当第一个吧！
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
