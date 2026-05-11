

import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5">
          <img src="media/images/largestBroker.svg" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>Largest stock broker in India</h1>
          <p className="mb-5">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div>
          <img src="media/images/pressLogos.png" style={{ width: "90%" }} />
        </div>
      </div>
    </div>
  );
}

export default Awards;




// import React, { useEffect, useRef, useState } from "react";

// const awardStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

//   .award-section *,
//   .award-section *::before,
//   .award-section *::after { box-sizing: border-box; }

//   .award-section {
//     font-family: 'DM Sans', sans-serif;
//     background: #fff;
//     padding: 96px 0 80px;
//     overflow: hidden;
//   }

//   .award-inner {
//     max-width: 1160px;
//     margin: 0 auto;
//     padding: 0 40px;
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 72px;
//     align-items: center;
//   }

//   /* ── LEFT visual ── */
//   .award-visual {
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .award-visual-bg {
//     position: absolute;
//     inset: -40px;
//     background: radial-gradient(ellipse at 60% 50%, rgba(56,126,209,0.10) 0%, transparent 70%);
//     border-radius: 50%;
//   }

//   .award-img-wrap {
//     position: relative;
//     z-index: 1;
//     width: 100%;
//     max-width: 380px;
//   }

//   .award-img-wrap img {
//     width: 100%;
//     height: auto;
//     filter: drop-shadow(0 20px 48px rgba(56,126,209,0.15));
//     animation: awardFloat 4s ease-in-out infinite;
//   }

//   @keyframes awardFloat {
//     0%, 100% { transform: translateY(0px); }
//     50%       { transform: translateY(-10px); }
//   }

//   /* Stat pill floating on image */
//   .award-stat-pill {
//     position: absolute;
//     background: #fff;
//     border-radius: 14px;
//     box-shadow: 0 8px 32px rgba(15,23,42,0.12);
//     padding: 12px 18px;
//     display: flex;
//     flex-direction: column;
//     gap: 2px;
//     z-index: 2;
//   }

//   .award-stat-pill-1 {
//     bottom: 20px;
//     right: -10px;
//   }

//   .award-stat-pill-2 {
//     top: 10px;
//     left: -10px;
//   }

//   .award-stat-label {
//     font-size: 0.68rem;
//     color: #94a3b8;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//   }

//   .award-stat-value {
//     font-size: 1.1rem;
//     font-weight: 800;
//     color: #0f172a;
//   }

//   .award-stat-value span {
//     color: #387ed1;
//   }

//   /* ── RIGHT content ── */
//   .award-content {
//     display: flex;
//     flex-direction: column;
//     gap: 0;
//   }

//   .award-tag {
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

//   .award-tag::before {
//     content: '';
//     display: inline-block;
//     width: 20px;
//     height: 2px;
//     background: #387ed1;
//     border-radius: 2px;
//   }

//   .award-headline {
//     font-family: 'Instrument Serif', Georgia, serif;
//     font-size: clamp(1.9rem, 3vw, 2.6rem);
//     font-weight: 400;
//     line-height: 1.18;
//     color: #0f172a;
//     margin: 0 0 16px;
//   }

//   .award-headline em {
//     font-style: italic;
//     color: #387ed1;
//   }

//   .award-desc {
//     font-size: 1rem;
//     color: #475569;
//     line-height: 1.7;
//     margin: 0 0 32px;
//   }

//   /* Instrument list */
//   .award-instruments {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 10px 24px;
//     margin-bottom: 36px;
//   }

//   .award-instrument-item {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 0.9rem;
//     color: #334155;
//     font-weight: 500;
//   }

//   .award-instrument-icon {
//     width: 32px;
//     height: 32px;
//     border-radius: 8px;
//     background: rgba(56,126,209,0.08);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 0.9rem;
//     flex-shrink: 0;
//   }

//   /* Press logos */
//   .award-press {
//     border-top: 1px solid #f1f5f9;
//     padding-top: 28px;
//   }

//   .award-press-label {
//     font-size: 0.72rem;
//     color: #94a3b8;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.08em;
//     margin-bottom: 14px;
//   }

//   .award-press-logos {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px 0;
//     align-items: center;
//   }

//   .award-press-logo {
//     font-size: 0.8rem;
//     font-weight: 800;
//     color: #cbd5e1;
//     letter-spacing: 0.04em;
//     padding: 4px 14px;
//     border-right: 1px solid #e2e8f0;
//     text-transform: uppercase;
//   }

//   .award-press-logo:last-child {
//     border-right: none;
//   }

//   /* ── Mobile ── */
//   @media (max-width: 860px) {
//     .award-inner {
//       grid-template-columns: 1fr;
//       gap: 48px;
//       padding: 0 22px;
//       text-align: center;
//     }

//     .award-visual {
//       order: -1;
//       max-width: 300px;
//       margin: 0 auto;
//     }

//     .award-instruments {
//       text-align: left;
//     }

//     .award-press-logos {
//       justify-content: center;
//     }

//     .award-stat-pill-1 { right: 0; }
//     .award-stat-pill-2 { left: 0; }
//   }

//   @media (max-width: 480px) {
//     .award-section { padding: 64px 0 56px; }
//     .award-inner { padding: 0 16px; }
//     .award-instruments { grid-template-columns: 1fr; }
//   }
// `;

// const INSTRUMENTS = [
//   { icon: "📈", label: "Futures & Options" },
//   { icon: "🏦", label: "Stocks & IPOs" },
//   { icon: "💱", label: "Commodity Derivatives" },
//   { icon: "📊", label: "Direct Mutual Funds" },
//   { icon: "🌐", label: "Currency Derivatives" },
//   { icon: "🏛️", label: "Bonds & Govt. Securities" },
// ];

// const PRESS = ["Economic Times", "Mint", "Business Standard", "Forbes", "CNBC", "MoneyControl"];

// /* ── Animated counter ── */
// function useCountUp(target, duration = 1600, start = false) {
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!start) return;
//     let startTime = null;
//     const step = (ts) => {
//       if (!startTime) startTime = ts;
//       const progress = Math.min((ts - startTime) / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setVal(Math.floor(eased * target));
//       if (progress < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [start, target, duration]);
//   return val;
// }

// function Awards() {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisible(true); },
//       { threshold: 0.3 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   const clients = useCountUp(1300000, 1800, visible);
//   const volume = useCountUp(15, 1400, visible);

//   const fmtClients = (n) => {
//     if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M+`;
//     if (n >= 100000)  return `${(n / 100000).toFixed(1)}L+`;
//     return n.toLocaleString();
//   };

//   return (
//     <>
//       <style>{awardStyles}</style>
//       <section className="award-section" ref={ref}>
//         <div className="award-inner">

//           {/* ── LEFT visual ── */}
//           <div className="award-visual">
//             <div className="award-visual-bg" />
//             <div className="award-img-wrap">
//               <img
//                 src="media/images/largestBroker.svg"
//                 alt="LightEdge — India's largest broker"
//                 onError={(e) => { e.target.style.display = "none"; }}
//               />

//               {/* Floating stat pills */}
//               <div className="award-stat-pill award-stat-pill-1">
//                 <span className="award-stat-label">Active Clients</span>
//                 <span className="award-stat-value">
//                   {fmtClients(clients)} <span>clients</span>
//                 </span>
//               </div>

//               <div className="award-stat-pill award-stat-pill-2">
//                 <span className="award-stat-label">Daily Order Volume</span>
//                 <span className="award-stat-value">
//                   {volume}<span>%+ retail</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* ── RIGHT content ── */}
//           <div className="award-content">
//             <span className="award-tag">Our reach</span>

//             <h2 className="award-headline">
//               India's <em>fastest growing</em><br />
//               stock broker
//             </h2>

//             <p className="award-desc">
//               Over 13 lakh LightEdge clients contribute to more than 15% of all
//               retail order volumes in India every single day — trading and
//               investing across every major instrument class.
//             </p>

//             <div className="award-instruments">
//               {INSTRUMENTS.map((item) => (
//                 <div className="award-instrument-item" key={item.label}>
//                   <span className="award-instrument-icon">{item.icon}</span>
//                   {item.label}
//                 </div>
//               ))}
//             </div>

//             <div className="award-press">
//               <p className="award-press-label">As seen in</p>
//               <div className="award-press-logos">
//                 {PRESS.map((name) => (
//                   <span className="award-press-logo" key={name}>{name}</span>
//                 ))}
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }

// export default Awards;