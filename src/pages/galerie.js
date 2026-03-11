import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ALUMNI } from '../data/alumni';
import AlumniCard from '../components/AlumniCard';
import AlumniModal from '../components/AlumniModal';

/* ─── TOKENS ─────────────────────────── */
const C = {
  amber:    '#ffcc00',
  mustard:  '#ffde5c',
  gold:     '#ffeb99',
  lavender: '#a486d5',
  indigo:   '#54318c',
  deep:     '#110a1c',
  mid:      '#1c1030',
  surface:  '#221438',
};

const DOMAINS = [
  { label: 'Tous',                     value: 'all',                      accent: C.amber },
  { label: 'Intelligence Artificielle', value: 'Intelligence Artificielle', accent: C.lavender },
  { label: 'Développement Web',         value: 'Développement Web',         accent: C.amber },
  { label: 'Cybersécurité',             value: 'Cybersécurité',             accent: C.indigo },
  { label: 'Data Science',              value: 'Data Science',              accent: C.mustard },
  { label: 'DevOps',                    value: 'DevOps',                    accent: '#7042bb' },
];

const GlowOrb = ({ style }) => (
  <div style={{ position:'absolute', borderRadius:'50%', filter:'blur(90px)', pointerEvents:'none', ...style }} />
);

/* ─── ANIMATED COUNTER ───────────────── */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame;
    const duration = 1200;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── PHOTOS DATA ─────────────────────────── */
const PHOTOS = [
  {
    id: 1,
    title: 'Promotion 2027 - Groupe 1',
    description: 'Un moment inoubliable avec nos camarades. Ces souvenirs resteront à jamais gravés dans nos cœurs.',
    src: 'https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231607/db8f2e19a2914f238dda524c2317f4b5_nmpxhh.jpg',
    date: '2026-11-15',
    comments: [],
  },
  {
    id: 2,
    title: 'Promotion 2027 - Groupe 2',
    description: 'Ensemble, nous avons grandi et appris. Chaque visage représente une histoire unique.',
    src: 'https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231606/FB_IMG_1730070701137_hf7wqy.jpg',
    date: '2026-11-15',
    comments: [],
  },
  {
    id: 3,
    title: 'Événement Legendary Cave',
    description: 'Une journée spéciale réunissant tous les membres de notre communauté.',
    src: 'https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231607/FB_IMG_1730070796894_d7thir.jpg',
    date: '2026-10-20',
    comments: [],
  },
  {
    id: 4,
    title: 'Teamwork & Solidarity',
    description: 'Renforcer les liens entre camarades à travers les moments partagés.',
    src: 'https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231606/2bcb60453e6840a0bd1aedc375a2ba07_iaagsb.jpg',
    date: '2026-10-18',
    comments: [],
  },
  {
    id: 5,
    title: 'Formation et Apprentissage',
    description: 'Développer nos compétences ensemble, dans la bonne humeur et la solidarité.',
    src: 'https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231628/IMG_20250207_140019_777_kgajup.jpg',
    date: '2026-09-12',
    comments: [],
  },
];

/* ─── MAIN ───────────────────────────── */
export default function Gallery() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm]       = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [mounted, setMounted]             = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showPhotoGallery, setShowPhotoGallery] = useState(searchParams.get('section') === 'souvenirs');
  const [photos, setPhotos] = useState(PHOTOS);
  const [commentText, setCommentText] = useState({});
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  const students = ALUMNI;

  const filtered = students.filter(s => {
    const q = searchTerm.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(q)
      || s.company.toLowerCase().includes(q)
      || s.location.toLowerCase().includes(q);
    const matchDomain = selectedDomain === 'all' || s.domain === selectedDomain;
    return matchSearch && matchDomain;
  });

  const availableCount = students.filter(s => s.available).length;
  const domainCount    = new Set(students.map(s => s.domain)).size;

  const handleAddComment = (photoId, name, text) => {
    if (!text.trim()) return;
    setPhotos(photos.map(p => 
      p.id === photoId 
        ? { ...p, comments: [...p.comments, { id: Date.now(), name, text, date: new Date().toLocaleDateString('fr-FR') }] }
        : p
    ));
    setCommentText({ ...commentText, [photoId]: '' });
  };

  return (
    <div style={{
      background: C.deep, minHeight:'100vh', color: C.gold,
      fontFamily:"'DM Sans', sans-serif", position:'relative', overflow:'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Syne+Mono&family=DM+Sans:wght@400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::placeholder { color: rgba(255,235,153,0.25) !important; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${C.deep}; }
        ::-webkit-scrollbar-thumb { background:${C.indigo}; border-radius:2px; }
      `}</style>

      {/* Ambient orbs */}
      <GlowOrb style={{ width:600, height:600, top:'-10%', left:'60%',  background:`radial-gradient(circle, ${C.indigo}45 0%, transparent 65%)` }} />
      <GlowOrb style={{ width:350, height:350, top:'50%',  left:'-8%',  background:`radial-gradient(circle, ${C.amber}15 0%, transparent 65%)` }} />
      <GlowOrb style={{ width:400, height:400, bottom:'5%',right:'0%',  background:`radial-gradient(circle, ${C.lavender}20 0%, transparent 65%)` }} />

      {/* ── HERO ─────────────────────── */}
      <section style={{
        padding:'7rem 3rem 4rem', position:'relative',
        opacity: mounted?1:0, transform: mounted?'none':'translateY(30px)',
        transition:'opacity 1s ease, transform 1s ease',
        maxWidth:1100, margin:'0 auto',
      }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'2rem' }}>

          {/* Left: title */}
          <div>
            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2rem' }}>
              {/* Badge Annuaire Alumni */}
              <button onClick={() => setShowPhotoGallery(false)} style={{
                cursor:'pointer',
                display:'inline-flex', alignItems:'center', gap:8,
                background: !showPhotoGallery ? 'rgba(164,134,213,0.4)' : 'rgba(164,134,213,0.1)',
                border:`1px solid rgba(164,134,213,${!showPhotoGallery ? '0.35' : '0.15'})`,
                borderRadius:100, padding:'6px 20px',
                fontFamily:"'Syne Mono', monospace", fontSize:'0.7rem',
                letterSpacing:'0.18em', textTransform:'uppercase', color: C.lavender,
                transition: 'all 0.3s',
              }}>
                Annuaire Alumni
              </button>

              {/* Badge Nos souvenirs */}
              <button onClick={() => setShowPhotoGallery(true)} style={{
                cursor:'pointer',
                display:'inline-flex', alignItems:'center', gap:8,
                background: showPhotoGallery ? `rgba(${parseInt(C.amber.slice(1,3),16)},${parseInt(C.amber.slice(3,5),16)},${parseInt(C.amber.slice(5,7),16)},0.4)` : 'rgba(255,255,255,0.04)',
                border:`1px solid rgba(255,204,0,${showPhotoGallery ? '0.35' : '0.15'})`,
                borderRadius:100, padding:'6px 20px',
                fontFamily:"'Syne Mono', monospace", fontSize:'0.7rem',
                letterSpacing:'0.18em', textTransform:'uppercase', color: showPhotoGallery ? C.amber : 'rgba(255,235,153,0.35)',
                transition: 'all 0.3s',
              }}>
                Nos Souvenirs
              </button>
            </div>

            <h1 style={{
              fontFamily:"'Cormorant Garamond', serif",
              fontSize:'clamp(3rem, 7vw, 6rem)', fontWeight:700, lineHeight:0.95,
              letterSpacing:'-0.02em',
            }}>
              <span style={{
                background:`linear-gradient(135deg, ${C.gold} 0%, ${C.amber} 50%, ${C.lavender} 100%)`,
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>{showPhotoGallery ? 'Nos Souvenirs' : 'Nos camarades'}</span>
              <br />
              <span style={{
                fontStyle:'italic', fontSize:'0.65em',
                background:`linear-gradient(90deg, ${C.lavender}, ${C.indigo} 60%, ${C.amber})`,
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>{showPhotoGallery ? 'À travers les moments' : 'À travers le monde'}</span>
            </h1>
          </div>

          {/* Right: mini stats */}
          {!showPhotoGallery && (
            <div style={{ display:'flex', gap:'1.5rem', flexShrink:0 }}>
              {[
                { label:'Alumni',      value: students.length, suffix:'' },
                { label:'Disponibles', value: availableCount,  suffix:'' },
                { label:'Domaines',    value: domainCount,     suffix:'' },
              ].map((s, i) => (
                <div key={i} style={{
                  background:'rgba(34,20,56,0.7)',
                  border:'1px solid rgba(164,134,213,0.15)',
                  borderRadius:16, padding:'1.2rem 1.6rem', textAlign:'center',
                  minWidth:90,
                }}>
                  <div style={{
                    fontFamily:"'Cormorant Garamond', serif",
                    fontSize:'2.2rem', fontWeight:700, lineHeight:1,
                    color: i === 0 ? C.amber : i === 1 ? '#4ade80' : C.lavender,
                  }}>
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{
                    fontFamily:"'Syne Mono', monospace", fontSize:'0.62rem',
                    letterSpacing:'0.12em', textTransform:'uppercase',
                    color:'rgba(255,235,153,0.35)', marginTop:4,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Decorative divider */}
        <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:'3rem' }}>
          <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${C.amber}44, transparent)` }} />
          <div style={{ flex:3, height:1, background:'rgba(164,134,213,0.1)' }} />
        </div>
      </section>

      {/* ── CONTENT SECTION (Alumni or Photos) ─────────────────────── */}
      {!showPhotoGallery ? (
        <>
          {/* ── STICKY CONTROLS ──────────── */}
          <div style={{
            position:'sticky', top:0, zIndex:50,
            background:'rgba(17,10,28,0.9)', backdropFilter:'blur(20px)',
            borderBottom:'1px solid rgba(164,134,213,0.1)',
          }}>
            <div style={{ maxWidth:1100, margin:'0 auto', padding:'1rem 3rem' }}>
              <div style={{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap' }}>

                {/* Search */}
                <div style={{ position:'relative', flexShrink:0 }}>
                  <Search size={14} color={searchFocused ? C.amber : 'rgba(164,134,213,0.5)'}
                    style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', transition:'color 0.2s' }} />
                  <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Nom, entreprise, ville…"
                    style={{
                      background:'rgba(34,20,56,0.8)',
                      border: searchFocused ? `1px solid ${C.amber}66` : '1px solid rgba(164,134,213,0.2)',
                      boxShadow: searchFocused ? `0 0 0 3px ${C.amber}12` : 'none',
                      borderRadius:10, padding:'9px 36px 9px 38px',
                      fontFamily:"'DM Sans', sans-serif", fontSize:'0.85rem',
                      color: C.gold, outline:'none', width:260,
                      transition:'all 0.2s',
                    }}
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} style={{
                      position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                      background:'none', border:'none', cursor:'pointer', color:'rgba(255,235,153,0.4)',
                      display:'flex', alignItems:'center',
                    }}>
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Domain filters */}
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
                  <SlidersHorizontal size={13} color="rgba(164,134,213,0.4)" />
                  {DOMAINS.map(d => {
                    const active = selectedDomain === d.value;
                    return (
                      <button key={d.value} onClick={() => setSelectedDomain(d.value)} style={{
                        background: active ? d.accent : 'rgba(255,255,255,0.04)',
                        border: active ? `1px solid ${d.accent}` : '1px solid rgba(164,134,213,0.15)',
                        color: active ? (d.accent === C.amber || d.accent === C.mustard ? C.deep : C.gold) : 'rgba(255,235,153,0.45)',
                        borderRadius:100, padding:'5px 14px', cursor:'pointer',
                        fontFamily:"'Syne Mono', monospace", fontSize:'0.66rem',
                        letterSpacing:'0.1em', textTransform:'uppercase', fontWeight: active ? 700 : 400,
                        boxShadow: active ? `0 0 12px ${d.accent}44` : 'none',
                        transition:'all 0.2s',
                      }}>{d.label}</button>
                    );
                  })}
                </div>

                {/* Result count */}
                <div style={{
                  marginLeft:'auto',
                  fontFamily:"'Syne Mono', monospace", fontSize:'0.65rem',
                  letterSpacing:'0.12em', textTransform:'uppercase',
                  color:'rgba(164,134,213,0.4)',
                }}>
                  {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>

          {/* ── GRID ─────────────────────── */}
          <section style={{ maxWidth:1100, margin:'0 auto', padding:'3rem 3rem 6rem' }}>
            {filtered.length === 0 ? (
              <div style={{
                textAlign:'center', padding:'6rem 2rem',
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1.8rem', fontStyle:'italic',
                color:'rgba(255,235,153,0.2)',
              }}>
                Aucun résultat pour « {searchTerm} »
              </div>
            ) : (
              <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',
                gap:'1rem',
              }}>
                {filtered.map((a, i) => (
                  <div key={a.id} style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'none' : 'translateY(20px)',
                    transition: `opacity 0.5s ease ${Math.min(i * 0.04, 0.6)}s, transform 0.5s ease ${Math.min(i * 0.04, 0.6)}s`,
                  }}>
                    <AlumniCard alumni={a} onClick={setSelectedAlumni} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      ) : (
        // Photo Gallery Section
        <section style={{ maxWidth:1100, margin:'0 auto', padding:'2rem 3rem 6rem' }}>
          <p style={{
            fontFamily:"'DM Sans', sans-serif",
            fontSize:'1.1rem', lineHeight:1.6,
            color:'rgba(255,235,153,0.75)', marginBottom:'3rem',
            textAlign:'center', maxWidth:'800px', margin:'0 auto 3rem',
          }}>
            Chaque photo raconte une histoire. Nos moments de joie, d'apprentissage et de solidarité à travers la promotion 2027. 
            Partagez vos souvenirs et laissez vos commentaires pour que nos moments restent à jamais gravés dans nos cœurs.
          </p>

          {/* ── CAROUSEL ──────────────────── */}
          <div style={{
            maxWidth:'900px', margin:'0 auto 4rem', position:'relative',
          }}>
            <div style={{
              background:'rgba(34,20,56,0.8)',
              border:`1px solid rgba(164,134,213,0.2)`,
              borderRadius:16, overflow:'hidden',
              transition:'all 0.3s',
            }}>
              {/* Photo */}
              <div style={{
                width:'100%', height:'400px', overflow:'hidden', position:'relative', background:'rgba(17,10,28,0.9)',
              }}>
                <img src={photos[currentPhotoIndex].src} alt={photos[currentPhotoIndex].title} style={{
                  width:'100%', height:'100%', objectFit:'cover',
                }} />
                {/* Info overlay */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  background:'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(17,10,28,0.95) 100%)',
                  padding:'2rem', color:'white',
                }}>
                  <div style={{
                    fontFamily:"'Syne Mono', monospace", fontSize:'0.7rem',
                    letterSpacing:'0.1em', textTransform:'uppercase',
                    color: C.amber, marginBottom:'0.5rem',
                  }}>
                    {new Date(photos[currentPhotoIndex].date).toLocaleDateString('fr-FR')}
                  </div>
                  <h2 style={{
                    fontFamily:"'Cormorant Garamond', serif",
                    fontSize:'2rem', fontWeight:700, marginBottom:'0.5rem',
                    color: C.gold,
                  }}>
                    {photos[currentPhotoIndex].title}
                  </h2>
                  <p style={{
                    fontFamily:"'DM Sans', sans-serif",
                    fontSize:'0.95rem', color:'rgba(255,235,153,0.85)',
                    lineHeight:1.5,
                  }}>
                    {photos[currentPhotoIndex].description}
                  </p>
                </div>
              </div>

              {/* Navigation buttons */}
              <div style={{
                position:'absolute', top:'50%', left:0, right:0,
                transform:'translateY(-50%)',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'0 1rem', pointerEvents:'none',
              }}>
                <button onClick={() => setCurrentPhotoIndex((currentPhotoIndex - 1 + photos.length) % photos.length)} style={{
                  pointerEvents:'all',
                  background:'rgba(255,204,0,0.2)', border:`1px solid ${C.amber}`,
                  color: C.amber, width:45, height:45, borderRadius:'50%',
                  fontFamily:"'Syne Mono', monospace", fontSize:'1.2rem',
                  cursor:'pointer', transition:'all 0.3s',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}
                onMouseEnter={e => {
                  e.target.style.background = `rgba(255,204,0,0.4)`;
                  e.target.style.boxShadow = `0 0 12px ${C.amber}66`;
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'rgba(255,204,0,0.2)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  ‹
                </button>

                <button onClick={() => setCurrentPhotoIndex((currentPhotoIndex + 1) % photos.length)} style={{
                  pointerEvents:'all',
                  background:'rgba(255,204,0,0.2)', border:`1px solid ${C.amber}`,
                  color: C.amber, width:45, height:45, borderRadius:'50%',
                  fontFamily:"'Syne Mono', monospace", fontSize:'1.2rem',
                  cursor:'pointer', transition:'all 0.3s',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}
                onMouseEnter={e => {
                  e.target.style.background = `rgba(255,204,0,0.4)`;
                  e.target.style.boxShadow = `0 0 12px ${C.amber}66`;
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'rgba(255,204,0,0.2)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  ›
                </button>
              </div>
            </div>

            {/* Indicators */}
            <div style={{
              display:'flex', justifyContent:'center', gap:'0.5rem', marginTop:'1.5rem',
            }}>
              {photos.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentPhotoIndex(idx)} style={{
                  width: currentPhotoIndex === idx ? 32 : 12, height:8,
                  background: currentPhotoIndex === idx ? C.amber : 'rgba(164,134,213,0.3)',
                  border:'none', borderRadius:4, cursor:'pointer',
                  transition:'all 0.3s',
                }} />
              ))}
            </div>

            {/* Counter */}
            <div style={{
              textAlign:'center', marginTop:'1rem',
              fontFamily:"'Syne Mono', monospace", fontSize:'0.75rem',
              letterSpacing:'0.1em', textTransform:'uppercase',
              color:'rgba(164,134,213,0.5)',
            }}>
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          </div>

          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',
            gap:'2rem',
          }}>
            {photos.map((photo, idx) => (
              <div key={photo.id} style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'none' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${Math.min(idx * 0.05, 0.6)}s, transform 0.5s ease ${Math.min(idx * 0.05, 0.6)}s`,
              }}>
                <div style={{
                  background:'rgba(34,20,56,0.6)',
                  border:'1px solid rgba(164,134,213,0.2)',
                  borderRadius:12, overflow:'hidden',
                  transition:'all 0.3s',
                }}>
                  {/* Photo */}
                  <div style={{
                    width:'100%', height:'220px', overflow:'hidden', position:'relative',
                  }}>
                    <img src={photo.src} alt={photo.title} style={{
                      width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.3s',
                    }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  </div>

                  {/* Content */}
                  <div style={{ padding:'1.2rem' }}>
                    <div style={{
                      fontFamily:"'Syne Mono', monospace", fontSize:'0.6rem',
                      letterSpacing:'0.1em', textTransform:'uppercase',
                      color: C.amber, marginBottom:'0.5rem',
                    }}>
                      {new Date(photo.date).toLocaleDateString('fr-FR')}
                    </div>

                    <h3 style={{
                      fontFamily:"'Cormorant Garamond', serif",
                      fontSize:'1.4rem', fontWeight:600, marginBottom:'0.5rem',
                      color: C.gold,
                    }}>
                      {photo.title}
                    </h3>

                    <p style={{
                      fontFamily:"'DM Sans', sans-serif",
                      fontSize:'0.85rem', color:'rgba(255,235,153,0.7)',
                      marginBottom:'1.2rem', lineHeight:1.5,
                    }}>
                      {photo.description}
                    </p>

                    {/* Comments Section */}
                    <div style={{
                      borderTop:'1px solid rgba(164,134,213,0.2)',
                      paddingTop:'1rem', marginTop:'1rem',
                    }}>
                      <div style={{
                        fontFamily:"'Syne Mono', monospace", fontSize:'0.7rem',
                        letterSpacing:'0.1em', textTransform:'uppercase',
                        color:'rgba(164,134,213,0.6)', marginBottom:'0.8rem',
                      }}>
                        {photo.comments.length} commentaire{photo.comments.length > 1 ? 's' : ''}
                      </div>

                      {/* Show comments */}
                      <div style={{
                        maxHeight:'150px', overflowY:'auto', marginBottom:'0.8rem',
                      }}>
                        {photo.comments.map(comment => (
                          <div key={comment.id} style={{
                            background:'rgba(84,49,140,0.2)',
                            borderRadius:6, padding:'0.6rem',
                            marginBottom:'0.5rem', fontSize:'0.8rem',
                          }}>
                            <div style={{ fontWeight:600, color: C.lavender }}>
                              {comment.name}
                            </div>
                            <div style={{ color:'rgba(255,235,153,0.7)', marginTop:'0.2rem' }}>
                              {comment.text}
                            </div>
                            <div style={{ color:'rgba(164,134,213,0.4)', fontSize:'0.7rem', marginTop:'0.3rem' }}>
                              {comment.date}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add comment form */}
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                        <input
                          type="text"
                          placeholder="Votre nom"
                          id={`name-${photo.id}`}
                          style={{
                            background:'rgba(34,20,56,0.8)',
                            border:'1px solid rgba(164,134,213,0.2)',
                            borderRadius:6, padding:'0.5rem 0.8rem',
                            fontFamily:"'DM Sans', sans-serif", fontSize:'0.8rem',
                            color: C.gold, outline:'none',
                            transition:'all 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = C.amber}
                          onBlur={e => e.target.style.borderColor = 'rgba(164,134,213,0.2)'}
                        />
                        <textarea
                          placeholder="Votre commentaire..."
                          value={commentText[photo.id] || ''}
                          onChange={e => setCommentText({ ...commentText, [photo.id]: e.target.value })}
                          style={{
                            background:'rgba(34,20,56,0.8)',
                            border:'1px solid rgba(164,134,213,0.2)',
                            borderRadius:6, padding:'0.5rem 0.8rem',
                            fontFamily:"'DM Sans', sans-serif", fontSize:'0.8rem',
                            color: C.gold, outline:'none', resize:'none',
                            height:'50px',
                            transition:'all 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = C.amber}
                          onBlur={e => e.target.style.borderColor = 'rgba(164,134,213,0.2)'}
                        />
                        <button onClick={() => {
                          const nameInput = document.getElementById(`name-${photo.id}`);
                          handleAddComment(photo.id, nameInput.value || 'Anonyme', commentText[photo.id]);
                          nameInput.value = '';
                        }} style={{
                          background: C.amber, color: C.deep,
                          border:'none', borderRadius:6, padding:'0.6rem',
                          fontFamily:"'DM Sans', sans-serif", fontSize:'0.8rem',
                          fontWeight:600, cursor:'pointer', transition:'all 0.2s',
                        }}
                        onMouseEnter={e => e.target.style.opacity = '0.9'}
                        onMouseLeave={e => e.target.style.opacity = '1'}
                        >
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <AlumniModal alumni={selectedAlumni} onClose={() => setSelectedAlumni(null)} />
    </div>
  );
}