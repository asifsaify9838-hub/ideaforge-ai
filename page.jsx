"use client";
import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState("");
  const [result, setResult] = useState("");
  const [theme, setTheme] = useState("dark");

  async function callApi(path) {
    if (!idea) { setResult("Please enter an idea."); return; }
    setLoading(path);
    setResult("");
    try {
      const res = await fetch('/api/' + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || JSON.stringify(data));
      setResult(JSON.stringify(data, null, 2));
    } catch (e) {
      setResult('Error: ' + (e.message || e));
    } finally {
      setLoading('');
    }
  }

  return (
    <main style={{ minHeight: '100vh', backgroundImage: "url('/bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.png" alt="logo" style={{ width: 90 }} />
            <h1 style={{ color: '#b48ef7', margin: 0 }}>IdeaForge AI</h1>
          </div>
          <div>
            <button onClick={() => setTheme(t => t==='dark'?'light':'dark')} style={{ padding: 8, borderRadius: 8 }}>Toggle Theme</button>
          </div>
        </div>

        <div style={{ marginTop: 20, background: 'rgba(0,0,0,0.55)', padding: 20, borderRadius: 12 }}>
          <textarea value={idea} onChange={e => setIdea(e.target.value)} placeholder="Type your idea (Hindi/English)..." style={{ width: '100%', minHeight: 120, padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: '#071022', color: '#fff' }} />

          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            <button onClick={() => callApi('generate-script')} style={{ padding: '10px 16px', background: 'linear-gradient(90deg,#8b5cf6,#a45aff)', borderRadius: 10 }}>Generate Script</button>
            <button onClick={() => callApi('generate-scene')} style={{ padding: '10px 16px', background: 'linear-gradient(90deg,#8b5cf6,#a45aff)', borderRadius: 10 }}>Get Scene Prompt</button>
            <button onClick={() => callApi('generate-music')} style={{ padding: '10px 16px', background: 'linear-gradient(90deg,#8b5cf6,#a45aff)', borderRadius: 10 }}>Get Music Prompt</button>
            <button onClick={() => callApi('generate-voice')} style={{ padding: '10px 16px', background: 'linear-gradient(90deg,#8b5cf6,#a45aff)', borderRadius: 10 }}>Generate Voice (TTS)</button>
            <button onClick={() => callApi('generate-video')} style={{ padding: '10px 16px', background: 'linear-gradient(90deg,#8b5cf6,#a45aff)', borderRadius: 10 }}>Generate Video (example)</button>
          </div>

          <div style={{ marginTop: 20 }}>
            <h3 style={{ margin: '8px 0' }}>Results</h3>
            <pre style={{ background: '#020617', padding: 12, borderRadius: 8, minHeight: 160, color: '#e6eef8', overflowX: 'auto' }}>{loading ? `Working: ${loading}...` : result || 'No results yet'}</pre>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <button onClick={() => { navigator.clipboard.writeText(result); alert('Copied to clipboard'); }} style={{ padding: '8px 12px', borderRadius: 8 }}>Copy</button>
              <button onClick={() => { const blob = new Blob([result || ''], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'idea-result.txt'; a.click(); }} style={{ padding: '8px 12px', borderRadius: 8 }}>Download</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
