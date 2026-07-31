# JJ Blog

深色技术博客，基于 [Hexo](https://hexo.io) + [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)。

线上地址：https://sutong-j.github.io/

## 本地运行

```bash
cd JJ-blog
npm install
npm start
```

打开：http://localhost:4000

## 写文章（本地）

```bash
npx hexo new "文章标题"
# 编辑 source/_posts/文章标题.md
git add .
git commit -m "Add post"
git push
```

## 在线写作（浏览器）

配置完成后打开：https://sutong-j.github.io/admin/

一次性配置见 [ADMIN.md](./ADMIN.md)。

## 部署

推送到 `main` 即可，GitHub Actions 自动发布。详见 [DEPLOY.md](./DEPLOY.md)。

## 自定义

- 站名 / 作者：`_config.yml`
- 深色 / 菜单 / 评论：`_config.butterfly.yml`
- 首页样式微调：`source/css/custom.css`
- 在线写作：`source/admin/` + [ADMIN.md](./ADMIN.md)
