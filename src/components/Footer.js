import logo from '../assets/logo.png';

const C = {
  amber:    '#ffcc00',
  mustard:  '#ffde5c',
  gold:     '#ffeb99',
  lavender: '#a486d5',
  indigo:   '#54318c',
  deep:     '#110a1c',
  surface:  '#221438',
};

const NAV_LINKS = [
  { label: 'Accueil',  href: '/' },
  { label: 'Annuaire', href: '/annuaire' },
  { label: 'À Propos', href: '/about' },
  { label: 'Contact',  href: '/contact' },
];

function Footer() {
  return (
    <footer style={{
      background: C.deep,
      borderTop: '1px solid rgba(164,134,213,0.12)',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=Syne+Mono&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
        width: 400, height: 400, bottom: '-30%', left: '10%',
        background: `radial-gradient(circle, ${C.indigo}35 0%, transparent 70%)`,
      }} />
      <div style={{
        position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
        width: 300, height: 300, bottom: '-20%', right: '5%',
        background: `radial-gradient(circle, ${C.amber}15 0%, transparent 70%)`,
      }} />

      {/* Top shimmer */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${C.amber}55 30%, ${C.lavender}55 70%, transparent 100%)`,
      }} />

      {/* Main content */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '3.5rem 3rem 2rem',
        position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'start', gap: '3rem',
      }}>

        {/* Left: brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
            <div style={{
              width: 60, height: 60, borderRadius: 12, overflow: 'hidden',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent',
              flexShrink: 0,
            }}>
              <img src={logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.3rem', fontWeight: 700,
              color: C.gold, letterSpacing: '0.01em',
            }}>
              Legendary <span style={{
                fontStyle: 'italic',
                background: `linear-gradient(90deg, ${C.amber}, ${C.mustard})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Cave</span>
            </span>
          </div>

          <p style={{
            fontSize: '0.88rem', lineHeight: 1.8,
            color: 'rgba(255,235,153,0.45)', maxWidth: 280,
          }}>
            Gardons ces souvenirs vivants — le témoignage d'un parcours exceptionnel, ensemble.
          </p>
        </div>

        {/* Center: divider ornament */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 10, paddingTop: '0.5rem',
        }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, transparent, ${C.amber}55)` }} />
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${C.amber}55, transparent)` }} />
        </div>

        {/* Right: nav */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
          <div style={{
            fontFamily: "'Syne Mono', monospace", fontSize: '0.62rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(164,134,213,0.45)', marginBottom: 4,
          }}>Navigation</div>
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} style={{
              fontFamily: "'Syne Mono', monospace", fontSize: '0.72rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(255,235,153,0.45)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = C.amber; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,235,153,0.45)'; }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(164,134,213,0.08)',
        maxWidth: 1100, margin: '0 auto', padding: '1.2rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '0.5rem',
        position: 'relative', zIndex: 1,
      }}>
        <span style={{
          fontFamily: "'Syne Mono', monospace", fontSize: '0.65rem',
          letterSpacing: '0.1em', color: 'rgba(255,235,153,0.25)',
        }}>
          © 2025 Legendary Cave · Tous droits réservés
        </span>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', fontSize: '0.85rem',
          color: 'rgba(255,204,0,0.4)',
        }}>
          Promotion 2027
        </span>
      </div>
    </footer>
  );
}

export default Footer;