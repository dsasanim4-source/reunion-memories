# 那年那日 · 我们的聚会回忆

一个用于记录班级 / 团队聚会回忆的静态网站，基于 Next.js 构建，部署在 GitHub Pages。

## 功能

- **首页 Hero + 倒数**：展示主题，并对下次聚会日期实时倒数
- **时光轴**：按年份回顾一起走过的重要时刻
- **照片墙**：拍立得风格的照片展示（支持渐变占位或真实图片）
- **留言墙**：访客可留言，保存在浏览器本地

## 修改内容

所有文字、时间线、照片说明、留言都集中在 `src/app/data.ts`，直接编辑即可，无需改动组件。

替换真实照片：把图片放到 `public/` 目录，在 `data.ts` 的 `photos` 中填写 `src`（如 `src: "/photo1.jpg"`）。

## 本地开发

```bash
npm install
npm run dev
```

## 大家上传照片/视频（Cloudinary 配置）

「大家的照片墙」板块让任何访客上传图片和视频，且所有人都能看到。它用
[Cloudinary](https://cloudinary.com)（免费额度 25GB）做存储，无需自建服务器。

第一次使用需配置（一次性，约 5 分钟）：

1. 注册 Cloudinary 免费账号，登录后在 **Dashboard** 首页记下 **Cloud name**。
2. 进 **Settings → Upload → Upload presets**，点 **Add upload preset**：
   - **Signing Mode** 选 **Unsigned**（免签名，这样网页端才能直接传）
   - 保存后记下这个 preset 的 **名字**
3. 进 **Settings → Security**，勾选 **Resource list**（允许按标签列出资源，
   否则照片墙拉不到已上传的文件）。
4. 打开 `src/app/data.ts`，把 `cloudinary` 里的两个值填上：
   ```ts
   export const cloudinary = {
     cloudName: "你的 cloud name",
     uploadPreset: "你的 preset 名字",
     tag: "reunion",
   };
   ```
5. 重新部署（见下）。填好前，照片墙会提示「尚未配置」，不影响网站其他部分。

> 说明：免签名上传意味着任何拿到网址的人都能上传。适合朋友间的小圈子；
> 如果担心被陌生人乱传，可在 Cloudinary 后台随时删除文件，或改用签名上传
> （需要后端，成本更高）。

## 倒计时

首页倒数到下次聚会。改 `src/app/data.ts` 里的 `reunionDate` 即可，
格式 `"2026-10-01 18:00"`。到期后自动显示庆祝文案。

## 部署

本地执行 `npm run deploy` 会自动构建并发布到 GitHub Pages。
若因网络无法直连 github.com，改用 `bash api-deploy.sh`（走 API 部署）。
