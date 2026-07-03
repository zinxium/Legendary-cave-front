import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ALUMNI } from '../data/alumni';
import AlumniCard from '../components/AlumniCard';
import AlumniModal from '../components/AlumniModal';
import { getSouvenirs, getAlumni } from '../services/apiService';
import { C } from '../tokens';

const DOMAINS = [
  { label: 'Tous',            value: 'all',            accent: C.amber },
  { label: 'IA',              value: 'IA',             accent: C.lavender },
  { label: 'Web',             value: 'Web',            accent: C.amber },
  { label: 'Cybersécurité',   value: 'Cybersécurité',  accent: C.indigo },
  { label: 'Data Science',    value: 'Data Science',   accent: C.mustard },
  { label: 'DevOps',          value: 'DevOps',         accent: '#004080' },
  { label: 'UX/UI Design',   value: 'UX/UI Design',   accent: '#9b59b6' },
  { label: 'Mobile Dev',     value: 'Mobile Dev',     accent: '#e67e22' },
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
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [commentText, setCommentText] = useState({});
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    getSouvenirs()
      .then(data => {
        setPhotos(data);
        setLoadingPhotos(false);
      })
      .catch(() => {
        setLoadingPhotos(false);
      });
  }, []);

  const [students, setStudents] = useState(ALUMNI);

  useEffect(() => {
    getAlumni()
      .then(data => {
        if (data && data.length > 0) setStudents(data);
      })
      .catch(() => {
        // fallback: keep ALUMNI from local data
      });
  }, []);

  const filtered = students.filter(s => {
    const q = searchTerm.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(q)
      || s.company.toLowerCase().includes(q)
      || s.location.toLowerCase().includes(q);
    const matchDomain = selectedDomain === 'all' || s.specialty === selectedDomain;
    return matchSearch && matchDomain;
  });

  const availableCount = students.filter(s => s.available).length;
  const domainCount    = new Set(students.map(s => s.specialty)).size;

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
        ::placeholder { color: rgba(255,235,153,0.25) !important; }
      `}</style>

      {/* ── HERO ─────────────────────── */}
      <section style={{
        padding:'5rem 2rem 2.5rem', position:'relative',
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
                background: !showPhotoGallery ? 'rgba(74,138,191,0.4)' : 'rgba(74,138,191,0.1)',
                border:`1px solid rgba(74,138,191,${!showPhotoGallery ? '0.35' : '0.15'})`,
                borderRadius:100, padding:'5px 14px',
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
                letterSpacing:'0.03em', color: C.lavender,
                transition: 'all 0.3s',
              }}>
                Annuaire Alumni
              </button>

              {/* Badge Nos souvenirs */}
              <button onClick={() => setShowPhotoGallery(true)} style={{
                cursor:'pointer',
                display:'inline-flex', alignItems:'center', gap:8,
                background: showPhotoGallery ? 'rgba(255,204,0,0.4)' : 'rgba(255,255,255,0.04)',
                border:`1px solid rgba(255,204,0,${showPhotoGallery ? '0.35' : '0.15'})`,
                borderRadius:100, padding:'5px 14px',
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
                letterSpacing:'0.03em', color: showPhotoGallery ? C.amber : 'rgba(255,235,153,0.35)',
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
                color: C.amber,
              }}>{showPhotoGallery ? 'Nos Souvenirs' : 'Nos camarades'}</span>
              <br />
              <span style={{
                fontStyle:'italic', fontSize:'0.65em',
                color: C.lavender,
              }}>{showPhotoGallery ? 'À travers les moments' : 'À travers le monde'}</span>
            </h1>
          </div>

          {/* Right: mini stats */}
          {!showPhotoGallery && (
            <div style={{ display:'flex', gap:'1.5rem', flexShrink:0 }}>
              {[
                { label:'Alumni',      value: students.length, color: C.amber },
                { label:'Disponibles', value: availableCount,  color: '#4ade80' },
                { label:'Domaines',    value: domainCount,     color: C.lavender },
              ].map((s, i) => (
                <div key={i} style={{
                  background:'rgba(0,33,71,0.7)',
                  border:'1px solid rgba(74,138,191,0.15)',
                  borderRadius:16, padding:'1rem 1.4rem', textAlign:'center',
                  minWidth:80,
                }}>
                  <div style={{
                    fontFamily:"'Cormorant Garamond', serif",
                    fontSize:'2rem', fontWeight:700, lineHeight:1,
                    color: s.color,
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily:"'DM Sans', sans-serif", fontSize:'0.65rem',
                    letterSpacing:'0.03em',
                    color:'rgba(255,235,153,0.35)', marginTop:4,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Decorative divider */}
        <div style={{ height:1, background:'rgba(74,138,191,0.12)', marginTop:'2rem' }} />
      </section>

      {/* ── CONTENT SECTION (Alumni or Photos) ─────────────────────── */}
      {!showPhotoGallery ? (
        <>
          {/* ── STICKY CONTROLS ──────────── */}
          <div style={{
            position:'sticky', top:0, zIndex:50,
            background:'rgba(0,18,41,0.9)', backdropFilter:'blur(20px)',
            borderBottom:'1px solid rgba(74,138,191,0.1)',
          }}>
            <div style={{ maxWidth:1100, margin:'0 auto', padding:'0.8rem 2rem' }}>
              <div style={{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap' }}>

                {/* Search */}
                <div style={{ position:'relative', flexShrink:0 }}>
                  <Search size={14} color={searchFocused ? C.amber : 'rgba(74,138,191,0.5)'}
                    style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', transition:'color 0.2s' }} />
                  <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Nom, entreprise, ville…"
                    style={{
                      background:'rgba(0,33,71,0.8)',
                      border: searchFocused ? `1px solid ${C.amber}66` : '1px solid rgba(74,138,191,0.2)',
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
                  <SlidersHorizontal size={13} color="rgba(74,138,191,0.4)" />
                  {DOMAINS.map(d => {
                    const active = selectedDomain === d.value;
                    return (
                      <button key={d.value} onClick={() => setSelectedDomain(d.value)} style={{
                        background: active ? d.accent : 'rgba(255,255,255,0.04)',
                        border: active ? `1px solid ${d.accent}` : '1px solid rgba(74,138,191,0.15)',
                        color: active ? (d.accent === C.amber || d.accent === C.mustard ? C.deep : C.gold) : 'rgba(255,235,153,0.45)',
                        borderRadius:100, padding:'5px 14px', cursor:'pointer',
                        fontFamily:"'DM Sans', sans-serif", fontSize:'0.7rem',
                        letterSpacing:'0.02em', textTransform:'uppercase', fontWeight: active ? 600 : 400,
                        transition:'all 0.2s',
                      }}>{d.label}</button>
                    );
                  })}
                </div>

                {/* Result count */}
                <div style={{
                  marginLeft:'auto',
                  fontFamily:"'DM Sans', sans-serif", fontSize:'0.7rem',
                  letterSpacing:'0.02em',
                  color:'rgba(74,138,191,0.4)',
                }}>
                  {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>

          {/* ── GRID ─────────────────────── */}
          <section style={{ maxWidth:1100, margin:'0 auto', padding:'2rem 2rem 4rem' }}>
            {filtered.length === 0 ? (
              <div style={{
                textAlign:'center', padding:'6rem 2rem',
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1.8rem', fontStyle:'italic',
                color:'rgba(255,235,153,0.2)',
              }}>
                Aucun resultat pour "{searchTerm}"
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
        <section style={{ maxWidth:1100, margin:'0 auto', padding:'1.5rem 2rem 4rem' }}>
          <p style={{
            fontFamily:"'DM Sans', sans-serif",
            fontSize:'1.1rem', lineHeight:1.6,
            color:'rgba(255,235,153,0.75)', marginBottom:'2rem',
            textAlign:'center', maxWidth:'800px', margin:'0 auto 2rem',
          }}>
            Chaque photo raconte une histoire. Nos moments de joie, d'apprentissage et de solidarite a travers la promotion 2027.
            Partagez vos souvenirs et laissez vos commentaires pour que nos moments restent a jamais graves dans nos coeurs.
          </p>

          {loadingPhotos ? (
            <div style={{ textAlign:'center', padding:'4rem 0', color:'rgba(255,235,153,0.4)', fontSize:'1rem' }}>
              Chargement des photos...
            </div>
          ) : photos.length === 0 ? (
            <div style={{ textAlign:'center', padding:'4rem 0', color:'rgba(255,235,153,0.3)', fontStyle:'italic', fontSize:'1rem' }}>
              Aucune photo disponible pour le moment.
            </div>
          ) : (
          <>
          {/* ── CAROUSEL ──────────────────── */}
          <div style={{
            maxWidth:'900px', margin:'0 auto 4rem', position:'relative',
          }}>
            {/* Photo container */}
            <div style={{
              background:'rgba(0,33,71,0.8)',
              border:`1px solid rgba(74,138,191,0.2)`,
              borderRadius:16, overflow:'hidden',
            }}>
              <div style={{
                width:'100%', height:'500px', overflow:'hidden', position:'relative', background:'rgba(0,18,41,0.9)',
              }}>
                <img src={photos[currentPhotoIndex].src} alt={photos[currentPhotoIndex].title} style={{
                  width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top',
                  transition:'opacity 0.3s ease',
                }} />
                {/* Info overlay */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  background:'rgba(0,18,41,0.9)',
                  padding:'2rem', color:'white',
                }}>
                  <div style={{
                    fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
                    letterSpacing:'0.02em',
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
            </div>

            {/* Navigation buttons — outside overflow:hidden */}
            <button onClick={() => setCurrentPhotoIndex((currentPhotoIndex - 1 + photos.length) % photos.length)} style={{
              position:'absolute', top:'50%', left:'0.5rem', transform:'translateY(-50%)', zIndex:2,
              background:'rgba(0,18,41,0.7)', border:`1px solid ${C.amber}`,
              color: C.amber, width:42, height:42, borderRadius:'50%',
              fontSize:'1.2rem', cursor:'pointer', transition:'opacity 0.2s',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              &lt;
            </button>

            <button onClick={() => setCurrentPhotoIndex((currentPhotoIndex + 1) % photos.length)} style={{
              position:'absolute', top:'50%', right:'0.5rem', transform:'translateY(-50%)', zIndex:2,
              background:'rgba(0,18,41,0.7)', border:`1px solid ${C.amber}`,
              color: C.amber, width:42, height:42, borderRadius:'50%',
              fontSize:'1.2rem', cursor:'pointer', transition:'opacity 0.2s',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              &gt;
            </button>

            {/* Indicators */}
            <div style={{
              display:'flex', justifyContent:'center', gap:'0.5rem', marginTop:'1.5rem',
            }}>
              {photos.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentPhotoIndex(idx)} style={{
                  width: currentPhotoIndex === idx ? 32 : 12, height:8,
                  background: currentPhotoIndex === idx ? C.amber : 'rgba(74,138,191,0.3)',
                  border:'none', borderRadius:4, cursor:'pointer',
                  transition:'all 0.3s',
                }} />
              ))}
            </div>

            {/* Counter */}
            <div style={{
              textAlign:'center', marginTop:'1rem',
              fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
              letterSpacing:'0.02em',
              color:'rgba(74,138,191,0.5)',
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
                  background:'rgba(0,33,71,0.6)',
                  border:'1px solid rgba(74,138,191,0.2)',
                  borderRadius:12, overflow:'hidden',
                  transition:'all 0.3s',
                }}>
                  {/* Photo */}
                  <div style={{
                    width:'100%', height:'280px', overflow:'hidden', position:'relative',
                  }}>
                    <img src={photo.src} alt={photo.title} style={{
                      width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform 0.3s',
                    }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  </div>

                  {/* Content */}
                  <div style={{ padding:'1rem' }}>
                    <div style={{
                      fontFamily:"'DM Sans', sans-serif", fontSize:'0.7rem',
                      letterSpacing:'0.02em',
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
                      borderTop:'1px solid rgba(74,138,191,0.2)',
                      paddingTop:'1rem', marginTop:'1rem',
                    }}>
                      <div style={{
                        fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
                        letterSpacing:'0.02em',
                        color:'rgba(74,138,191,0.6)', marginBottom:'0.8rem',
                      }}>
                        {photo.comments.length} commentaire{photo.comments.length > 1 ? 's' : ''}
                      </div>

                      {/* Show comments */}
                      <div style={{
                        maxHeight:'150px', overflowY:'auto', marginBottom:'0.8rem',
                      }}>
                        {photo.comments.map(comment => (
                          <div key={comment.id} style={{
                            background:'rgba(0,50,98,0.2)',
                            borderRadius:6, padding:'0.6rem',
                            marginBottom:'0.5rem', fontSize:'0.8rem',
                          }}>
                            <div style={{ fontWeight:600, color: C.lavender }}>
                              {comment.name}
                            </div>
                            <div style={{ color:'rgba(255,235,153,0.7)', marginTop:'0.2rem' }}>
                              {comment.text}
                            </div>
                            <div style={{ color:'rgba(74,138,191,0.4)', fontSize:'0.7rem', marginTop:'0.3rem' }}>
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
                            background:'rgba(0,33,71,0.8)',
                            border:'1px solid rgba(74,138,191,0.2)',
                            borderRadius:6, padding:'0.5rem 0.8rem',
                            fontFamily:"'DM Sans', sans-serif", fontSize:'0.8rem',
                            color: C.gold, outline:'none',
                            transition:'all 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = C.amber}
                          onBlur={e => e.target.style.borderColor = 'rgba(74,138,191,0.2)'}
                        />
                        <textarea
                          placeholder="Votre commentaire..."
                          value={commentText[photo.id] || ''}
                          onChange={e => setCommentText({ ...commentText, [photo.id]: e.target.value })}
                          style={{
                            background:'rgba(0,33,71,0.8)',
                            border:'1px solid rgba(74,138,191,0.2)',
                            borderRadius:6, padding:'0.5rem 0.8rem',
                            fontFamily:"'DM Sans', sans-serif", fontSize:'0.8rem',
                            color: C.gold, outline:'none', resize:'none',
                            height:'50px',
                            transition:'all 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = C.amber}
                          onBlur={e => e.target.style.borderColor = 'rgba(74,138,191,0.2)'}
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
          </>
          )}
        </section>
      )}

      <AlumniModal alumni={selectedAlumni} onClose={() => setSelectedAlumni(null)} />
    </div>
  );
}