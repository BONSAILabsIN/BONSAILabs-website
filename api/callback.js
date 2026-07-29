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

    const script = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authorizing Decap CMS...</title>
      </head>
      <body style="font-family: sans-serif; display: flex; items-center: center; justify-content: center; height: 100vh;">
        <p>Connecting to Decap CMS... You can close this window if it does not close automatically.</p>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("Decap CMS Handshake:", e);
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({ token, provider })}',
                e.origin
              );
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
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
