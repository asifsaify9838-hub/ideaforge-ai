export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

try {
const { idea } = req.body;

const mockPrompt = `

🎨 AI IMAGE PROMPT for: "${idea}"

Cinematic scene of Vicky Bolt fighting robots in a neon futuristic city at night.
Cyberpunk style, detailed mechanical robots, glowing neon lights, dramatic lighting,
rain-slick streets, tall skyscrapers with holographic advertisements.

Art style: Photorealistic, cinematic, high contrast
Lighting: Neon glow, dramatic shadows
Colors: Electric blue, vibrant pink, dark tones
Camera: Dynamic low angle shot

Perfect for Midjourney, DALL-E, or Stable Diffusion.
`;

res.json({ prompt: mockPrompt });

} catch (error) {
console.error('Scene generation error:', error);
res.status(500).json({ error: 'Scene generation failed' });
}
}
