export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

try {
const { idea, lang = 'hi' } = req.body;

if (!idea) {  
  return res.status(400).json({ error: 'Idea is required' });  
}  

// Mock voice response  
const mockText = `यह ${idea} के बारे में एक रोमांचक कहानी है। Vicky Bolt रोबोट्स से लड़ते हुए इस futuristic शहर को बचाता है।`;  
const mockAudioUrl = 'https://www.soundjay.com/button/button-1.mp3';  

res.json({   
  audioUrl: mockAudioUrl,  
  text: mockText  
});

} catch (error) {
console.error('Voice generation error:', error);
res.status(500).json({ error: 'Voice generation failed' });
}
}
