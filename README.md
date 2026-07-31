# JJ Blog

深色技术博客，基于 [Hexo](https://hexo.io) + [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)，带 Giscus 评论。

## 本地运行

```bash
cd JJ-blog
npm install
npm start
```

打开：http://localhost:4000

## 写文章

```bash
npx hexo new "文章标题"
# 编辑 source/_posts/文章标题.md
npx hexo clean && npm start
```

## 开启评论（Giscus）

1. 新建一个 **公开** GitHub 仓库（例如 `jj-blog`）
2. 仓库 Settings → Features → 打开 **Discussions**
3. 打开 https://giscus.app ，按页面提示生成配置
4. 把生成的 `repo` / `repo_id` / `category_id` 填进 `_config.butterfly.yml` 的 `giscus:` 段
5. 重新 `npm start`

## 部署到 GitHub Pages

目标：https://sutong-j.github.io

```powershell
cd d:\Desktop\JJ-blog
.\deploy-setup.ps1
```

然后到仓库 Settings → Pages → Source 选 **GitHub Actions**。  
详细步骤见 [DEPLOY.md](./DEPLOY.md)。

## 自定义

- 站名 / 作者：`_config.yml`
- 深色 / 菜单 / 评论：`_config.butterfly.yml`
- 首页样式微调：`source/css/custom.css`
