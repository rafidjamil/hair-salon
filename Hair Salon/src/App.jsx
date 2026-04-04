import { useState, useEffect, useRef } from "react";
import "./App.css";

const GOLD = "#c9a84c";
const DARK_GOLD = "#a8852a";
const CREAM = "#f5f0e8";
const CHARCOAL = "#111111";
const SURFACE = "#1a1a1a";
const PANEL = "#161616";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${CHARCOAL};
    color: ${CREAM};
    font-family: 'Cormorant Garamond', Georgia, serif;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0d0d0d; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }

  .noise-overlay {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.35;
  }

  .gold-divider {
    width: 60px; height: 2px;
    background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
    margin: 1rem auto;
  }

  .section-full { width: 100%; position: relative; overflow: hidden; }
  .inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

  .btn-gold {
    display: inline-block;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: ${CHARCOAL}; background: ${GOLD};
    padding: 0.85rem 2.5rem; border: none; cursor: pointer;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.3);
    transition: all 0.2s; text-decoration: none; font-weight: 600;
  }
  .btn-gold:hover {
    background: #d4af5c;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.3);
    transform: translateY(-1px);
  }
  .btn-gold:active {
    transform: translateY(1px);
    box-shadow: 1px 1px 3px rgba(0,0,0,0.7), inset 0 2px 4px rgba(0,0,0,0.3);
  }

  .btn-outline {
    display: inline-block;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: ${GOLD}; background: transparent;
    padding: 0.85rem 2.5rem; border: 1px solid ${GOLD}; cursor: pointer;
    box-shadow: inset 0 0 0 0 ${GOLD}; transition: all 0.3s; text-decoration: none; font-weight: 400;
  }
  .btn-outline:hover {
    color: ${CHARCOAL}; background: ${GOLD};
    box-shadow: 2px 2px 8px rgba(201,168,76,0.4);
  }

  /* ===================== DESKTOP UNCHANGED ===================== */
  @media (max-width: 900px) {
    .about-grid { grid-template-columns: 1fr !important; }
    .about-grid > div:first-child { min-height: 280px !important; }
    .about-grid > div:last-child { padding: 2.5rem 1.5rem !important; }
    .hours-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .gallery-strip { grid-template-columns: repeat(2, 1fr) !important; height: 220px !important; }
    .hero-btns { flex-direction: column !important; align-items: flex-start !important; }
    .hero-stats { gap: 1.2rem !important; }
  }

  @media (max-width: 600px) {
    .inner { padding: 0 1rem; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .gallery-strip { grid-template-columns: repeat(2, 1fr) !important; height: 180px !important; }
    .services-grid { grid-template-columns: 1fr !important; }
    .reviews-grid { grid-template-columns: 1fr !important; }
    .contact-info-grid { grid-template-columns: 1fr 1fr !important; }
    h1 { font-size: 2.2rem !important; }
    .hero-sub { font-size: 1rem !important; }
    .section-heading { font-size: 1.8rem !important; }
  }

  /* ===================== MOBILE MASTERPIECE ===================== */

  /* Mobile hero — full editorial cover */
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }

    /* HERO */
    .mobile-hero-inner {
      padding-top: 0 !important;
      justify-content: flex-end !important;
      padding-bottom: 6rem !important;
      padding-left: 1.4rem !important;
      padding-right: 1.4rem !important;
    }
    .mobile-hero-inner h1 {
      font-size: clamp(2.6rem, 11vw, 3.8rem) !important;
      line-height: 1.05 !important;
      letter-spacing: -0.01em !important;
    }
    .mobile-hero-inner .hero-sub {
      font-size: 1.05rem !important;
      line-height: 1.75 !important;
      margin-bottom: 2rem !important;
    }
    .mobile-hero-inner .hero-btns {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 0.75rem !important;
    }
    .mobile-hero-inner .hero-btns a,
    .mobile-hero-inner .hero-btns button {
      text-align: center !important;
      width: 100% !important;
      padding: 1rem 1.5rem !important;
      font-size: 0.72rem !important;
    }
    .mobile-hero-inner .hero-stats {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 0 !important;
      margin-top: 2rem !important;
      background: rgba(0,0,0,0.35) !important;
      border: 1px solid rgba(201,168,76,0.15) !important;
      backdrop-filter: blur(8px) !important;
    }
    .mobile-hero-inner .hero-stat-item {
      padding: 0.85rem 0.6rem !important;
      border-right: 1px solid rgba(201,168,76,0.15) !important;
      text-align: center !important;
    }
    .mobile-hero-inner .hero-stat-item:last-child {
      border-right: none !important;
    }
    .mobile-hero-inner .hero-stat-label {
      font-size: 0.52rem !important;
      letter-spacing: 0.2em !important;
    }
    .mobile-hero-inner .hero-stat-val {
      font-size: 0.72rem !important;
      letter-spacing: 0.06em !important;
    }

    /* WALK-IN BANNER */
    .walkin-banner-inner {
      flex-direction: column !important;
      gap: 0.4rem !important;
      text-align: center !important;
      padding: 1.1rem 1.2rem !important;
    }
    .walkin-sep { display: none !important; }

    /* SERVICES */
    .mobile-services { padding: 4.5rem 0 !important; }
    .mobile-services .services-header { margin-bottom: 2.5rem !important; }
    .mobile-services .service-card {
      padding: 1.8rem 1.4rem !important;
    }
    .mobile-services .service-card-title { font-size: 1.3rem !important; }
    .mobile-services .service-item-name { font-size: 0.95rem !important; }
    .mobile-services .service-item-price { font-size: 0.7rem !important; }

    /* ABOUT — stacked with image top */
    .mobile-about-section {
      display: flex !important;
      flex-direction: column !important;
      min-height: unset !important;
    }
    .mobile-about-img {
      height: 52vw !important;
      min-height: 220px !important;
      max-height: 320px !important;
      width: 100% !important;
    }
    .mobile-about-text {
      padding: 2.4rem 1.4rem 3rem !important;
    }
    .mobile-about-text h2 {
      font-size: clamp(1.7rem, 7vw, 2.2rem) !important;
      line-height: 1.2 !important;
      margin-bottom: 0.8rem !important;
    }
    .mobile-about-text p {
      font-size: 1rem !important;
      line-height: 1.85 !important;
      margin-bottom: 1rem !important;
    }
    .mobile-about-stats {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 0 !important;
      border: 1px solid rgba(201,168,76,0.15) !important;
    }
    .mobile-about-stat {
      padding: 0.9rem 0.5rem !important;
      text-align: center !important;
      border-right: 1px solid rgba(201,168,76,0.15) !important;
    }
    .mobile-about-stat:last-child { border-right: none !important; }

    /* HOURS */
    .mobile-hours { padding: 4rem 0 !important; }
    .mobile-hours .hours-header { margin-bottom: 2rem !important; }
    .mobile-hours .hours-address { font-size: 0.95rem !important; margin-bottom: 1.8rem !important; }
    .mobile-hours .hours-table { padding: 1.5rem !important; }
    .mobile-hours .hours-row { padding: 0.85rem 0 !important; }
    .mobile-hours .hours-day { font-size: 0.7rem !important; }
    .mobile-hours .hours-time { font-size: 0.95rem !important; }
    .mobile-hours .hours-note { padding: 0.85rem 1rem !important; }

    /* REVIEWS */
    .mobile-reviews { padding: 4rem 0 !important; }
    .mobile-reviews .review-card { padding: 1.8rem 1.4rem !important; }
    .mobile-reviews .review-text { font-size: 1rem !important; line-height: 1.8 !important; }

    /* GALLERY — horizontal scroll strip */
    .mobile-gallery-strip {
      display: flex !important;
      overflow-x: auto !important;
      scroll-snap-type: x mandatory !important;
      -webkit-overflow-scrolling: touch !important;
      gap: 0 !important;
      height: 58vw !important;
      min-height: 200px !important;
      max-height: 280px !important;
      scrollbar-width: none !important;
      grid-template-columns: unset !important;
    }
    .mobile-gallery-strip::-webkit-scrollbar { display: none !important; }
    .mobile-gallery-strip .gallery-cell {
      flex: 0 0 75vw !important;
      scroll-snap-align: center !important;
      height: 100% !important;
    }

    /* FOOTER — mobile clean stack */
    .mobile-footer { padding: 3rem 1.4rem 2rem !important; }
    .mobile-footer-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 2.5rem !important;
    }
    .mobile-footer-brand { margin-bottom: 0 !important; }
    .mobile-footer-cols {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 2rem !important;
    }
    .mobile-footer-contact { grid-column: 1 / -1 !important; }
    .footer-bottom-bar {
      flex-direction: column !important;
      gap: 0.5rem !important;
      text-align: center !important;
      padding-top: 1.2rem !important;
    }

    /* CONTACT PAGE */
    .mobile-contact-section { padding-top: 90px !important; padding-bottom: 3rem !important; }
    .mobile-contact-section .contact-header { margin-bottom: 2.5rem !important; }
    .mobile-contact-form-panel { padding: 1.8rem 1.4rem !important; }
    .mobile-contact-section .contact-info-grid { grid-template-columns: 1fr !important; }
    .contact-hours-box { padding: 1.2rem !important; }

    /* NAVBAR mobile */
    .mobile-nav-logo-name { font-size: 1rem !important; }
    .mobile-nav-sub { display: none !important; }
  }

  /* Extra small — very narrow phones */
  @media (max-width: 380px) {
    .mobile-hero-inner h1 { font-size: 2.4rem !important; }
    .mobile-hero-inner .hero-stat-val { font-size: 0.65rem !important; }
    .mobile-gallery-strip .gallery-cell { flex: 0 0 85vw !important; }
  }

  /* Smooth fade-in for mobile sections */
  @media (max-width: 768px) {
    .mobile-fade-in {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .mobile-fade-in.visible {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes scrollPulse { 0%,100%{opacity:0.4;} 50%{opacity:1;} }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulseRing {
    0% { box-shadow: 0 0 0 0 rgba(201,168,76,0.35); }
    70% { box-shadow: 0 0 0 12px rgba(201,168,76,0); }
    100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatUp {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

/* ── Fade-in hook for mobile sections ─────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Navbar ────────────────────────────────────────────────────── */
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    background: scrolled ? "rgba(10,10,10,0.97)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: `1px solid rgba(201,168,76,${scrolled ? "0.3" : "0"})`,
    boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
    transition: "all 0.4s",
    fontFamily: "'Josefin Sans', sans-serif",
  };

  const linkStyle = (active) => ({
    color: active ? GOLD : "rgba(245,240,232,0.85)",
    textDecoration: "none", fontSize: "0.7rem", letterSpacing: "0.18em",
    textTransform: "uppercase", fontWeight: active ? 600 : 300,
    cursor: "pointer", transition: "color 0.2s",
    borderBottom: active ? `1px solid ${GOLD}` : "1px solid transparent",
    paddingBottom: "2px",
  });

  return (
    <>
      <nav style={navStyle}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div onClick={() => { setPage("home"); setMenuOpen(false); }} style={{ cursor: "pointer" }}>
            <div className="mobile-nav-logo-name" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: GOLD, letterSpacing: "0.08em", lineHeight: 1 }}>
              Mian Tian Sing
            </div>
            <div className="mobile-nav-sub" style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(245,240,232,0.5)", textTransform: "uppercase", marginTop: 2 }}>
              Hair Salon · New York
            </div>
          </div>

          <div className="desktop-nav" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            <span style={linkStyle(page === "home")} onClick={() => setPage("home")}>Home</span>
            <span style={linkStyle(false)}>Services</span>
            <span style={linkStyle(false)}>About</span>
            <span style={linkStyle(page === "contact")} onClick={() => setPage("contact")}>Contact</span>
            <a href="tel:+19173535985" style={{ ...linkStyle(false), color: GOLD }}>+1 917·353·5985</a>
          </div>

          {/* Mobile menu btn */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: menuOpen ? GOLD : "none",
              border: `1px solid rgba(201,168,76,${menuOpen ? "1" : "0.4"})`,
              padding: "7px 11px", cursor: "pointer",
              color: menuOpen ? CHARCOAL : GOLD,
              fontSize: "1rem",
              transition: "all 0.2s",
              borderRadius: 2,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div style={{
            background: "rgba(8,8,8,0.99)",
            borderTop: `1px solid rgba(201,168,76,0.15)`,
            padding: "0 1.4rem",
            animation: "slideDown 0.25s ease",
          }}>
            {/* Call CTA — prominent */}
            <a href="tel:+19173535985" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
              padding: "1.2rem 0",
              borderBottom: `1px solid rgba(201,168,76,0.12)`,
              color: GOLD, textDecoration: "none",
              fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.75rem",
              letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600,
              animation: "pulseRing 2s infinite",
              borderRadius: 2,
            }}>
              <span style={{ fontSize: "1rem" }}>📞</span> +1 917·353·5985
            </a>

            {/* Nav links */}
            {[["Home", "home"], ["Contact", "contact"]].map(([label, pg]) => (
              <div key={label} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span
                  onClick={() => { setPage(pg); setMenuOpen(false); }}
                  style={{
                    display: "block", padding: "1rem 0",
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem",
                    color: page === pg ? GOLD : CREAM, fontWeight: page === pg ? 600 : 300,
                    cursor: "pointer", letterSpacing: "0.04em",
                  }}
                >{label}</span>
              </div>
            ))}
            {["Services", "About"].map((label) => (
              <div key={label} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{
                  display: "block", padding: "1rem 0",
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem",
                  color: "rgba(245,240,232,0.5)", fontWeight: 300, cursor: "default",
                }}>{label}</span>
              </div>
            ))}

            {/* Walk-in badge */}
            <div style={{
              margin: "1.2rem 0",
              padding: "0.8rem 1rem",
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.2)",
              display: "flex", alignItems: "center", gap: "0.6rem",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4caf50", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(201,168,76,0.8)", textTransform: "uppercase" }}>
                Walk-ins welcome · No appointment
              </span>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ width: "100%", height: "100vh", minHeight: 560, position: "relative", overflow: "hidden", display: "flex" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80)`,
        backgroundSize: "cover", backgroundPosition: "center 30%",
        filter: "brightness(0.4) saturate(0.8)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)",
      }} />

      {/* Mobile: stronger gradient from bottom */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.55) 100%)",
      }} />

      <div className="noise-overlay" />

      <div
        className="mobile-hero-inner"
        style={{
          position: "relative", zIndex: 2, display: "flex", alignItems: "center",
          width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 2rem", paddingTop: 72,
        }}
      >
        <div style={{ maxWidth: 680, width: "100%" }}>
          <div style={{
            fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem",
            letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1.5rem",
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <span style={{ display: "inline-block", width: 30, height: 1, background: GOLD }} />
            Canal Street · New York City
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            fontWeight: 700, lineHeight: 1.1,
            color: CREAM, marginBottom: "1.5rem",
          }}>
            Where Every Cut<br />
            <em style={{ color: GOLD, fontStyle: "italic" }}>Tells a Story</em>
          </h1>

          <p className="hero-sub" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.95rem, 2vw, 1.25rem)",
            fontWeight: 300, lineHeight: 1.8,
            color: "rgba(245,240,232,0.8)", marginBottom: "2.5rem", maxWidth: 520,
          }}>
            Nestled on the second floor of 170 Canal Street, we have quietly become one of Chinatown's most trusted sanctuaries for hair — offering everything from a precise haircut to complex keratin treatments, all without an appointment.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#services" className="btn-gold">Explore Services</a>
            <a href="tel:+19173535985" className="btn-outline">Call Us Now</a>
          </div>

          <div className="hero-stats" style={{
            marginTop: "3rem", display: "flex", gap: "2rem", flexWrap: "wrap",
            fontFamily: "'Josefin Sans', sans-serif",
          }}>
            {[["Walk-Ins", "Always Welcome"], ["Est.", "Canal St NYC"], ["From", "$55"]].map(([label, val]) => (
              <div key={label} className="hero-stat-item" style={{ display: "flex", flexDirection: "column" }}>
                <div className="hero-stat-label" style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(245,240,232,0.4)", textTransform: "uppercase" }}>{label}</div>
                <div className="hero-stat-val" style={{ fontSize: "0.85rem", color: GOLD, letterSpacing: "0.1em", fontWeight: 600 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(to top, ${CHARCOAL}, transparent)`,
        zIndex: 3,
      }} />

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      }}>
        <div style={{ width: 1, height: 50, background: `linear-gradient(to bottom, transparent, ${GOLD})`, animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* ── Walk-In Banner ────────────────────────────────────────────── */
function WalkInBanner() {
  return (
    <section style={{ width: "100%", background: GOLD, position: "relative", overflow: "hidden" }}>
      <div className="noise-overlay" style={{ opacity: 0.15 }} />
      <div
        className="walkin-banner-inner"
        style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "1.2rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "1.5rem", flexWrap: "wrap", position: "relative", zIndex: 2,
        }}
      >
        <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#2a1f00", fontWeight: 600 }}>
          ✦ Walk-Ins Only — No Appointment Needed
        </span>
        <span className="walkin-sep" style={{ width: 1, height: 16, background: "rgba(0,0,0,0.2)" }} />
        <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#2a1f00", fontWeight: 400 }}>
          Take a ticket · Wait to be called · 170 Canal St, 2nd Floor
        </span>
      </div>
    </section>
  );
}

/* ── Services ──────────────────────────────────────────────────── */
function Services() {
  const ref = useFadeIn();
  const [openCat, setOpenCat] = useState(null);

  const categories = [
    {
      title: "Haircuts", icon: "✂",
      items: [
        { name: "Haircut Only", price: "$55 – $165" },
        { name: "Shampoo, Blowout & Style with Scalp & Shoulder Massage", price: "$148 – $181" },
        { name: "Shampoo, Haircut, Blowout & Style with Scalp & Shoulder Massage", price: "$197 – $230" },
      ],
    },
    {
      title: "Color", icon: "◈",
      items: [
        { name: "Color Retouch", price: "$214 – $280" },
        { name: "Full Coloring", price: "$312 – $494" },
        { name: "Highlights", price: "$428 – $593" },
      ],
    },
    {
      title: "Treatments", icon: "◇",
      items: [
        { name: "Basic Perm", price: "$362 – $593" },
        { name: "Digital Perm", price: "$659 – $823" },
        { name: "Thermal Ionic Straight Perm", price: "$856 – $1,054" },
        { name: "Keratin Complex (Brazilian)", price: "$790 – $922" },
        { name: "Deep Treatment", price: "$247 – $297" },
      ],
    },
  ];

  return (
    <section id="services" className="section-full mobile-services" style={{ background: SURFACE, padding: "7rem 0" }}>
      <div className="noise-overlay" />
      <div className="inner" style={{ position: "relative", zIndex: 2 }}>
        <div ref={ref} className="mobile-fade-in services-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Our Craft</div>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: CREAM }}>Services & Pricing</h2>
          <div className="gold-divider" />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.65)", maxWidth: 560, margin: "0 auto", fontWeight: 300 }}>
            From swift, precise cuts to transformative keratin treatments — every service delivered with unhurried care.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="services-grid desktop-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {categories.map((cat) => (
            <ServiceCard key={cat.title} cat={cat} />
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="mobile-services-accordion" style={{ display: "none" }}>
          {categories.map((cat, idx) => {
            const isOpen = openCat === idx;
            return (
              <MobileServiceAccordion
                key={cat.title}
                cat={cat}
                isOpen={isOpen}
                onToggle={() => setOpenCat(isOpen ? null : idx)}
                isLast={idx === categories.length - 1}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-services-grid { display: none !important; }
          .mobile-services-accordion { display: block !important; }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ cat }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="mobile-fade-in service-card" style={{
      background: PANEL,
      border: `1px solid rgba(201,168,76,0.15)`,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4)",
      padding: "2.5rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
        <span style={{ color: GOLD, fontSize: "1.2rem" }}>{cat.icon}</span>
        <h3 className="service-card-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: CREAM, fontWeight: 600 }}>{cat.title}</h3>
      </div>
      <div style={{ borderTop: `1px solid rgba(201,168,76,0.15)`, paddingTop: "1.5rem" }}>
        {cat.items.map((item) => (
          <div key={item.name} style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", gap: "1rem",
          }}>
            <span className="service-item-name" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(245,240,232,0.75)", fontWeight: 300, lineHeight: 1.4, flex: 1 }}>{item.name}</span>
            <span className="service-item-price" style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.75rem", color: GOLD, fontWeight: 600, whiteSpace: "nowrap", letterSpacing: "0.03em" }}>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileServiceAccordion({ cat, isOpen, onToggle, isLast }) {
  return (
    <div style={{
      border: `1px solid rgba(201,168,76,${isOpen ? "0.35" : "0.12"})`,
      marginBottom: isLast ? 0 : "0.75rem",
      background: isOpen ? "rgba(201,168,76,0.04)" : PANEL,
      transition: "background 0.25s, border-color 0.25s",
      overflow: "hidden",
    }}>
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.3rem 1.4rem",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <span style={{
            width: 34, height: 34, borderRadius: "50%",
            border: `1px solid rgba(201,168,76,${isOpen ? "0.5" : "0.2"})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: GOLD, fontSize: "0.9rem",
            background: isOpen ? "rgba(201,168,76,0.1)" : "transparent",
            transition: "all 0.2s",
          }}>{cat.icon}</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: isOpen ? GOLD : CREAM, fontWeight: 600, transition: "color 0.2s" }}>{cat.title}</span>
        </div>
        <span style={{
          color: GOLD, fontSize: "1.1rem", fontWeight: 300,
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.25s",
          display: "inline-block", lineHeight: 1,
        }}>+</span>
      </button>

      {/* Items */}
      {isOpen && (
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.12)", padding: "0.25rem 1.4rem 1.25rem" }}>
          {cat.items.map((item, i) => (
            <div key={item.name} style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              padding: "0.85rem 0",
              borderBottom: i < cat.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              gap: "1rem",
              animation: "slideDown 0.2s ease forwards",
              animationDelay: `${i * 0.05}s`,
              opacity: 0,
            }}>
              <style>{`@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}`}</style>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(245,240,232,0.75)", fontWeight: 300, lineHeight: 1.45, flex: 1 }}>{item.name}</span>
              <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.72rem", color: GOLD, fontWeight: 600, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── About ─────────────────────────────────────────────────────── */
function About() {
  const ref = useFadeIn();
  return (
    <section
      className="section-full about-grid mobile-about-section"
      style={{
        background: CHARCOAL, padding: 0,
        display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh",
      }}
    >
      <div className="mobile-about-img" style={{ position: "relative", overflow: "hidden", minHeight: 500 }}>
        <img
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80"
          alt="Barber at work"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65) saturate(0.7)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(17,17,17,0.8))" }} />
        {/* Mobile: gradient from bottom */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(22,22,22,0.9) 0%, transparent 60%)" }} />
      </div>

      <div
        className="mobile-about-text"
        ref={ref}
        style={{ background: PANEL, display: "flex", alignItems: "center", padding: "5rem 4rem", position: "relative" }}
      >
        <div className="noise-overlay" />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Our Story</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: CREAM, lineHeight: 1.2, marginBottom: "1rem" }}>
            A Hidden Gem on<br /><em style={{ color: GOLD }}>Canal Street</em>
          </h2>
          <div className="gold-divider" style={{ margin: "1.5rem 0" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.7)", fontWeight: 300, lineHeight: 1.9, marginBottom: "1.5rem" }}>
            Tucked away on the second floor of 170 Canal Street, Mian Tian Sing has been a quiet constant in the rhythm of Lower Manhattan. No reservation apps, no booking fees — just walk in, take a number, and let our stylists do what they do best.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.7)", fontWeight: 300, lineHeight: 1.9 }}>
            We offer the full spectrum — from a swift, affordable cut to indulgent scalp massages and complex chemical treatments — all at prices that feel like a well-kept secret in a city that rarely offers value like this.
          </p>
          <div
            className="mobile-about-stats"
            style={{ marginTop: "2.5rem", display: "flex", gap: "2rem", borderTop: `1px solid rgba(201,168,76,0.2)`, paddingTop: "2rem", flexWrap: "wrap" }}
          >
            {[["From", "$55"], ["Canal St", "2nd Fl"], ["Walk-in", "Always"]].map(([l, v]) => (
              <div key={l} className="mobile-about-stat">
                <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(245,240,232,0.35)", textTransform: "uppercase" }}>{l}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: GOLD, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Hours() {
  const ref = useFadeIn();
  const days = [
    { day: "Monday", hours: "10:00 AM – 8:00 PM", open: true },
    { day: "Tuesday", hours: "Closed", open: false },
    { day: "Wednesday", hours: "10:00 AM – 8:00 PM", open: true },
    { day: "Thursday", hours: "10:00 AM – 8:00 PM", open: true },
    { day: "Friday", hours: "9:30 AM – 8:30 PM", open: true },
    { day: "Saturday", hours: "9:30 AM – 8:30 PM", open: true },
    { day: "Sunday", hours: "10:00 AM – 8:00 PM", open: true },
  ];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section className="section-full mobile-hours" style={{ background: `linear-gradient(180deg, ${CHARCOAL} 0%, #0d0d0d 100%)`, padding: "7rem 0", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=60)`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.06,
      }} />
      <div className="noise-overlay" />

      <div
        className="inner hours-grid"
        ref={ref}
        style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
      >
        <div className="hours-header mobile-fade-in">
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Visit Us</div>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: CREAM, marginBottom: "1rem" }}>Hours &<br />Location</h2>
          <div className="gold-divider" style={{ margin: "1.5rem 0" }} />
          <p className="hours-address" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", fontWeight: 300, lineHeight: 1.9, marginBottom: "2rem" }}>
            No booking required. No apps to download. Walk through our door any open day, pull a number, and we'll take care of the rest.
          </p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(245,240,232,0.5)", lineHeight: 2 }}>
            <div style={{ color: GOLD, fontSize: "1.05rem", fontWeight: 400 }}>170 Canal Street, 2nd Floor</div>
            <div>New York, NY 10013</div>
            <div style={{ marginTop: "0.5rem" }}>
              <a href="tel:+19173535985" style={{ color: GOLD, textDecoration: "none" }}>+1 917-353-5985</a>
            </div>
          </div>

          {/* Mobile call CTA inside hours section */}
          <div className="mobile-hours-cta" style={{ display: "none", marginTop: "2rem" }}>
            <a href="tel:+19173535985" className="btn-gold" style={{ display: "block", textAlign: "center" }}>
               Call to Inquire
            </a>
          </div>
        </div>

        <div className="hours-table" style={{
          background: PANEL,
          border: `1px solid rgba(201,168,76,0.15)`,
          boxShadow: "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          padding: "2rem",
        }}>
          {days.map((d, i) => (
            <div key={d.day} className="hours-row" style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.9rem 0",
              borderBottom: i < days.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              background: d.day === today ? "rgba(201,168,76,0.06)" : "transparent",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {d.day === today && <span style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD, display: "inline-block" }} />}
                <span className="hours-day" style={{
                  fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.75rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: d.day === today ? GOLD : "rgba(245,240,232,0.6)",
                  fontWeight: d.day === today ? 600 : 300,
                }}>{d.day}</span>
              </div>
              <span className="hours-time" style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
                color: d.open ? (d.day === today ? GOLD : "rgba(245,240,232,0.75)") : "rgba(245,240,232,0.25)",
                fontStyle: d.open ? "normal" : "italic",
              }}>{d.hours}</span>
            </div>
          ))}
          <div className="hours-note" style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(201,168,76,0.08)", border: `1px solid rgba(201,168,76,0.2)` }}>
            <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(201,168,76,0.8)", textTransform: "uppercase", textAlign: "center" }}>
              Federal Holidays — Closed
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-hours-cta { display: block !important; }
        }
      `}</style>
    </section>
  );
}

function Reviews() {
  const ref = useFadeIn();
  const reviews = [
    { name: "Jane Phan", text: "Pretty decent service and prices for hair cut. Would recommend if you're looking for a no-nonsense salon that delivers every time.", stars: 4 },
    { name: "SV M", text: "For the price that they charge, this place is good enough. The stylists know what they're doing and the atmosphere is surprisingly calm.", stars: 4 },
    { name: "Meng Ji", text: "Always go for massage, shampoo, facial and haircut. It's become a ritual I look forward to every few weeks. Nothing else like it on Canal.", stars: 5 },
  ];

  return (
    <section className="section-full mobile-reviews" style={{ background: SURFACE, padding: "7rem 0", position: "relative" }}>
      <div className="noise-overlay" />
      <div className="inner" style={{ position: "relative", zIndex: 2 }}>
        <div ref={ref} className="mobile-fade-in" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Client Words</div>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: CREAM }}>What They Say</h2>
          <div className="gold-divider" />
        </div>

        <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {reviews.map((r, idx) => {
            const rRef = useFadeIn();
            return (
              <div
                key={r.name}
                ref={rRef}
                className="mobile-fade-in review-card"
                style={{
                  background: PANEL,
                  border: `1px solid rgba(201,168,76,0.15)`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.35)",
                  padding: "2.5rem",
                  position: "relative",
                  transitionDelay: `${idx * 0.1}s`,
                }}
              >
                <div style={{
                  position: "absolute", top: "1.5rem", right: "1.5rem",
                  fontFamily: "'Playfair Display', serif", fontSize: "4rem",
                  color: "rgba(201,168,76,0.12)", lineHeight: 1,
                }}>"</div>
                <div style={{ display: "flex", gap: 3, marginBottom: "1.5rem" }}>
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} style={{ color: GOLD, fontSize: "0.8rem" }}>★</span>
                  ))}
                  {Array.from({ length: 5 - r.stars }).map((_, i) => (
                    <span key={i} style={{ color: "rgba(201,168,76,0.2)", fontSize: "0.8rem" }}>★</span>
                  ))}
                </div>
                <p className="review-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.75)", fontWeight: 300, lineHeight: 1.8, marginBottom: "2rem" }}>
                  {r.text}
                </p>
                <div style={{ borderTop: `1px solid rgba(201,168,76,0.15)`, paddingTop: "1rem" }}>
                  <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase" }}>{r.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Gallery ───────────────────────────────────────────────────── */
function GalleryStrip() {
  const imgs = [
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=70",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=70",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=70",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=70",
  ];

  return (
    <section
      className="gallery-strip mobile-gallery-strip"
      style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", height: 280 }}
    >
      {imgs.map((src, i) => (
        <div key={i} className="gallery-cell" style={{ overflow: "hidden", position: "relative", height: "100%" }}>
          <img
            src={src}
            alt="Barber work"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.6)", transition: "transform 0.5s ease, filter 0.5s ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.filter = "brightness(0.7) saturate(0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(0.55) saturate(0.6)"; }}
          />
          {/* Mobile overlay label */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
            padding: "1rem 0.75rem 0.6rem",
            pointerEvents: "none",
          }}>
          </div>
        </div>
      ))}

      {/* Mobile scroll hint */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-gallery-strip::after {
            content: '';
            flex: 0 0 1.4rem;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Mobile sticky CTA bar ─────────────────────────────────────── */
function MobileStickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <div style={{
        display: "none",
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
        transform: show ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "rgba(10,10,10,0.97)",
        borderTop: `1px solid rgba(201,168,76,0.25)`,
        backdropFilter: "blur(16px)",
        padding: "0.85rem 1.4rem",
        gap: "0.75rem",
      }} className="mobile-sticky-bar">
        <a
          href="tel:+19173535985"
          style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            background: GOLD, color: CHARCOAL,
            fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.7rem",
            letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600,
            padding: "0.9rem", textDecoration: "none",
            boxShadow: "0 4px 16px rgba(201,168,76,0.3)",
          }}
        >
          <span>📞</span> Call Now
        </a>
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid rgba(201,168,76,0.35)", color: GOLD,
          fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.7rem",
          letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "0.9rem",
        }}>
          <span style={{ marginRight: "0.4rem" }}></span> 170 Canal St
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-bar { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ── Footer ────────────────────────────────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer style={{ width: "100%", background: "#0a0a0a", borderTop: `1px solid rgba(201,168,76,0.15)`, position: "relative" }}>
      <div className="noise-overlay" />
      <div className="inner mobile-footer" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem 2rem" }}>

        {/* Desktop grid */}
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "3rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div className="mobile-footer-brand">
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: GOLD, marginBottom: "0.5rem" }}>Mian Tian Sing</div>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", marginBottom: "1.5rem" }}>Hair Salon · New York</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.45)", fontWeight: 300, lineHeight: 1.8 }}>
              A full-service hair salon on the second floor of 170 Canal Street. Walk-ins always welcome.
            </p>
          </div>

          <div>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1.5rem" }}>Navigation</div>
            {[["Home", "home"], ["Contact", "contact"]].map(([label, pg]) => (
              <div key={label} style={{ marginBottom: "0.75rem" }}>
                <span onClick={() => setPage(pg)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.5)", cursor: "pointer", fontWeight: 300 }}>{label}</span>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1.5rem" }}>Hours</div>
            {[["Mon", "10am–8pm"], ["Tue", "Closed"], ["Wed–Thu", "10am–8pm"], ["Fri–Sat", "9:30–8:30pm"], ["Sun", "10am–8pm"]].map(([d, h]) => (
              <div key={d} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(245,240,232,0.35)", textTransform: "uppercase" }}>{d}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.45)" }}>{h}</span>
              </div>
            ))}
          </div>

          <div className="mobile-footer-contact">
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1.5rem" }}>Contact</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.5)", lineHeight: 2, fontWeight: 300 }}>
              <div>170 Canal Street, 2nd Floor</div>
              <div>New York, NY 10013</div>
              <a href="tel:+19173535985" style={{ color: GOLD, textDecoration: "none", display: "block", marginTop: "0.5rem" }}>+1 917-353-5985</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar" style={{ borderTop: `1px solid rgba(201,168,76,0.1)`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(245,240,232,0.2)", textTransform: "uppercase" }}>
            © 2024 Mian Tian Sing Hair Salon · All Rights Reserved
          </span>
          <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(245,240,232,0.2)", textTransform: "uppercase" }}>
            170 Canal St · New York · Walk-Ins Only
          </span>
        </div>

        {/* Extra bottom padding for mobile sticky bar */}
        <div className="mobile-footer-spacer" style={{ display: "none", height: "4rem" }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-footer-spacer { display: block !important; }
        }
      `}</style>
    </footer>
  );
}

/* ── Home ──────────────────────────────────────────────────────── */
function Home() {
  return (
    <>
      <Hero />
      <WalkInBanner />
      <Services />
      <About />
      <Hours />
      <Reviews />
      <GalleryStrip />
    </>
  );
}

/* ── Contact ───────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Contact Form Submission:", form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: `1px solid rgba(201,168,76,0.2)`,
    color: CREAM,
    padding: "0.9rem 1.25rem",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem", fontWeight: 300,
    outline: "none", transition: "border-color 0.2s",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3)",
    borderRadius: 0,
    WebkitAppearance: "none",
  };

  const labelStyle = {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: "0.65rem", letterSpacing: "0.2em",
    color: "rgba(201,168,76,0.8)", textTransform: "uppercase",
    display: "block", marginBottom: "0.5rem",
  };

  return (
    <section className="section-full mobile-contact-section" style={{ background: CHARCOAL, minHeight: "100vh", paddingTop: 120, position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1400&q=60)`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.05,
      }} />
      <div className="noise-overlay" />

      <div className="inner" style={{ position: "relative", zIndex: 2, paddingBottom: "5rem" }}>
        <div className="contact-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Get In Touch</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, color: CREAM }}>Contact Us</h1>
          <div className="gold-divider" />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", fontWeight: 300, maxWidth: 500, margin: "0 auto" }}>
            Have a question about our services? We'd love to hear from you. Or simply walk in — no appointment needed.
          </p>
        </div>

        {/* Mobile quick actions */}
        <div className="mobile-contact-quickbar" style={{ display: "none", gap: "0.75rem", marginBottom: "2rem" }}>
          <a href="tel:+19173535985" style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem",
            background: PANEL, border: `1px solid rgba(201,168,76,0.2)`,
            padding: "1.1rem 0.5rem", textDecoration: "none",
          }}>
            <span style={{ fontSize: "1.3rem" }}></span>
            <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", color: GOLD, textTransform: "uppercase" }}>Call</span>
          </a>
          <a href="https://maps.apple.com/?q=170+Canal+Street+New+York" target="_blank" rel="noreferrer" style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem",
            background: PANEL, border: `1px solid rgba(201,168,76,0.2)`,
            padding: "1.1rem 0.5rem", textDecoration: "none",
          }}>
            <span style={{ fontSize: "1.3rem" }}></span>
            <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", color: GOLD, textTransform: "uppercase" }}>Directions</span>
          </a>
          <div style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem",
            background: PANEL, border: `1px solid rgba(201,168,76,0.2)`,
            padding: "1.1rem 0.5rem",
          }}>
            <span style={{ fontSize: "1.3rem" }}></span>
            <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", color: GOLD, textTransform: "uppercase" }}>Walk-In</span>
          </div>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", maxWidth: 960, margin: "0 auto" }}>
          <div>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1.5rem" }}>Find Us</div>
            {[
              { label: "Address", value: "170 Canal Street, 2nd Floor\nNew York, NY 10013" },
              { label: "Phone", value: "+1 917-353-5985" },
              { label: "Walk-ins", value: "Always welcome — no booking needed" },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.7)", fontWeight: 300, whiteSpace: "pre-line", lineHeight: 1.7 }}>{item.value}</div>
              </div>
            ))}

            <div className="contact-hours-box" style={{ background: PANEL, border: `1px solid rgba(201,168,76,0.15)`, padding: "1.5rem", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Hours</div>
              {[["Mon", "10am–8pm"], ["Tue", "Closed"], ["Wed–Thu", "10am–8pm"], ["Fri–Sat", "9:30–8:30pm"], ["Sun", "10am–8pm"]].map(([d, h]) => (
                <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{d}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.6)" }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mobile-contact-form-panel" style={{
            background: PANEL,
            border: `1px solid rgba(201,168,76,0.15)`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 48px rgba(0,0,0,0.4)",
            padding: "3rem",
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ color: GOLD, fontSize: "2rem", marginBottom: "1rem", animation: "floatUp 2s ease-in-out infinite" }}>✦</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: CREAM, marginBottom: "1rem" }}>Message Received</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(245,240,232,0.6)", fontWeight: 300 }}>
                  Thank you for reaching out. We'll be in touch soon.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "2rem" }}>Send a Message</div>

                <div className="contact-info-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input style={inputStyle} placeholder="Your name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input style={inputStyle} placeholder="Your phone" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Email</label>
                  <input style={inputStyle} type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={e => e.target.style.borderColor = GOLD}
                    onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label style={labelStyle}>Message</label>
                  <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }}
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => e.target.style.borderColor = GOLD}
                    onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
                  />
                </div>

                <button className="btn-gold" onClick={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-contact-quickbar { display: flex !important; }
        }
      `}</style>
    </section>
  );
}


export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <>
      <style>{globalStyles}</style>
      <Navbar page={page} setPage={setPage} />
      <main>
        {page === "home" ? <Home /> : <Contact />}
      </main>
      <Footer setPage={setPage} />
      <MobileStickyBar />
    </>
  );
}