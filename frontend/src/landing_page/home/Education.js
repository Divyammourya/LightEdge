
import React from "react";

function Education() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src="media/images/education.svg" style={{ width: "70%" }} />
        </div>
        <div className="col-6">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            Versity <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <p className="mt-5">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            TradingQ&A <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;



// import React, { useState } from "react";

// const educationStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

//   .edu-section *,
//   .edu-section *::before,
//   .edu-section *::after { box-sizing: border-box; }

//   .edu-section {
//     font-family: 'DM Sans', sans-serif;
//     background: #fff;
//     padding: 96px 0 80px;
//     overflow: hidden;
//   }

//   .edu-inner {
//     max-width: 1160px;
//     margin: 0 auto;
//     padding: 0 40px;
//   }

//   /* ── Header ── */
//   .edu-header {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 48px;
//     align-items: end;
//     margin-bottom: 56px;
//   }

//   .edu-tag {
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

//   .edu-tag::before {
//     content: '';
//     display: inline-block;
//     width: 20px;
//     height: 2px;
//     background: #387ed1;
//     border-radius: 2px;
//   }

//   .edu-headline {
//     font-family: 'Instrument Serif', Georgia, serif;
//     font-size: clamp(2rem, 3vw, 2.8rem);
//     font-weight: 400;
//     color: #0f172a;
//     line-height: 1.18;
//     margin: 0;
//   }

//   .edu-headline em {
//     font-style: italic;
//     color: #387ed1;
//   }

//   .edu-header-right {
//     display: flex;
//     flex-direction: column;
//     gap: 14px;
//     justify-content: flex-end;
//   }

//   .edu-header-desc {
//     font-size: 0.95rem;
//     color: #475569;
//     line-height: 1.7;
//     margin: 0;
//   }

//   .edu-header-stats {
//     display: flex;
//     gap: 28px;
//     flex-wrap: wrap;
//   }

//   .edu-header-stat {
//     display: flex;
//     flex-direction: column;
//     gap: 2px;
//   }

//   .edu-header-stat-val {
//     font-size: 1.4rem;
//     font-weight: 800;
//     color: #0f172a;
//   }

//   .edu-header-stat-val span {
//     color: #387ed1;
//   }

//   .edu-header-stat-label {
//     font-size: 0.75rem;
//     color: #94a3b8;
//     font-weight: 500;
//   }

//   /* ── Resource cards ── */
//   .edu-cards {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 20px;
//     margin-bottom: 40px;
//   }

//   .edu-card {
//     border-radius: 20px;
//     border: 1.5px solid #e8eef8;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
//     background: #fff;
//     cursor: pointer;
//     text-decoration: none;
//   }

//   .edu-card:hover {
//     box-shadow: 0 12px 40px rgba(56,126,209,0.12);
//     transform: translateY(-4px);
//     border-color: rgba(56,126,209,0.25);
//     text-decoration: none;
//   }

//   .edu-card-top {
//     padding: 28px 28px 0;
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//     flex: 1;
//   }

//   .edu-card-icon-wrap {
//     width: 52px;
//     height: 52px;
//     border-radius: 14px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1.4rem;
//   }

//   .edu-card-meta {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     flex-wrap: wrap;
//   }

//   .edu-card-category {
//     font-size: 0.68rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 0.07em;
//     padding: 3px 10px;
//     border-radius: 999px;
//   }

//   .edu-card-level {
//     font-size: 0.72rem;
//     color: #94a3b8;
//     font-weight: 500;
//   }

//   .edu-card-title {
//     font-family: 'Instrument Serif', Georgia, serif;
//     font-size: 1.25rem;
//     font-weight: 400;
//     color: #0f172a;
//     line-height: 1.3;
//     margin: 0;
//   }

//   .edu-card-desc {
//     font-size: 0.85rem;
//     color: #64748b;
//     line-height: 1.65;
//     margin: 0 0 20px;
//   }

//   .edu-card-bottom {
//     padding: 16px 28px 22px;
//     border-top: 1px solid #f1f5f9;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }

//   .edu-card-chapters {
//     font-size: 0.78rem;
//     color: #94a3b8;
//     font-weight: 500;
//   }

//   .edu-card-link {
//     font-size: 0.8rem;
//     font-weight: 700;
//     color: #387ed1;
//     display: flex;
//     align-items: center;
//     gap: 4px;
//     transition: gap 0.2s ease;
//   }

//   .edu-card:hover .edu-card-link {
//     gap: 8px;
//   }

//   /* ── Featured wide card ── */
//   .edu-card-wide {
//     grid-column: span 3;
//     flex-direction: row;
//     align-items: center;
//   }

//   .edu-card-wide .edu-card-top {
//     padding: 28px;
//     flex: 1;
//   }

//   .edu-card-wide .edu-card-bottom {
//     border-top: none;
//     border-left: 1px solid #f1f5f9;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 12px;
//     min-width: 180px;
//     padding: 28px;
//   }

//   .edu-card-wide .edu-card-desc {
//     margin: 0;
//   }

//   /* ── Topics row ── */
//   .edu-topics {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px;
//     padding-top: 8px;
//   }

//   .edu-topic-pill {
//     font-size: 0.78rem;
//     font-weight: 600;
//     color: #475569;
//     background: #f1f5f9;
//     border-radius: 999px;
//     padding: 6px 14px;
//     cursor: pointer;
//     border: 1.5px solid transparent;
//     transition: all 0.18s ease;
//   }

//   .edu-topic-pill:hover,
//   .edu-topic-pill.active {
//     background: rgba(56,126,209,0.08);
//     border-color: rgba(56,126,209,0.3);
//     color: #387ed1;
//   }

//   /* ── Mobile ── */
//   @media (max-width: 900px) {
//     .edu-section { padding: 64px 0 56px; }
//     .edu-inner { padding: 0 22px; }

//     .edu-header {
//       grid-template-columns: 1fr;
//       gap: 24px;
//     }

//     .edu-cards {
//       grid-template-columns: 1fr;
//     }

//     .edu-card-wide {
//       grid-column: span 1;
//       flex-direction: column;
//     }

//     .edu-card-wide .edu-card-bottom {
//       border-left: none;
//       border-top: 1px solid #f1f5f9;
//       flex-direction: row;
//       align-items: center;
//       min-width: 0;
//       width: 100%;
//     }
//   }

//   @media (max-width: 480px) {
//     .edu-inner { padding: 0 16px; }
//     .edu-header-stats { gap: 18px; }
//   }
// `;

// const RESOURCES = [
//   {
//     icon: "📚",
//     iconBg: "rgba(56,126,209,0.1)",
//     category: "Varsity",
//     categoryBg: "rgba(56,126,209,0.08)",
//     categoryColor: "#387ed1",
//     level: "Beginner → Advanced",
//     title: "Stock Market Fundamentals",
//     desc: "From how exchanges work to reading balance sheets — the most comprehensive free market education available online.",
//     chapters: "60+ chapters",
//     href: "#",
//   },
//   {
//     icon: "🕯️",
//     iconBg: "rgba(234,179,8,0.1)",
//     category: "Varsity",
//     categoryBg: "rgba(234,179,8,0.08)",
//     categoryColor: "#ca8a04",
//     level: "Intermediate",
//     title: "Technical Analysis",
//     desc: "Candlesticks, chart patterns, indicators — learn to read price action like a professional trader.",
//     chapters: "22 chapters",
//     href: "#",
//   },
//   {
//     icon: "📐",
//     iconBg: "rgba(168,85,247,0.1)",
//     category: "Varsity",
//     categoryBg: "rgba(168,85,247,0.08)",
//     categoryColor: "#9333ea",
//     level: "Advanced",
//     title: "Futures & Options",
//     desc: "Options theory, Greeks, strategies — an MBA-level options curriculum available completely free.",
//     chapters: "45 chapters",
//     href: "#",
//   },
// ];

// const TOPICS = [
//   "Equity", "Mutual Funds", "F&O", "Technical Analysis",
//   "IPO", "Taxation", "Personal Finance", "Commodities",
// ];

// function Education() {
//   const [activeTopic, setActiveTopic] = useState(null);

//   return (
//     <>
//       <style>{educationStyles}</style>
//       <section className="edu-section">
//         <div className="edu-inner">

//           {/* Header */}
//           <div className="edu-header">
//             <div>
//               <div className="edu-tag">Learn to trade</div>
//               <h2 className="edu-headline">
//                 Free and open<br />
//                 <em>market education</em>
//               </h2>
//             </div>
//             <div className="edu-header-right">
//               <p className="edu-header-desc">
//                 Varsity by LightEdge is the largest online stock market education
//                 platform in the world — covering everything from basics to advanced
//                 derivatives trading, completely free.
//               </p>
//               <div className="edu-header-stats">
//                 <div className="edu-header-stat">
//                   <span className="edu-header-stat-val">3<span>M+</span></span>
//                   <span className="edu-header-stat-label">Learners worldwide</span>
//                 </div>
//                 <div className="edu-header-stat">
//                   <span className="edu-header-stat-val">16<span>+</span></span>
//                   <span className="edu-header-stat-label">Free modules</span>
//                 </div>
//                 <div className="edu-header-stat">
//                   <span className="edu-header-stat-val">₹<span>0</span></span>
//                   <span className="edu-header-stat-label">Forever free</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Resource cards */}
//           <div className="edu-cards">
//             {RESOURCES.map((r) => (
//               <a className="edu-card" href={r.href} key={r.title}>
//                 <div className="edu-card-top">
//                   <div
//                     className="edu-card-icon-wrap"
//                     style={{ background: r.iconBg }}
//                   >
//                     {r.icon}
//                   </div>
//                   <div className="edu-card-meta">
//                     <span
//                       className="edu-card-category"
//                       style={{
//                         background: r.categoryBg,
//                         color: r.categoryColor,
//                       }}
//                     >
//                       {r.category}
//                     </span>
//                     <span className="edu-card-level">{r.level}</span>
//                   </div>
//                   <h3 className="edu-card-title">{r.title}</h3>
//                   <p className="edu-card-desc">{r.desc}</p>
//                 </div>
//                 <div className="edu-card-bottom">
//                   <span className="edu-card-chapters">{r.chapters}</span>
//                   <span className="edu-card-link">Read free →</span>
//                 </div>
//               </a>
//             ))}

//             {/* Wide TradingQ&A card */}
//             <a className="edu-card edu-card-wide" href="#" key="qa">
//               <div className="edu-card-top">
//                 <div
//                   className="edu-card-icon-wrap"
//                   style={{ background: "rgba(16,185,129,0.1)" }}
//                 >
//                   💬
//                 </div>
//                 <div className="edu-card-meta">
//                   <span
//                     className="edu-card-category"
//                     style={{ background: "rgba(16,185,129,0.08)", color: "#059669" }}
//                   >
//                     Community
//                   </span>
//                   <span className="edu-card-level">All levels</span>
//                 </div>
//                 <h3 className="edu-card-title">TradingQ&amp;A</h3>
//                 <p className="edu-card-desc">
//                   India's most active trading and investing community. Ask questions,
//                   share ideas, and learn from 5 lakh+ investors — from complete
//                   beginners to seasoned professionals.
//                 </p>
//               </div>
//               <div className="edu-card-bottom">
//                 <span className="edu-card-chapters">5L+ members</span>
//                 <span className="edu-card-link">Join community →</span>
//               </div>
//             </a>
//           </div>

//           {/* Topic pills */}
//           <div className="edu-topics">
//             {TOPICS.map((t) => (
//               <button
//                 key={t}
//                 className={`edu-topic-pill ${activeTopic === t ? "active" : ""}`}
//                 onClick={() => setActiveTopic(activeTopic === t ? null : t)}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }

// export default Education;