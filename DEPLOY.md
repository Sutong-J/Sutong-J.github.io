# 部署说明（Sutong-J → GitHub Pages）

目标地址：**https://sutong-j.github.io**

## 方式一：一键脚本（推荐）

在 PowerShell 中：

```powershell
cd d:\Desktop\JJ-blog
.\deploy-setup.ps1
```

然后打开：

https://github.com/Sutong-J/Sutong-J.github.io/settings/pages

把 **Build and deployment → Source** 改成 **GitHub Actions**。

等 Actions 变绿后访问：https://sutong-j.github.io

## 方式二：手动命令

```powershell
cd d:\Desktop\JJ-blog
npm install
npx hexo generate

gh repo create Sutong-J/Sutong-J.github.io --public --source=. --remote=origin
# 若仓库已存在则跳过上一行，改为:
# git init
# git remote add origin https://github.com/Sutong-J/Sutong-J.github.io.git

git add .
git commit -m "Deploy JJ blog"
git branch -M main
git push -u origin main
```

同样在仓库 Settings → Pages → Source 选 **GitHub Actions**。

## 以后更新文章

```powershell
npx hexo new "文章标题"
# 编辑 source/_posts/...
git add .
git commit -m "Add post"
git push
```

推送后 GitHub Actions 会自动重新构建并发布。

## 以后绑定自己的域名

1. 购买域名（Cloudflare / Namesilo / 阿里云等）
2. 在域名 DNS 添加：
   - `A` 记录指向 GitHub Pages IP，或
   - `CNAME` 记录指向 `sutong-j.github.io`
3. 在仓库 Settings → Pages → Custom domain 填入你的域名
4. 把 `_config.yml` 里的 `url` 改成你的域名后重新推送

## 评论（Giscus）

站点上线后，用这个公开仓库配置 Giscus，填进 `_config.butterfly.yml`。
