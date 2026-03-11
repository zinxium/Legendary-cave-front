import React, { useEffect, useState } from 'react';
import { X, MapPin, ExternalLink, Github } from 'lucide-react';

/* ─── TOKENS ─────────────────────────── */
const C = {
  amber:    '#ffcc00',
  mustard:  '#ffde5c',
  gold:     '#ffeb99',
  lavender: '#a486d5',
  indigo:   '#54318c',
  deep:     '#110a1c',
  surface:  '#221438',
};

const specialtyColors = {
  "Intelligence Artificielle": { bg: "#a486d5" },
  "Développement Web":         { bg: "#ffcc00" },
  "Cybersécurité":             { bg: "#54318c" },
  "Data Science":              { bg: "#ffde5c" },
  "DevOps":                    { bg: "#7042bb" },
};

const colorMap = {
  byzantium:   '#a486d5',
  dogwood_rose:'#d946a6',
  gold:        '#ffcc00',
  space_cadet: '#54318c',
};

const AlumniModal = ({ alumni, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alumni) {
      // slight delay so CSS transition fires
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
    }
  }, [alumni]);

  if (!alumni) return null;

  const spec  = specialtyColors[alumni.domain] || { bg: C.indigo };
  const color = colorMap[alumni.color] || C.lavender;
  const initials = alumni.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const isLight = color === C.amber || color === C.mustard;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 260);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: visible ? 'rgba(17,10,28,0.88)' : 'rgba(17,10,28,0)',
        backdropFilter: visible ? 'blur(10px)' : 'blur(0px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
        transition: 'background 0.26s ease, backdrop-filter 0.26s ease',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Syne+Mono&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes modalIn { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:none; } }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: `linear-gradient(150deg, #221438 0%, #1a0f2e 60%, #110a1c 100%)`,
          border: '1px solid rgba(164,134,213,0.3)',
          borderRadius: 24, padding: '2.5rem',
          maxWidth: 460, width: '100%',
          boxShadow: `0 40px 80px rgba(17,10,28,0.8), 0 0 0 1px rgba(255,204,0,0.06)`,
          position: 'relative', overflow: 'hidden',
          animation: 'modalIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) both',
        }}
      >
        {/* Top shimmer line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${color} 40%, ${C.amber} 70%, transparent 100%)`,
        }} />

        {/* Ambient glow behind avatar */}
        <div style={{
          position: 'absolute', top: -60, left: -60, width: 220, height: 220,
          borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none',
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
        }} />

        {/* Close button */}
        <button onClick={handleClose} style={{
          position: 'absolute', top: '1.2rem', right: '1.2rem',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer', color: 'rgba(255,235,153,0.5)',
          borderRadius: '50%', width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.color=C.gold; }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,235,153,0.5)'; }}
        >
          <X size={13} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}33)`,
          border: `2px solid ${color}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.6rem', fontWeight: 700,
          color: isLight ? C.surface : C.gold,
          marginBottom: '1.5rem', position: 'relative', zIndex: 1,
          boxShadow: `0 8px 24px ${color}33`,
        }}>
          {initials}
        </div>

        {/* Name */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1,
          color: C.gold, marginBottom: 6,
        }}>{alumni.name}</h2>

        {/* Role */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.9rem', color: 'rgba(255,235,153,0.55)',
          marginBottom: 4,
        }}>
          {alumni.role}
          {alumni.company && (
            <> @ <span style={{ color: C.lavender }}>{alumni.company}</span></>
          )}
        </div>

        {/* Location */}
        {alumni.location && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.72rem', letterSpacing: '0.08em',
            color: 'rgba(164,134,213,0.6)', marginBottom: '1.6rem',
          }}>
            <MapPin size={11} color="rgba(164,134,213,0.5)" />
            {alumni.location}
          </div>
        )}

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: '1.4rem',
          background: `linear-gradient(90deg, ${color}33, rgba(164,134,213,0.1), transparent)`,
        }} />

        {/* Badges */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2rem' }}>
          <span style={{
            background: spec.bg + '22', border: `1px solid ${spec.bg}44`,
            color: spec.bg, borderRadius: 100, padding: '5px 14px',
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>{alumni.domain}</span>

          <span style={{
            background: alumni.available ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${alumni.available ? 'rgba(74,222,128,0.35)' : 'rgba(255,255,255,0.1)'}`,
            color: alumni.available ? '#4ade80' : 'rgba(255,255,255,0.25)',
            borderRadius: 100, padding: '5px 14px',
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.66rem', letterSpacing: '0.08em',
            boxShadow: alumni.available ? '0 0 8px rgba(74,222,128,0.2)' : 'none',
          }}>
            {alumni.available ? '● Disponible' : '○ Indisponible'}
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <a
            href={`https://linkedin.com/in/${alumni.linkedin}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, textAlign: 'center',
              background: `linear-gradient(135deg, ${C.amber}, ${C.mustard})`,
              color: C.surface, textDecoration: 'none',
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '12px', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              boxShadow: `0 4px 16px ${C.amber}33`,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${C.amber}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=`0 4px 16px ${C.amber}33`; }}
          >
            <ExternalLink size={12} /> LinkedIn
          </a>

          <a
            href={`https://github.com/${alumni.github}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, textAlign: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(164,134,213,0.25)',
              color: C.gold, textDecoration: 'none',
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '12px', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=`rgba(164,134,213,0.5)`; e.currentTarget.style.background='rgba(164,134,213,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(164,134,213,0.25)'; e.currentTarget.style.background='rgba(255,255,255,0.05)'; }}
          >
            <Github size={12} /> GitHub
          </a>
        </div>

        {/* Bottom accent */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${C.indigo}55, transparent)`,
        }} />
      </div>
    </div>
  );
};

export default AlumniModal;