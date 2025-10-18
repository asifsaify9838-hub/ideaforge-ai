import fetch from 'node-fetch';
export default async function handler(req, res) {
  try {
    const { idea } = req.body || {};
    if (!idea) return res.status(400).json({ error: 'Idea required' });
    const prompt = `You are a creative assistant. Create a short script (3 scenes) for this idea:\n${idea}\nReturn JSON or plain text.`;
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: prompt }], max_tokens: 800 })
    });
    if (!r.ok) { const txt = await r.text(); return res.status(500).json({ error: 'OpenAI error', detail: txt }); }
    const data = await r.json(); const text = data.choices?.[0]?.message?.content || '';
    try { const parsed = JSON.parse(text); return res.status(200).json(parsed); } catch { return res.status(200).json({ raw: text }); }
  } catch (err) { console.error(err); res.status(500).json({ error: err.message || err }); }
}
