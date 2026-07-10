"use client";

import Image from "next/image";
import { useContent } from "../content-context";
import { Editable } from "./Editable";
import { type Photo } from "../data";

export default function Gallery() {
  const { content, editing, update } = useContent();
  const photos = content.photos;

  const setPhoto = (i: number, patch: Partial<Photo>) => {
    update({ photos: photos.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) });
  };

  return (
    <section id="gallery" className="bg-paper/60 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          名场面照片墙
        </h2>
        <p className="text-center text-foreground/60 mb-16">
          每一张都是可以拿来威胁对方一辈子的黑料
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, i) => (
            <figure
              key={i}
              className="group relative rounded-xl overflow-hidden bg-white p-3 pb-10 shadow-md hover:shadow-xl transition-shadow"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.2}deg)` }}
            >
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${photo.color} flex items-center justify-center`}
                  >
                    <span className="text-white/70 text-sm">照片占位</span>
                  </div>
                )}
              </div>
              <figcaption className="absolute bottom-3 left-0 right-0 text-center text-sm text-foreground/70 px-3">
                <Editable
                  value={photo.caption}
                  onChange={(v) => setPhoto(i, { caption: v })}
                  inputClassName="text-center text-xs"
                />
              </figcaption>
            </figure>
          ))}
        </div>
        {editing && (
          <p className="text-center text-xs text-foreground/40 mt-6">
            提示：这里是「名场面」文字说明。真实照片/视频请用下方「大家的照片墙」上传。
          </p>
        )}
      </div>
    </section>
  );
}
