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

首页倒数到下次聚会。可在网页编辑模式里改日期（见下），
或改 `src/app/data.ts` 里的 `reunionDate`，格式 `"2026-10-01 18:00"`。

## 网页在线编辑（Firebase 配置）

标题、介绍、成员、数字、黑历史、测验、心里话等文字，都能在网页上直接编辑，
保存后所有人都看到最新内容。需要配置 [Firebase](https://firebase.google.com)（免费）。

配置步骤（一次性）：

1. 打开 https://console.firebase.google.com ，点 **添加项目 / Add project**，
   起个名字（比如 reunion），一路下一步创建。
2. 项目建好后，在项目首页点那个 **`</>`（Web）** 图标，注册一个 Web 应用，
   给应用起个名字。之后它会显示一段 `firebaseConfig = { apiKey: "...", ... }`。
   **把这几个值复制下来。**
3. 左侧菜单 **构建 Build → Firestore Database → 创建数据库**。位置随便选，
   模式选 **以测试模式开始**（或生产模式，规则见第 5 步）。
4. 打开 `src/app/firebase.ts`，把第 2 步复制的值填进 `firebaseConfig`；
   顺便把 `EDIT_PASSWORD` 改成你们约定的编辑密码。
5. 在 Firestore 的 **规则 Rules** 标签，粘贴下面的规则并发布
   （允许所有人读、允许写 site/content 这一个文档）：
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /site/content {
         allow read, write: if true;
       }
       match /{document=**} {
         allow read: if true;
       }
     }
   }
   ```
6. 重新部署。

配置好后，网页右上角出现 **编辑** 按钮 → 输入密码 → 进入编辑模式，
可直接改文字、加减成员/条目，点 **保存** 写入 Firebase。

> 安全说明：编辑受密码保护，但密码写在前端代码里、规则也允许匿名写，
> 属于「防君子不防小人」，适合朋友小圈子。别把密码和网址一起公开发到大群外。

## 部署

本地执行 `npm run deploy` 会自动构建并发布到 GitHub Pages。
若因网络无法直连 github.com，改用 `bash api-deploy.sh`（走 API 部署）。
