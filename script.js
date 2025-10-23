import axios from 'axios';  export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

try {
const { idea } = req.body;

if (!idea) {  
  return res.status(400).json({ error: 'Idea is required' });  
}  

const prompt = `  
Create a complete video script in Hindi based on this idea: "${idea}"  

Include:  
- Scene descriptions  
- Character dialogues    
- Visual elements  
- Duration: 30-60 seconds  

Make it engaging and creative. Respond in Hindi.  
`;  

// For demo - return mock script  
const mockScript = `

🎬 VIDEO SCRIPT: "${idea}"

SCENE 1:
📍 Location: Futuristic city
👤 Character: Vicky Bolt
💬 Dialogue: "मैं इस शहर की रक्षा करूंगा! रोबोट्स, तैयार हो जाओ!"

SCENE 2:
📍 Location: Neon streets
👥 Action: Fight sequence with robots
💬 Dialogue: "तुम technology का दुरुपयोग कर रहे हो!"

SCENE 3:
📍 Location: City rooftop
🎯 Conclusion: Vicky wins, city is safe
💬 Dialogue: "अच्छाई की हमेशा जीत होती है!"

📝 Total Duration: 45 seconds
`;

res.json({ script: mockScript });

} catch (error) {
console.error('Script generation error:', error);
res.status(500).json({ error: 'Script generation failed' });
}
}
