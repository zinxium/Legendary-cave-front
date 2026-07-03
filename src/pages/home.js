import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Camera, Heart, Star, ArrowRight } from "lucide-react";
import { C } from '../tokens';
import { getSouvenirs } from '../services/apiService';

const PREVIEW_LABELS = [
  { title: "Moments d'étude",      desc: "Sessions de travail intenses et collaboration", accent: C.lavender },
  { title: "Événements spéciaux",   desc: "Célébrations et accomplissements",              accent: C.amber },
  { title: "Vie étudiante",         desc: "Détente et amitié au quotidien",                accent: C.mustard },
];

const STATS = [
  { icon: Users,  value: 63,      suffix: '+', label: 'Etudiants',  accent: C.amber },
  { icon: Camera, value: 100,     suffix: '+', label: 'Photos',     accent: C.lavender },
  { icon: Heart,  value: '-',     suffix: '',  label: 'Souvenirs',  accent: C.mustard },
  { icon: Star,   value: '2027',  suffix: '',  label: 'Promotion',  accent: C.indigo },
];

/* ─── PREVIEW CARD ───────────────────── */
function PreviewCard({ item }) {
  return (
    <div style={{
      background: 'rgba(0,33,71,0.7)',
      border: '1px solid rgba(74,138,191,0.15)',
      borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
      transition: 'opacity 0.3s ease',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <img src={item.url} alt={item.title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: 'brightness(0.7)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `${C.deep}cc`,
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.3rem', fontWeight: 700, color: C.gold, marginBottom: 6,
        }}>{item.title}</div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.85rem', color: 'rgba(255,235,153,0.5)', lineHeight: 1.6,
        }}>{item.desc}</div>
        <div style={{
          width: 24, height: 2, borderRadius: 2, marginTop: 16,
          background: item.accent, opacity: 0.4,
        }} />
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────── */
export default function Homepage() {
  const navigate = useNavigate();
  const [mounted, setMounted]   = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
  const [previewItems, setPreviewItems] = useState([]);

  useEffect(() => {
    getSouvenirs().then(data => {
      const urls = data.map(p => p.src);
      setHeroImages(urls.slice(0, 3));
      setPreviewItems(
        urls.slice(0, 3).map((url, i) => ({
          url,
          ...(PREVIEW_LABELS[i] || { title: `Photo ${i + 1}`, desc: '', accent: C.lavender }),
        }))
      );
    }).catch(() => {});
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const iv = setInterval(() => setImgIndex(p => (p + 1) % heroImages.length), 6000);
    return () => clearInterval(iv);
  }, [heroImages]);

  return (
    <div style={{
      background: C.deep, minHeight: '100vh', color: C.gold,
      fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden',
    }}>
      <style>{'@keyframes fadeSlide { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }'}</style>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Carousel background */}
        {heroImages.map((img, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0, zIndex: 0,
            opacity: i === imgIndex ? 1 : 0,
            transform: i === imgIndex ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 2s ease, transform 2s ease',
          }}>
            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}

        {/* Dark veil + color tint */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(0,18,41,0.75)',
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative', zIndex: 2, textAlign: 'center',
          padding: '0 2rem', maxWidth: 900,
          opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)',
          transition: 'opacity 1.2s ease 0.1s, transform 1.2s ease 0.1s',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,50,98,0.35)', border: '1px solid rgba(74,138,191,0.4)',
            borderRadius: 100, padding: '7px 22px', marginBottom: '2.5rem',
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem',
            letterSpacing: '0.05em', textTransform: 'uppercase', color: C.lavender,
            animation: mounted ? 'fadeSlide 0.8s ease 0.3s both' : 'none',
          }}>
            Promotion 2022 - 2027
          </div>

          {/* Main title */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(4.5rem, 12vw, 10rem)', fontWeight: 700,
            lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '1.5rem',
            animation: mounted ? 'fadeSlide 0.9s ease 0.5s both' : 'none',
            width: '100%', overflow: 'visible', wordBreak: 'break-word',
          }}>
            <span style={{
              color: C.amber,
              display: 'block',
            }}>Cave27</span>
          </h1>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
            marginBottom: '1.8rem',
            animation: mounted ? 'fadeSlide 0.9s ease 0.7s both' : 'none',
          }}>
            <div style={{ width: 60, height: 1, background: C.amber, opacity: 0.4 }} />
            <div style={{ width: 60, height: 1, background: C.amber, opacity: 0.4 }} />
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,235,153,0.6)',
            lineHeight: 1.75, marginBottom: '0.6rem',
            animation: mounted ? 'fadeSlide 0.9s ease 0.8s both' : 'none',
          }}>
            Notre parcours étudiant immortalisé en images
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.85rem', letterSpacing: '0.05em',
            color: C.amber, marginBottom: '3.5rem',
            animation: mounted ? 'fadeSlide 0.9s ease 0.9s both' : 'none',
          }}>
            Souvenirs, Amitie, Challenges
          </p>

          {/* CTA */}
          <div style={{
            display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: '4.5rem',
            animation: mounted ? 'fadeSlide 0.9s ease 1s both' : 'none',
          }}>
            <button onClick={() => navigate('/galerie')} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: C.amber,
              color: C.deep, border: 'none', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
              fontWeight: 600, letterSpacing: '0.03em',
              padding: '14px 32px', borderRadius: 6,
              transition: 'opacity 0.2s',
            }}>
              Explorer la Galerie <ArrowRight size={14} />
            </button>
            <button onClick={() => navigate('/about')} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'transparent',
              color: C.gold, border: '1px solid rgba(255,235,153,0.25)', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
              padding: '14px 32px', borderRadius: 6,
              transition: 'opacity 0.2s',
            }}>
              En savoir plus
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap',
            animation: mounted ? 'fadeSlide 0.9s ease 1.1s both' : 'none',
          }}>
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '1.2rem 1.8rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16, minWidth: 100,
                }}>
                  <Icon size={18} color={s.accent} style={{ marginBottom: 8 }} />
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '2rem', fontWeight: 700, lineHeight: 1, color: s.accent,
                  }}>
                    {s.value}{s.suffix}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem',
                    color: 'rgba(255,235,153,0.35)', marginTop: 6,
                  }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel dots */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', right: '3rem', zIndex: 2,
          display: 'flex', gap: 8,
        }}>
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setImgIndex(i)} style={{
              width: i === imgIndex ? 24 : 6, height: 6, borderRadius: 3,
              background: i === imgIndex ? C.amber : 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          PREVIEW SECTION
      ══════════════════════════════ */}
      <section id="preview" style={{ padding: '5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem',
              letterSpacing: '0.05em',
              color: C.amber, marginBottom: '1.2rem',
            }}>Un apercu</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0,
              letterSpacing: '-0.02em', marginBottom: '1.5rem',
            }}>
              <span style={{
                color: C.amber,
              }}>Un aperçu de</span>
              <br />
              <span style={{
                fontStyle: 'italic',
                color: C.lavender,
              }}>notre aventure</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem', color: 'rgba(255,235,153,0.5)',
              maxWidth: 540, margin: '0 auto', lineHeight: 1.8,
            }}>
              Chaque photo raconte une histoire, chaque moment capture l'essence de notre parcours ensemble.
            </p>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginTop:'2rem' }}>
              <div style={{ width:60, height:1, background: C.amber, opacity: 0.4 }} />
              <div style={{ width:60, height:1, background: C.amber, opacity: 0.4 }} />
            </div>
          </div>

          {/* Preview grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem',
            marginBottom: '3.5rem',
          }}>
            {previewItems.map((item, i) => <PreviewCard key={i} item={item} />)}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => navigate('/galerie?section=souvenirs')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: 'rgba(0,33,71,0.8)',
              border: '1px solid rgba(74,138,191,0.25)',
              color: C.gold, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
              fontWeight: 600,
              padding: '14px 36px', borderRadius: 6,
              transition: 'opacity 0.25s',
            }}>
              Voir toute la galerie <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}