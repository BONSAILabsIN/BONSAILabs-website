export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send("Missing OAuth code from GitHub.");
  }

  if (!client_id || !client_secret) {
    return res.status(500).send("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in Vercel Environment Variables.");
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(`GitHub OAuth Error: ${data.error_description || data.error}`);
    }

    const token = data.access_token;
    const provider = "github";

    if (!token) {
      return res.status(400).send("GitHub did not return an access token.");
    }

    const authDataString = JSON.stringify({ token, provider });
    const successMsg = `authorization:${provider}:success:${authDataString}`;

    const script = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Authorizing Decap CMS...</title>
      </head>
      <body style="font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f9fafb; color: #111827;">
        <div style="text-align: center; max-width: 400px; padding: 2rem; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem;">Authorizing with GitHub...</h3>
          <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">Connecting to Decap CMS. This window will close automatically.</p>
        </div>
        <script>
          (function() {
            const successMsg = ${JSON.stringify(successMsg)};
            const provider = ${JSON.stringify(provider)};

            function sendToOpener(msg, targetOrigin) {
              if (window.opener) {
                try {
                  window.opener.postMessage(msg, targetOrigin || '*');
                } catch (e) {
                  console.error('postMessage error:', e);
                }
              }
            }

            // Standard Decap/Netlify CMS handshake listener
            function handleMessage(e) {
              if (e && e.data === 'authorizing:' + provider) {
                sendToOpener(successMsg, e.origin);
                sendToOpener(successMsg, '*');
                setTimeout(function() { window.close(); }, 300);
              }
            }

            window.addEventListener('message', handleMessage, false);

            // Send handshake initiation and token
            sendToOpener('authorizing:' + provider, '*');
            sendToOpener(successMsg, '*');

            // Fallback loop to guarantee message delivery
            let attempts = 0;
            const interval = setInterval(function() {
              attempts++;
              sendToOpener('authorizing:' + provider, '*');
              sendToOpener(successMsg, '*');
              if (attempts >= 15) {
                clearInterval(interval);
                setTimeout(function() { window.close(); }, 1000);
              }
            }, 300);
          })();
        </script>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(script);
  } catch (error) {
    res.status(500).send(`Authentication Server Error: ${error.message}`);
  }
}
