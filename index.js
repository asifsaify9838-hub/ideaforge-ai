export default function Home(){return (
  <div style={{minHeight:'100vh',backgroundImage:"url('/bg.jpg')",backgroundSize:'cover',backgroundPosition:'center',fontFamily:'Poppins, sans-serif'}}>
    <header style={{display:'flex',justifyContent:'center',padding:30}}><img src="/logo.png" alt="logo" style={{width:140}}/></header>
    <main style={{maxWidth:980,margin:'20px auto',background:'rgba(0,0,0,0.55)',padding:20,borderRadius:12}}>
      <h1 style={{color:'#b48ef7',marginTop:0}}>Welcome to IdeaForge AI — Your AI-powered creative platform</h1>
      <p style={{color:'#cbd5e1'}}>Generate scripts, scenes, voices and music — demo buttons below.</p>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:12}}>
        <button style={{padding:'10px 16px',background:'linear-gradient(90deg,#00e0ff,#a600ff)',borderRadius:10,color:'#fff',border:'none'}}>Generate AI Idea</button>
        <button style={{padding:'10px 16px',background:'rgba(255,255,255,0.06)',borderRadius:10,color:'#fff',border:'none'}}>Generate Script</button>
      </div>
    </main>
    <footer style={{textAlign:'center',padding:20,color:'#9ca3af'}}>© 2025 IdeaForge AI</footer>
  </div>
)}