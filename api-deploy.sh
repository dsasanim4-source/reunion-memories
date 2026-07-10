#!/usr/bin/env bash
# 通过 GitHub Git Data API 部署 out/ 到 gh-pages 分支。
# 用途：当本地无法直连 github.com（git push 失败）但 api.github.com 可达时的备用部署方式。
set -euo pipefail

REPO="dsasanim4-source/reunion-memories"
BRANCH="gh-pages"
DIR="out"

cd "$(dirname "$0")/$DIR"

echo "==> 上传文件为 blob 并构建 tree..."
TREE_ITEMS="[]"
while IFS= read -r f; do
  rel="${f#./}"
  # 上传 blob（base64），拿到 sha。用 --input 从 stdin 传 JSON，避开命令行长度限制。
  sha=$(node -e "const fs=require('fs');console.log(JSON.stringify({content:fs.readFileSync(process.argv[1]).toString('base64'),encoding:'base64'}))" "$f" \
        | gh api -X POST "repos/$REPO/git/blobs" --input - --jq '.sha')
  TREE_ITEMS=$(node -e "const a=JSON.parse(process.argv[1]);a.push({path:process.argv[2],mode:'100644',type:'blob',sha:process.argv[3]});console.log(JSON.stringify(a))" "$TREE_ITEMS" "$rel" "$sha")
  echo "   + $rel"
done < <(find . -type f -not -path './.git/*')

echo "==> 创建 tree..."
TREE_SHA=$(node -e "console.log(JSON.stringify({tree:JSON.parse(process.argv[1])}))" "$TREE_ITEMS" \
  | gh api -X POST "repos/$REPO/git/trees" --input - --jq '.sha')

echo "==> 创建 commit..."
PARENT=$(gh api "repos/$REPO/git/ref/heads/$BRANCH" --jq '.object.sha' 2>/dev/null || echo "")
if [ -n "$PARENT" ]; then
  COMMIT_SHA=$(gh api -X POST "repos/$REPO/git/commits" \
    -f message="部署：$(date '+%Y-%m-%d %H:%M:%S')" \
    -f tree="$TREE_SHA" -f "parents[]=$PARENT" --jq '.sha')
else
  COMMIT_SHA=$(gh api -X POST "repos/$REPO/git/commits" \
    -f message="部署：$(date '+%Y-%m-%d %H:%M:%S')" \
    -f tree="$TREE_SHA" --jq '.sha')
fi

echo "==> 更新 $BRANCH 引用..."
gh api -X PATCH "repos/$REPO/git/refs/heads/$BRANCH" \
  -f sha="$COMMIT_SHA" -F force=true --jq '.object.sha' >/dev/null

echo ""
echo "✅ 通过 API 部署完成！"
echo "   https://dsasanim4-source.github.io/reunion-memories/"
