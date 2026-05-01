import { useState, useEffect, useRef } from "react";

// ─── STYLE INJECTION ────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream:   #FAF8F5;
    --ivory:   #F2EDE6;
    --warm:    #E8DDD0;
    --gold:    #B8975A;
    --gold2:   #D4AF7A;
    --ink:     #1A1714;
    --muted:   #6B6258;
    --border:  rgba(184,151,90,0.25);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--cream);
    color: var(--ink);
    overflow-x: hidden;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

  /* ── NAVBAR ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 24px 48px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all 0.6s cubic-bezier(0.16,1,0.3,1);
  }
  .navbar.scrolled {
    background: rgba(250,248,245,0.95);
    backdrop-filter: blur(12px);
    padding: 16px 48px;
    border-bottom: 1px solid var(--border);
    box-shadow: 0 4px 30px rgba(26,23,20,0.06);
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 500; letter-spacing: 0.08em;
    color: var(--ink); text-decoration: none;
    display: flex; flex-direction: column; line-height: 1;
  }
  .nav-logo span { font-size: 9px; font-family:'Jost',sans-serif; font-weight:300; letter-spacing:0.35em; color:var(--gold); margin-top:3px; text-transform:uppercase; }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink);
    text-decoration: none; position: relative; padding-bottom: 2px;
    transition: color 0.3s;
  }
  .nav-links a::after {
    content:''; position:absolute; bottom:0; left:0; width:0; height:1px;
    background: var(--gold); transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-links a:hover::after { width:100%; }
  .nav-links a:hover { color: var(--gold); }
  .nav-cta {
    font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--ink); border: 1px solid var(--border); padding: 10px 22px;
    background: transparent; cursor: pointer; font-family: 'Jost',sans-serif;
    font-weight: 400; transition: all 0.4s; border-radius: 0;
    text-decoration: none; display:inline-block;
  }
  .nav-cta:hover { background: var(--gold); color: #fff; border-color: var(--gold); }
  .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; padding:4px; }
  .hamburger span { display:block; width:24px; height:1px; background:var(--ink); transition:all 0.3s; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; position: relative;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #1A1714 0%, #2C2420 40%, #3D3028 70%, #1A1714 100%);
  }
  .hero-grid {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: linear-gradient(var(--gold) 1px, transparent 1px),
                      linear-gradient(90deg, var(--gold) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridDrift 20s linear infinite;
  }
  @keyframes gridDrift { 0%{transform:translate(0,0)} 100%{transform:translate(60px,60px)} }
  .hero-photos {
    position: absolute; inset: 0; display: flex;
  }
  .hero-photo-strip {
    flex:1; position:relative; overflow:hidden;
  }
  .hero-photo-strip img {
    width:100%; height:100%; object-fit:cover;
    filter: grayscale(20%) contrast(1.1);
    transition: transform 8s ease;
    animation: heroZoom 12s ease-in-out infinite alternate;
  }
  @keyframes heroZoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.08); }
  }
  .hero-overlay {
    position:absolute; inset:0;
    background: linear-gradient(to right,
      rgba(26,23,20,0.85) 0%,
      rgba(26,23,20,0.6) 40%,
      rgba(26,23,20,0.75) 100%);
  }
  .hero-content {
    position: relative; z-index: 2; text-align: center;
    padding: 0 24px; max-width: 900px;
  }
  .hero-eyebrow {
    font-family:'Jost',sans-serif; font-size:10px; font-weight:300;
    letter-spacing:0.45em; text-transform:uppercase; color:var(--gold2);
    margin-bottom:28px; opacity:0; animation: fadeUp 0.8s 0.3s forwards;
  }
  .hero-title {
    font-family:'Cormorant Garamond',serif; font-size:clamp(56px,9vw,120px);
    font-weight:300; line-height:0.92; color:#fff; letter-spacing:-0.01em;
    margin-bottom:8px; opacity:0; animation:fadeUp 0.9s 0.5s forwards;
  }
  .hero-title em { font-style:italic; color:var(--gold2); }
  .hero-title-sub {
    font-family:'Cormorant Garamond',serif; font-size:clamp(20px,3vw,38px);
    font-weight:300; color:rgba(255,255,255,0.6); letter-spacing:0.06em;
    margin-bottom:40px; opacity:0; animation:fadeUp 0.9s 0.7s forwards;
  }
  .hero-divider {
    width:60px; height:1px; background:var(--gold); margin:0 auto 36px;
    opacity:0; animation:fadeUp 0.8s 0.85s forwards;
  }
  .hero-desc {
    font-size:14px; font-weight:300; letter-spacing:0.08em; color:rgba(255,255,255,0.7);
    line-height:1.9; max-width:440px; margin:0 auto 48px;
    opacity:0; animation:fadeUp 0.9s 1s forwards;
  }
  .hero-btns {
    display:flex; gap:16px; justify-content:center; flex-wrap:wrap;
    opacity:0; animation:fadeUp 0.9s 1.15s forwards;
  }
  .btn-primary {
    font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.3em;
    text-transform:uppercase; padding:16px 40px; background:var(--gold);
    color:#fff; border:none; cursor:pointer; transition:all 0.4s;
    text-decoration:none; display:inline-block;
  }
  .btn-primary:hover { background:var(--gold2); transform:translateY(-2px); box-shadow:0 12px 40px rgba(184,151,90,0.4); }
  .btn-outline {
    font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.3em;
    text-transform:uppercase; padding:15px 40px; background:transparent;
    color:#fff; border:1px solid rgba(255,255,255,0.4); cursor:pointer;
    transition:all 0.4s; text-decoration:none; display:inline-block;
  }
  .btn-outline:hover { border-color:#fff; background:rgba(255,255,255,0.08); transform:translateY(-2px); }
  .hero-scroll {
    position:absolute; bottom:36px; left:50%; transform:translateX(-50%);
    display:flex; flex-direction:column; align-items:center; gap:8px;
    color:rgba(255,255,255,0.5); font-size:9px; letter-spacing:0.3em;
    text-transform:uppercase; font-family:'Jost',sans-serif;
    animation: pulse 2.5s ease-in-out infinite;
  }
  .scroll-line { width:1px; height:40px; background:linear-gradient(to bottom,var(--gold),transparent); }
  @keyframes pulse { 0%,100%{opacity:0.5;transform:translateX(-50%) translateY(0)} 50%{opacity:1;transform:translateX(-50%) translateY(6px)} }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ── WALK-IN BANNER ── */
  .walkin-banner {
    background: var(--ink); color: #fff;
    padding: 20px 0; overflow: hidden;
    border-top: 1px solid rgba(184,151,90,0.3);
  }
  .walkin-ticker {
    display: flex; gap: 80px; width: max-content;
    animation: ticker 25s linear infinite;
  }
  .walkin-item {
    display: flex; align-items: center; gap: 16px; white-space: nowrap;
    font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; font-weight:300;
  }
  .walkin-dot { width:4px; height:4px; background:var(--gold); border-radius:50%; flex-shrink:0; }
  @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  /* ── SECTION SHELLS ── */
  .section { padding: 120px 48px; }
  .section-sm { padding: 80px 48px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }

  .section-label {
    font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); font-family: 'Jost',sans-serif; font-weight:400;
    margin-bottom: 16px; display:block;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 5vw, 64px); font-weight: 300;
    line-height: 1.05; color: var(--ink); letter-spacing: -0.01em;
  }
  .section-title em { font-style:italic; color:var(--gold); }
  .section-subtitle {
    font-size: 14px; font-weight: 300; color: var(--muted);
    letter-spacing: 0.05em; line-height: 1.8; max-width: 520px;
    margin-top: 20px;
  }
  .section-rule {
    width: 40px; height: 1px; background: var(--gold); margin: 32px 0;
  }

  /* ── STORY ── */
  .story-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
    margin-top: 80px;
  }
  .story-img-wrap {
    position: relative;
  }
  .story-img-main {
    width:100%; aspect-ratio:3/4; object-fit:cover;
    display:block; position:relative; z-index:1;
  }
  .story-img-accent {
    position:absolute; width:55%; aspect-ratio:1; object-fit:cover;
    right:-30px; bottom:-30px; z-index:2;
    border:6px solid var(--cream);
    box-shadow: 0 20px 60px rgba(26,23,20,0.15);
  }
  .story-badge {
    position:absolute; top:30px; left:-20px; z-index:3;
    background:var(--gold); color:#fff; padding:20px;
    font-family:'Cormorant Garamond',serif; text-align:center;
    box-shadow:0 12px 40px rgba(184,151,90,0.3);
  }
  .story-badge-num { font-size:36px; font-weight:300; line-height:1; display:block; }
  .story-badge-txt { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; font-family:'Jost',sans-serif; display:block; margin-top:2px; }
  .story-text h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(28px,3vw,40px); font-weight:400; line-height:1.2; margin-bottom:24px; }
  .story-text p { font-size:14px; font-weight:300; color:var(--muted); line-height:1.9; margin-bottom:16px; }
  .story-stats {
    display:flex; gap:40px; margin-top:40px; padding-top:40px;
    border-top:1px solid var(--border);
  }
  .stat-item { display:flex; flex-direction:column; gap:6px; }
  .stat-num { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:300; color:var(--gold); line-height:1; }
  .stat-label { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted); font-weight:300; }

  /* ── SERVICES ── */
  .services-bg { background: var(--ivory); }
  .services-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:60px; gap:40px; flex-wrap:wrap; }
  .service-tabs {
    display:flex; gap:4px; background:var(--warm); padding:4px; border-radius:2px;
    flex-wrap:wrap;
  }
  .service-tab {
    font-size:10px; letter-spacing:0.2em; text-transform:uppercase;
    padding:10px 18px; background:transparent; border:none; cursor:pointer;
    font-family:'Jost',sans-serif; color:var(--muted); transition:all 0.3s;
    font-weight:400;
  }
  .service-tab.active { background:#fff; color:var(--ink); box-shadow:0 2px 8px rgba(26,23,20,0.08); }
  .services-grid {
    display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:2px;
  }
  .service-card {
    background:#fff; padding:36px; position:relative; overflow:hidden;
    transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
    cursor:default;
  }
  .service-card::before {
    content:''; position:absolute; left:0; top:0; bottom:0; width:3px;
    background:var(--gold); transform:scaleY(0); transform-origin:bottom;
    transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .service-card:hover::before { transform:scaleY(1); }
  .service-card:hover { transform:translateX(4px); box-shadow:4px 0 40px rgba(26,23,20,0.06); }
  .service-card-num { font-family:'Cormorant Garamond',serif; font-size:13px; color:var(--gold); letter-spacing:0.1em; margin-bottom:16px; display:block; }
  .service-card-name { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:500; line-height:1.3; margin-bottom:8px; }
  .service-card-desc { font-size:12px; color:var(--muted); letter-spacing:0.05em; line-height:1.7; margin-bottom:20px; }
  .service-card-price {
    font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:300;
    color:var(--ink);
  }
  .service-card-price span { font-size:12px; color:var(--muted); font-family:'Jost',sans-serif; font-weight:300; letter-spacing:0.05em; }
  .service-note { margin-top:40px; padding:24px 32px; background:var(--ink); color:#fff; display:flex; align-items:center; gap:20px; }
  .service-note-icon { font-size:24px; flex-shrink:0; }
  .service-note-text { font-size:12px; font-weight:300; letter-spacing:0.05em; line-height:1.7; color:rgba(255,255,255,0.8); }
  .service-note-text strong { color:var(--gold2); font-weight:400; }

  /* ── GALLERY ── */
  .gallery-grid {
    display:grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 4px; margin-top: 60px;
  }
  .gallery-item {
    overflow:hidden; position:relative; cursor:pointer;
  }
  .gallery-item:first-child { grid-row: span 2; }
  .gallery-item img {
    width:100%; height:100%; object-fit:cover; display:block;
    transition:transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.4s;
    filter:grayscale(15%);
  }
  .gallery-item:hover img { transform:scale(1.06); filter:grayscale(0%); }
  .gallery-item-overlay {
    position:absolute; inset:0; background:rgba(26,23,20,0); 
    display:flex; align-items:flex-end; padding:24px;
    transition:background 0.4s;
  }
  .gallery-item:hover .gallery-item-overlay { background:rgba(26,23,20,0.35); }
  .gallery-item-label {
    font-size:10px; letter-spacing:0.25em; text-transform:uppercase;
    color:#fff; font-family:'Jost',sans-serif; font-weight:300;
    opacity:0; transform:translateY(8px); transition:all 0.4s;
  }
  .gallery-item:hover .gallery-item-label { opacity:1; transform:translateY(0); }
  .gallery-bottom { margin-top:4px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:4px; }

  /* ── HOURS ── */
  .hours-section { background:var(--ink); color:#fff; }
  .hours-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
  .hours-table { margin-top:40px; }
  .hours-row {
    display:flex; justify-content:space-between; align-items:center;
    padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.08);
    transition:background 0.3s; position:relative;
  }
  .hours-row.today::before {
    content:''; position:absolute; left:-24px; top:50%; transform:translateY(-50%);
    width:6px; height:6px; background:var(--gold); border-radius:50%;
  }
  .hours-day { font-size:12px; letter-spacing:0.12em; text-transform:uppercase; font-weight:300; color:rgba(255,255,255,0.7); }
  .hours-time { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:300; }
  .hours-row.closed .hours-time { color:var(--muted); font-size:14px; font-family:'Jost',sans-serif; letter-spacing:0.1em; }
  .hours-row.today .hours-day, .hours-row.today .hours-time { color:#fff; }
  .hours-info { padding-top:40px; }
  .hours-info .section-title { color:#fff; }
  .info-cards { display:flex; flex-direction:column; gap:2px; margin-top:40px; }
  .info-card {
    background:rgba(255,255,255,0.04); padding:28px 32px;
    border-left:2px solid transparent; transition:all 0.3s;
    display:flex; gap:20px; align-items:flex-start;
  }
  .info-card:hover { border-left-color:var(--gold); background:rgba(255,255,255,0.07); }
  .info-icon { font-size:20px; flex-shrink:0; margin-top:2px; }
  .info-label { font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); margin-bottom:8px; display:block; }
  .info-value { font-size:15px; color:rgba(255,255,255,0.85); font-weight:300; line-height:1.6; }
  .info-value a { color:inherit; text-decoration:none; transition:color 0.3s; }
  .info-value a:hover { color:var(--gold2); }

  /* ── MAP ── */
  .map-section { background:var(--warm); }
  .map-wrap { margin-top:60px; position:relative; overflow:hidden; }
  .map-wrap iframe { width:100%; height:480px; border:none; display:block; filter:saturate(0.6) contrast(1.05); }
  .map-card {
    position:absolute; top:40px; left:40px;
    background:#fff; padding:32px; max-width:280px;
    box-shadow:0 20px 60px rgba(26,23,20,0.12);
  }
  .map-card-title { font-family:'Cormorant Garamond',serif; font-size:22px; margin-bottom:16px; }
  .map-card-addr { font-size:13px; color:var(--muted); font-weight:300; line-height:1.7; margin-bottom:20px; }
  .map-card-link {
    font-size:10px; letter-spacing:0.25em; text-transform:uppercase;
    color:var(--gold); text-decoration:none; font-weight:400;
    display:flex; align-items:center; gap:8px;
    transition:gap 0.3s;
  }
  .map-card-link:hover { gap:14px; }

  /* ── WALKIN SECTION ── */
  .walkin-section { background: var(--ink); }
  .walkin-inner {
    max-width:900px; margin:0 auto; text-align:center; padding:0 24px;
  }
  .walkin-steps {
    display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:60px;
  }
  .walkin-step {
    background:rgba(255,255,255,0.04); padding:48px 32px; text-align:left;
    position:relative; transition:background 0.3s;
  }
  .walkin-step:hover { background:rgba(255,255,255,0.07); }
  .step-num {
    font-family:'Cormorant Garamond',serif; font-size:80px; font-weight:300;
    color:rgba(184,151,90,0.15); line-height:1; position:absolute;
    top:16px; right:20px;
  }
  .step-icon { font-size:28px; margin-bottom:24px; display:block; }
  .step-title { font-family:'Cormorant Garamond',serif; font-size:22px; color:#fff; margin-bottom:12px; }
  .step-desc { font-size:13px; font-weight:300; color:rgba(255,255,255,0.55); line-height:1.8; }

  /* ── SOCIAL ── */
  .social-section { background:var(--cream); }
  .social-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:60px; }
  .social-card {
    background:var(--ivory); padding:52px 40px;
    display:flex; flex-direction:column; align-items:center; gap:20px;
    text-decoration:none; color:var(--ink); text-align:center;
    transition:all 0.4s cubic-bezier(0.16,1,0.3,1); position:relative; overflow:hidden;
  }
  .social-card::before {
    content:''; position:absolute; inset:0;
    background: var(--gold); opacity:0; transition:opacity 0.4s;
  }
  .social-card:hover::before { opacity:1; }
  .social-card:hover { color:#fff; transform:translateY(-4px); box-shadow:0 20px 60px rgba(184,151,90,0.25); }
  .social-card > * { position:relative; z-index:1; }
  .social-icon { font-size:32px; line-height:1; }
  .social-platform { font-size:9px; letter-spacing:0.35em; text-transform:uppercase; font-weight:400; }
  .social-handle { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:300; }
  .social-cta {
    font-size:10px; letter-spacing:0.2em; text-transform:uppercase; font-weight:300;
    opacity:0.6; transition:opacity 0.3s;
  }
  .social-card:hover .social-cta { opacity:1; }

  /* ── FOOTER ── */
  .footer {
    background:var(--ink); color:#fff;
    padding:80px 48px 40px;
  }
  .footer-grid {
    max-width:1200px; margin:0 auto;
    display:grid; grid-template-columns:1.5fr 1fr 1fr 1fr; gap:60px;
    padding-bottom:60px; border-bottom:1px solid rgba(255,255,255,0.08);
  }
  .footer-brand .nav-logo { color:#fff; font-size:26px; }
  .footer-brand .nav-logo span { color:var(--gold); }
  .footer-tagline { font-size:13px; font-weight:300; color:rgba(255,255,255,0.5); line-height:1.8; margin-top:20px; }
  .footer-social-links { display:flex; gap:12px; margin-top:28px; }
  .footer-social {
    width:40px; height:40px; border:1px solid rgba(255,255,255,0.15);
    display:flex; align-items:center; justify-content:center;
    color:rgba(255,255,255,0.6); text-decoration:none; font-size:16px;
    transition:all 0.3s;
  }
  .footer-social:hover { border-color:var(--gold); background:var(--gold); color:#fff; transform:translateY(-3px); }
  .footer-col h4 {
    font-size:9px; letter-spacing:0.35em; text-transform:uppercase;
    color:var(--gold); margin-bottom:24px; font-family:'Jost',sans-serif; font-weight:400;
  }
  .footer-col ul { list-style:none; display:flex; flex-direction:column; gap:12px; }
  .footer-col ul li a {
    font-size:13px; color:rgba(255,255,255,0.55); text-decoration:none;
    font-weight:300; transition:color 0.3s; letter-spacing:0.03em;
  }
  .footer-col ul li a:hover { color:var(--gold2); }
  .footer-col p { font-size:13px; color:rgba(255,255,255,0.55); font-weight:300; line-height:1.8; }
  .footer-col p a { color:rgba(255,255,255,0.55); text-decoration:none; transition:color 0.3s; }
  .footer-col p a:hover { color:var(--gold2); }
  .footer-bottom {
    max-width:1200px; margin:0 auto; padding-top:32px;
    display:flex; justify-content:space-between; align-items:center;
    font-size:11px; color:rgba(255,255,255,0.3); font-weight:300; letter-spacing:0.05em;
    flex-wrap:wrap; gap:16px;
  }

  /* ── MOBILE NAV MENU ── */
  .mobile-menu {
    position:fixed; top:0; right:0; bottom:0; width:300px;
    background:var(--cream); z-index:999; padding:80px 40px 40px;
    transform:translateX(100%); transition:transform 0.5s cubic-bezier(0.16,1,0.3,1);
    display:flex; flex-direction:column; gap:32px;
    border-left:1px solid var(--border);
    box-shadow:-20px 0 60px rgba(26,23,20,0.08);
  }
  .mobile-menu.open { transform:translateX(0); }
  .mobile-menu a {
    font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:300;
    color:var(--ink); text-decoration:none; letter-spacing:0.02em;
    transition:color 0.3s; border-bottom:1px solid var(--border); padding-bottom:16px;
  }
  .mobile-menu a:hover { color:var(--gold); }
  .mobile-overlay {
    position:fixed; inset:0; background:rgba(26,23,20,0.5); z-index:998;
    opacity:0; pointer-events:none; transition:opacity 0.4s;
    backdrop-filter:blur(4px);
  }
  .mobile-overlay.open { opacity:1; pointer-events:all; }

  /* ── SCROLL REVEAL ── */
  .reveal {
    opacity:0; transform:translateY(40px);
    transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-delay-1 { transition-delay:0.1s; }
  .reveal-delay-2 { transition-delay:0.2s; }
  .reveal-delay-3 { transition-delay:0.3s; }
  .reveal-delay-4 { transition-delay:0.4s; }

  /* ── RESPONSIVE ── */
  @media (max-width:1024px) {
    .story-grid { grid-template-columns:1fr; gap:60px; }
    .hours-grid { grid-template-columns:1fr; gap:60px; }
    .footer-grid { grid-template-columns:1fr 1fr; gap:40px; }
    .gallery-grid { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
    .gallery-item:first-child { grid-row:span 1; }
  }
  @media (max-width:768px) {
    .section, .section-sm { padding:80px 24px; }
    .navbar { padding:20px 24px; }
    .navbar.scrolled { padding:14px 24px; }
    .nav-links, .nav-cta { display:none; }
    .hamburger { display:flex; }
    .services-grid { grid-template-columns:1fr; }
    .walkin-steps { grid-template-columns:1fr; }
    .social-grid { grid-template-columns:1fr; }
    .footer-grid { grid-template-columns:1fr; gap:40px; }
    .footer { padding:60px 24px 32px; }
    .map-card { position:static; max-width:100%; margin-bottom:0; }
    .story-img-accent { display:none; }
    .story-badge { display:none; }
    .hero-btns { flex-direction:column; align-items:center; }
    .services-header { flex-direction:column; align-items:flex-start; }
    .footer-bottom { flex-direction:column; align-items:flex-start; }
    .gallery-grid { grid-template-columns:1fr; }
    .gallery-bottom { grid-template-columns:1fr; }
    .story-stats { flex-wrap:wrap; gap:24px; }
  }
`;

// ─── DATA ───────────────────────────────────────────────────────────────────
const services = [
  { id:"01", name:"Haircut", desc:"Precision cut tailored to your face shape and style vision", price:"$17 – $50", category:"cuts" },
  { id:"02", name:"Shampoo, Blowout & Style", desc:"With Scalp & Shoulder Massage — ultimate relaxation and style", price:"$45 – $55", category:"styling" },
  { id:"03", name:"Shampoo, Cut, Blowout & Style", desc:"Full-service experience with Scalp & Shoulder Massage included", price:"$60 – $70", category:"styling" },
  { id:"04", name:"Color Retouch", desc:"Seamless root touch-up to maintain your signature color", price:"$65 – $85", category:"color" },
  { id:"05", name:"Full Coloring", desc:"Complete color transformation in any shade you desire", price:"$95 – $150", category:"color" },
  { id:"06", name:"Highlights", desc:"Dimensional lighting to add depth, brightness, and movement", price:"$130 – $180", category:"color" },
  { id:"07", name:"Basic Perm", desc:"Classic wave structure for lasting texture and body", price:"$110 – $180", category:"treatments" },
  { id:"08", name:"Digital Perm", desc:"Modern heat-activated waves for soft, natural-looking curls", price:"$200 – $250", category:"treatments" },
  { id:"09", name:"Thermal Ionic Straight Perm", desc:"Advanced straightening for sleek, frizz-free, silky results", price:"$260 – $320", category:"treatments" },
  { id:"10", name:"Keratin Complex (Brazilian)", desc:"Luxury smoothing treatment for manageable, glossy hair", price:"$240 – $280", category:"treatments" },
  { id:"11", name:"Deep Treatment", desc:"Intensive repair and hydration mask for restored vitality", price:"$75 – $90", category:"treatments" },
];

const hours = [
  { day:"Monday",    time:"10:00 AM – 8:00 PM",   open:true,  dayNum:1 },
  { day:"Tuesday",   time:"Closed",                open:false, dayNum:2 },
  { day:"Wednesday", time:"10:00 AM – 8:00 PM",   open:true,  dayNum:3 },
  { day:"Thursday",  time:"10:00 AM – 8:00 PM",   open:true,  dayNum:4 },
  { day:"Friday",    time:"9:30 AM – 8:30 PM",    open:true,  dayNum:5 },
  { day:"Saturday",  time:"9:30 AM – 8:30 PM",    open:true,  dayNum:6 },
  { day:"Sunday",    time:"10:00 AM – 8:00 PM",   open:true,  dayNum:0 },
];

const galleryImages = [
  { src:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80", label:"Precision Cuts" },
  { src:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", label:"Color Artistry" },
  { src:"https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80", label:"Blowout & Style" },
  { src:"https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80", label:"Men's Grooming" },
  { src:"https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80", label:"Highlights" },
  { src:"https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80", label:"Keratin" },
  { src:"https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80", label:"Salon Atmosphere" },
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────
function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const navTo = (id) => { setMenuOpen(false); setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'}),300); };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-logo" onClick={e=>{e.preventDefault();navTo('home');}}>
          Mian Tian Sing
          <span>Hair Salon — Est. NYC</span>
        </a>
        <ul className="nav-links">
          {[['story','Our Story'],['services','Services'],['gallery','Gallery'],['hours','Hours'],['location','Location']].map(([id,label])=>(
            <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();navTo(id);}}>{label}</a></li>
          ))}
        </ul>
        <a href="tel:9173535985" className="nav-cta">917-353-5985</a>
        <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{transform: menuOpen?'rotate(45deg) translate(4px,5px)':'none'}}/>
          <span style={{opacity: menuOpen?0:1}}/>
          <span style={{transform: menuOpen?'rotate(-45deg) translate(4px,-5px)':'none'}}/>
        </button>
      </nav>
      <div className={`mobile-overlay ${menuOpen?'open':''}`} onClick={()=>setMenuOpen(false)}/>
      <div className={`mobile-menu ${menuOpen?'open':''}`}>
        {[['home','Home'],['story','Our Story'],['services','Services'],['gallery','Gallery'],['hours','Hours'],['location','Location']].map(([id,label])=>(
          <a key={id} href={`#${id}`} onClick={e=>{e.preventDefault();navTo(id);}}>{label}</a>
        ))}
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"/>
      <div className="hero-grid"/>
      <div className="hero-photos">
        <div className="hero-photo-strip">
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80" alt="Salon"/>
          <div className="hero-overlay"/>
        </div>
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">170 Canal Street, New York City</p>
        <h1 className="hero-title">
          Mian<br/><em>Tian Sing</em>
        </h1>
        <p className="hero-title-sub">Hair Salon</p>
        <div className="hero-divider"/>
        <p className="hero-desc">
          Premium hair services for every style and every individual.
          Walk in, take your number, and let our expert stylists transform your look.
        </p>
        <div className="hero-btns">
          <a href="#services" className="btn-primary" onClick={e=>{e.preventDefault();document.getElementById('services')?.scrollIntoView({behavior:'smooth'});}}>
            View Services
          </a>
          <a href="#location" className="btn-outline" onClick={e=>{e.preventDefault();document.getElementById('location')?.scrollIntoView({behavior:'smooth'});}}>
            Find Us
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"/>
        <span>Scroll</span>
      </div>
    </section>
  );
}

function WalkinBanner() {
  const items = ["Walk-ins Welcome","No Appointment Needed","Take a Number & Relax","Expert Stylists","All Genders Served","Canal Street NYC","Premium Hair Care","Open 6 Days a Week"];
  const doubled = [...items,...items];
  return (
    <div className="walkin-banner">
      <div className="walkin-ticker">
        {doubled.map((t,i)=>(
          <div key={i} className="walkin-item">
            <span className="walkin-dot"/>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Story() {
  return (
    <section className="section" id="story">
      <div className="section-inner">
        <div className="story-grid">
          <div className="story-img-wrap reveal">
            <img className="story-img-main" src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=700&q=80" alt="Salon Interior"/>
            <img className="story-img-accent" src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80" alt="Stylist at Work"/>
            <div className="story-badge">
              <span className="story-badge-num">★★★★★</span>
              <span className="story-badge-txt">Top Rated<br/>NYC Salon</span>
            </div>
          </div>
          <div className="story-text">
            <span className="section-label reveal">Our Story</span>
            <h2 className="section-title reveal reveal-delay-1">
              Where <em>Craft</em><br/>Meets Character
            </h2>
            <div className="section-rule reveal reveal-delay-2"/>
            <p className="reveal reveal-delay-2">
              Nestled on the second floor of 170 Canal Street, Mian Tian Sing is a sanctuary of style
              in the heart of Manhattan's Chinatown. We believe great hair shouldn't require
              weeks of waiting or complicated booking systems.
            </p>
            <p className="reveal reveal-delay-3">
              Simply walk in, take a number, and let our experienced stylists work their magic.
              We serve clients of all genders with a full range of services — from precision cuts
              to advanced chemical treatments and everything in between.
            </p>
            <div className="story-stats reveal reveal-delay-3">
              <div className="stat-item">
                <span className="stat-num">11+</span>
                <span className="stat-label">Services Offered</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">6</span>
                <span className="stat-label">Days a Week</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">0</span>
                <span className="stat-label">Appointments Needed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const cats = [
    {id:'all', label:'All Services'},
    {id:'cuts', label:'Cuts'},
    {id:'styling', label:'Styling'},
    {id:'color', label:'Color'},
    {id:'treatments', label:'Treatments'},
  ];
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? services : services.filter(s=>s.category===active);
  return (
    <section className="section services-bg" id="services">
      <div className="section-inner">
        <div className="services-header">
          <div>
            <span className="section-label reveal">Service Menu</span>
            <h2 className="section-title reveal reveal-delay-1">Our <em>Expertise</em></h2>
            <p className="section-subtitle reveal reveal-delay-2">Professional hair services priced for quality and value. All services include our signature attention to detail.</p>
          </div>
          <div className="service-tabs reveal reveal-delay-2">
            {cats.map(c=>(
              <button key={c.id} className={`service-tab ${active===c.id?'active':''}`} onClick={()=>setActive(c.id)}>{c.label}</button>
            ))}
          </div>
        </div>
        <div className="services-grid">
          {filtered.map((s,i)=>(
            <div key={s.id} className="service-card reveal" style={{transitionDelay:`${i*0.05}s`}}>
              <span className="service-card-num">— {s.id}</span>
              <h3 className="service-card-name">{s.name}</h3>
              <p className="service-card-desc">{s.desc}</p>
              <div className="service-card-price">{s.price} <span>/ per service</span></div>
            </div>
          ))}
        </div>
        <div className="service-note reveal">
          <span className="service-note-icon"></span>
          <p className="service-note-text">
            <strong>Walk-ins only — no appointment needed.</strong> Simply visit us at 170 Canal St, 2nd Floor, take a ticket number, 
            relax, and you'll be called when your stylist is ready. Easy, effortless, and always welcoming.
          </p>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section" id="gallery">
      <div className="section-inner">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'24px'}}>
          <div>
            <span className="section-label reveal">Portfolio</span>
            <h2 className="section-title reveal reveal-delay-1">Our <em>Work</em></h2>
          </div>
          <p className="section-subtitle reveal reveal-delay-2" style={{marginTop:0}}>
            Every style tells a story. Every client leaves transformed.
          </p>
        </div>
        <div className="gallery-grid reveal">
          {galleryImages.slice(0,3).map((img,i)=>(
            <div key={i} className="gallery-item" style={{aspectRatio: i===0?'3/4':'4/3'}}>
              <img src={img.src} alt={img.label} loading="lazy"/>
              <div className="gallery-item-overlay">
                <span className="gallery-item-label">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-bottom reveal reveal-delay-1">
          {galleryImages.slice(3,7).map((img,i)=>(
            <div key={i} className="gallery-item" style={{aspectRatio:'4/3', display: i===3 ? 'block' : 'block'}}>
              <img src={img.src} alt={img.label} loading="lazy"/>
              <div className="gallery-item-overlay">
                <span className="gallery-item-label">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HoursSection() {
  const today = new Date().getDay();
  return (
    <section className="section hours-section" id="hours">
      <div className="section-inner">
        <div className="hours-grid">
          <div>
            <span className="section-label reveal" style={{color:'var(--gold2)'}}>Opening Hours</span>
            <h2 className="section-title reveal reveal-delay-1" style={{color:'#fff'}}>We're<br/><em>Open</em></h2>
            <div className="hours-table">
              {hours.map((h,i)=>(
                <div key={h.day} className={`hours-row ${!h.open?'closed':''} ${h.dayNum===today?'today':''} reveal`} style={{transitionDelay:`${i*0.07}s`}}>
                  <span className="hours-day">{h.day} {h.dayNum===today && <span style={{fontSize:'8px',background:'var(--gold)',color:'#fff',padding:'2px 8px',marginLeft:'8px',letterSpacing:'0.15em'}}>TODAY</span>}</span>
                  <span className="hours-time">{h.time}</span>
                </div>
              ))}
              <div className="hours-row reveal" style={{borderBottom:'none',opacity:0.6}}>
                <span className="hours-day">Federal Holidays</span>
                <span className="hours-time" style={{fontFamily:'Jost',fontSize:'13px',color:'var(--muted)'}}>Closed</span>
              </div>
            </div>
          </div>
          <div className="hours-info">
            <span className="section-label reveal" style={{color:'var(--gold2)'}}>Contact & Info</span>
            <h2 className="section-title reveal reveal-delay-1" style={{color:'#fff',fontSize:'clamp(28px,3vw,42px)'}}>Get in <em>Touch</em></h2>
            <div className="info-cards">
              {[
                {icon:'',label:'Address',value:<>170 Canal St, 2nd Floor<br/>New York, NY 10013</>},
                {icon:'',label:'Phone',value:<a href="tel:9173535985">917-353-5985</a>},
                {icon:'',label:'Walk-ins Only',value:<>No appointment needed<br/>Take a number at the door</>},
              ].map((c,i)=>(
                <div key={i} className={`info-card reveal reveal-delay-${i+1}`}>
                  <span className="info-icon">{c.icon}</span>
                  <div>
                    <span className="info-label">{c.label}</span>
                    <p className="info-value">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WalkinSection() {
  const steps = [
    {icon:'',title:'Walk In',desc:'No booking, no waiting lists. Simply arrive at 170 Canal St, 2nd Floor during our opening hours.'},
    {icon:'',title:'Take a Number',desc:'Grab your ticket at the door. Find a comfortable seat, relax, and enjoy the atmosphere.'},
    {icon:'',title:'Get Called',desc:'When your stylist is ready, you\'ll be called. Then sit back and let the transformation begin.'},
  ];
  return (
    <section className="section walkin-section" id="walkin">
      <div className="walkin-inner">
        <span className="section-label reveal" style={{color:'var(--gold2)'}}>How It Works</span>
        <h2 className="section-title reveal reveal-delay-1" style={{color:'#fff',textAlign:'center'}}>
          Simple as <em>One, Two, Three</em>
        </h2>
        <p className="section-subtitle reveal reveal-delay-2" style={{margin:'20px auto 0',textAlign:'center',color:'rgba(255,255,255,0.5)'}}>
          We believe premium hair care should be effortless. No apps, no deposits, no complicated scheduling.
        </p>
      </div>
      <div className="section-inner">
        <div className="walkin-steps">
          {steps.map((s,i)=>(
            <div key={i} className={`walkin-step reveal reveal-delay-${i+1}`}>
              <span className="step-num">0{i+1}</span>
              <span className="step-icon">{s.icon}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="section-sm map-section" id="location">
      <div className="section-inner">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'0',flexWrap:'wrap',gap:'24px'}}>
          <div>
            <span className="section-label reveal">Find Us</span>
            <h2 className="section-title reveal reveal-delay-1">Our <em>Location</em></h2>
          </div>
          <a href="https://maps.google.com/?q=170+Canal+St,+New+York,+NY+10013" target="_blank" rel="noreferrer" className="nav-cta reveal reveal-delay-2">Get Directions →</a>
        </div>
        <div className="map-wrap reveal" style={{marginTop:'48px'}}>
          <iframe
            title="Mian Tian Sing Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.8964873283127!2d-74.00207528459445!3d40.71842797933022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a199eff96b5%3A0x3efb49ab31cdec55!2s170+Canal+St%2C+New+York%2C+NY+10013!5e0!3m2!1sen!2sus!4v1648000000000!5m2!1sen!2sus"
            allowFullScreen loading="lazy"
          />
          <div className="map-card">
            <h3 className="map-card-title">Mian Tian Sing</h3>
            <p className="map-card-addr">170 Canal St, 2nd Floor<br/>New York, NY 10013<br/><br/>Chinatown, Manhattan</p>
            <a href="https://maps.google.com/?q=170+Canal+St,+New+York,+NY+10013" target="_blank" rel="noreferrer" className="map-card-link">
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Social() {
  const platforms = [
    {icon:'', platform:'Instagram', handle:'@miantiansinghair', url:'https://instagram.com', cta:'Follow our looks'},
    {icon:'', platform:'Facebook',  handle:'Mian Tian Sing',    url:'https://facebook.com', cta:'Like our page'},
    {icon:'', platform:'TikTok',    handle:'@miantiansinghair', url:'https://tiktok.com',   cta:'Watch our videos'},
  ];
  return (
    <section className="section social-section">
      <div className="section-inner">
        <div style={{textAlign:'center'}}>
          <span className="section-label reveal">Social Media</span>
          <h2 className="section-title reveal reveal-delay-1" style={{textAlign:'center'}}>Follow Our <em>Journey</em></h2>
          <p className="section-subtitle reveal reveal-delay-2" style={{margin:'20px auto 0',textAlign:'center'}}>
            Stay connected with our latest styles, transformations, and behind-the-scenes moments.
          </p>
        </div>
        <div className="social-grid">
          {platforms.map((p,i)=>(
            <a key={i} href={p.url} target="_blank" rel="noreferrer" className={`social-card reveal reveal-delay-${i+1}`}>
              <span className="social-icon">{p.icon}</span>
              <span className="social-platform">{p.platform}</span>
              <span className="social-handle">{p.handle}</span>
              <span className="social-cta">{p.cta} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#home" className="nav-logo" style={{color:'#fff'}}>
            Mian Tian Sing
            <span>Hair Salon — New York City</span>
          </a>
          <p className="footer-tagline">
            Premium hair services for all genders. Walk in, take your number,
            and leave looking extraordinary. No appointments, ever.
          </p>
          {/* <div className="footer-social-links">
            {[['Instagram','https://instagram.com'],['Facebook','https://facebook.com'],['TikTok','https://tiktok.com']].map(([icon,name,url])=>(
              <a key={name} href={url} target="_blank" rel="noreferrer" className="footer-social" title={name}>{icon}</a>
            ))}
          </div> */}
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {['Haircut','Color & Highlights','Perms & Straightening','Keratin Treatment','Deep Treatment','Blowout & Style'].map(s=>(
              <li key={s}><a href="#services" onClick={e=>{e.preventDefault();document.getElementById('services')?.scrollIntoView({behavior:'smooth'});}}>{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            {[['home','Home'],['story','Our Story'],['gallery','Gallery'],['hours','Hours'],['location','Location']].map(([id,label])=>(
              <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();document.getElementById(id)?.scrollIntoView({behavior:'smooth'});}}>{label}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>
            170 Canal St, 2nd Floor<br/>
            New York, NY 10013<br/><br/>
            <a href="tel:9173535985">917-353-5985</a><br/><br/>
            <strong style={{color:'var(--gold)',fontWeight:400,fontSize:'11px',letterSpacing:'0.1em'}}>Walk-ins Only</strong><br/>
            No appointment needed
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Mian Tian Sing Hair Salon. All rights reserved.</span>
        <span>170 Canal St, 2nd Floor · New York, NY 10013 · <a href="tel:9173535985" style={{color:'inherit',textDecoration:'none'}}>917-353-5985</a></span>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();

  // Inject styles once
  useEffect(() => {
    const id = 'mts-styles';
    if (!document.getElementById(id)) {
      const tag = document.createElement('style');
      tag.id = id; tag.textContent = css;
      document.head.appendChild(tag);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <WalkinBanner />
      <Story />
      <Services />
      <Gallery />
      <WalkinSection />
      <HoursSection />
      <Location />
      <Social />
      <Footer />
    </div>
  );
}