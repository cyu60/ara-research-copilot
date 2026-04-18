export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ARA_API = 'https://api.ara.so/v1/apps';
  const APP_ID = 'app_096af6b4f2af4e0da750a941712fd6e5';
  const RUNTIME_KEY = process.env.ARA_RUNTIME_KEY;

  if (!RUNTIME_KEY) {
    return res.status(500).json({ error: 'ARA_RUNTIME_KEY not configured' });
  }

  try {
    const response = await fetch(`${ARA_API}/${APP_ID}/run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RUNTIME_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach Ara API', detail: err.message });
  }
}
