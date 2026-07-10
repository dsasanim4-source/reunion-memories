import type { NextConfig } from "next";

// GitHub Pages 部署在 https://<user>.github.io/<repo>/ 路径下，
// 需要设置 basePath；本地开发时保持根路径。
const repoName = "reunion-memories";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // 静态导出，生成纯静态文件供 GitHub Pages 托管
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true, // GitHub Pages 无 Next 图片优化服务
  },
  trailingSlash: true,
};

export default nextConfig;
