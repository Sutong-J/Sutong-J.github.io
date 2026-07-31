# 在线写作后台（/admin）

访问地址（部署后）：**https://sutong-j.github.io/admin/**

用 GitHub 登录后，可在浏览器里写文章、改「关于」页，保存即提交到仓库并触发自动部署。

## 一次性配置（约 5 分钟）

### 1. 创建 GitHub OAuth App

打开：https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**

填写：

| 字段 | 值 |
|---|---|
| Application name | JJ Blog CMS |
| Homepage URL | https://sutong-j.github.io |
| Authorization callback URL | `https://<你的-worker域名>/callback` |

先随便填一个 callback（下一步部署 Worker 后改成真实地址）。创建后记下：

- Client ID  
- Client Secret  

### 2. 部署 OAuth Worker（Cloudflare）

需有免费 Cloudflare 账号，并安装 Node。

```powershell
cd d:\Desktop\JJ-blog\oauth-worker
npm install -g wrangler
npx wrangler login
npx wrangler deploy
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

部署成功后会得到类似：

`https://jj-blog-oauth.<你的账号>.workers.dev`

回到 GitHub OAuth App，把 **Authorization callback URL** 改成：

`https://jj-blog-oauth.<你的账号>.workers.dev/callback`

### 3. 写入 CMS 配置

编辑 `source/admin/config.yml`：

```yaml
backend:
  base_url: https://jj-blog-oauth.<你的账号>.workers.dev
```

提交推送：

```powershell
cd d:\Desktop\JJ-blog
git add .
git commit -m "Configure CMS OAuth"
git push
```

等 Actions 完成后打开：https://sutong-j.github.io/admin/

用 GitHub 登录即可写文章。

## 日常使用

1. 打开 https://sutong-j.github.io/admin/  
2. Login with GitHub  
3. 新建「文章」→ 写标题和正文 → Publish / Save  
4. 几分钟后首页自动更新  

## 说明

- 后台只会改 GitHub 仓库内容，不会把密码存在博客服务器上  
- 需要仓库写入权限（你自己的账号即可）  
- 图片上传会保存到 `source/img/`  
