export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();

    // デバッグ用：レスポンス全体を確認
    console.log('Anthropic response:', JSON.stringify(data));

    if (!data.content) {
      res.status(200).json({ error: 'No content in response', detail: data });
      return;
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
