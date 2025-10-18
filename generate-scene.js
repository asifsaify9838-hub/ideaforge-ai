import fetch from 'node-fetch';
export default async function handler(req, res) {
  try {
    const { idea } = req.body || {};
    if (!idea) return res.status(400).json({ error: 'Idea required' });
    const prompt = `Create 3 short visual scene prompts for: ${idea}. Return JSON array.`;
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: prompt }], max_tokens: 300 })
    });
    if (!r.ok) { const txt = await r.text(); return res.status(500).json({ error: 'OpenAI error', detail: txt }); }
    const data = await r.json(); const text = data.choices?.[0]?.message?.content || '';
    try { res.status(200).json(JSON.parse(text)); } catch { res.status(200).json({ raw: text }); }
  } catch (err) { res.status(500).json({ error: err.message || err }); }
}
