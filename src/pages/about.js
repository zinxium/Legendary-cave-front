import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar, Users, Trophy, Target, Heart, Star,
  BookOpen, Lightbulb, Award, Rocket, Clock, Code
} from 'lucide-react';

/* ─────────────────────────────────────────
   DESIGN TOKENS  (palette Legendary Cave)
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const stats = [
  { icon: Users,   number: '65',  label: 'Étudiants',          accent: C.amber },
  { icon: Calendar,number: '3',   label: "Années d'études",    accent: C.lavender },
  { icon: Trophy,  number: '50+', label: 'Projets réalisés',   accent: C.mustard },
  { icon: Code,    number: '8',   label: "Domaines d'expertise", accent: C.indigo },
];

const timeline = [
  { year: '2022', title: "L'Étincelle",     desc: '65 esprits passionnés se rencontrent pour la première fois.', icon: Rocket,   accent: C.amber },
  { year: '2023', title: 'Les Fondations',  desc: 'Fondamentaux, nuits blanches, et premiers projets collectifs.', icon: BookOpen, accent: C.lavender },
  { year: '2024', title: 'La Spécialisation', desc: 'Chaque étudiant forge son expertise et ses projets d\'envergure.', icon: Target,   accent: C.mustard },
  { year: '2027', title: 'La Légende',      desc: 'Diplômes en main, prêts à révolutionner la technologie.', icon: Star,     accent: C.indigo },
];

const values = [
  { icon: Lightbulb, title: 'Innovation',    desc: 'Repousser constamment les frontières du possible.', accent: C.amber },
  { icon: Users,     title: 'Collaboration', desc: 'Nos différences sont notre plus grande force.', accent: C.lavender },
  { icon: Heart,     title: 'Passion',       desc: "L'amour du code et des défis guide chaque décision.", accent: C.mustard },
  { icon: Award,     title: 'Excellence',    desc: 'La qualité n\'est pas une option, c\'est notre standard.', accent: C.indigo },
];

const domains = [
  { name: 'Intelligence Artificielle', students: 12, icon: 'IA', accent: C.lavender },
  { name: 'Développement Web',         students: 15, icon: 'WEB', accent: C.amber },
  { name: 'Cybersécurité',             students: 8,  icon: 'SEC', accent: C.indigo },
  { name: 'Data Science',              students: 10, icon: 'DATA', accent: C.mustard },
  { name: 'UX/UI Design',              students: 7,  icon: 'UX', accent: C.lavender },
  { name: 'DevOps',                    students: 6,  icon: 'OPS', accent: C.amber },
  { name: 'Mobile Dev',                students: 5,  icon: 'MOB', accent: C.mustard },
  { name: 'IoT',                       students: 2,  icon: 'IoT', accent: C.indigo },
];

const SECTIONS = [
  { id: 'story',    label: 'Histoire',  icon: BookOpen },
  { id: 'values',   label: 'Valeurs',   icon: Heart },
  { id: 'domains',  label: 'Domaines',  icon: Code },
  { id: 'timeline', label: 'Parcours',  icon: Clock },
];

/* ─────────────────────────────────────────
   TINY HELPERS
───────────────────────────────────────── */
const GlowOrb = ({ style }) => (
  <div style={{ position:'absolute', borderRadius:'50%', filter:'blur(90px)', pointerEvents:'none', ...style }} />
);

const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

function StatCard({ stat, index }) {
  const [ref, vis] = useReveal();
  const Icon = stat.icon;
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(32px)',
      transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      background: `rgba(34,20,56,0.6)`,
      border: `1px solid ${stat.accent}33`,
      borderRadius: 16, padding: '2rem 1.5rem',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position:'absolute', inset:0,
        background: `radial-gradient(ellipse at 50% 0%, ${stat.accent}18 0%, transparent 65%)`,
      }} />
      <div style={{
        width: 52, height: 52, borderRadius: 14, margin: '0 auto 1.2rem',
        background: `${stat.accent}22`, border: `1px solid ${stat.accent}55`,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <Icon size={22} color={stat.accent} />
      </div>
      <div style={{
        fontFamily:"'Cormorant Garamond', Georgia, serif",
        fontSize:'3rem', fontWeight:700, lineHeight:1,
        color: stat.accent, marginBottom:'0.4rem',
      }}>{stat.number}</div>
      <div style={{
        fontFamily:"'Syne Mono', monospace",
        fontSize:'0.68rem', letterSpacing:'0.15em', textTransform:'uppercase',
        color:'rgba(255,235,153,0.45)',
      }}>{stat.label}</div>
    </div>
  );
}

function SectionStory() {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis?1:0, transform: vis?'none':'translateY(40px)',
      transition:'opacity 0.8s ease, transform 0.8s ease',
      maxWidth:960, margin:'0 auto',
    }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' }}>
        {/* Left: decorative visual */}
        <div style={{ position:'relative' }}>
          <div style={{
            aspectRatio:'4/5', borderRadius:24, overflow:'hidden',
            background:`linear-gradient(145deg, ${C.surface}, ${C.mid})`,
            border:`1px solid rgba(164,134,213,0.2)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            position:'relative',
          }}>
            <GlowOrb style={{ width:300, height:300, top:'20%', left:'10%', background:`radial-gradient(circle, ${C.indigo}55 0%, transparent 70%)` }} />
            <div style={{ textAlign:'center', position:'relative', zIndex:1 }}>
              <div style={{ fontSize:'5rem', marginBottom:'1rem', filter:`drop-shadow(0 0 20px ${C.amber}88)` }}>🪨</div>
              <div style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1.4rem', fontStyle:'italic',
                color: C.gold, opacity:0.7,
              }}>La caverne des légendes</div>
            </div>
            {/* Corner accents */}
            {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos,i) => (
              <div key={i} style={{
                position:'absolute',
                top: pos.includes('top') ? 16 : 'auto',
                bottom: pos.includes('bottom') ? 16 : 'auto',
                left: pos.includes('left') ? 16 : 'auto',
                right: pos.includes('right') ? 16 : 'auto',
                width: 24, height: 24,
                borderTop: pos.includes('top') ? `2px solid ${C.amber}` : 'none',
                borderBottom: pos.includes('bottom') ? `2px solid ${C.amber}` : 'none',
                borderLeft: pos.includes('left') ? `2px solid ${C.amber}` : 'none',
                borderRight: pos.includes('right') ? `2px solid ${C.amber}` : 'none',
              }} />
            ))}
          </div>
          {/* Floating badge */}
          <div style={{
            position:'absolute', bottom:-20, right:-20,
            background:`linear-gradient(135deg, ${C.amber}, ${C.mustard})`,
            color: C.deep, borderRadius:12, padding:'1rem 1.4rem',
            fontFamily:"'Syne Mono', monospace", fontSize:'0.72rem',
            fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase',
            boxShadow:`0 16px 40px ${C.amber}44`,
          }}>
            Promo 2027 ✦
          </div>
        </div>

        {/* Right: text */}
        <div style={{ paddingTop:'1rem' }}>
          <div style={{
            fontFamily:"'Syne Mono', monospace", fontSize:'0.7rem',
            letterSpacing:'0.2em', textTransform:'uppercase',
            color: C.amber, marginBottom:'1.2rem',
          }}>— Genèse</div>

          <h3 style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'2.6rem', fontWeight:700, lineHeight:1.15,
            color: C.gold, marginBottom:'2rem',
          }}>
            La naissance d'une<br />
            <span style={{ color: C.lavender, fontStyle:'italic' }}>légende</span>
          </h3>

          {[
            'En septembre 2022, 65 étudiants passionnés par l\'informatique se sont retrouvés pour entamer un voyage extraordinaire. Chacun avec ses rêves, ses ambitions et sa vision unique de la technologie.',
            'Au fil des mois, nous avons grandi ensemble, appris ensemble, et créé des liens indéfectibles. Nos différences sont devenues notre force, nos défis nos opportunités d\'excellence.',
            '«\u202fLegendary Cave\u202f» n\'est pas seulement un projet — c\'est le témoignage vivant d\'un parcours exceptionnel et du début d\'une aventure qui ne fait que commencer.',
          ].map((p, i) => (
            <p key={i} style={{
              fontFamily:"'DM Sans', sans-serif",
              fontSize:'1rem', lineHeight:1.85,
              color:'rgba(255,235,153,0.65)',
              marginBottom:'1.2rem',
              paddingLeft: i === 2 ? '1rem' : 0,
              borderLeft: i === 2 ? `2px solid ${C.amber}` : 'none',
            }}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValueCard({ v, i }) {
  const [ref, vis] = useReveal();
  const Icon = v.icon;
  return (
    <div key={i} ref={ref} style={{
      opacity: vis?1:0, transform: vis?'none':`translateX(${i%2===0?-30:30}px)`,
      transition:`opacity 0.7s ease ${i*0.1}s, transform 0.7s ease ${i*0.1}s`,
      background:`rgba(34,20,56,0.7)`,
      border:`1px solid rgba(164,134,213,0.15)`,
      borderRadius:20, padding:'2.5rem',
      position:'relative', overflow:'hidden',
    }}>
      <div style={{
        position:'absolute', top:0, right:0,
        width:120, height:120,
        background:`radial-gradient(circle at 80% 20%, ${v.accent}20 0%, transparent 70%)`,
      }} />
      <div style={{
        width:52, height:52, borderRadius:14,
        background:`${v.accent}1a`, border:`1px solid ${v.accent}44`,
        display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.5rem',
      }}>
        <Icon size={22} color={v.accent} />
      </div>
      <div style={{
        fontFamily:"'Cormorant Garamond', serif",
        fontSize:'1.6rem', fontWeight:700,
        color: v.accent, marginBottom:'0.8rem',
      }}>{v.title}</div>
      <div style={{
        fontFamily:"'DM Sans', sans-serif",
        fontSize:'0.95rem', lineHeight:1.75,
        color:'rgba(255,235,153,0.55)',
      }}>{v.desc}</div>
      <div style={{
        width:36, height:2, borderRadius:2,
        background:`linear-gradient(90deg, ${v.accent}, transparent)`,
        marginTop:'1.5rem',
      }} />
    </div>
  );
}

function SectionValues() {
  return (
    <div style={{ maxWidth:1000, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
        {values.map((v, i) => <ValueCard key={i} v={v} i={i} />)}
      </div>
    </div>
  );
}

function DomainCard({ d, i }) {
  const [ref, vis] = useReveal();
  const maxStudents = 15;
  const pct = Math.round((d.students / maxStudents) * 100);
  return (
            <div key={i} ref={ref} style={{
              opacity: vis?1:0, transform: vis?'none':'scale(0.9)',
              transition:`opacity 0.5s ease ${i*0.07}s, transform 0.5s ease ${i*0.07}s`,
              background:`rgba(34,20,56,0.8)`,
              border:`1px solid ${d.accent}22`,
              borderRadius:16, padding:'1.6rem',
              textAlign:'center', position:'relative', overflow:'hidden',
              cursor:'default',
            }}>
              <div style={{ fontFamily:"'Syne Mono', monospace", fontSize:'0.8rem', fontWeight:700, color: d.accent, marginBottom:'0.8rem', lineHeight:1 }}>{d.icon}</div>
              <div style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1rem', fontWeight:700,
                color: C.gold, marginBottom:'0.5rem', lineHeight:1.3,
              }}>{d.name}</div>
              {/* Progress bar */}
              <div style={{
                height:3, borderRadius:2, background:'rgba(255,255,255,0.07)',
                margin:'0.8rem 0',
              }}>
                <div style={{
                  height:'100%', borderRadius:2,
                  width: vis ? `${pct}%` : '0%',
                  background:`linear-gradient(90deg, ${d.accent}, ${d.accent}99)`,
                  transition:`width 1.2s cubic-bezier(0.4,0,0.2,1) ${i*0.07+0.3}s`,
                  boxShadow:`0 0 8px ${d.accent}88`,
                }} />
              </div>
              <div style={{
                fontFamily:"'Syne Mono', monospace",
                fontSize:'1.4rem', fontWeight:700, color: d.accent,
              }}>{d.students}</div>
              <div style={{
                fontFamily:"'Syne Mono', monospace",
                fontSize:'0.62rem', letterSpacing:'0.12em', textTransform:'uppercase',
                color:'rgba(255,235,153,0.35)',
              }}>étudiants</div>
            </div>
          );
}

function SectionDomains() {
  return (
    <div style={{ maxWidth:1000, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1rem' }}>
        {domains.map((d, i) => <DomainCard key={i} d={d} i={i} />)}
      </div>
    </div>
  );
}

function SectionTimeline() {
  return (
    <div style={{ maxWidth:720, margin:'0 auto' }}>
      <div style={{ position:'relative', paddingLeft:'2rem' }}>
        {/* Vertical line */}
        <div style={{
          position:'absolute', left:19, top:0, bottom:0, width:2,
          background:`linear-gradient(to bottom, ${C.amber}, ${C.lavender}, ${C.mustard}, ${C.indigo})`,
          borderRadius:2,
        }} />

        {timeline.map((item, i) => <TimelineNode key={i} item={item} i={i} len={timeline.length} />)}
      </div>
    </div>
  );
}

function TimelineNode({ item, i, len }) {
  const [ref, vis] = useReveal();
  const Icon = item.icon;
  return (
    <div ref={ref} style={{
      opacity: vis?1:0, transform: vis?'none':'translateX(40px)',
      transition:`opacity 0.6s ease ${i*0.15}s, transform 0.6s ease ${i*0.15}s`,
      display:'flex', gap:'2rem', marginBottom: i < len-1 ? '3rem' : 0,
      alignItems:'flex-start',
    }}>
      {/* Node */}
      <div style={{
        flexShrink:0, width:40, height:40, borderRadius:'50%',
        background:`${item.accent}22`, border:`2px solid ${item.accent}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        zIndex:1, position:'relative', marginLeft:-21,
        boxShadow:`0 0 16px ${item.accent}55`,
      }}>
        <Icon size={16} color={item.accent} />
      </div>

      {/* Card */}
      <div style={{
        background:`rgba(34,20,56,0.75)`,
        border:`1px solid ${item.accent}25`,
        borderRadius:16, padding:'1.6rem 2rem', flex:1,
        position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:2,
          background:`linear-gradient(90deg, ${item.accent}, transparent)`,
        }} />
        <div style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'2.5rem', fontWeight:700, lineHeight:1,
          color: item.accent, marginBottom:'0.3rem',
        }}>{item.year}</div>
        <div style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'1.3rem', fontWeight:600,
          color: C.gold, marginBottom:'0.6rem',
        }}>{item.title}</div>
        <div style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'0.92rem', lineHeight:1.7,
          color:'rgba(255,235,153,0.55)',
        }}>{item.desc}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function About() {
  const [active, setActive] = useState('story');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const sectionContent = {
    story:    <SectionStory />,
    values:   <SectionValues />,
    domains:  <SectionDomains />,
    timeline: <SectionTimeline />,
  };

  return (
    <div style={{
      background: C.deep, minHeight:'100vh', color: C.gold,
      fontFamily:"'DM Sans', sans-serif", position:'relative', overflow:'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Syne+Mono&family=DM+Sans:wght@400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${C.deep}; }
        ::-webkit-scrollbar-thumb { background:${C.indigo}; border-radius:2px; }
      `}</style>

      {/* Ambient background orbs */}
      <GlowOrb style={{ width:700, height:700, top:'-15%', left:'60%', background:`radial-gradient(circle, ${C.indigo}40 0%, transparent 65%)` }} />
      <GlowOrb style={{ width:400, height:400, top:'30%', left:'-10%', background:`radial-gradient(circle, ${C.amber}18 0%, transparent 65%)` }} />
      <GlowOrb style={{ width:500, height:500, bottom:'0%', right:'10%', background:`radial-gradient(circle, ${C.lavender}22 0%, transparent 65%)` }} />

      {/* ── HERO ─────────────────────────── */}
      <section style={{
        padding:'7rem 3rem 5rem', textAlign:'center', position:'relative',
        opacity: mounted?1:0, transform: mounted?'none':'translateY(30px)',
        transition:'opacity 1s ease, transform 1s ease',
      }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'rgba(84,49,140,0.3)', border:'1px solid rgba(164,134,213,0.35)',
          borderRadius:100, padding:'6px 20px', marginBottom:'2.5rem',
          fontFamily:"'Syne Mono', monospace", fontSize:'0.7rem',
          letterSpacing:'0.18em', textTransform:'uppercase', color: C.lavender,
        }}>
          {/* <span style={{ width:6, height:6, borderRadius:'50%', background: C.amber, display:'inline-block' }} /> */}
          Promotion 2022–2027
        </div>

        <h1 style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'clamp(4rem, 10vw, 8rem)', fontWeight:700, lineHeight:0.95,
          letterSpacing:'-0.02em', marginBottom:'2rem',
        }}>
          <span style={{
            background:`linear-gradient(135deg, ${C.gold} 0%, ${C.amber} 50%, ${C.lavender} 100%)`,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>À Propos</span>
          <br />
          <span style={{
            fontStyle:'italic', fontSize:'0.6em',
            background:`linear-gradient(90deg, ${C.lavender}, ${C.indigo} 60%, ${C.amber})`,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>de la Cave</span>
        </h1>

        <p style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'1.15rem', color:'rgba(255,235,153,0.55)',
          maxWidth:520, margin:'0 auto 3rem', lineHeight:1.8,
        }}>
          L'histoire exceptionnelle d'une promotion qui a marqué son époque — et ne fait que commencer.
        </p>

        {/* Decorative divider */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16 }}>
          <div style={{ width:80, height:1, background:`linear-gradient(90deg, transparent, ${C.amber})` }} />
          <div style={{ width:80, height:1, background:`linear-gradient(90deg, ${C.amber}, transparent)` }} />
        </div>
      </section>

      {/* ── STATS ────────────────────────── */}
      <section style={{ padding:'0 3rem 5rem' }}>
        <div style={{
          maxWidth:900, margin:'0 auto',
          display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1.2rem',
        }}>
          {stats.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
        </div>
      </section>

      {/* ── NAV TABS ─────────────────────── */}
      <nav style={{
        position:'sticky', top:0, zIndex:50,
        background:'rgba(17,10,28,0.88)', backdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(164,134,213,0.12)',
        padding:'0 3rem',
      }}>
        <div style={{
          maxWidth:900, margin:'0 auto',
          display:'flex', gap:4, padding:'0.75rem 0',
        }}>
          {SECTIONS.map(sec => {
            const Icon = sec.icon;
            const isActive = active === sec.id;
            return (
              <button key={sec.id} onClick={() => setActive(sec.id)} style={{
                display:'flex', alignItems:'center', gap:8,
                padding:'10px 24px', borderRadius:100, border:'none', cursor:'pointer',
                fontFamily:"'Syne Mono', monospace", fontSize:'0.72rem',
                letterSpacing:'0.12em', textTransform:'uppercase',
                background: isActive ? `linear-gradient(135deg, ${C.amber}, ${C.mustard})` : 'rgba(255,255,255,0.04)',
                color: isActive ? C.deep : 'rgba(255,235,153,0.45)',
                fontWeight: isActive ? 700 : 400,
                boxShadow: isActive ? `0 0 20px ${C.amber}44` : 'none',
                transition:'all 0.25s ease',
              }}>
                <Icon size={14} />
                {sec.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── SECTION HEADER ───────────────── */}
      <section style={{ padding:'4rem 3rem 0' }}>
        <div style={{ maxWidth:900, margin:'0 auto', marginBottom:'3rem' }}>
          <div style={{
            fontFamily:"'Syne Mono', monospace", fontSize:'0.68rem',
            letterSpacing:'0.2em', textTransform:'uppercase',
            color: C.amber, marginBottom:'0.8rem',
          }}>
            — {SECTIONS.find(s => s.id === active)?.label}
          </div>
          <h2 style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'clamp(2rem, 5vw, 3.5rem)', fontWeight:700, lineHeight:1.1,
            color: C.gold,
          }}>
            {active === 'story'    && <>La genèse<br /><span style={{ fontStyle:'italic', color: C.lavender }}>de Legendary Cave</span></>}
            {active === 'values'   && <>Ce qui nous<br /><span style={{ fontStyle:'italic', color: C.lavender }}>définit</span></>}
            {active === 'domains'  && <>Nos domaines<br /><span style={{ fontStyle:'italic', color: C.lavender }}>d'expertise</span></>}
            {active === 'timeline' && <>Notre parcours<br /><span style={{ fontStyle:'italic', color: C.lavender }}>en 4 étapes</span></>}
          </h2>
        </div>
      </section>

      {/* ── DYNAMIC CONTENT ──────────────── */}
      <section style={{ padding:'0 3rem 6rem' }}>
        <div key={active} style={{
          opacity:1, animation:'fadeIn 0.5s ease',
        }}>
          {sectionContent[active]}
        </div>
      </section>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
      `}</style>

      {/* ── FOOTER ───────────────────────── */}
      <footer style={{
        borderTop:'1px solid rgba(164,134,213,0.1)',
        padding:'2rem 3rem',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        background:'rgba(0,0,0,0.25)',
      }}>
        <div style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontStyle:'italic', color:'rgba(255,235,153,0.35)', fontSize:'0.95rem',
        }}>Legendary Cave — Promo 2027</div>
        <div style={{
          fontFamily:"'Syne Mono', monospace",
          fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase',
          color:'rgba(164,134,213,0.3)',
        }}>À Propos ✦</div>
      </footer>
    </div>
  );
}