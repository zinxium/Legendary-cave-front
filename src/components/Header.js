import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  { label: 'Accueil',  to: '/' },
  { label: 'Galerie',  to: '/galerie' },
  { label: 'À propos', to: '/about' },
  { label: 'Contact',  to: '/contact' },
];

function NavLink({ to, label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isActive = active === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Syne Mono', monospace",
        fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
        color: isActive ? C.amber : hovered ? C.gold : 'rgba(255,235,153,0.45)',
        textDecoration: 'none', position: 'relative', paddingBottom: 4,
        transition: 'color 0.2s',
      }}
    >
      {label}
      {/* underline */}
      <span style={{
        position: 'absolute', bottom: 0, left: 0,
        width: isActive || hovered ? '100%' : '0%',
        height: 1,
        background: `linear-gradient(90deg, ${C.amber}, ${C.mustard})`,
        borderRadius: 1,
        transition: 'width 0.25s ease',
        boxShadow: isActive ? `0 0 6px ${C.amber}88` : 'none',
      }} />
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=Syne+Mono&family=DM+Sans:wght@400;500&display=swap');
        @keyframes mobileIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:none; } }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        margin: '6',
        background: scrolled
          ? 'rgba(17,10,28,0.92)'
          : 'rgba(17,10,28,0.75)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(164,134,213,0.18)'
          : '1px solid rgba(164,134,213,0.08)',
        transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        boxShadow: scrolled ? '0 8px 32px rgba(17,10,28,0.6)' : 'none',
      }}>

        {/* Top shimmer — only when not scrolled */}
        {!scrolled && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${C.amber}44, ${C.lavender}44, transparent)`,
            pointerEvents: 'none',
          }} />
        )}

        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '0 3rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64,
        }}>

          {/* ── Logo ── */}
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: 12, overflow: 'hidden',
              flexShrink: 0,
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`rgba(255,204,0,0.5)`; e.currentTarget.style.boxShadow=`0 0 12px ${C.amber}33`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,204,0,0.35)'; e.currentTarget.style.boxShadow='none'; }}
            >
              <img src={logo} alt="Legendary Cave" style={{ width:'100%', height:'100%', objectFit:'contain' }} />
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.15rem', fontWeight: 700,
              color: C.gold, letterSpacing: '0.01em',
            }}>
              Legendary{' '}
              <span style={{
                fontStyle: 'italic',
                background: `linear-gradient(90deg, ${C.amber}, ${C.mustard})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Cave</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav style={{
            display: 'flex', alignItems: 'center', gap: '2.5rem',
          }} className="hidden-mobile">
            {NAV_LINKS.map(l => (
              <NavLink key={l.to} to={l.to} label={l.label} active={location.pathname} />
            ))}
          </nav>

          {/* ── Promo badge (desktop) ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
          }} className="hidden-mobile">
            <span style={{
              fontFamily: "'Syne Mono', monospace", fontSize: '0.62rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(164,134,213,0.45)',
            }}>Promo 2027</span>
           
          </div>

          {/* ── Mobile burger ── */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: C.gold, padding: 6, display: 'none',
              borderRadius: 8, transition: 'background 0.2s',
            }}
            className="show-mobile"
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='none'; }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        {menuOpen && (
          <div style={{
            borderTop: '1px solid rgba(164,134,213,0.12)',
            background: 'rgba(17,10,28,0.97)',
            padding: '1.5rem 3rem 2rem',
            animation: 'mobileIn 0.22s ease both',
          }}>
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: location.pathname === l.to ? C.amber : 'rgba(255,235,153,0.5)',
                  textDecoration: 'none',
                  padding: '0.9rem 0',
                  borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(164,134,213,0.08)' : 'none',
                  transition: 'color 0.2s',
                }}
              >
                <span style={{ color: C.amber, marginRight: 10, opacity: 0.5 }}>0{i + 1}</span>
                {l.label}
              </Link>
            ))}

            <div style={{
              marginTop: '1.5rem', paddingTop: '1.2rem',
              borderTop: '1px solid rgba(164,134,213,0.08)',
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontSize: '0.9rem',
              color: 'rgba(255,204,0,0.35)',
            }}>
              Legendary Cave · Promo 2027
            </div>
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .hidden-mobile { display: none !important; }
            .show-mobile   { display: flex !important; }
          }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        `}</style>
      </header>
    </>
  );
}

export default Header;