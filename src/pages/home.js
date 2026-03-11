import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Camera, Heart, Star, ArrowRight, ChevronDown } from "lucide-react";

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

const GlowOrb = ({ style }) => (
  <div style={{ position:'absolute', borderRadius:'50%', filter:'blur(100px)', pointerEvents:'none', ...style }} />
);

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
};

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
    if (!started || typeof target !== 'number') return;
    let frame;
    const duration = 1400;
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
  return <span ref={ref}>{typeof target === 'number' ? val : target}{suffix}</span>;
}

/* ─── HERO IMAGES ────────────────────── */
const HERO_IMAGES = [
  "https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231607/db8f2e19a2914f238dda524c2317f4b5_nmpxhh.jpg",
  "https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231606/FB_IMG_1730070701137_hf7wqy.jpg",
  "https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231606/2bcb60453e6840a0bd1aedc375a2ba07_iaagsb.jpg",
];

const PREVIEW_ITEMS = [
  {
    url:   "https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231607/db8f2e19a2914f238dda524c2317f4b5_nmpxhh.jpg",
    title: "Moments d'étude",
    desc:  "Sessions de travail intenses et collaboration",
    accent: C.lavender,
  },
  {
    url:   "https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231606/FB_IMG_1730070701137_hf7wqy.jpg",
    title: "Événements spéciaux",
    desc:  "Célébrations et accomplissements",
    accent: C.amber,
  },
  {
    url:   "https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231606/2bcb60453e6840a0bd1aedc375a2ba07_iaagsb.jpg",
    title: "Vie étudiante",
    desc:  "Détente et amitié au quotidien",
    accent: C.mustard,
  },
];

const STATS = [
  { icon: Users,  value: 65,      suffix: '+', label: 'Étudiants',  accent: C.amber },
  { icon: Camera, value: 100,     suffix: '+', label: 'Photos',     accent: C.lavender },
  { icon: Heart,  value: '∞',     suffix: '',  label: 'Souvenirs',  accent: C.mustard },
  { icon: Star,   value: '2027',  suffix: '',  label: 'Promotion',  accent: C.indigo },
];

/* ─── PREVIEW CARD ───────────────────── */
function PreviewCard({ item, index }) {
  const [ref, vis] = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(40px)',
      transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'rgba(34,20,56,0.7)',
          border: hovered ? `1px solid ${item.accent}55` : '1px solid rgba(164,134,213,0.15)',
          borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
          transition: 'all 0.35s ease',
          transform: hovered ? 'translateY(-6px)' : 'none',
          boxShadow: hovered ? `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${item.accent}22` : 'none',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <img src={item.url} alt={item.title} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s ease',
            filter: hovered ? 'brightness(0.85)' : 'brightness(0.7)',
          }} />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, ${C.deep}cc, transparent 50%)`,
          }} />
          {/* Accent top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${item.accent}, transparent)`,
            opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
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
            width: hovered ? 48 : 24, height: 2, borderRadius: 2, marginTop: 16,
            background: `linear-gradient(90deg, ${item.accent}, transparent)`,
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────── */
export default function Homepage() {
  const navigate = useNavigate();
  const [mounted, setMounted]           = useState(false);
  const [imgIndex, setImgIndex]         = useState(0);
  const [previewRef, previewVis]        = useReveal(0.1);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    const iv = setInterval(() => setImgIndex(p => (p + 1) % HERO_IMAGES.length), 6000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{
      background: C.deep, minHeight: '100vh', color: C.gold,
      fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Syne+Mono&family=DM+Sans:wght@400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${C.deep}; }
        ::-webkit-scrollbar-thumb { background:${C.indigo}; border-radius:2px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(255,204,0,0.4)} 70%{box-shadow:0 0 0 20px rgba(255,204,0,0)} 100%{box-shadow:0 0 0 0 rgba(255,204,0,0)} }
      `}</style>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Carousel background */}
        {HERO_IMAGES.map((img, i) => (
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
          background: `linear-gradient(135deg, rgba(17,10,28,0.7) 0%, rgba(84,49,140,0.4) 50%, rgba(17,10,28,0.8) 100%)`,
        }} />

        {/* Ambient orbs */}
        <GlowOrb style={{ zIndex:1, width:700, height:700, top:'-20%', left:'50%', transform:'translateX(-50%)', background:`radial-gradient(circle, ${C.indigo}55 0%, transparent 65%)` }} />
        <GlowOrb style={{ zIndex:1, width:300, height:300, bottom:'10%', left:'5%', background:`radial-gradient(circle, ${C.amber}22 0%, transparent 65%)` }} />
        <GlowOrb style={{ zIndex:1, width:280, height:280, top:'20%', right:'5%', background:`radial-gradient(circle, ${C.lavender}30 0%, transparent 65%)` }} />

        {/* Grain texture */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, opacity: 0.04, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative', zIndex: 3, textAlign: 'center',
          padding: '0 2rem', maxWidth: 900,
          opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)',
          transition: 'opacity 1.2s ease 0.1s, transform 1.2s ease 0.1s',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(84,49,140,0.35)', border: '1px solid rgba(164,134,213,0.4)',
            borderRadius: 100, padding: '7px 22px', marginBottom: '2.5rem',
            fontFamily: "'Syne Mono', monospace", fontSize: '0.7rem',
            letterSpacing: '0.18em', textTransform: 'uppercase', color: C.lavender,
            animation: mounted ? 'fadeSlide 0.8s ease 0.3s both' : 'none',
          }}>
            {/* <span style={{ width:6, height:6, borderRadius:'50%', background: C.amber, display:'inline-block', animation:'pulse-ring 2s infinite' }} /> */}
            Promotion 2022 — 2027
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
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.amber} 45%, ${C.mustard} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'block',
            }}>Legendary</span>
            <span style={{
              fontStyle: 'italic',
              color: C.lavender,
              display: 'block',
            }}>Cave</span>
          </h1>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
            marginBottom: '1.8rem',
            animation: mounted ? 'fadeSlide 0.9s ease 0.7s both' : 'none',
          }}>
            <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${C.amber})` }} />
            <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${C.amber}, transparent)` }} />
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
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: C.amber, marginBottom: '3.5rem',
            animation: mounted ? 'fadeSlide 0.9s ease 0.9s both' : 'none',
          }}>
            Souvenirs · Amitié · Challenges
          </p>

          {/* CTA */}
          <div style={{
            display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: '4.5rem',
            animation: mounted ? 'fadeSlide 0.9s ease 1s both' : 'none',
          }}>
            <button onClick={() => navigate('/galerie')} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: `linear-gradient(135deg, ${C.amber}, ${C.mustard})`,
              color: C.deep, border: 'none', cursor: 'pointer',
              fontFamily: "'Syne Mono', monospace", fontSize: '0.78rem',
              fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '14px 32px', borderRadius: 6,
              boxShadow: `0 0 40px ${C.amber}44`,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='scale(1.04)'; e.currentTarget.style.boxShadow=`0 0 50px ${C.amber}66`; }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=`0 0 40px ${C.amber}44`; }}
            >
              Explorer la Galerie <ArrowRight size={14} />
            </button>
            <button onClick={() => scrollTo('preview')} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'transparent',
              color: C.gold, border: '1px solid rgba(255,235,153,0.25)', cursor: 'pointer',
              fontFamily: "'Syne Mono', monospace", fontSize: '0.78rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '14px 32px', borderRadius: 6,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`rgba(255,235,153,0.5)`; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,235,153,0.25)'; e.currentTarget.style.background='transparent'; }}
            >
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
                  borderRadius: 16, backdropFilter: 'blur(8px)', minWidth: 100,
                }}>
                  <Icon size={18} color={s.accent} style={{ marginBottom: 8 }} />
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '2rem', fontWeight: 700, lineHeight: 1, color: s.accent,
                  }}>
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{
                    fontFamily: "'Syne Mono', monospace", fontSize: '0.6rem',
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'rgba(255,235,153,0.35)', marginTop: 6,
                  }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          opacity: mounted ? 0.5 : 0, transition: 'opacity 1s ease 1.5s',
          // animation: 'float 2.5s ease-in-out infinite',
          cursor: 'pointer',
        }} onClick={() => scrollTo('preview')}>
          <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gold }}>Découvrir</span>
          <ChevronDown size={16} color={C.amber} />
        </div>

        {/* Carousel dots */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', right: '3rem', zIndex: 3,
          display: 'flex', gap: 8,
        }}>
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setImgIndex(i)} style={{
              width: i === imgIndex ? 24 : 6, height: 6, borderRadius: 3,
              background: i === imgIndex ? C.amber : 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.4s ease',
              boxShadow: i === imgIndex ? `0 0 8px ${C.amber}88` : 'none',
            }} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          PREVIEW SECTION
      ══════════════════════════════ */}
      <section id="preview" style={{ padding: '7rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <GlowOrb style={{ width:500, height:500, top:0, left:'50%', transform:'translateX(-50%)', background:`radial-gradient(circle, ${C.indigo}35 0%, transparent 65%)` }} />
        <GlowOrb style={{ width:300, height:300, bottom:'10%', right:'-5%', background:`radial-gradient(circle, ${C.amber}15 0%, transparent 65%)` }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          {/* Section header */}
          <div ref={previewRef} style={{
            textAlign: 'center', marginBottom: '4rem',
            opacity: previewVis ? 1 : 0, transform: previewVis ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>
            <div style={{
              fontFamily: "'Syne Mono', monospace", fontSize: '0.7rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: C.amber, marginBottom: '1.2rem',
            }}>— Un aperçu</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0,
              letterSpacing: '-0.02em', marginBottom: '1.5rem',
            }}>
              <span style={{
                background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Un aperçu de</span>
              <br />
              <span style={{
                fontStyle: 'italic',
                background: `linear-gradient(90deg, ${C.lavender}, ${C.indigo} 60%, ${C.amber})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
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
              <div style={{ width:60, height:1, background:`linear-gradient(90deg, transparent, ${C.amber})` }} />
              <span style={{ color: C.amber }}>✦</span>
              <div style={{ width:60, height:1, background:`linear-gradient(90deg, ${C.amber}, transparent)` }} />
            </div>
          </div>

          {/* Preview grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem',
            marginBottom: '3.5rem',
          }}>
            {PREVIEW_ITEMS.map((item, i) => <PreviewCard key={i} item={item} index={i} />)}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => navigate('/galerie?section=souvenirs')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: 'rgba(34,20,56,0.8)',
              border: `1px solid rgba(164,134,213,0.25)`,
              color: C.gold, cursor: 'pointer',
              fontFamily: "'Syne Mono', monospace", fontSize: '0.76rem',
              fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '14px 36px', borderRadius: 6,
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${C.amber}66`; e.currentTarget.style.color=C.amber; e.currentTarget.style.boxShadow=`0 0 20px ${C.amber}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(164,134,213,0.25)'; e.currentTarget.style.color=C.gold; e.currentTarget.style.boxShadow='none'; }}
            >
              Voir toute la galerie <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ─────────────── */}
      <div style={{
        borderTop: '1px solid rgba(164,134,213,0.1)',
        padding: '2rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(0,0,0,0.25)',
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', color: 'rgba(255,235,153,0.3)', fontSize: '0.9rem',
        }}>Legendary Cave — Promo 2027</div>
        <div style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'rgba(164,134,213,0.3)',
        }}>Made by Zinxium</div>
      </div>
    </div>
  );
}