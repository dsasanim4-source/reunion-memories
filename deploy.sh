#!/usr/bin/env bash
# 一键部署脚本：构建静态站点并推送到 gh-pages 分支。
# 用法：npm run deploy   或   bash deploy.sh
set -euo pipefail

REPO_URL="https://github.com/dsasanim4-source/reunion-memories.git"
BRANCH="gh-pages"

echo "==> 1/3 构建静态站点..."
npm run build

echo "==> 2/3 准备部署目录..."
touch out/.nojekyll

echo "==> 3/3 推送到 $BRANCH 分支..."
cd out
# out/ 是构建产物，每次都重建一个干净的 git 仓库再强推，避免历史膨胀。
rm -rf .git
git init -q
git checkout -q -b "$BRANCH"
git add -A
git commit -q -m "部署：$(date '+%Y-%m-%d %H:%M:%S')"
git push -f -q "$REPO_URL" "$BRANCH"
cd ..

echo ""
echo "✅ 部署完成！几十秒后生效："
echo "   https://dsasanim4-source.github.io/reunion-memories/"
