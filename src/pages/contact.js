import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, Send, User, MessageSquare,
  Star, Camera, Users, CheckCircle, AlertCircle
} from 'lucide-react';

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
  <div style={{ position:'absolute', borderRadius:'50%', filter:'blur(90px)', pointerEvents:'none', ...style }} />
);

const useReveal = (delay = 0) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

/* ─── DATA ───────────────────────────── */
const CONTACT_TYPES = [
  { value: 'general',       label: 'Question générale',         icon: MessageSquare, accent: C.amber },
  { value: 'collaboration', label: 'Collaboration',              icon: Users,         accent: C.lavender },
  { value: 'press',         label: 'Presse / Média',             icon: Camera,        accent: C.mustard },
  { value: 'alumni',        label: 'Contact alumni',             icon: Star,          accent: C.indigo },
  { value: 'other',         label: 'Autre',                      icon: Mail,          accent: C.amber },
];

/* ─── INPUT FIELD ────────────────────── */
const Field = ({ label, required, children }) => (
  <div>
    <label style={{
      display:'block', marginBottom:8,
      fontFamily:"'Syne Mono', monospace", fontSize:'0.68rem',
      letterSpacing:'0.15em', textTransform:'uppercase',
      color:'rgba(255,235,153,0.45)',
    }}>
      {label}{required && <span style={{ color: C.amber, marginLeft:4 }}>*</span>}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width:'100%', boxSizing:'border-box',
  background:'rgba(34,20,56,0.7)',
  border:'1px solid rgba(164,134,213,0.2)',
  borderRadius:12, padding:'12px 16px',
  fontFamily:"'DM Sans', sans-serif", fontSize:'0.95rem',
  color: C.gold, outline:'none',
  transition:'border-color 0.2s, box-shadow 0.2s',
};

/* ─── MAIN ───────────────────────────── */
export default function Contact() {
  const [formData, setFormData] = useState({ name:'', email:'', subject:'', message:'', type:'general' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true); setStatus(null);
    try {
      await new Promise(r => setTimeout(r, 2000));
      setStatus('success');
      setFormData({ name:'', email:'', subject:'', message:'', type:'general' });
    } catch { setStatus('error'); }
    finally { setSubmitting(false); }
  };

  const [formRef, formVis] = useReveal();
  const [sideRef, sideVis] = useReveal();

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
        textarea { resize:none; }
      `}</style>

      {/* Ambient orbs */}
      <GlowOrb style={{ width:600, height:600, top:'-5%',  left:'55%',  background:`radial-gradient(circle, ${C.indigo}45 0%, transparent 65%)` }} />
      <GlowOrb style={{ width:350, height:350, top:'40%',  left:'-8%',  background:`radial-gradient(circle, ${C.amber}18 0%, transparent 65%)` }} />
      <GlowOrb style={{ width:450, height:450, bottom:'5%',right:'5%',  background:`radial-gradient(circle, ${C.lavender}22 0%, transparent 65%)` }} />

      {/* ── HERO ──────────────────────── */}
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
          Restons connectés
        </div>

        <h1 style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'clamp(4rem, 10vw, 8rem)', fontWeight:700, lineHeight:0.95,
          letterSpacing:'-0.02em', marginBottom:'2rem',
        }}>
          <span style={{
            background:`linear-gradient(135deg, ${C.gold} 0%, ${C.amber} 50%, ${C.lavender} 100%)`,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>Contact</span>
        </h1>

        <p style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'1.1rem', color:'rgba(255,235,153,0.5)',
          maxWidth:480, margin:'0 auto 3rem', lineHeight:1.8,
        }}>
          Une idée, une collaboration, ou simplement envie de reprendre contact ? La Cave est à votre écoute.
        </p>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16 }}>
          <div style={{ width:80, height:1, background:`linear-gradient(90deg, transparent, ${C.amber})` }} />
          <div style={{ width:80, height:1, background:`linear-gradient(90deg, ${C.amber}, transparent)` }} />
        </div>
      </section>

      {/* ── BODY ──────────────────────── */}
      <section style={{ padding:'0 3rem 6rem', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:'2.5rem', alignItems:'start' }}>

          {/* ── FORM ────────────────────── */}
          <div ref={formRef} style={{
            opacity: formVis?1:0, transform: formVis?'none':'translateX(-40px)',
            transition:'opacity 0.8s ease, transform 0.8s ease',
            background:'rgba(34,20,56,0.65)',
            border:'1px solid rgba(164,134,213,0.15)',
            borderRadius:24, padding:'3rem', position:'relative', overflow:'hidden',
          }}>
            {/* top shimmer */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${C.amber}, transparent)` }} />

            <div style={{ marginBottom:'2.5rem' }}>
              <div style={{
                fontFamily:"'Syne Mono', monospace", fontSize:'0.68rem',
                letterSpacing:'0.2em', textTransform:'uppercase',
                color: C.amber, marginBottom:'0.8rem',
              }}>— Formulaire</div>
              <h2 style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'2.4rem', fontWeight:700, lineHeight:1.1, color: C.gold,
              }}>
                Envoyez-nous<br />
                <span style={{ fontStyle:'italic', color: C.lavender }}>un message</span>
              </h2>
            </div>

            {/* STATUS MESSAGES */}
            {status === 'success' && (
              <div style={{
                background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.3)',
                borderRadius:14, padding:'1.2rem 1.5rem',
                display:'flex', alignItems:'center', gap:12, marginBottom:'2rem',
              }}>
                <CheckCircle size={20} color="#4ade80" />
                <div>
                  <div style={{ fontFamily:"'Syne Mono', monospace", fontSize:'0.72rem', letterSpacing:'0.1em', color:'#4ade80', marginBottom:4 }}>MESSAGE ENVOYÉ</div>
                  <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.88rem', color:'rgba(255,235,153,0.55)' }}>Nous vous répondrons dans les plus brefs délais.</div>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div style={{
                background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)',
                borderRadius:14, padding:'1.2rem 1.5rem',
                display:'flex', alignItems:'center', gap:12, marginBottom:'2rem',
              }}>
                <AlertCircle size={20} color="#f87171" />
                <div>
                  <div style={{ fontFamily:"'Syne Mono', monospace", fontSize:'0.72rem', letterSpacing:'0.1em', color:'#f87171', marginBottom:4 }}>ERREUR D'ENVOI</div>
                  <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.88rem', color:'rgba(255,235,153,0.55)' }}>Veuillez réessayer ou nous écrire directement.</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.8rem' }}>

              {/* Type selector */}
              <Field label="Type de demande">
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {CONTACT_TYPES.map(t => {
                    const Icon = t.icon;
                    const active = formData.type === t.value;
                    return (
                      <button key={t.value} type="button"
                        onClick={() => setFormData(p => ({ ...p, type: t.value }))}
                        style={{
                          display:'flex', alignItems:'center', gap:10,
                          padding:'11px 14px', borderRadius:12, cursor:'pointer',
                          fontFamily:"'DM Sans', sans-serif", fontSize:'0.85rem',
                          background: active ? `${t.accent}1a` : 'rgba(255,255,255,0.03)',
                          border: active ? `1px solid ${t.accent}66` : '1px solid rgba(164,134,213,0.15)',
                          color: active ? t.accent : 'rgba(255,235,153,0.45)',
                          transition:'all 0.2s',
                          boxShadow: active ? `0 0 12px ${t.accent}22` : 'none',
                        }}>
                        <Icon size={15} />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* Name + Email */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.2rem' }}>
                <Field label="Nom complet" required>
                  <div style={{ position:'relative' }}>
                    <User size={15} color="rgba(164,134,213,0.5)" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }} />
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                      required placeholder="Nom et prénom"
                      style={{ ...inputStyle, paddingLeft:40,
                        borderColor: focused==='name' ? `${C.amber}66` : 'rgba(164,134,213,0.2)',
                        boxShadow: focused==='name' ? `0 0 0 3px ${C.amber}14` : 'none',
                      }} />
                  </div>
                </Field>
                <Field label="Email" required>
                  <div style={{ position:'relative' }}>
                    <Mail size={15} color="rgba(164,134,213,0.5)" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }} />
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                      required placeholder="votre@email.com"
                      style={{ ...inputStyle, paddingLeft:40,
                        borderColor: focused==='email' ? `${C.amber}66` : 'rgba(164,134,213,0.2)',
                        boxShadow: focused==='email' ? `0 0 0 3px ${C.amber}14` : 'none',
                      }} />
                  </div>
                </Field>
              </div>

              {/* Subject */}
              <Field label="Sujet" required>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                  required placeholder="Résumé de votre demande"
                  style={{ ...inputStyle,
                    borderColor: focused==='subject' ? `${C.amber}66` : 'rgba(164,134,213,0.2)',
                    boxShadow: focused==='subject' ? `0 0 0 3px ${C.amber}14` : 'none',
                  }} />
              </Field>

              {/* Message */}
              <Field label="Message" required>
                <div style={{ position:'relative' }}>
                  <MessageSquare size={15} color="rgba(164,134,213,0.5)" style={{ position:'absolute', left:14, top:14 }} />
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    required rows={6} placeholder="Détaillez votre demande..."
                    style={{ ...inputStyle, paddingLeft:40,
                      borderColor: focused==='message' ? `${C.amber}66` : 'rgba(164,134,213,0.2)',
                      boxShadow: focused==='message' ? `0 0 0 3px ${C.amber}14` : 'none',
                    }} />
                </div>
              </Field>

              {/* Submit */}
              <button type="submit" disabled={submitting} style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:12,
                padding:'16px 32px', borderRadius:12, border:'none', cursor: submitting ? 'not-allowed' : 'pointer',
                background: submitting
                  ? 'rgba(255,255,255,0.08)'
                  : `linear-gradient(135deg, ${C.amber}, ${C.mustard})`,
                color: submitting ? 'rgba(255,235,153,0.35)' : C.deep,
                fontFamily:"'Syne Mono', monospace", fontSize:'0.78rem',
                fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase',
                boxShadow: submitting ? 'none' : `0 0 30px ${C.amber}44`,
                transition:'all 0.25s',
              }}>
                {submitting ? (
                  <>
                    <div style={{
                      width:16, height:16, borderRadius:'50%',
                      border:'2px solid rgba(255,235,153,0.3)',
                      borderTopColor:'rgba(255,235,153,0.8)',
                      animation:'spin 0.8s linear infinite',
                    }} />
                    Envoi en cours…
                  </>
                ) : (
                  <><Send size={15} /> Envoyer le message →</>
                )}
              </button>
            </form>
          </div>

          {/* ── SIDEBAR ─────────────────── */}
          <div ref={sideRef} style={{
            opacity: sideVis?1:0, transform: sideVis?'none':'translateX(40px)',
            transition:'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            display:'flex', flexDirection:'column', gap:'1.5rem',
          }}>

            {/* Email card */}
            <div style={{
              background:'rgba(34,20,56,0.7)',
              border:'1px solid rgba(164,134,213,0.15)',
              borderRadius:20, padding:'2rem', position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${C.amber}, transparent)` }} />
              <GlowOrb style={{ width:200, height:200, top:'-20%', right:'-20%', background:`radial-gradient(circle, ${C.amber}18 0%, transparent 70%)` }} />
              <div style={{
                width:48, height:48, borderRadius:14,
                background:`${C.amber}1a`, border:`1px solid ${C.amber}44`,
                display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.2rem',
              }}>
                <Mail size={20} color={C.amber} />
              </div>
              <div style={{
                fontFamily:"'Syne Mono', monospace", fontSize:'0.68rem',
                letterSpacing:'0.15em', textTransform:'uppercase',
                color:'rgba(255,235,153,0.35)', marginBottom:8,
              }}>Email principal</div>
              <div style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1.1rem', fontWeight:600, color: C.gold, marginBottom:6,
              }}>contact@legendary-cave.com</div>
              <div style={{
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.85rem',
                color:'rgba(255,235,153,0.45)',
              }}>Pour toutes vos questions</div>
            </div>

            {/* Decorative "why contact" card */}
            <div style={{
              background:`linear-gradient(145deg, rgba(84,49,140,0.5), rgba(34,20,56,0.8))`,
              border:`1px solid rgba(164,134,213,0.2)`,
              borderRadius:20, padding:'2rem', position:'relative', overflow:'hidden',
            }}>
              <GlowOrb style={{ width:200, height:200, bottom:'-20%', left:'-20%', background:`radial-gradient(circle, ${C.lavender}25 0%, transparent 70%)` }} />
              <div style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1.5rem', fontWeight:700, fontStyle:'italic',
                color: C.gold, marginBottom:'1.2rem',
              }}>« La Cave vous répond »</div>

              {[
                { text:'Réponse sous 48h' },
                { text:'Ouvert aux collaborations' },
                { text:'Réseau international' },
                { text:'Promo 2022–2027' },
              ].map((item, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'10px 0',
                  borderBottom: i < 3 ? '1px solid rgba(164,134,213,0.1)' : 'none',
                }}>
                  <span style={{
                    fontFamily:"'DM Sans', sans-serif", fontSize:'0.88rem',
                    color:'rgba(255,235,153,0.6)',
                  }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Promo badge */}
            <div style={{
              background:`linear-gradient(135deg, ${C.amber}, ${C.mustard})`,
              borderRadius:20, padding:'1.8rem',
              textAlign:'center', position:'relative', overflow:'hidden',
            }}>
              <div style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1.3rem', fontWeight:700, color: C.deep, marginBottom:4,
              }}>Legendary Cave</div>
              <div style={{
                fontFamily:"'Syne Mono', monospace", fontSize:'0.68rem',
                letterSpacing:'0.15em', textTransform:'uppercase', color: C.surface,
              }}>Promo 2027 Together</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER BANNER ─────────────── */}
      <div style={{
        borderTop:'1px solid rgba(164,134,213,0.1)',
        padding:'4rem 3rem',
        background:'rgba(0,0,0,0.3)',
        textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        <GlowOrb style={{ width:400, height:400, top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:`radial-gradient(circle, ${C.indigo}30 0%, transparent 70%)` }} />
        <div style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'clamp(1.8rem, 4vw, 2.8rem)', fontWeight:700,
          color: C.gold, marginBottom:'1.2rem', position:'relative',
        }}>
          Une question ? Une idée ?{' '}
          <span style={{
            fontStyle:'italic',
            background:`linear-gradient(90deg, ${C.amber}, ${C.mustard})`,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>N'hésitez pas.</span>
        </div>
        <p style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'1rem', color:'rgba(255,235,153,0.45)',
          maxWidth:560, margin:'0 auto',
          lineHeight:1.8,
        }}>
          Anciens camarades, professionnels du secteur, ou simples curieux — la Cave est ouverte à tous ceux qui partagent notre passion.
        </p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginTop:'2rem' }}>
          <div style={{ width:60, height:1, background:`linear-gradient(90deg, transparent, ${C.amber})` }} />
  
          <div style={{ width:60, height:1, background:`linear-gradient(90deg, ${C.amber}, transparent)` }} />
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}