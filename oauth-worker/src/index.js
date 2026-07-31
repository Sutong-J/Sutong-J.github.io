/**
 * Minimal GitHub OAuth proxy for Decap / Sveltia CMS.
 * Based on the common Netlify CMS OAuth Cloudflare Worker pattern.
 *
 * Secrets:
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 */

const clientId = () => globalThis.GITHUB_CLIENT_ID;
const clientSecret = () => globalThis.GITHUB_CLIENT_SECRET;

function html(content) {
  return new Response(content, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export default {
  async fetch(request, env) {
    globalThis.GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
    globalThis.GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '') || '/';

    if (path === '/' || path === '/auth') {
      const provider = 'github';
      const redirectUri = `${url.origin}/callback`;
      const authUrl =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${encodeURIComponent(clientId())}` +
        `&scope=${encodeURIComponent('repo,user')}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}`;

      // CMS expects /auth to redirect to provider
      if (path === '/auth') {
        return Response.redirect(authUrl, 302);
      }

      return html(`<!DOCTYPE html><html><body>
        <p>JJ Blog OAuth proxy is running.</p>
        <p><a href="/auth">Authorize with GitHub</a></p>
      </body></html>`);
    }

    if (path === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return html('<p>Missing code</p>');
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId(),
          client_secret: clientSecret(),
          code,
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) {
        return html(`<pre>${JSON.stringify(tokenData, null, 2)}</pre>`);
      }

      const token = tokenData.access_token;
      // Post message expected by Decap/Sveltia CMS auth popup
      const payload = JSON.stringify({ token, provider: 'github' });
      return html(`<!DOCTYPE html>
<html>
<body>
<script>
  (function () {
    var payload = ${JSON.stringify(payload)};
    function receiveMessage(e) {
      window.opener.postMessage('authorization:github:success:' + payload, e.origin);
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
<p>Login success. You can close this window.</p>
</body>
</html>`);
    }

    return new Response('Not found', { status: 404 });
  },
};
