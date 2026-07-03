import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { C } from '../tokens';


export default function NotFound() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ minHeight:'100vh', background:C.deep, color:'#fff', position:'relative', overflow:'hidden' }}>
      <section style={{
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        minHeight:'100vh', padding:'4rem 2rem', textAlign:'center', position:'relative',
        opacity: mounted?1:0, transform: mounted?'none':'translateY(30px)',
        transition:'opacity 1s ease, transform 1s ease',
      }}>
        {/* 404 */}
        <h1 style={{
          fontFamily:"'Cormorant Garamond', serif", fontWeight:700,
          fontSize:'clamp(7rem, 20vw, 14rem)', lineHeight:1,
          color: C.amber,
          marginBottom:'0.5rem',
        }}>
          404
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily:"'Cormorant Garamond', serif", fontStyle:'italic',
          fontSize:'clamp(1.4rem, 3vw, 2rem)', color:C.lavender, marginBottom:'1.2rem',
        }}>
          Page introuvable
        </p>

        {/* Message */}
        <p style={{
          fontFamily:"'DM Sans', sans-serif", fontSize:'1rem',
          color:'rgba(255,235,153,0.55)', maxWidth:420, lineHeight:1.7, marginBottom:'2.5rem',
        }}>
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour retrouver votre chemin.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily:"'DM Sans', sans-serif", fontSize:'0.95rem', fontWeight:600,
            padding:'0.85rem 2.4rem', borderRadius:50, border:'none', cursor:'pointer',
            background: C.amber,
            color:C.deep, letterSpacing:'0.03em',
            transition:'opacity 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity='0.85'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity='1'; }}
        >
          Retour à l'accueil
        </button>
      </section>
    </div>
  );
}
