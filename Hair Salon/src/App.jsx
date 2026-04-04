import { useState, useEffect } from "react";
// import { Facebook, Instagram } from "lucide-react";

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
`;

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
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: GOLD, letterSpacing: "0.08em", lineHeight: 1 }}>
              Mian Tian Sing
            </div>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(245,240,232,0.5)", textTransform: "uppercase", marginTop: 2 }}>
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

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: `1px solid rgba(201,168,76,0.4)`, padding: "6px 10px", cursor: "pointer", color: GOLD, fontSize: "1rem" }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div style={{
            background: "rgba(10,10,10,0.98)", borderTop: `1px solid rgba(201,168,76,0.15)`,
            padding: "1.5rem 2rem 2rem",
          }}>
            {[["Home", "home"], ["Contact", "contact"]].map(([label, pg]) => (
              <div key={label} style={{ marginBottom: "1.2rem" }}>
                <span
                  style={{ ...linkStyle(page === pg), fontSize: "0.85rem" }}
                  onClick={() => { setPage(pg); setMenuOpen(false); }}
                >{label}</span>
              </div>
            ))}
            <div style={{ marginBottom: "1.2rem" }}>
              <span style={{ ...linkStyle(false), fontSize: "0.85rem" }}>Services</span>
            </div>
            <div style={{ marginBottom: "1.2rem" }}>
              <span style={{ ...linkStyle(false), fontSize: "0.85rem" }}>About</span>
            </div>
            <a href="tel:+19173535985" style={{ ...linkStyle(false), color: GOLD, fontSize: "0.85rem", display: "block" }}>+1 917·353·5985</a>
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
      <div className="noise-overlay" />

      <div style={{
        position: "relative", zIndex: 2, display: "flex", alignItems: "center",
        width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 2rem", paddingTop: 72,
      }}>
        <div style={{ maxWidth: 680 }}>
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
            {[["Walk-Ins", "Always Welcome"], ["Est.", "Canal St NYC"], ["From", "PKR 4,750"]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(245,240,232,0.4)", textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontSize: "0.85rem", color: GOLD, letterSpacing: "0.1em", fontWeight: 600 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(to top, ${CHARCOAL}, transparent)`,
        zIndex: 3,
      }} />

      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      }}>
        <div style={{ width: 1, height: 50, background: `linear-gradient(to bottom, transparent, ${GOLD})`, animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>
      <style>{`@keyframes scrollPulse { 0%,100%{opacity:0.4;} 50%{opacity:1;} }`}</style>
    </section>
  );
}

function WalkInBanner() {
  return (
    <section style={{ width: "100%", background: GOLD, position: "relative", overflow: "hidden" }}>
      <div className="noise-overlay" style={{ opacity: 0.15 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1.2rem 2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
        <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#2a1f00", fontWeight: 600 }}>
          ✦ Walk-Ins Only — No Appointment Needed
        </span>
        <span style={{ width: 1, height: 16, background: "rgba(0,0,0,0.2)" }} />
        <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#2a1f00", fontWeight: 400 }}>
          Take a ticket · Wait to be called · 170 Canal St, 2nd Floor
        </span>
      </div>
    </section>
  );
}

function Services() {
  const categories = [
    {
      title: "Haircuts",
      icon: "✂",
      items: [
        { name: "Haircut Only", price: "PKR 4,750 – 14,000" },
        { name: "Shampoo, Blowout & Style with Scalp & Shoulder Massage", price: "PKR 12,600 – 15,400" },
        { name: "Shampoo, Haircut, Blowout & Style with Scalp & Shoulder Massage", price: "PKR 16,800 – 19,600" },
      ],
    },
    {
      title: "Color",
      icon: "◈",
      items: [
        { name: "Color Retouch", price: "PKR 18,200 – 23,800" },
        { name: "Full Coloring", price: "PKR 26,600 – 42,000" },
        { name: "Highlights", price: "PKR 36,400 – 50,400" },
      ],
    },
    {
      title: "Treatments",
      icon: "◇",
      items: [
        { name: "Basic Perm", price: "PKR 30,800 – 50,400" },
        { name: "Digital Perm", price: "PKR 56,000 – 70,000" },
        { name: "Thermal Ionic Straight Perm", price: "PKR 72,800 – 89,600" },
        { name: "Keratin Complex (Brazilian)", price: "PKR 67,200 – 78,400" },
        { name: "Deep Treatment", price: "PKR 21,000 – 25,200" },
      ],
    },
  ];

  return (
    <section id="services" className="section-full" style={{ background: SURFACE, padding: "7rem 0" }}>
      <div className="noise-overlay" />
      <div className="inner" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Our Craft</div>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: CREAM }}>Services & Pricing</h2>
          <div className="gold-divider" />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.65)", maxWidth: 560, margin: "0 auto", fontWeight: 300 }}>
            From swift, precise cuts to transformative keratin treatments — every service delivered with unhurried care.
          </p>
        </div>

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {categories.map((cat) => (
            <div key={cat.title} style={{
              background: PANEL,
              border: `1px solid rgba(201,168,76,0.15)`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4)",
              padding: "2.5rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                <span style={{ color: GOLD, fontSize: "1.2rem" }}>{cat.icon}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: CREAM, fontWeight: 600 }}>{cat.title}</h3>
              </div>
              <div style={{ borderTop: `1px solid rgba(201,168,76,0.15)`, paddingTop: "1.5rem" }}>
                {cat.items.map((item) => (
                  <div key={item.name} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                    gap: "1rem",
                  }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(245,240,232,0.75)", fontWeight: 300, lineHeight: 1.4, flex: 1 }}>{item.name}</span>
                    <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.75rem", color: GOLD, fontWeight: 600, whiteSpace: "nowrap", letterSpacing: "0.03em" }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section-full about-grid" style={{ background: CHARCOAL, padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh" }}>
      <div style={{ position: "relative", overflow: "hidden", minHeight: 500 }}>
        <img
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80"
          alt="Barber at work"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65) saturate(0.7)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(17,17,17,0.8))" }} />
      </div>

      <div style={{ background: PANEL, display: "flex", alignItems: "center", padding: "5rem 4rem", position: "relative" }}>
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
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "2rem", borderTop: `1px solid rgba(201,168,76,0.2)`, paddingTop: "2rem", flexWrap: "wrap" }}>
            {[["From", "PKR 4,750"], ["Canal St", "2nd Fl"], ["Walk-in", "Always"]].map(([l, v]) => (
              <div key={l}>
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
    <section className="section-full" style={{ background: `linear-gradient(180deg, ${CHARCOAL} 0%, #0d0d0d 100%)`, padding: "7rem 0", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=60)`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.06,
      }} />
      <div className="noise-overlay" />

      <div className="inner hours-grid" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Visit Us</div>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: CREAM, marginBottom: "1rem" }}>Hours &<br />Location</h2>
          <div className="gold-divider" style={{ margin: "1.5rem 0" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", fontWeight: 300, lineHeight: 1.9, marginBottom: "2rem" }}>
            No booking required. No apps to download. Walk through our door any open day, pull a number, and we'll take care of the rest.
          </p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(245,240,232,0.5)", lineHeight: 2 }}>
            <div style={{ color: GOLD, fontSize: "1.05rem", fontWeight: 400 }}>170 Canal Street, 2nd Floor</div>
            <div>New York, NY 10013</div>
            <div style={{ marginTop: "0.5rem" }}>
              <a href="tel:+19173535985" style={{ color: GOLD, textDecoration: "none" }}>+1 917-353-5985</a>
            </div>
          </div>
        </div>

        <div style={{
          background: PANEL,
          border: `1px solid rgba(201,168,76,0.15)`,
          boxShadow: "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          padding: "2rem",
        }}>
          {days.map((d, i) => (
            <div key={d.day} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.9rem 0",
              borderBottom: i < days.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              background: d.day === today ? "rgba(201,168,76,0.06)" : "transparent",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {d.day === today && <span style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD, display: "inline-block" }} />}
                <span style={{
                  fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.75rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: d.day === today ? GOLD : "rgba(245,240,232,0.6)",
                  fontWeight: d.day === today ? 600 : 300,
                }}>{d.day}</span>
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
                color: d.open ? (d.day === today ? GOLD : "rgba(245,240,232,0.75)") : "rgba(245,240,232,0.25)",
                fontStyle: d.open ? "normal" : "italic",
              }}>{d.hours}</span>
            </div>
          ))}
          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(201,168,76,0.08)", border: `1px solid rgba(201,168,76,0.2)` }}>
            <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(201,168,76,0.8)", textTransform: "uppercase", textAlign: "center" }}>
              Federal Holidays — Closed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { name: "Jane Phan", text: "Pretty decent service and prices for hair cut. Would recommend if you're looking for a no-nonsense salon that delivers every time.", stars: 4 },
    { name: "SV M", text: "For the price that they charge, this place is good enough. The stylists know what they're doing and the atmosphere is surprisingly calm.", stars: 4 },
    { name: "Meng Ji", text: "Always go for massage, shampoo, facial and haircut. It's become a ritual I look forward to every few weeks. Nothing else like it on Canal.", stars: 5 },
  ];

  return (
    <section className="section-full" style={{ background: SURFACE, padding: "7rem 0", position: "relative" }}>
      <div className="noise-overlay" />
      <div className="inner" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Client Words</div>
          <h2 className="section-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: CREAM }}>What They Say</h2>
          <div className="gold-divider" />
        </div>

        <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {reviews.map((r) => (
            <div key={r.name} style={{
              background: PANEL,
              border: `1px solid rgba(201,168,76,0.15)`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.35)",
              padding: "2.5rem",
              position: "relative",
            }}>
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
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.75)", fontWeight: 300, lineHeight: 1.8, marginBottom: "2rem" }}>
                {r.text}
              </p>
              <div style={{ borderTop: `1px solid rgba(201,168,76,0.15)`, paddingTop: "1rem" }}>
                <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase" }}>{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  const imgs = [
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=70",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=70",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=70",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=70",
  ];

  return (
    <section className="gallery-strip" style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", height: 280 }}>
      {imgs.map((src, i) => (
        <div key={i} style={{ overflow: "hidden", position: "relative" }}>
          <img src={src} alt="Barber work" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.6)", transition: "transform 0.5s ease, filter 0.5s ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.filter = "brightness(0.7) saturate(0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(0.55) saturate(0.6)"; }}
          />
        </div>
      ))}
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ width: "100%", background: "#0a0a0a", borderTop: `1px solid rgba(201,168,76,0.15)`, position: "relative" }}>
      <div className="noise-overlay" />
      <div className="inner" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem 2rem" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: GOLD, marginBottom: "0.5rem" }}>Mian Tian Sing</div>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", marginBottom: "1.5rem" }}>Hair Salon · New York</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.45)", fontWeight: 300, lineHeight: 1.8 }}>
              A full-service hair salon on the second floor of 170 Canal Street. Walk-ins always welcome.
            </p>
            <div>
                
            </div>
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

          <div>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1.5rem" }}>Contact</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.5)", lineHeight: 2, fontWeight: 300 }}>
              <div>170 Canal Street, 2nd Floor</div>
              <div>New York, NY 10013</div>
              <a href="tel:+19173535985" style={{ color: GOLD, textDecoration: "none", display: "block", marginTop: "0.5rem" }}>+1 917-353-5985</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid rgba(201,168,76,0.1)`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(245,240,232,0.2)", textTransform: "uppercase" }}>
            © 2024 Mian Tian Sing Hair Salon · All Rights Reserved
          </span>
          <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(245,240,232,0.2)", textTransform: "uppercase" }}>
            170 Canal St · New York · Walk-Ins Only
          </span>
        </div>
      </div>
    </footer>
  );
}

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
  };

  const labelStyle = {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: "0.65rem", letterSpacing: "0.2em",
    color: "rgba(201,168,76,0.8)", textTransform: "uppercase",
    display: "block", marginBottom: "0.5rem",
  };

  return (
    <section className="section-full" style={{ background: CHARCOAL, minHeight: "100vh", paddingTop: 120, position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1400&q=60)`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.05,
      }} />
      <div className="noise-overlay" />

      <div className="inner" style={{ position: "relative", zIndex: 2, paddingBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Get In Touch</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, color: CREAM }}>Contact Us</h1>
          <div className="gold-divider" />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", fontWeight: 300, maxWidth: 500, margin: "0 auto" }}>
            Have a question about our services? We'd love to hear from you. Or simply walk in — no appointment needed.
          </p>
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

            <div style={{ background: PANEL, border: `1px solid rgba(201,168,76,0.15)`, padding: "1.5rem", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Hours</div>
              {[["Mon", "10am–8pm"], ["Tue", "Closed"], ["Wed–Thu", "10am–8pm"], ["Fri–Sat", "9:30–8:30pm"], ["Sun", "10am–8pm"]].map(([d, h]) => (
                <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{d}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.6)" }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: PANEL,
            border: `1px solid rgba(201,168,76,0.15)`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 48px rgba(0,0,0,0.4)",
            padding: "3rem",
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ color: GOLD, fontSize: "2rem", marginBottom: "1rem" }}>✦</div>
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
    </>
  );
}