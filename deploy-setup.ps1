# 一键准备并推送到 GitHub Pages 源仓库
# 用法: 在 PowerShell 中执行  .\deploy-setup.ps1

$ErrorActionPreference = "Stop"
$Repo = "Sutong-J/Sutong-J.github.io"
$SiteUrl = "https://sutong-j.github.io"

Write-Host "==> 检查 gh / git / node ..." -ForegroundColor Cyan
gh auth status
node -v
npm -v

Write-Host "==> 安装依赖 ..." -ForegroundColor Cyan
npm install

Write-Host "==> 本地生成测试 ..." -ForegroundColor Cyan
npx hexo clean
npx hexo generate

Write-Host "==> 创建/确认远程仓库 $Repo ..." -ForegroundColor Cyan
$exists = gh repo view $Repo 2>$null
if (-not $exists) {
  gh repo create $Repo --public --source=. --remote=origin --description "JJ tech blog (Hexo)"
} else {
  Write-Host "仓库已存在，检查 git remote ..."
  if (-not (Test-Path .git)) {
    git init
    git branch -M main
  }
  $remote = git remote get-url origin 2>$null
  if (-not $remote) {
    git remote add origin "https://github.com/$Repo.git"
  }
}

Write-Host "==> 提交并推送源码到 main ..." -ForegroundColor Cyan
git add .
git status
git commit -m "Deploy JJ blog source for GitHub Pages" 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "没有新变更可提交，或已提交过。"
}
git push -u origin main

Write-Host ""
Write-Host "下一步（只需一次）：" -ForegroundColor Yellow
Write-Host "1. 打开 https://github.com/$Repo/settings/pages"
Write-Host "2. Build and deployment → Source 选 GitHub Actions"
Write-Host "3. 等待 Actions 跑完后访问: $SiteUrl"
Write-Host ""
Write-Host "之后每次 git push 到 main，网站会自动更新。" -ForegroundColor Green
