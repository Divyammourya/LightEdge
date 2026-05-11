
// import React from "react";

// function Hero() {
//   return (
//     <div className="container p-5 mb-5">
//       <div className="row text-center">
//         <img
//         style={{width:"75%", marginLeft:"13%", marginTop:"7%"}}
//           src="media/myImages/homeHero(2).png"
//           alt="Hero Image"
//           className="mb-5"
//         />
//         <h2 className="mt-5">Invest in everything</h2>
//         <p className="fs-5">
//           Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
//         </p>
//         <button
//           className="p-2 btn btn-primary fs-5 mt-4"
//           style={{ width: "20%", margin: "0 auto" }}
//         >
//           Sign up for free
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Hero;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const heroStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  /* ─── Reset for this section ─── */
  .hero-section *,
  .hero-section *::before,
  .hero-section *::after {
    box-sizing: border-box;
  }

  /* ─── Wrapper ─── */
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: #f0f4ff;
    overflow: hidden;
    padding: 100px 0 60px;
    font-family: 'DM Sans', sans-serif;
  }

  /* ─── Background decorative blobs ─── */
  .hero-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  .hero-blob-1 {
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, rgba(56, 126, 209, 0.18) 0%, transparent 70%);
    top: -120px;
    right: -80px;
  }

  .hero-blob-2 {
    width: 360px;
    height: 360px;
    background: radial-gradient(circle, rgba(29, 185, 84, 0.12) 0%, transparent 70%);
    bottom: -60px;
    left: 5%;
  }

  .hero-blob-3 {
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, rgba(56, 126, 209, 0.1) 0%, transparent 70%);
    top: 40%;
    left: 38%;
  }

  /* ─── Grid ─── */
  .hero-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 56px;
  }

  /* ─── LEFT ─── */
  .hero-left {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Badge */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(56, 126, 209, 0.1);
    border: 1px solid rgba(56, 126, 209, 0.22);
    color: #387ed1;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 999px;
    width: fit-content;
    margin-bottom: 22px;
    animation: heroBadgePop 0.5s ease both;
  }

  .hero-badge-dot {
    width: 7px;
    height: 7px;
    background: #387ed1;
    border-radius: 50%;
    animation: heroPulse 2s ease-in-out infinite;
  }

  @keyframes heroPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  @keyframes heroBadgePop {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Headline */
  .hero-headline {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(2.4rem, 4vw, 3.6rem);
    font-weight: 400;
    line-height: 1.12;
    color: #0f172a;
    margin: 0 0 18px;
    animation: heroFadeUp 0.6s ease 0.1s both;
  }

  .hero-headline em {
    font-style: italic;
    color: #387ed1;
  }

  .hero-headline strong {
    font-style: normal;
    font-weight: 400;
  }

  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Subtext */
  .hero-subtext {
    font-size: 1.05rem;
    color: #475569;
    line-height: 1.65;
    max-width: 460px;
    margin: 0 0 32px;
    font-weight: 400;
    animation: heroFadeUp 0.6s ease 0.2s both;
  }

  /* CTA Buttons */
  .hero-ctas {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    animation: heroFadeUp 0.6s ease 0.3s both;
    margin-bottom: 32px;
  }

  .hero-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #387ed1;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    padding: 14px 28px;
    border-radius: 12px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 18px rgba(56, 126, 209, 0.32);
  }

  .hero-btn-primary:hover {
    background: #2563b0;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(56, 126, 209, 0.42);
    color: #fff;
    text-decoration: none;
  }

  .hero-btn-primary:active {
    transform: translateY(0);
  }

  .hero-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    color: #387ed1;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    padding: 14px 28px;
    border-radius: 12px;
    text-decoration: none;
    border: 1.5px solid rgba(56, 126, 209, 0.35);
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.18s ease;
  }

  .hero-btn-secondary:hover {
    border-color: #387ed1;
    background: rgba(56, 126, 209, 0.05);
    transform: translateY(-2px);
    color: #387ed1;
    text-decoration: none;
  }

  .hero-btn-arrow {
    font-size: 1rem;
    transition: transform 0.2s ease;
  }

  .hero-btn-secondary:hover .hero-btn-arrow {
    transform: translateX(3px);
  }

  /* Trust row */
  .hero-trust {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    animation: heroFadeUp 0.6s ease 0.4s both;
  }

  .hero-trust-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    color: #64748b;
    font-weight: 500;
  }

  .hero-trust-icon {
    width: 16px;
    height: 16px;
    background: #dcfce7;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    color: #16a34a;
    font-weight: 900;
    flex-shrink: 0;
  }

  /* ─── RIGHT ─── */
  .hero-right {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: heroFadeUp 0.7s ease 0.25s both;
  }

  /* ─── Card Wrapper ─── */
  .hero-card-wrap {
    position: relative;
    width: 100%;
    max-width: 400px;
  }

  /* Main card */
  .hero-card {
    background: #fff;
    border-radius: 20px;
    box-shadow:
      0 4px 6px rgba(15, 23, 42, 0.04),
      0 20px 60px rgba(15, 23, 42, 0.12);
    padding: 24px;
    position: relative;
    z-index: 2;
  }

  .hero-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f1f5f9;
  }

  .hero-card-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .hero-card-live {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    color: #16a34a;
    font-weight: 700;
  }

  .hero-card-live-dot {
    width: 6px;
    height: 6px;
    background: #16a34a;
    border-radius: 50%;
    animation: heroPulse 1.5s ease-in-out infinite;
  }

  /* Stock rows */
  .hero-stock-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f8fafc;
    gap: 10px;
  }

  .hero-stock-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .hero-stock-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .hero-stock-name {
    font-size: 0.88rem;
    font-weight: 700;
    color: #0f172a;
  }

  .hero-stock-sub {
    font-size: 0.72rem;
    color: #94a3b8;
    font-weight: 500;
  }

  .hero-stock-mid {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
  }

  .hero-mini-chart {
    width: 70px;
    height: 28px;
    flex-shrink: 0;
  }

  .hero-stock-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    min-width: 80px;
  }

  .hero-stock-price {
    font-size: 0.9rem;
    font-weight: 700;
    color: #0f172a;
  }

  .hero-stock-change {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 999px;
  }

  .hero-stock-change.up {
    background: #dcfce7;
    color: #16a34a;
  }

  .hero-stock-change.down {
    background: #fee2e2;
    color: #dc2626;
  }

  /* Portfolio mini card (floating below-right) */
  .hero-portfolio-card {
    position: absolute;
    bottom: -22px;
    right: -20px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(15, 23, 42, 0.14);
    padding: 14px 18px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 160px;
    animation: heroFloatCard 3s ease-in-out infinite;
  }

  @keyframes heroFloatCard {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  .hero-portfolio-label {
    font-size: 0.68rem;
    color: #94a3b8;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .hero-portfolio-value {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
  }

  .hero-portfolio-pnl {
    font-size: 0.78rem;
    font-weight: 700;
    color: #16a34a;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  /* Fund mini card (floating top-left) */
  .hero-fund-card {
    position: absolute;
    top: -18px;
    left: -22px;
    background: #387ed1;
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(56, 126, 209, 0.3);
    padding: 12px 16px;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: heroFloatCardAlt 3.5s ease-in-out infinite;
  }

  @keyframes heroFloatCardAlt {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  .hero-fund-icon {
    width: 34px;
    height: 34px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }

  .hero-fund-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .hero-fund-label {
    font-size: 0.65rem;
    color: rgba(255,255,255,0.75);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .hero-fund-value {
    font-size: 0.92rem;
    font-weight: 800;
    color: #fff;
  }

  /* ─── Ticker bar at bottom ─── */
  .hero-ticker-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(8px);
    border-top: 1px solid rgba(56, 126, 209, 0.1);
    padding: 10px 0;
    overflow: hidden;
    z-index: 2;
  }

  .hero-ticker-track {
    display: flex;
    gap: 0;
    animation: heroTickerScroll 25s linear infinite;
    white-space: nowrap;
  }

  @keyframes heroTickerScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .hero-ticker-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 28px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #334155;
    border-right: 1px solid #e2e8f0;
  }

  .hero-ticker-item span.up { color: #16a34a; }
  .hero-ticker-item span.down { color: #dc2626; }

  /* ─── MOBILE ─── */
  @media (max-width: 900px) {
    .hero-section {
      padding: 90px 0 80px;
      min-height: auto;
    }

    .hero-inner {
      grid-template-columns: 1fr;
      gap: 48px;
      padding: 0 22px;
      text-align: center;
    }

    .hero-left {
      align-items: center;
    }

    .hero-badge {
      margin-bottom: 18px;
    }

    .hero-headline {
      font-size: clamp(2rem, 8vw, 2.8rem);
    }

    .hero-subtext {
      max-width: 100%;
      font-size: 0.98rem;
    }

    .hero-ctas {
      justify-content: center;
    }

    .hero-trust {
      justify-content: center;
    }

    .hero-right {
      order: -1;
      padding-top: 10px;
    }

    .hero-card-wrap {
      max-width: 340px;
    }

    .hero-portfolio-card {
      right: -12px;
      bottom: -16px;
      min-width: 140px;
      padding: 12px 14px;
    }

    .hero-portfolio-value {
      font-size: 1.05rem;
    }

    .hero-fund-card {
      left: -12px;
      top: -14px;
      padding: 10px 12px;
    }

    .hero-blob-1 { width: 300px; height: 300px; }
    .hero-blob-2 { width: 220px; height: 220px; }
    .hero-blob-3 { display: none; }
  }

  @media (max-width: 480px) {
    .hero-inner {
      padding: 0 16px;
    }

    .hero-headline {
      font-size: 2rem;
    }

    .hero-ctas {
      flex-direction: column;
      width: 100%;
    }

    .hero-btn-primary,
    .hero-btn-secondary {
      width: 100%;
      justify-content: center;
    }

    .hero-card-wrap {
      max-width: 100%;
    }

    .hero-portfolio-card {
      right: 0px;
    }

    .hero-fund-card {
      left: 0px;
    }

    .hero-mini-chart {
      width: 52px;
    }
  }
`;

/* ── Inline mini sparkline SVG ── */
const SparkLine = ({ points, color, fill }) => {
  const w = 70, h = 28;
  const vals = points;
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;

  const coords = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });

  const polyline = coords.join(" ");

  const fillPath =
    `M0,${h} L` +
    coords.join(" L") +
    ` L${w},${h} Z`;

  return (
    <svg
      className="hero-mini-chart"
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {fill && (
        <path
          d={fillPath}
          fill={`url(#grad-${color.replace("#", "")})`}
        />
      )}
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* ── Ticker data (doubled for infinite scroll) ── */
const TICKER = [
  { name: "INFY", price: "1,847.50", change: "+2.34%", up: true },
  { name: "TCS", price: "3,924.00", change: "-0.87%", up: false },
  { name: "RELIANCE", price: "2,918.65", change: "+1.12%", up: true },
  { name: "WIPRO", price: "521.30", change: "+0.64%", up: true },
  { name: "HDFC", price: "1,672.80", change: "-1.23%", up: false },
  { name: "M&M", price: "2,845.90", change: "+3.07%", up: true },
  { name: "ONGC", price: "248.75", change: "-0.42%", up: false },
  { name: "HUL", price: "2,389.10", change: "+0.91%", up: true },
];

/* ── Stock data for the card ── */
const STOCKS = [
  {
    name: "INFY",
    sub: "Infosys Ltd.",
    price: "₹1,847.50",
    change: "+2.34%",
    up: true,
    points: [42, 38, 45, 40, 48, 44, 52, 50, 58, 55, 62],
  },
  {
    name: "RELIANCE",
    sub: "Reliance Industries",
    price: "₹2,918.65",
    change: "+1.12%",
    up: true,
    points: [55, 52, 57, 54, 56, 58, 55, 60, 58, 63, 61],
  },
  {
    name: "TCS",
    sub: "Tata Consultancy",
    price: "₹3,924.00",
    change: "-0.87%",
    up: false,
    points: [70, 72, 68, 74, 71, 69, 66, 68, 64, 62, 60],
  },
  {
    name: "WIPRO",
    sub: "Wipro Ltd.",
    price: "₹521.30",
    change: "+0.64%",
    up: true,
    points: [30, 28, 32, 29, 33, 31, 35, 33, 36, 34, 37],
  },
];

function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);

  /* cycle highlighted stock every 2s */
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % STOCKS.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{heroStyles}</style>

      <section className="hero-section">
        {/* Background blobs */}
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <div className="hero-inner">

          {/* ── LEFT ── */}
          <div className="hero-left">

            {/* Badge */}
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Trusted by 10 Lakh+ investors
            </div>

            {/* Headline */}
            <h1 className="hero-headline">
              Invest <em>smarter,</em><br />
              trade <em>faster.</em>
            </h1>

            {/* Subtext */}
            <p className="hero-subtext">
              LightEdge gives you the tools of a professional trader —
              live prices, instant execution, and full portfolio control —
              at zero brokerage on delivery.
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <Link to="/signup" className="hero-btn-primary">
                Open Free Account
                <span>→</span>
              </Link>
              <Link to="/product" className="hero-btn-secondary">
                See how it works
                <span className="hero-btn-arrow">↗</span>
              </Link>
            </div>

            {/* Trust row */}
            <div className="hero-trust">
              <span className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                No account fees
              </span>
              <span className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                ₹0 delivery brokerage
              </span>
              <span className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                2-minute signup
              </span>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="hero-right">
            <div className="hero-card-wrap">

              {/* Floating fund card (top-left) */}
              <div className="hero-fund-card">
                <div className="hero-fund-icon">💰</div>
                <div className="hero-fund-info">
                  <span className="hero-fund-label">Available Funds</span>
                  <span className="hero-fund-value">₹4,043.10</span>
                </div>
              </div>

              {/* Main stock card */}
              <div className="hero-card">
                <div className="hero-card-header">
                  <span className="hero-card-title">Watchlist</span>
                  <span className="hero-card-live">
                    <span className="hero-card-live-dot" />
                    Live prices
                  </span>
                </div>

                {STOCKS.map((stock, idx) => (
                  <div
                    className="hero-stock-row"
                    key={stock.name}
                    style={{
                      background: idx === activeIdx
                        ? "rgba(56,126,209,0.04)"
                        : "transparent",
                      borderRadius: "10px",
                      transition: "background 0.4s ease",
                      paddingLeft: "6px",
                      paddingRight: "6px",
                    }}
                  >
                    <div className="hero-stock-left">
                      <span className="hero-stock-name">{stock.name}</span>
                      <span className="hero-stock-sub">{stock.sub}</span>
                    </div>

                    <div className="hero-stock-mid">
                      <SparkLine
                        points={stock.points}
                        color={stock.up ? "#16a34a" : "#dc2626"}
                        fill
                      />
                    </div>

                    <div className="hero-stock-right">
                      <span className="hero-stock-price">{stock.price}</span>
                      <span className={`hero-stock-change ${stock.up ? "up" : "down"}`}>
                        {stock.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating portfolio card (bottom-right) */}
              <div className="hero-portfolio-card">
                <span className="hero-portfolio-label">Total Portfolio</span>
                <span className="hero-portfolio-value">₹2,14,850</span>
                <span className="hero-portfolio-pnl">
                  ▲ +₹12,340 &nbsp;(+6.1%)
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* ── Ticker bar ── */}
        <div className="hero-ticker-bar">
          <div className="hero-ticker-track">
            {[...TICKER, ...TICKER].map((item, idx) => (
              <span className="hero-ticker-item" key={idx}>
                <strong>{item.name}</strong>
                <span className={item.up ? "up" : "down"}>
                  {item.change}
                </span>
              </span>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}

export default Hero;