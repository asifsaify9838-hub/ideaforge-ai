import fetch from 'node-fetch';
export default async function handler(req, res) {
  try {
    const { idea } = req.body || {};
    if (!idea) return res.status(400).json({ error: 'Idea required' });

    const ttsPrompt = `Write a short 2-3 sentence voiceover for this idea: ${idea}`;
    const r1 = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: ttsPrompt }], max_tokens: 120 })
    });
    if (!r1.ok) { const txt = await r1.text(); return res.status(500).json({ error: 'OpenAI error', detail: txt }); }
    const j1 = await r1.json();
    const voiceText = j1.choices?.[0]?.message?.content || 'Your idea audio.';

    const elevenKey = process.env.ELEVENLABS_API_KEY;
    if (!elevenKey) return res.status(500).json({ error: 'ELEVENLABS_API_KEY missing' });

    const ttsResp = await fetch('https://api.elevenlabs.io/v1/text-to-speech/alloy', {
      method: 'POST',
      headers: { 'xi-api-key': elevenKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
      body: JSON.stringify({ text: voiceText })
    });

    if (!ttsResp.ok) { const ttxt = await ttsResp.text(); return res.status(500).json({ error: 'ElevenLabs error', detail: ttxt }); }

    const audioBuffer = await ttsResp.arrayBuffer();
    const base64 = Buffer.from(audioBuffer).toString('base64');
    res.status(200).json({ audioBase64: base64, text: voiceText });
  } catch (err) { res.status(500).json({ error: err.message || err }); }
}
