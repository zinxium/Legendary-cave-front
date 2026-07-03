import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { C } from '../tokens';

const NAV_LINKS = [
  { label: 'Accueil',  to: '/' },
  { label: 'Galerie',  to: '/galerie' },
  { label: 'À Propos', to: '/about' },
  { label: 'Contact',  to: '/contact' },
];

function Footer() {
  return (
    <footer style={{
      background: C.deep,
      borderTop: '1px solid rgba(74,138,191,0.12)',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Main content */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '3.5rem 3rem 2rem',
        position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
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
              Cave<span style={{
                fontStyle: 'italic',
                color: C.amber,
              }}>27</span>
            </span>
          </div>

          <p style={{
            fontSize: '0.88rem', lineHeight: 1.8,
            color: 'rgba(255,235,153,0.45)', maxWidth: 280,
          }}>
            Gardons ces souvenirs vivants, le temoignage d'un parcours exceptionnel, ensemble.
          </p>
        </div>

        {/* Right: nav */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem',
            letterSpacing: '0.04em',
            color: 'rgba(74,138,191,0.45)', marginBottom: 4,
          }}>Navigation</div>
          {NAV_LINKS.map(link => (
            <Link key={link.label} to={link.to} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem',
              color: 'rgba(255,235,153,0.45)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = C.amber; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,235,153,0.45)'; }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(74,138,191,0.08)',
        maxWidth: 1100, margin: '0 auto', padding: '1.2rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '0.5rem',
        position: 'relative', zIndex: 1,
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem',
          color: 'rgba(255,235,153,0.25)',
        }}>
          2025 Cave27. Tous droits reserves.
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
