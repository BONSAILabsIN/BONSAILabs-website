export default function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;

  if (!client_id) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(500).send(`
      <div style="font-family: sans-serif; padding: 2rem;">
        <h2>Configuration Error</h2>
        <p><strong>GITHUB_CLIENT_ID</strong> is not defined in your Vercel Environment Variables.</p>
        <p>Please add <code>GITHUB_CLIENT_ID</code> and <code>GITHUB_CLIENT_SECRET</code> under <strong>Vercel Project Settings &gt; Environment Variables</strong>, then redeploy.</p>
      </div>
    `);
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1');
  const protocol = isLocal ? 'http' : 'https';
  const redirect_uri = process.env.GITHUB_REDIRECT_URI || `${protocol}://${host}/api/callback`;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  res.redirect(githubAuthUrl);
}
