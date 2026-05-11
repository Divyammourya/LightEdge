

import React from "react";

function Pricing() {
  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-4 px-5">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See Pricing{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6  mb-5">
          <div className="row text-center">
            <div className="col p-3 border">
              <h1 className="mb-3">₹0</h1>
              <p>
                Free equity delivery and
                <br />
                direct mutual funds
              </p>
            </div>
            <div className="col p-3 border">
              <h1 className="mb-3">₹20</h1>
              <p>Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const pricingStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

//   .pricing-section *,
//   .pricing-section *::before,
//   .pricing-section *::after { box-sizing: border-box; }

//   .pricing-section {
//     font-family: 'DM Sans', sans-serif;
//     background: #f8faff;
//     padding: 96px 0 80px;
//     overflow: hidden;
//   }

//   .pricing-inner {
//     max-width: 1160px;
//     margin: 0 auto;
//     padding: 0 40px;
//   }

//   /* ── Header ── */
//   .pricing-header {
//     text-align: center;
//     margin-bottom: 52px;
//   }

//   .pricing-tag {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 0.75rem;
//     font-weight: 700;
//     color: #387ed1;
//     text-transform: uppercase;
//     letter-spacing: 0.08em;
//     margin-bottom: 14px;
//   }

//   .pricing-tag::before, .pricing-tag::after {
//     content: '';
//     display: inline-block;
//     width: 20px;
//     height: 2px;
//     background: #387ed1;
//     border-radius: 2px;
//   }

//   .pricing-headline {
//     font-family: 'Instrument Serif', Georgia, serif;
//     font-size: clamp(2rem, 3.5vw, 3rem);
//     font-weight: 400;
//     color: #0f172a;
//     line-height: 1.15;
//     margin: 0 0 14px;
//   }

//   .pricing-headline em {
//     font-style: italic;
//     color: #387ed1;
//   }

//   .pricing-subtext {
//     font-size: 1rem;
//     color: #64748b;
//     max-width: 500px;
//     margin: 0 auto 32px;
//     line-height: 1.65;
//   }

//   /* ── Tab toggle ── */
//   .pricing-tabs {
//     display: inline-flex;
//     background: #e8eef8;
//     border-radius: 12px;
//     padding: 4px;
//     gap: 2px;
//   }

//   .pricing-tab-btn {
//     padding: 9px 22px;
//     border-radius: 9px;
//     border: none;
//     cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.88rem;
//     font-weight: 600;
//     color: #64748b;
//     background: transparent;
//     transition: all 0.2s ease;
//   }

//   .pricing-tab-btn.active {
//     background: #fff;
//     color: #0f172a;
//     box-shadow: 0 2px 8px rgba(15,23,42,0.10);
//   }

//   /* ── Cards grid ── */
//   .pricing-cards {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 20px;
//     margin-bottom: 52px;
//   }

//   .pricing-card {
//     background: #fff;
//     border-radius: 20px;
//     padding: 32px 28px;
//     border: 1.5px solid #e8eef8;
//     display: flex;
//     flex-direction: column;
//     gap: 0;
//     transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
//     position: relative;
//   }

//   .pricing-card:hover {
//     border-color: rgba(56,126,209,0.3);
//     box-shadow: 0 12px 40px rgba(56,126,209,0.10);
//     transform: translateY(-3px);
//   }

//   .pricing-card.featured {
//     background: #0f172a;
//     border-color: #0f172a;
//   }

//   .pricing-card.featured:hover {
//     border-color: #387ed1;
//     box-shadow: 0 12px 40px rgba(56,126,209,0.25);
//   }

//   .pricing-card-badge {
//     position: absolute;
//     top: -12px;
//     left: 50%;
//     transform: translateX(-50%);
//     background: #387ed1;
//     color: #fff;
//     font-size: 0.7rem;
//     font-weight: 800;
//     letter-spacing: 0.07em;
//     text-transform: uppercase;
//     padding: 4px 14px;
//     border-radius: 999px;
//     white-space: nowrap;
//   }

//   .pricing-card-icon {
//     font-size: 1.5rem;
//     margin-bottom: 14px;
//   }

//   .pricing-card-name {
//     font-size: 0.8rem;
//     font-weight: 700;
//     color: #94a3b8;
//     text-transform: uppercase;
//     letter-spacing: 0.07em;
//     margin-bottom: 8px;
//   }

//   .pricing-card.featured .pricing-card-name {
//     color: #64748b;
//   }

//   .pricing-card-amount {
//     display: flex;
//     align-items: baseline;
//     gap: 4px;
//     margin-bottom: 8px;
//   }

//   .pricing-card-currency {
//     font-size: 1.4rem;
//     font-weight: 700;
//     color: #0f172a;
//   }

//   .pricing-card.featured .pricing-card-currency {
//     color: #fff;
//   }

//   .pricing-card-number {
//     font-size: 3.2rem;
//     font-weight: 800;
//     color: #0f172a;
//     line-height: 1;
//   }

//   .pricing-card.featured .pricing-card-number {
//     color: #fff;
//   }

//   .pricing-card-number.accent {
//     color: #387ed1;
//   }

//   .pricing-card.featured .pricing-card-number.accent {
//     color: #60a5fa;
//   }

//   .pricing-card-desc {
//     font-size: 0.85rem;
//     color: #64748b;
//     line-height: 1.55;
//     margin-bottom: 24px;
//     flex: 1;
//   }

//   .pricing-card.featured .pricing-card-desc {
//     color: #94a3b8;
//   }

//   .pricing-card-divider {
//     height: 1px;
//     background: #f1f5f9;
//     margin-bottom: 18px;
//   }

//   .pricing-card.featured .pricing-card-divider {
//     background: rgba(255,255,255,0.08);
//   }

//   .pricing-card-features {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     margin-bottom: 26px;
//   }

//   .pricing-card-feature {
//     display: flex;
//     align-items: flex-start;
//     gap: 8px;
//     font-size: 0.83rem;
//     color: #334155;
//   }

//   .pricing-card.featured .pricing-card-feature {
//     color: #cbd5e1;
//   }

//   .pricing-card-feature-check {
//     width: 16px;
//     height: 16px;
//     border-radius: 50%;
//     background: #dcfce7;
//     color: #16a34a;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 0.6rem;
//     font-weight: 900;
//     flex-shrink: 0;
//     margin-top: 1px;
//   }

//   .pricing-card.featured .pricing-card-feature-check {
//     background: rgba(56,126,209,0.2);
//     color: #60a5fa;
//   }

//   .pricing-card-cta {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 6px;
//     padding: 12px;
//     border-radius: 11px;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.9rem;
//     font-weight: 700;
//     text-decoration: none;
//     cursor: pointer;
//     border: 1.5px solid #e2e8f0;
//     background: transparent;
//     color: #0f172a;
//     transition: all 0.2s ease;
//     width: 100%;
//   }

//   .pricing-card-cta:hover {
//     background: #f8faff;
//     border-color: #387ed1;
//     color: #387ed1;
//     text-decoration: none;
//   }

//   .pricing-card.featured .pricing-card-cta {
//     background: #387ed1;
//     border-color: #387ed1;
//     color: #fff;
//   }

//   .pricing-card.featured .pricing-card-cta:hover {
//     background: #2563b0;
//     text-decoration: none;
//     color: #fff;
//   }

//   /* ── Bottom note ── */
//   .pricing-note {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     background: #fff;
//     border-radius: 16px;
//     border: 1.5px solid #e8eef8;
//     padding: 24px 32px;
//     gap: 24px;
//     flex-wrap: wrap;
//   }

//   .pricing-note-text {
//     font-size: 0.9rem;
//     color: #475569;
//     line-height: 1.6;
//     flex: 1;
//     min-width: 240px;
//   }

//   .pricing-note-text strong {
//     color: #0f172a;
//     font-weight: 700;
//   }

//   .pricing-note-link {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 0.88rem;
//     font-weight: 700;
//     color: #387ed1;
//     text-decoration: none;
//     white-space: nowrap;
//     transition: gap 0.2s ease;
//   }

//   .pricing-note-link:hover {
//     gap: 10px;
//     text-decoration: none;
//     color: #387ed1;
//   }

//   /* ── Mobile ── */
//   @media (max-width: 900px) {
//     .pricing-section { padding: 64px 0 56px; }
//     .pricing-inner { padding: 0 22px; }
//     .pricing-cards { grid-template-columns: 1fr; max-width: 400px; margin-left: auto; margin-right: auto; }
//   }

//   @media (max-width: 480px) {
//     .pricing-inner { padding: 0 16px; }
//     .pricing-tabs { width: 100%; justify-content: center; }
//     .pricing-tab-btn { flex: 1; text-align: center; }
//     .pricing-note { flex-direction: column; text-align: center; }
//     .pricing-note-link { justify-content: center; }
//   }
// `;

// const SEGMENT_DATA = {
//   equity: {
//     cards: [
//       {
//         icon: "🎁",
//         name: "Delivery",
//         amount: "0",
//         accent: true,
//         currency: "₹",
//         desc: "Absolutely zero brokerage on equity delivery trades and direct mutual fund investments.",
//         features: [
//           "Buy & hold stocks forever",
//           "Direct MF investments",
//           "Zero hidden charges",
//           "BSE + NSE access",
//         ],
//         cta: "Start investing free",
//         ctaHref: "/signup",
//       },
//       {
//         icon: "⚡",
//         name: "Intraday",
//         amount: "20",
//         accent: false,
//         currency: "₹",
//         desc: "Flat ₹20 per executed order on intraday trades — no percentage nonsense, ever.",
//         features: [
//           "Flat fee regardless of size",
//           "Same-day settlement",
//           "Advanced charting tools",
//           "Margin trading support",
//         ],
//         cta: "Open account",
//         ctaHref: "/signup",
//         featured: true,
//         badge: "Most popular",
//       },
//       {
//         icon: "📊",
//         name: "F&O",
//         amount: "20",
//         accent: false,
//         currency: "₹",
//         desc: "Flat ₹20 or 0.03% (whichever is lower) on futures and options trades.",
//         features: [
//           "Equity & Index F&O",
//           "Options strategy builder",
//           "Real-time Greeks",
//           "Instant margin updates",
//         ],
//         cta: "Explore F&O",
//         ctaHref: "/product",
//       },
//     ],
//   },
//   commodity: {
//     cards: [
//       {
//         icon: "🌾",
//         name: "Commodities",
//         amount: "20",
//         accent: false,
//         currency: "₹",
//         desc: "Flat ₹20 per executed order on MCX commodity futures and options.",
//         features: [
//           "Gold, Silver, Crude Oil",
//           "MCX & NCDEX access",
//           "Live commodity charts",
//           "Overnight positions",
//         ],
//         cta: "Trade commodities",
//         ctaHref: "/signup",
//         featured: true,
//         badge: "MCX access",
//       },
//       {
//         icon: "🏦",
//         name: "Currency",
//         amount: "20",
//         accent: false,
//         currency: "₹",
//         desc: "Trade USD, EUR, GBP, JPY pairs on NSE-CDS at flat ₹20 per order.",
//         features: [
//           "Major & cross currency pairs",
//           "Forex hedging support",
//           "NSE-CDS certified",
//           "Daily settlement",
//         ],
//         cta: "Trade forex",
//         ctaHref: "/signup",
//       },
//       {
//         icon: "🏛️",
//         name: "Bonds & G-Sec",
//         amount: "0",
//         accent: true,
//         currency: "₹",
//         desc: "Zero brokerage on government securities and RBI bonds — the safest investments.",
//         features: [
//           "RBI Retail Direct bonds",
//           "SGBs (Sovereign Gold)",
//           "T-Bills & G-Secs",
//           "Tax-free bonds",
//         ],
//         cta: "Invest in bonds",
//         ctaHref: "/signup",
//       },
//     ],
//   },
// };

// function Pricing() {
//   const [activeTab, setActiveTab] = useState("equity");
//   const data = SEGMENT_DATA[activeTab];

//   return (
//     <>
//       <style>{pricingStyles}</style>
//       <section className="pricing-section">
//         <div className="pricing-inner">

//           {/* Header */}
//           <div className="pricing-header">
//             <div className="pricing-tag">Pricing</div>
//             <h2 className="pricing-headline">
//               Unbeatable <em>pricing,</em><br />
//               zero surprises
//             </h2>
//             <p className="pricing-subtext">
//               We pioneered discount broking in India. Flat fees, no percentage
//               charges, no hidden costs — ever.
//             </p>

//             {/* Tab toggle */}
//             <div className="pricing-tabs">
//               <button
//                 className={`pricing-tab-btn ${activeTab === "equity" ? "active" : ""}`}
//                 onClick={() => setActiveTab("equity")}
//               >
//                 Equity
//               </button>
//               <button
//                 className={`pricing-tab-btn ${activeTab === "commodity" ? "active" : ""}`}
//                 onClick={() => setActiveTab("commodity")}
//               >
//                 Commodity / Currency
//               </button>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="pricing-cards">
//             {data.cards.map((card) => (
//               <div
//                 className={`pricing-card ${card.featured ? "featured" : ""}`}
//                 key={card.name}
//               >
//                 {card.badge && (
//                   <div className="pricing-card-badge">{card.badge}</div>
//                 )}
//                 <div className="pricing-card-icon">{card.icon}</div>
//                 <div className="pricing-card-name">{card.name}</div>

//                 <div className="pricing-card-amount">
//                   <span className="pricing-card-currency">{card.currency}</span>
//                   <span className={`pricing-card-number ${card.accent ? "accent" : ""}`}>
//                     {card.amount}
//                   </span>
//                 </div>

//                 <p className="pricing-card-desc">{card.desc}</p>

//                 <div className="pricing-card-divider" />

//                 <div className="pricing-card-features">
//                   {card.features.map((f) => (
//                     <div className="pricing-card-feature" key={f}>
//                       <span className="pricing-card-feature-check">✓</span>
//                       {f}
//                     </div>
//                   ))}
//                 </div>

//                 <Link to={card.ctaHref} className="pricing-card-cta">
//                   {card.cta} →
//                 </Link>
//               </div>
//             ))}
//           </div>

//           {/* Bottom note */}
//           <div className="pricing-note">
//             <p className="pricing-note-text">
//               <strong>Account opening is completely free.</strong> No annual maintenance
//               charges for the first year. DP charges of ₹15.93 per scrip only on
//               sell side delivery transactions — the only charge you'll ever see.
//             </p>
//             <Link to="/pricing" className="pricing-note-link">
//               See full pricing breakdown →
//             </Link>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }

// export default Pricing;