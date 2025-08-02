// pages/api/proxy.js

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method === 'POST' ? req.body : undefined,
    });

    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType || "text/plain");

    const data = await response.text();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy fetch failed', details: err.message });
  }
}
