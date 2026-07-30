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

    const script = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authorizing Decap CMS...</title>
      </head>
      <body style="font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f9fafb; color: #111827;">
        <div style="text-align: center; max-width: 400px; padding: 2rem; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem;">Authorizing with GitHub...</h3>
          <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">Connecting to Decap CMS. This window will close automatically.</p>
        </div>
        <script>
          (function() {
            const token = ${JSON.stringify(token)};
            const provider = ${JSON.stringify(provider)};
            const successMsg = 'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider });

            let handshakeDone = false;

            function receiveMessage(e) {
              if (e.data === "authorizing:" + provider) {
                handshakeDone = true;
                window.removeEventListener("message", receiveMessage, false);
                if (window.opener) {
                  window.opener.postMessage(successMsg, e.origin || "*");
                  window.opener.postMessage(successMsg, "*");
                }
                setTimeout(function() {
                  window.close();
                }, 500);
              }
            }

            window.addEventListener("message", receiveMessage, false);

            function doHandshake() {
              if (handshakeDone) return;
              if (window.opener) {
                window.opener.postMessage("authorizing:" + provider, "*");
              }
            }

            doHandshake();

            const interval = setInterval(function() {
              if (handshakeDone) {
                clearInterval(interval);
              } else {
                doHandshake();
              }
            }, 250);
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
