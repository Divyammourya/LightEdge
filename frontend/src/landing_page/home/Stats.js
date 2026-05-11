

import React from "react";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-5">
        <div className="col-6 p-5">
          <h1 className="fs-2 mb-5">Trust with confidence</h1>
          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores
            worth of equity investments.
          </p>
          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          <h2 className="fs-4">The Zerodha universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="col-6 p-5">
          <img src="media/images/ecosystem.png" style={{ width: "90%" }} />
          <div className="text-center">
            <a href="" className="mx-5" style={{ textDecoration: "none" }}>
              Explore our products{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="" style={{ textDecoration: "none" }}>
              Try Kite demo{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;



// import React, { useEffect, useRef, useState } from "react";

// const statsStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

//   .stats-section *,
//   .stats-section *::before,
//   .stats-section *::after { box-sizing: border-box; }

//   .stats-section {
//     font-family: 'DM Sans', sans-serif;
//     background: #0f172a;
//     padding: 96px 0 80px;
//     overflow: hidden;
//     position: relative;
//   }

//   /* background glow */
//   .stats-bg-glow {
//     position: absolute;
//     border-radius: 50%;
//     pointer-events: none;
//   }

//   .stats-bg-glow-1 {
//     width: 500px;
//     height: 500px;
//     background: radial-gradient(circle, rgba(56,126,209,0.14) 0%, transparent 70%);
//     top: -100px;
//     left: -100px;
//   }

//   .stats-bg-glow-2 {
//     width: 400px;
//     height: 400px;
//     background: radial-gradient(circle, rgba(29,185,84,0.08) 0%, transparent 70%);
//     bottom: -80px;
//     right: -80px;
//   }

//   .stats-inner {
//     position: relative;
//     z-index: 1;
//     max-width: 1160px;
//     margin: 0 auto;
//     padding: 0 40px;
//   }

//   /* ── Top counter strip ── */
//   .stats-counters {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     gap: 1px;
//     background: rgba(255,255,255,0.06);
//     border: 1px solid rgba(255,255,255,0.06);
//     border-radius: 20px;
//     overflow: hidden;
//     margin-bottom: 80px;
//   }

//   .stats-counter-item {
//     background: rgba(255,255,255,0.03);
//     padding: 32px 28px;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     transition: background 0.2s ease;
//   }

//   .stats-counter-item:hover {
//     background: rgba(56,126,209,0.08);
//   }

//   .stats-counter-value {
//     font-size: clamp(1.8rem, 3vw, 2.6rem);
//     font-weight: 800;
//     color: #fff;
//     line-height: 1;
//   }

//   .stats-counter-value span {
//     color: #387ed1;
//   }

//   .stats-counter-label {
//     font-size: 0.82rem;
//     color: #64748b;
//     font-weight: 500;
//     line-height: 1.4;
//   }

//   /* ── Bottom grid ── */
//   .stats-bottom {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 64px;
//     align-items: start;
//   }

//   /* Feature cards */
//   .stats-features {
//     display: flex;
//     flex-direction: column;
//     gap: 0;
//   }

//   .stats-section-tag {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 0.75rem;
//     font-weight: 700;
//     color: #387ed1;
//     text-transform: uppercase;
//     letter-spacing: 0.08em;
//     margin-bottom: 16px;
//   }

//   .stats-section-tag::before {
//     content: '';
//     display: inline-block;
//     width: 20px;
//     height: 2px;
//     background: #387ed1;
//     border-radius: 2px;
//   }

//   .stats-headline {
//     font-family: 'Instrument Serif', Georgia, serif;
//     font-size: clamp(1.8rem, 2.5vw, 2.4rem);
//     font-weight: 400;
//     color: #fff;
//     line-height: 1.2;
//     margin: 0 0 36px;
//   }

//   .stats-headline em {
//     font-style: italic;
//     color: #387ed1;
//   }

//   .stats-feature-card {
//     display: flex;
//     gap: 16px;
//     padding: 20px 0;
//     border-bottom: 1px solid rgba(255,255,255,0.06);
//     transition: padding-left 0.2s ease;
//     cursor: default;
//   }

//   .stats-feature-card:last-child {
//     border-bottom: none;
//   }

//   .stats-feature-card:hover {
//     padding-left: 6px;
//   }

//   .stats-feature-icon-wrap {
//     width: 40px;
//     height: 40px;
//     border-radius: 10px;
//     background: rgba(56,126,209,0.12);
//     border: 1px solid rgba(56,126,209,0.2);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1rem;
//     flex-shrink: 0;
//     margin-top: 2px;
//     transition: background 0.2s ease;
//   }

//   .stats-feature-card:hover .stats-feature-icon-wrap {
//     background: rgba(56,126,209,0.22);
//   }

//   .stats-feature-text h3 {
//     font-size: 0.95rem;
//     font-weight: 700;
//     color: #e2e8f0;
//     margin: 0 0 5px;
//   }

//   .stats-feature-text p {
//     font-size: 0.85rem;
//     color: #64748b;
//     line-height: 1.6;
//     margin: 0;
//   }

//   /* ── Right: ecosystem visual ── */
//   .stats-visual {
//     display: flex;
//     flex-direction: column;
//     gap: 24px;
//     position: sticky;
//     top: 100px;
//   }

//   .stats-eco-img-wrap {
//     position: relative;
//     border-radius: 20px;
//     overflow: hidden;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.08);
//     padding: 24px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .stats-eco-img-wrap img {
//     width: 100%;
//     max-width: 380px;
//     height: auto;
//     filter: drop-shadow(0 12px 32px rgba(56,126,209,0.2));
//   }

//   .stats-cta-row {
//     display: flex;
//     gap: 16px;
//     flex-wrap: wrap;
//   }

//   .stats-cta-link {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 0.88rem;
//     font-weight: 700;
//     color: #387ed1;
//     text-decoration: none;
//     padding: 10px 18px;
//     border: 1.5px solid rgba(56,126,209,0.3);
//     border-radius: 10px;
//     transition: background 0.2s ease, border-color 0.2s ease;
//   }

//   .stats-cta-link:hover {
//     background: rgba(56,126,209,0.1);
//     border-color: #387ed1;
//     text-decoration: none;
//     color: #387ed1;
//   }

//   /* ── Mobile ── */
//   @media (max-width: 900px) {
//     .stats-section { padding: 64px 0 56px; }

//     .stats-inner { padding: 0 22px; }

//     .stats-counters {
//       grid-template-columns: repeat(2, 1fr);
//       margin-bottom: 48px;
//     }

//     .stats-bottom {
//       grid-template-columns: 1fr;
//       gap: 40px;
//     }

//     .stats-visual {
//       position: static;
//       order: -1;
//     }

//     .stats-eco-img-wrap img {
//       max-width: 260px;
//     }
//   }

//   @media (max-width: 480px) {
//     .stats-counters {
//       grid-template-columns: repeat(2, 1fr);
//     }

//     .stats-counter-item {
//       padding: 20px 16px;
//     }

//     .stats-inner { padding: 0 16px; }

//     .stats-cta-row { flex-direction: column; }
//     .stats-cta-link { justify-content: center; }
//   }
// `;

// const FEATURES = [
//   {
//     icon: "🛡️",
//     title: "Customer-first, always",
//     desc: "That's why 13 lakh+ LightEdge customers trust us with ₹3.5+ lakh crore worth of equity investments. Your money, your control.",
//   },
//   {
//     icon: "🚫",
//     title: "No spam or gimmicks",
//     desc: "No gamification, no annoying push notifications, no dark patterns. High-quality apps you use at your own pace.",
//   },
//   {
//     icon: "🌐",
//     title: "The LightEdge ecosystem",
//     desc: "Not just an app — a complete investing ecosystem. Stocks, F&O, MFs, IPOs, and more, all under one roof.",
//   },
//   {
//     icon: "💡",
//     title: "Do better with money",
//     desc: "Smart nudges and portfolio insights help you make better decisions, not just execute faster trades.",
//   },
// ];

// const COUNTERS = [
//   { value: 1300000, prefix: "", suffix: "L+", label: "Active clients", divisor: 100000, decimals: 0 },
//   { value: 35, prefix: "₹", suffix: "L Cr+", label: "Equity assets held", divisor: 1, decimals: 0 },
//   { value: 15, prefix: "", suffix: "%+", label: "Of daily retail volume", divisor: 1, decimals: 0 },
//   { value: 99.9, prefix: "", suffix: "%", label: "Platform uptime", divisor: 1, decimals: 1 },
// ];

// function useCountUp(target, duration, start, decimals = 0) {
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!start) return;
//     let t0 = null;
//     const step = (ts) => {
//       if (!t0) t0 = ts;
//       const p = Math.min((ts - t0) / duration, 1);
//       const e = 1 - Math.pow(1 - p, 3);
//       setVal(parseFloat((e * target).toFixed(decimals)));
//       if (p < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [start, target, duration, decimals]);
//   return val;
// }

// function CounterItem({ item, start }) {
//   const raw = useCountUp(item.value, 1800, start, item.decimals);
//   const display =
//     item.divisor > 1
//       ? Math.floor(raw / item.divisor)
//       : raw.toFixed(item.decimals);

//   return (
//     <div className="stats-counter-item">
//       <div className="stats-counter-value">
//         {item.prefix}
//         {display}
//         <span>{item.suffix}</span>
//       </div>
//       <div className="stats-counter-label">{item.label}</div>
//     </div>
//   );
// }

// function Stats() {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) setVisible(true); },
//       { threshold: 0.2 }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <>
//       <style>{statsStyles}</style>
//       <section className="stats-section" ref={ref}>
//         <div className="stats-bg-glow stats-bg-glow-1" />
//         <div className="stats-bg-glow stats-bg-glow-2" />

//         <div className="stats-inner">

//           {/* Counter strip */}
//           <div className="stats-counters">
//             {COUNTERS.map((item) => (
//               <CounterItem key={item.label} item={item} start={visible} />
//             ))}
//           </div>

//           {/* Bottom */}
//           <div className="stats-bottom">

//             {/* Features */}
//             <div className="stats-features">
//               <span className="stats-section-tag">Why LightEdge</span>
//               <h2 className="stats-headline">
//                 Trust with <em>confidence</em>
//               </h2>
//               {FEATURES.map((f) => (
//                 <div className="stats-feature-card" key={f.title}>
//                   <div className="stats-feature-icon-wrap">{f.icon}</div>
//                   <div className="stats-feature-text">
//                     <h3>{f.title}</h3>
//                     <p>{f.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Ecosystem visual */}
//             <div className="stats-visual">
//               <div className="stats-eco-img-wrap">
//                 <img
//                   src="media/images/ecosystem.png"
//                   alt="LightEdge product ecosystem"
//                   onError={(e) => { e.target.style.display = "none"; }}
//                 />
//               </div>
//               <div className="stats-cta-row">
//                 <a href="/product" className="stats-cta-link">
//                   Explore products →
//                 </a>
//                 <a href="/signup" className="stats-cta-link">
//                   Try LightEdge →
//                 </a>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Stats;