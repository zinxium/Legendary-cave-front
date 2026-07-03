import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Mail, Linkedin, FolderOpen, ExternalLink } from 'lucide-react';
import { C } from '../tokens';

const specialtyColors = {
  "IA":             { bg: "#4a8abf" },
  "Web":            { bg: "#ffcc00" },
  "Cybersécurité":  { bg: "#003262" },
  "Data Science":   { bg: "#ffde5c" },
  "DevOps":         { bg: "#004080" },
  "UX/UI Design":   { bg: "#9b59b6" },
  "Mobile Dev":     { bg: "#e67e22" },
};

const colorMap = {
  byzantium:   '#4a8abf',
  dogwood_rose:'#4a8abf',
  gold:        '#ffcc00',
  space_cadet: '#003262',
};

const AlumniModal = ({ alumni, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (alumni) {
      setImgError(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
    }
  }, [alumni]);

  if (!alumni) return null;

  const spec  = specialtyColors[alumni.specialty] || { bg: C.indigo };
  const color = colorMap[alumni.color] || C.lavender;
  const initials = alumni.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const isLight = color === C.amber || color === C.mustard;
  const hasPhoto = alumni.photo && !imgError;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 260);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: visible ? 'rgba(0,18,41,0.88)' : 'rgba(0,18,41,0)',
        backdropFilter: visible ? 'blur(10px)' : 'blur(0px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
        transition: 'background 0.26s ease, backdrop-filter 0.26s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#002147',
          border: '1px solid rgba(74,138,191,0.3)',
          borderRadius: 24, padding: '2.5rem',
          maxWidth: 460, width: '100%',
          boxShadow: '0 40px 80px rgba(0,18,41,0.8)',
          position: 'relative', overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.26s ease, transform 0.26s ease',
        }}
      >

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

        {/* Photo / Avatar */}
        {hasPhoto ? (
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            overflow: 'hidden',
            border: `3px solid ${color}66`,
            marginBottom: '1.5rem',
          }}>
            <img
              src={alumni.photo}
              alt={alumni.name}
              onError={() => setImgError(true)}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ) : (
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: `${color}88`,
            border: `3px solid ${color}66`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2rem', fontWeight: 700,
            color: isLight ? C.surface : C.gold,
            marginBottom: '1.5rem', position: 'relative', zIndex: 1,
          }}>
            {initials}
          </div>
        )}

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
          {alumni.company && alumni.company !== 'À venir' && (
            <> @ <span style={{ color: C.lavender }}>{alumni.company}</span></>
          )}
        </div>

        {/* Location */}
        {alumni.location && alumni.location !== 'À venir' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem', letterSpacing: '0.03em',
            color: 'rgba(74,138,191,0.6)', marginBottom: '1rem',
          }}>
            <MapPin size={11} color="rgba(74,138,191,0.5)" />
            {alumni.location}
          </div>
        )}

        {/* Description */}
        {alumni.description && alumni.description !== 'À venir' && (
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.82rem', lineHeight: 1.6,
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '1.4rem',
            padding: '0.8rem 1rem',
            background: 'rgba(74,138,191,0.08)',
            borderRadius: 12,
            borderLeft: `3px solid ${spec.bg}55`,
          }}>
            {alumni.description}
          </div>
        )}

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: '1.4rem',
          background: 'rgba(74,138,191,0.2)',
        }} />

        {/* Badges */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2rem' }}>
          <span style={{
            background: spec.bg + '22', border: `1px solid ${spec.bg}44`,
            color: spec.bg, borderRadius: 100, padding: '5px 14px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.68rem', letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>{alumni.specialty}</span>

          <span style={{
            background: alumni.available ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${alumni.available ? 'rgba(74,222,128,0.35)' : 'rgba(255,255,255,0.1)'}`,
            color: alumni.available ? '#4ade80' : 'rgba(255,255,255,0.25)',
            borderRadius: 100, padding: '5px 14px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.68rem', letterSpacing: '0.03em',
          }}>
            {alumni.available ? 'Disponible' : 'Indisponible'}
          </span>
        </div>

        {/* LinkedIn */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem',
          color: 'rgba(255,235,153,0.5)', marginBottom: '0.8rem',
        }}>
          <Linkedin size={14} color={C.lavender} />
          {alumni.linkedin ? (
            <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" style={{
              color: C.lavender, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              LinkedIn <ExternalLink size={10} />
            </a>
          ) : (
            <span style={{ color: 'rgba(255,235,153,0.3)', fontStyle: 'italic' }}>A venir</span>
          )}
        </div>

        {/* Projets */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 8,
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem',
          color: 'rgba(255,235,153,0.5)', marginBottom: '1.5rem',
        }}>
          <FolderOpen size={14} color={C.lavender} style={{ marginTop: 2, flexShrink: 0 }} />
          <span style={{
            color: alumni.projects && alumni.projects !== 'A venir' ? 'rgba(255,235,153,0.7)' : 'rgba(255,235,153,0.3)',
            fontStyle: alumni.projects && alumni.projects !== 'A venir' ? 'normal' : 'italic',
          }}>
            {alumni.projects || 'A venir'}
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          {alumni.linkedin && (
            <a
              href={alumni.linkedin}
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, textAlign: 'center',
                background: 'rgba(74,138,191,0.15)',
                border: '1px solid rgba(74,138,191,0.3)',
                color: C.gold, textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.78rem', fontWeight: 600,
                padding: '12px', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity='0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity='1'; }}
            >
              <Linkedin size={12} /> LinkedIn
            </a>
          )}
          <button
            onClick={() => { onClose(); navigate('/contact'); }}
            style={{
              flex: 1, textAlign: 'center',
              background: C.amber,
              color: C.surface, border: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem', fontWeight: 600,
              padding: '12px', borderRadius: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1'; }}
          >
            <Mail size={12} /> Contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniModal;
