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

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。
仓库 Settings → Pages → Source 选择 **GitHub Actions**。
