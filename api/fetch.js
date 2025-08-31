// api/fetch.js
export default async function handler(req, res) {
  const target = req.query.url;
  if (!target) {
    res.status(400).json({ error: "Missing url parameter" });
    return;
  }

  try {
    const resp = await fetch(target, {
      headers: { "User-Agent": "tweet-snapper/1.0" },
    });

    const text = await resp.text();
    res.setHeader(
      "Content-Type",
      resp.headers.get("content-type") || "text/plain"
    );
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow frontend use
    res.status(resp.status).send(text);
  } catch (e) {
    res.status(502).json({ error: "Fetch failed: " + e.message });
  }
      }
