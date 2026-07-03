import React, { useState } from 'react';
import {
  Calendar, Users, Trophy, Target, Heart, Star,
  BookOpen, Lightbulb, Award, Rocket, Clock, Code
} from 'lucide-react';
import { C } from '../tokens';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const stats = [
  { icon: Users,   number: '63',  label: 'Etudiants',          accent: C.amber },
  { icon: Calendar,number: '3',   label: "Années d'études",    accent: C.lavender },
  { icon: Trophy,  number: '50+', label: 'Projets réalisés',   accent: C.mustard },
  { icon: Code,    number: '8',   label: "Domaines d'expertise", accent: C.indigo },
];

const timeline = [
  { year: '2022', title: "L'Etincelle",     desc: '63 esprits passionnes se rencontrent pour la premiere fois.', icon: Rocket,   accent: C.amber },
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
   SUB-COMPONENTS
───────────────────────────────────────── */

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div style={{
      background: `rgba(0,33,71,0.6)`,
      border: `1px solid ${stat.accent}33`,
      borderRadius: 16, padding: '2rem 1.5rem',
      textAlign: 'center',
    }}>
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
        fontFamily:"'DM Sans', sans-serif",
        fontSize:'0.75rem',
        color:'rgba(255,235,153,0.45)',
      }}>{stat.label}</div>
    </div>
  );
}

function SectionStory() {
  return (
    <div style={{ maxWidth:960, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' }}>
        {/* Left: decorative visual */}
        <div style={{ position:'relative' }}>
          <div style={{
            aspectRatio:'4/5', borderRadius:24, overflow:'hidden',
            background: C.surface,
            border:`1px solid rgba(74,138,191,0.2)`,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <div style={{ textAlign:'center' }}>
              <div style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1.4rem', fontStyle:'italic',
                color: C.gold, opacity:0.7,
              }}>La caverne des légendes</div>
            </div>
          </div>
          {/* Floating badge */}
          <div style={{
            position:'absolute', bottom:-20, right:-20,
            background: C.amber,
            color: C.deep, borderRadius:12, padding:'1rem 1.4rem',
            fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
            fontWeight:700,
          }}>
            Promo 2027
          </div>
        </div>

        {/* Right: text */}
        <div style={{ paddingTop:'1rem' }}>
          <div style={{
            fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
            letterSpacing:'0.05em',
            color: C.amber, marginBottom:'1.2rem',
          }}>Genèse</div>

          <h3 style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'2.6rem', fontWeight:700, lineHeight:1.15,
            color: C.gold, marginBottom:'2rem',
          }}>
            La naissance d'une<br />
            <span style={{ color: C.lavender, fontStyle:'italic' }}>légende</span>
          </h3>

          {[
            'En septembre 2022, 63 etudiants passionnes par l\'informatique se sont retrouves pour entamer un voyage extraordinaire. Chacun avec ses reves, ses ambitions et sa vision unique de la technologie.',
            'Au fil des mois, nous avons grandi ensemble, appris ensemble, et créé des liens indéfectibles. Nos différences sont devenues notre force, nos défis nos opportunités d\'excellence.',
            'Cave27 n\'est pas seulement un projet, c\'est le temoignage vivant d\'un parcours exceptionnel et du debut d\'une aventure qui ne fait que commencer.',
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
  const Icon = v.icon;
  return (
    <div key={i} style={{
      background:`rgba(0,33,71,0.7)`,
      border:`1px solid rgba(74,138,191,0.15)`,
      borderRadius:20, padding:'2rem',
    }}>
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
  const maxStudents = 15;
  const pct = Math.round((d.students / maxStudents) * 100);
  return (
            <div key={i} style={{
              background:`rgba(0,33,71,0.8)`,
              border:`1px solid ${d.accent}22`,
              borderRadius:16, padding:'1.6rem',
              textAlign:'center',
            }}>
              <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.8rem', fontWeight:700, color: d.accent, marginBottom:'0.8rem', lineHeight:1 }}>{d.icon}</div>
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
                  width: `${pct}%`,
                  background: d.accent,
                }} />
              </div>
              <div style={{
                fontFamily:"'DM Sans', sans-serif",
                fontSize:'1.4rem', fontWeight:700, color: d.accent,
              }}>{d.students}</div>
              <div style={{
                fontFamily:"'DM Sans', sans-serif",
                fontSize:'0.7rem',
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
          background: C.amber, opacity: 0.6,
          borderRadius:2,
        }} />

        {timeline.map((item, i) => <TimelineNode key={i} item={item} i={i} len={timeline.length} />)}
      </div>
    </div>
  );
}

function TimelineNode({ item, i, len }) {
  const Icon = item.icon;
  return (
    <div style={{
      display:'flex', gap:'2rem', marginBottom: i < len-1 ? '2.5rem' : 0,
      alignItems:'flex-start',
    }}>
      {/* Node */}
      <div style={{
        flexShrink:0, width:40, height:40, borderRadius:'50%',
        background:`${item.accent}22`, border:`2px solid ${item.accent}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        zIndex:1, position:'relative', marginLeft:-21,
      }}>
        <Icon size={16} color={item.accent} />
      </div>

      {/* Card */}
      <div style={{
        background:`rgba(0,33,71,0.75)`,
        border:`1px solid ${item.accent}25`,
        borderRadius:16, padding:'1.6rem 2rem', flex:1,
      }}>
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
      {/* ── HERO ─────────────────────────── */}
      <section style={{
        padding:'5rem 3rem 3rem', textAlign:'center', position:'relative',
      }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'rgba(0,50,98,0.3)', border:'1px solid rgba(74,138,191,0.35)',
          borderRadius:100, padding:'6px 20px', marginBottom:'2rem',
          fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
          color: C.lavender,
        }}>
          Promotion 2022 - 2027
        </div>

        <h1 style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'clamp(3.5rem, 8vw, 6rem)', fontWeight:700, lineHeight:0.95,
          letterSpacing:'-0.02em', marginBottom:'1.5rem',
        }}>
          <span style={{
            color: C.amber,
          }}>À Propos</span>
          <br />
          <span style={{
            fontStyle:'italic', fontSize:'0.6em',
            color: C.lavender,
          }}>de la Cave</span>
        </h1>

        <p style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'1.1rem', color:'rgba(255,235,153,0.55)',
          maxWidth:520, margin:'0 auto', lineHeight:1.8,
        }}>
          L'histoire exceptionnelle d'une promotion qui a marque son epoque et ne fait que commencer.
        </p>
      </section>

      {/* ── STATS ────────────────────────── */}
      <section style={{ padding:'2rem 3rem 3rem' }}>
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
        background:'rgba(0,18,41,0.88)', backdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(74,138,191,0.12)',
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
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.72rem',
                letterSpacing:'0.05em', textTransform:'uppercase',
                background: isActive ? C.amber : 'rgba(255,255,255,0.04)',
                color: isActive ? C.deep : 'rgba(255,235,153,0.45)',
                fontWeight: isActive ? 700 : 400,
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
      <section style={{ padding:'3rem 3rem 0' }}>
        <div style={{ maxWidth:900, margin:'0 auto', marginBottom:'2rem' }}>
          <div style={{
            fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
            letterSpacing:'0.05em',
            color: C.amber, marginBottom:'0.8rem',
          }}>
            {SECTIONS.find(s => s.id === active)?.label}
          </div>
          <h2 style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'clamp(2rem, 5vw, 3.5rem)', fontWeight:700, lineHeight:1.1,
            color: C.gold,
          }}>
            {active === 'story'    && <>La genèse<br /><span style={{ fontStyle:'italic', color: C.lavender }}>de Cave27</span></>}
            {active === 'values'   && <>Ce qui nous<br /><span style={{ fontStyle:'italic', color: C.lavender }}>définit</span></>}
            {active === 'domains'  && <>Nos domaines<br /><span style={{ fontStyle:'italic', color: C.lavender }}>d'expertise</span></>}
            {active === 'timeline' && <>Notre parcours<br /><span style={{ fontStyle:'italic', color: C.lavender }}>en 4 étapes</span></>}
          </h2>
        </div>
      </section>

      {/* ── DYNAMIC CONTENT ──────────────── */}
      <section style={{ padding:'0 3rem 4rem' }}>
        <div key={active}>
          {sectionContent[active]}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────── */}
      <footer style={{
        borderTop:'1px solid rgba(74,138,191,0.1)',
        padding:'2rem 3rem',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        background:'rgba(0,0,0,0.25)',
      }}>
        <div style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontStyle:'italic', color:'rgba(255,235,153,0.35)', fontSize:'0.95rem',
        }}>Cave27 - Promo 2027</div>
        <div style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'0.75rem',
          color:'rgba(74,138,191,0.3)',
        }}>À Propos</div>
      </footer>
    </div>
  );
}