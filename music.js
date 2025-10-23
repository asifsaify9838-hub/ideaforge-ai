export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

try {
const { idea } = req.body;

const mockSuggestion = `

🎵 MUSIC SUGGESTION for: "${idea}"

Genre: Epic Electronic / Cyberpunk
Mood: Intense, Action-packed, Futuristic
Tempo: 140 BPM
Instruments: Synthesizers, Heavy Drums, Bass, Electronic Elements

Recommended Tracks:

"The Final Fight" - Epic Action Music

"Neon Dreams" - Cyberpunk Mix

"Robot Uprising" - Electronic Battle Music


YouTube Search: "epic cyberpunk background music"
Spotify: Cyberpunk / Sci-Fi playlists

Duration: 45 seconds with building intensity
`;

res.json({ suggestion: mockSuggestion });

} catch (error) {
console.error('Music generation error:', error);
res.status(500).json({ error: 'Music suggestion failed' });
}
}
