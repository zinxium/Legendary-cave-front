import React, { useState } from 'react';
import {
  Mail, Send, User, MessageSquare,
  Camera, Users, CheckCircle, AlertCircle, Star
} from 'lucide-react';
import { C } from '../tokens';
import { sendContact } from '../services/apiService';


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
      fontFamily:"'DM Sans', sans-serif", fontSize:'0.78rem',
      letterSpacing:'0.03em',
      color:'rgba(255,235,153,0.45)',
    }}>
      {label}{required && <span style={{ color: C.amber, marginLeft:4 }}>*</span>}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width:'100%', boxSizing:'border-box',
  background:'rgba(0,33,71,0.7)',
  border:'1px solid rgba(74,138,191,0.2)',
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
  const [hoveredSubmit, setHoveredSubmit] = useState(false);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true); setStatus(null);
    try {
      await sendContact(formData);
      setStatus('success');
      setFormData({ name:'', email:'', subject:'', message:'', type:'general' });
    } catch { setStatus('error'); }
    finally { setSubmitting(false); }
  };

  return (
    <div style={{
      background: C.deep, minHeight:'100vh', color: C.gold,
      fontFamily:"'DM Sans', sans-serif", position:'relative', overflow:'hidden',
    }}>
      <style>{`
        ::placeholder { color: rgba(255,235,153,0.25) !important; }
        textarea { resize:none; }
      `}</style>

      {/* ── HERO ──────────────────────── */}
      <section style={{
        padding:'5rem 2rem 3rem', textAlign:'center', position:'relative',
      }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'rgba(0,50,98,0.3)', border:'1px solid rgba(74,138,191,0.35)',
          borderRadius:100, padding:'6px 20px', marginBottom:'2rem',
          fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem',
          letterSpacing:'0.04em', color: C.lavender,
        }}>
          Restons connectés
        </div>

        <h1 style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'clamp(3rem, 8vw, 6rem)', fontWeight:700, lineHeight:0.95,
          letterSpacing:'-0.02em', marginBottom:'1.5rem',
        }}>
          <span style={{ color: C.amber }}>Contact</span>
        </h1>

        <p style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'1.05rem', color:'rgba(255,235,153,0.5)',
          maxWidth:480, margin:'0 auto', lineHeight:1.7,
        }}>
          Une idée, une collaboration, ou simplement envie de reprendre contact ? La Cave est à votre écoute.
        </p>
      </section>

      {/* ── BODY ──────────────────────── */}
      <section style={{ padding:'0 2rem 4rem', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:'2.5rem', alignItems:'start' }}>

          {/* ── FORM ────────────────────── */}
          <div style={{
            background:'rgba(0,33,71,0.65)',
            border:'1px solid rgba(74,138,191,0.15)',
            borderRadius:20, padding:'2.5rem',
          }}>
            <div style={{ marginBottom:'2rem' }}>
              <div style={{
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.78rem',
                letterSpacing:'0.03em',
                color: C.amber, marginBottom:'0.6rem',
              }}>Formulaire</div>
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
                  <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.78rem', color:'#4ade80', marginBottom:4 }}>Message envoyé</div>
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
                  <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.78rem', color:'#f87171', marginBottom:4 }}>Erreur d'envoi</div>
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
                          padding:'10px 14px', borderRadius:10, cursor:'pointer',
                          fontFamily:"'DM Sans', sans-serif", fontSize:'0.85rem',
                          background: active ? `${t.accent}1a` : 'rgba(255,255,255,0.03)',
                          border: active ? `1px solid ${t.accent}66` : '1px solid rgba(74,138,191,0.15)',
                          color: active ? t.accent : 'rgba(255,235,153,0.45)',
                          transition:'all 0.2s',
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
                    <User size={15} color="rgba(74,138,191,0.5)" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }} />
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      required placeholder="Nom et prénom"
                      style={{ ...inputStyle, paddingLeft:40 }} />
                  </div>
                </Field>
                <Field label="Email" required>
                  <div style={{ position:'relative' }}>
                    <Mail size={15} color="rgba(74,138,191,0.5)" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }} />
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      required placeholder="votre@email.com"
                      style={{ ...inputStyle, paddingLeft:40 }} />
                  </div>
                </Field>
              </div>

              {/* Subject */}
              <Field label="Sujet" required>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  required placeholder="Résumé de votre demande"
                  style={inputStyle} />
              </Field>

              {/* Message */}
              <Field label="Message" required>
                <div style={{ position:'relative' }}>
                  <MessageSquare size={15} color="rgba(74,138,191,0.5)" style={{ position:'absolute', left:14, top:14 }} />
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    required rows={6} placeholder="Détaillez votre demande..."
                    style={{ ...inputStyle, paddingLeft:40 }} />
                </div>
              </Field>

              {/* Submit */}
              <button type="submit" disabled={submitting}
                onMouseEnter={() => setHoveredSubmit(true)}
                onMouseLeave={() => setHoveredSubmit(false)}
                style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                padding:'14px 28px', borderRadius:10, border:'none', cursor: submitting ? 'not-allowed' : 'pointer',
                background: submitting
                  ? 'rgba(255,255,255,0.08)'
                  : hoveredSubmit ? C.mustard : C.amber,
                color: submitting ? 'rgba(255,235,153,0.35)' : C.deep,
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.88rem',
                fontWeight:600,
                transition:'background 0.2s',
              }}>
                {submitting ? (
                  <>
                    <div style={{
                      width:16, height:16, borderRadius:'50%',
                      border:'2px solid rgba(255,235,153,0.3)',
                      borderTopColor:'rgba(255,235,153,0.8)',
                      animation:'spin 0.8s linear infinite',
                    }} />
                    Envoi en cours...
                  </>
                ) : (
                  <><Send size={15} /> Envoyer le message</>
                )}
              </button>
            </form>
          </div>

          {/* ── SIDEBAR ─────────────────── */}
          <div style={{
            display:'flex', flexDirection:'column', gap:'1.2rem',
          }}>

            {/* Email card */}
            <div style={{
              background:'rgba(0,33,71,0.7)',
              border:'1px solid rgba(74,138,191,0.15)',
              borderRadius:16, padding:'1.5rem',
            }}>
              <div style={{
                width:44, height:44, borderRadius:12,
                background:`${C.amber}1a`, border:`1px solid ${C.amber}44`,
                display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem',
              }}>
                <Mail size={18} color={C.amber} />
              </div>
              <div style={{
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.78rem',
                letterSpacing:'0.03em',
                color:'rgba(255,235,153,0.35)', marginBottom:6,
              }}>Email principal</div>
              <div style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1.1rem', fontWeight:600, color: C.gold, marginBottom:6,
              }}>contact@cave27.com</div>
              <div style={{
                fontFamily:"'DM Sans', sans-serif", fontSize:'0.85rem',
                color:'rgba(255,235,153,0.45)',
              }}>Pour toutes vos questions</div>
            </div>

            {/* Decorative "why contact" card */}
            <div style={{
              background:'rgba(0,50,98,0.5)',
              border:'1px solid rgba(74,138,191,0.2)',
              borderRadius:16, padding:'1.5rem',
            }}>
              <div style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:'1.3rem', fontWeight:700, fontStyle:'italic',
                color: C.gold, marginBottom:'1rem',
              }}>La Cave vous répond</div>

              {[
                { text:'Réponse sous 48h' },
                { text:'Ouvert aux collaborations' },
                { text:'Réseau international' },
                { text:'Promo 2022 - 2027' },
              ].map((item, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'10px 0',
                  borderBottom: i < 3 ? '1px solid rgba(74,138,191,0.1)' : 'none',
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
              background: C.amber,
              borderRadius:16, padding:'1.2rem',
              textAlign:'center',
            }}>
              <div style={{
                fontFamily:"'DM Sans', sans-serif",
                fontSize:'0.9rem', fontWeight:600, color: C.deep,
              }}>Cave27 - Promo 2027</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER BANNER ─────────────── */}
      <div style={{
        borderTop:'1px solid rgba(74,138,191,0.1)',
        padding:'2.5rem 2rem',
        background:'rgba(0,0,0,0.3)',
        textAlign:'center',
      }}>
        <div style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'clamp(1.5rem, 3vw, 2.2rem)', fontWeight:700,
          color: C.gold, marginBottom:'0.8rem',
        }}>
          Une question ? Une idée ?{' '}
          <span style={{ fontStyle:'italic', color: C.amber }}>N'hésitez pas.</span>
        </div>
        <p style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'0.95rem', color:'rgba(255,235,153,0.45)',
          maxWidth:520, margin:'0 auto',
          lineHeight:1.7,
        }}>
          Anciens camarades, professionnels du secteur, ou simples curieux, la Cave est ouverte a tous ceux qui partagent notre passion.
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}