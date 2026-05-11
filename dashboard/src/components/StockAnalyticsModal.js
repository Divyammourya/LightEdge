// import React, { useEffect, useState, useRef } from "react";
// import "./StockAnalyticsModal.css";

// const generateMockHistory = (basePrice, days = 30) => {
//   const data = [];
//   let price = basePrice * (0.88 + Math.random() * 0.1);
//   const now = Date.now();

//   for (let i = days; i >= 0; i--) {
//     const change = (Math.random() - 0.48) * basePrice * 0.025;
//     price = Math.max(price + change, basePrice * 0.6);
//     data.push({
//       date: new Date(now - i * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       }),
//       price: parseFloat(price.toFixed(2)),
//     });
//   }
//   return data;
// };

// const generateIntraday = (basePrice, points = 20) => {
//   const data = [];
//   let price = basePrice * (0.97 + Math.random() * 0.03);
//   for (let i = 0; i < points; i++) {
//     const change = (Math.random() - 0.47) * basePrice * 0.008;
//     price = Math.max(price + change, basePrice * 0.8);
//     data.push(parseFloat(price.toFixed(2)));
//   }
//   return data;
// };

// const MiniLineChart = ({ data, color = "#7c6fcd", fill = true, height = 80 }) => {
//   if (!data || data.length < 2) return null;

//   const prices = data.map((d) => (typeof d === "object" ? d.price : d));
//   const min = Math.min(...prices);
//   const max = Math.max(...prices);
//   const range = max - min || 1;
//   const w = 400;
//   const h = height;
//   const pad = 4;

//   const points = prices.map((p, i) => {
//     const x = pad + (i / (prices.length - 1)) * (w - pad * 2);
//     const y = h - pad - ((p - min) / range) * (h - pad * 2);
//     return `${x},${y}`;
//   });

//   const polyline = points.join(" ");
//   const firstPt = points[0];
//   const lastPt = points[points.length - 1];
//   const areaPath = `M ${firstPt} L ${polyline.split(" ").slice(1).join(" L ")} L ${lastPt.split(",")[0]},${h} L ${firstPt.split(",")[0]},${h} Z`;

//   return (
//     <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
//       <defs>
//         <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor={color} stopOpacity="0.35" />
//           <stop offset="100%" stopColor={color} stopOpacity="0.02" />
//         </linearGradient>
//       </defs>
//       {fill && (
//         <path d={areaPath} fill={`url(#grad-${color.replace("#", "")})`} />
//       )}
//       <polyline
//         points={polyline}
//         fill="none"
//         stroke={color}
//         strokeWidth="2.5"
//         strokeLinejoin="round"
//         strokeLinecap="round"
//       />
//       <circle
//         cx={lastPt.split(",")[0]}
//         cy={lastPt.split(",")[1]}
//         r="4"
//         fill={color}
//         stroke="#fff"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// };

// const MiniBarChart = ({ data, color = "#7c6fcd", height = 60 }) => {
//   if (!data || data.length === 0) return null;
//   const max = Math.max(...data);
//   return (
//     <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
//       {data.map((v, i) => (
//         <div
//           key={i}
//           style={{
//             flex: 1,
//             height: `${(v / max) * 100}%`,
//             background: i === data.length - 1 ? color : `${color}70`,
//             borderRadius: "3px 3px 0 0",
//             transition: "height 0.6s ease",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const MiniDonut = ({ percent, color = "#7c6fcd", size = 80 }) => {
//   const r = 28;
//   const circ = 2 * Math.PI * r;
//   const offset = circ - (percent / 100) * circ;
//   return (
//     <svg width={size} height={size} viewBox="0 0 70 70">
//       <circle cx="35" cy="35" r={r} fill="none" stroke="#e8e4f8" strokeWidth="8" />
//       <circle
//         cx="35"
//         cy="35"
//         r={r}
//         fill="none"
//         stroke={color}
//         strokeWidth="8"
//         strokeDasharray={circ}
//         strokeDashoffset={offset}
//         strokeLinecap="round"
//         transform="rotate(-90 35 35)"
//         style={{ transition: "stroke-dashoffset 1s ease" }}
//       />
//       <text x="35" y="39" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
//         {percent}%
//       </text>
//     </svg>
//   );
// };

// const StockAnalyticsModal = ({ stock, onClose }) => {
//   const [history, setHistory] = useState([]);
//   const [intraday, setIntraday] = useState([]);
//   const [volumeBars, setVolumeBars] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const overlayRef = useRef();

//   const price = parseFloat(stock?.price || 100);
//   const isUp = !stock?.isDown;
//   const accentColor = isUp ? "#7c6fcd" : "#e05c7a";
//   const pct = parseFloat((stock?.percent || "0%").replace(/[^0-9.-]/g, "")) || 0;
//   const absPct = Math.abs(pct).toFixed(2);

//   const high = (price * 1.015).toFixed(2);
//   const low = (price * 0.985).toFixed(2);
//   const open = (price * (0.99 + Math.random() * 0.015)).toFixed(2);
//   const volume = (Math.floor(Math.random() * 9000) + 1000).toLocaleString();
//   const mktCap = price > 100 ? `$${(price * 5.2).toFixed(1)}B` : `$${(price * 80).toFixed(0)}M`;
//   const sentiment = isUp ? Math.floor(55 + Math.random() * 30) : Math.floor(20 + Math.random() * 35);

//   useEffect(() => {
//     setHistory(generateMockHistory(price, 30));
//     setIntraday(generateIntraday(price, 18));
//     setVolumeBars(Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 10));
//     setTimeout(() => setVisible(true), 10);
//   }, [price]);

//   const handleOverlayClick = (e) => {
//     if (e.target === overlayRef.current) handleClose();
//   };

//   const handleClose = () => {
//     setVisible(false);
//     setTimeout(onClose, 280);
//   };

//   return (
//     <div
//       ref={overlayRef}
//       className={`analytics-overlay ${visible ? "visible" : ""}`}
//       onClick={handleOverlayClick}
//     >
//       <div className={`analytics-modal ${visible ? "visible" : ""}`}>
//         {/* Header */}
//         <div className="analytics-header">
//           <div className="analytics-header-left">
//             <div className="analytics-avatar" style={{ background: accentColor }}>
//               {stock?.name?.[0] || "S"}
//             </div>
//             <div>
//               <h2 className="analytics-title">{stock?.name}</h2>
//               <span className="analytics-symbol">{stock?.symbol || stock?.name}</span>
//             </div>
//           </div>
//           <div className="analytics-header-right">
//             <div className="analytics-price-block">
//               <span className="analytics-price">
//                 {stock?.symbol === "INFY" || stock?.symbol === "WIT" ? "$" : "₹"}
//                 {price.toFixed(2)}
//               </span>
//               <span
//                 className="analytics-change-pill"
//                 style={{
//                   background: isUp ? "#ede9fb" : "#fde8ee",
//                   color: accentColor,
//                 }}
//               >
//                 {isUp ? "▲" : "▼"} {absPct}%
//               </span>
//             </div>
//             <button className="analytics-close-btn" onClick={handleClose} aria-label="Close">
//               ✕
//             </button>
//           </div>
//         </div>

//         {/* Main Chart */}
//         <div className="analytics-main-chart">
//           <div className="analytics-chart-header">
//             <span className="analytics-chart-label">30-Day Price Trend</span>
//             <span className="analytics-chart-badge" style={{ color: accentColor }}>
//               {isUp ? "+" : ""}{absPct}% this month
//             </span>
//           </div>
//           <MiniLineChart data={history} color={accentColor} height={110} />
//           <div className="analytics-chart-dates">
//             {history.length > 0 && (
//               <>
//                 <span>{history[0]?.date}</span>
//                 <span>{history[Math.floor(history.length / 2)]?.date}</span>
//                 <span>{history[history.length - 1]?.date}</span>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Stat Cards Row */}
//         <div className="analytics-stats-row">
//           <div className="analytics-stat-card">
//             <span className="stat-label">Open</span>
//             <span className="stat-value">₹{open}</span>
//           </div>
//           <div className="analytics-stat-card">
//             <span className="stat-label">High</span>
//             <span className="stat-value" style={{ color: "#1db954" }}>₹{high}</span>
//           </div>
//           <div className="analytics-stat-card">
//             <span className="stat-label">Low</span>
//             <span className="stat-value" style={{ color: "#e05c7a" }}>₹{low}</span>
//           </div>
//           <div className="analytics-stat-card">
//             <span className="stat-label">Volume</span>
//             <span className="stat-value">{volume}</span>
//           </div>
//           <div className="analytics-stat-card">
//             <span className="stat-label">Mkt Cap</span>
//             <span className="stat-value">{mktCap}</span>
//           </div>
//         </div>

//         {/* Bottom Row */}
//         <div className="analytics-bottom-row">
//           {/* Intraday */}
//           <div className="analytics-card analytics-card-intraday">
//             <span className="analytics-card-label">Intraday Movement</span>
//             <MiniLineChart data={intraday} color={accentColor} height={70} fill={true} />
//           </div>

//           {/* Volume Bars */}
//           <div className="analytics-card analytics-card-volume">
//             <span className="analytics-card-label">Weekly Volume</span>
//             <MiniBarChart data={volumeBars} color={accentColor} height={70} />
//             <div className="analytics-bar-days">
//               {["M", "T", "W", "T", "F", "S", "T"].map((d, i) => (
//                 <span key={i}>{d}</span>
//               ))}
//             </div>
//           </div>

//           {/* Sentiment Donut */}
//           <div className="analytics-card analytics-card-sentiment">
//             <span className="analytics-card-label">Bull Sentiment</span>
//             <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
//               <MiniDonut percent={sentiment} color={accentColor} size={90} />
//             </div>
//             <div className="analytics-sentiment-label" style={{ color: accentColor }}>
//               {sentiment >= 60 ? "Bullish" : sentiment >= 40 ? "Neutral" : "Bearish"}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockAnalyticsModal;


import React, { useEffect, useState, useRef, useCallback } from "react";
import "./StockAnalyticsModal.css";

const generateMockHistory = (basePrice, days = 30) => {
  const data = [];
  let price = basePrice * (0.88 + Math.random() * 0.1);
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.48) * basePrice * 0.025;
    price = Math.max(price + change, basePrice * 0.6);
    data.push({
      date: new Date(now - i * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short", day: "numeric",
      }),
      price: parseFloat(price.toFixed(2)),
    });
  }
  return data;
};

const generateIntraday = (basePrice, points = 20) => {
  const data = [];
  let price = basePrice * (0.97 + Math.random() * 0.03);
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.47) * basePrice * 0.008;
    price = Math.max(price + change, basePrice * 0.8);
    data.push(parseFloat(price.toFixed(2)));
  }
  return data;
};

// ── 30-Day Chart with crosshair tooltip ──────────────────────────────────────
// const MainLineChart = ({ data, color = "#7c6fcd", height = 110 }) => {
//   const svgRef = useRef();
//   const [hover, setHover] = useState(null);

//   if (!data || data.length < 2) return null;
//   const prices = data.map((d) => d.price);
//   const min = Math.min(...prices);
//   const max = Math.max(...prices);
//   const range = max - min || 1;
//   const W = 400; const H = height; const pad = 6;

//   const pts = prices.map((p, i) => ({
//     x: pad + (i / (prices.length - 1)) * (W - pad * 2),
//     y: H - pad - ((p - min) / range) * (H - pad * 2),
//   }));

//   const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
//   const areaPath = `M ${pts[0].x},${pts[0].y} ` +
//     pts.slice(1).map((p) => `L ${p.x},${p.y}`).join(" ") +
//     ` L ${pts[pts.length - 1].x},${H} L ${pts[0].x},${H} Z`;

//   const handleMouseMove = useCallback((e) => {
//     const rect = svgRef.current.getBoundingClientRect();
//     const mouseX = ((e.clientX - rect.left) / rect.width) * W;
//     let closest = 0;
//     let minDist = Infinity;
//     pts.forEach((p, i) => {
//       const d = Math.abs(p.x - mouseX);
//       if (d < minDist) { minDist = d; closest = i; }
//     });
//     setHover({ idx: closest, x: pts[closest].x, y: pts[closest].y, ...data[closest] });
//   }, [pts, data]);

//   return (
//     <div style={{ position: "relative" }}>
//       <svg
//         ref={svgRef}
//         viewBox={`0 0 ${W} ${H}`}
//         preserveAspectRatio="none"
//         style={{ width: "100%", height, cursor: "crosshair", display: "block" }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={() => setHover(null)}
//       >
//         <defs>
//           <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor={color} stopOpacity="0.32" />
//             <stop offset="100%" stopColor={color} stopOpacity="0.02" />
//           </linearGradient>
//           <filter id="glow">
//             <feGaussianBlur stdDeviation="2.5" result="blur" />
//             <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
//           </filter>
//         </defs>

//         <path d={areaPath} fill="url(#mainGrad)" />
//         <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5"
//           strokeLinejoin="round" strokeLinecap="round" />

//         {hover && (
//           <>
//             <line x1={hover.x} y1={pad} x2={hover.x} y2={H}
//               stroke={color} strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
//             <circle cx={hover.x} cy={hover.y} r="5" fill={color}
//               stroke="#fff" strokeWidth="2" filter="url(#glow)" />
//           </>
//         )}
//       </svg>

//       {hover && (
//         <div className="chart-tooltip" style={{
//           left: `${(hover.x / W) * 100}%`,
//           borderColor: color,
//         }}>
//           <span className="tooltip-date">{hover.date}</span>
//           <span className="tooltip-price" style={{ color }}>₹{hover.price}</span>
//         </div>
//       )}
//     </div>
//   );
// };
const MainLineChart = ({ data, color = "#7c6fcd", height = 110 }) => {
  const svgRef = useRef();
  const [hover, setHover] = useState(null);

  const prices = (data || []).map((d) => d.price);
  const min = Math.min(...prices, 0);
  const max = Math.max(...prices, 1);
  const range = max - min || 1;
  const W = 400; const H = height; const pad = 6;

  const pts = prices.map((p, i) => ({
    x: pad + (i / Math.max(prices.length - 1, 1)) * (W - pad * 2),
    y: H - pad - ((p - min) / range) * (H - pad * 2),
  }));

  const handleMouseMove = useCallback((e) => {
    if (!svgRef.current || pts.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * W;
    let closest = 0; let minDist = Infinity;
    pts.forEach((p, i) => {
      const d = Math.abs(p.x - mouseX);
      if (d < minDist) { minDist = d; closest = i; }
    });
    setHover({ idx: closest, x: pts[closest].x, y: pts[closest].y, ...data[closest] });
  }, [pts, data]);

  if (!data || data.length < 2) return null;

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `M ${pts[0].x},${pts[0].y} ` +
    pts.slice(1).map((p) => `L ${p.x},${p.y}`).join(" ") +
    ` L ${pts[pts.length - 1].x},${H} L ${pts[0].x},${H} Z`;

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height, cursor: "crosshair", display: "block" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d={areaPath} fill="url(#mainGrad)" />
        <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5"
          strokeLinejoin="round" strokeLinecap="round" />
        {hover && (
          <>
            <line x1={hover.x} y1={pad} x2={hover.x} y2={H}
              stroke={color} strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
            <circle cx={hover.x} cy={hover.y} r="5" fill={color}
              stroke="#fff" strokeWidth="2" filter="url(#glow)" />
          </>
        )}
      </svg>
      {hover && (
        <div className="chart-tooltip" style={{ left: `${(hover.x / W) * 100}%`, borderColor: color }}>
          <span className="tooltip-date">{hover.date}</span>
          <span className="tooltip-price" style={{ color }}>₹{hover.price}</span>
        </div>
      )}
    </div>
  );
};

// ── Intraday Chart with glowing follower dot ──────────────────────────────────
// const IntradayChart = ({ data, color = "#7c6fcd", height = 70 }) => {
//   const svgRef = useRef();
//   const [hover, setHover] = useState(null);

//   if (!data || data.length < 2) return null;
//   const min = Math.min(...data);
//   const max = Math.max(...data);
//   const range = max - min || 1;
//   const W = 400; const H = height; const pad = 5;

//   const pts = data.map((p, i) => ({
//     x: pad + (i / (data.length - 1)) * (W - pad * 2),
//     y: H - pad - ((p - min) / range) * (H - pad * 2),
//     price: p,
//   }));

//   const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
//   const areaPath = `M ${pts[0].x},${pts[0].y} ` +
//     pts.slice(1).map((p) => `L ${p.x},${p.y}`).join(" ") +
//     ` L ${pts[pts.length - 1].x},${H} L ${pts[0].x},${H} Z`;

//   const handleMouseMove = useCallback((e) => {
//     const rect = svgRef.current.getBoundingClientRect();
//     const mouseX = ((e.clientX - rect.left) / rect.width) * W;
//     let closest = 0; let minDist = Infinity;
//     pts.forEach((p, i) => {
//       const d = Math.abs(p.x - mouseX);
//       if (d < minDist) { minDist = d; closest = i; }
//     });
//     setHover(pts[closest]);
//   }, [pts]);

//   return (
//     <div style={{ position: "relative" }}>
//       <svg
//         ref={svgRef}
//         viewBox={`0 0 ${W} ${H}`}
//         preserveAspectRatio="none"
//         style={{ width: "100%", height, cursor: "crosshair", display: "block" }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={() => setHover(null)}
//       >
//         <defs>
//           <linearGradient id="intradayGrad" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor={color} stopOpacity="0.28" />
//             <stop offset="100%" stopColor={color} stopOpacity="0.02" />
//           </linearGradient>
//           <filter id="dotGlow">
//             <feGaussianBlur stdDeviation="3" result="blur" />
//             <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
//           </filter>
//         </defs>

//         <path d={areaPath} fill="url(#intradayGrad)" />
//         <polyline points={polyline} fill="none" stroke={color}
//           strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />

//         {hover && (
//           <>
//             <circle cx={hover.x} cy={hover.y} r="8" fill={color} opacity="0.18" />
//             <circle cx={hover.x} cy={hover.y} r="5" fill={color}
//               stroke="#fff" strokeWidth="2" filter="url(#dotGlow)" />
//             <line x1={hover.x} y1={0} x2={hover.x} y2={H}
//               stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
//           </>
//         )}
//       </svg>

//       {hover && (
//         <div className="chart-tooltip small-tooltip" style={{ borderColor: color,
//           left: `${(hover.x / W) * 100}%` }}>
//           <span className="tooltip-price" style={{ color }}>₹{hover.price?.toFixed(2)}</span>
//         </div>
//       )}
//     </div>
//   );
// };
const IntradayChart = ({ data, color = "#7c6fcd", height = 70 }) => {
  const svgRef = useRef();
  const [hover, setHover] = useState(null);

  const prices = data || [];
  const min = Math.min(...prices, 0);
  const max = Math.max(...prices, 1);
  const range = max - min || 1;
  const W = 400; const H = height; const pad = 5;

  const pts = prices.map((p, i) => ({
    x: pad + (i / Math.max(prices.length - 1, 1)) * (W - pad * 2),
    y: H - pad - ((p - min) / range) * (H - pad * 2),
    price: p,
  }));

  const handleMouseMove = useCallback((e) => {
    if (!svgRef.current || pts.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * W;
    let closest = 0; let minDist = Infinity;
    pts.forEach((p, i) => {
      const d = Math.abs(p.x - mouseX);
      if (d < minDist) { minDist = d; closest = i; }
    });
    setHover(pts[closest]);
  }, [pts]);

  if (!data || data.length < 2) return null;

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `M ${pts[0].x},${pts[0].y} ` +
    pts.slice(1).map((p) => `L ${p.x},${p.y}`).join(" ") +
    ` L ${pts[pts.length - 1].x},${H} L ${pts[0].x},${H} Z`;

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height, cursor: "crosshair", display: "block" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="intradayGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d={areaPath} fill="url(#intradayGrad)" />
        <polyline points={polyline} fill="none" stroke={color}
          strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        {hover && (
          <>
            <circle cx={hover.x} cy={hover.y} r="8" fill={color} opacity="0.18" />
            <circle cx={hover.x} cy={hover.y} r="5" fill={color}
              stroke="#fff" strokeWidth="2" filter="url(#dotGlow)" />
            <line x1={hover.x} y1={0} x2={hover.x} y2={H}
              stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          </>
        )}
      </svg>
      {hover && (
        <div className="chart-tooltip small-tooltip" style={{
          borderColor: color, left: `${(hover.x / W) * 100}%`
        }}>
          <span className="tooltip-price" style={{ color }}>₹{hover.price?.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};


// ── Volume Bar Chart with hover highlight ────────────────────────────────────
const VolumeBarChart = ({ data, color = "#7c6fcd", height = 70 }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height, padding: "0 2px" }}>
        {data.map((v, i) => {
          const isHovered = hoveredIdx === i;
          const barH = `${(v / max) * 100}%`;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", height: "100%", justifyContent: "flex-end",
              position: "relative", cursor: "pointer" }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {isHovered && (
                <div className="bar-tooltip" style={{ color }}>
                  {v}K
                </div>
              )}
              <div style={{
                width: "100%",
                height: barH,
                background: isHovered ? color : `${color}65`,
                borderRadius: "4px 4px 0 0",
                transition: "background 0.18s, height 0.2s",
                boxShadow: isHovered ? `0 0 10px ${color}55` : "none",
                transform: isHovered ? "scaleY(1.04)" : "scaleY(1)",
                transformOrigin: "bottom",
              }} />
            </div>
          );
        })}
      </div>
      <div className="analytics-bar-days">
        {days.map((d, i) => (
          <span key={i} style={{
            color: hoveredIdx === i ? color : "#bbb",
            fontWeight: hoveredIdx === i ? 700 : 400,
            transition: "color 0.15s",
          }}>{d}</span>
        ))}
      </div>
    </div>
  );
};

// ── Donut with pulse on hover ────────────────────────────────────────────────
const SentimentDonut = ({ percent, color = "#7c6fcd", size = 90 }) => {
  const [hovered, setHovered] = useState(false);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <div
      style={{ display: "inline-flex", position: "relative", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width={size} height={size} viewBox="0 0 70 70"
        style={{ transition: "transform 0.25s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          filter: hovered ? `drop-shadow(0 0 8px ${color}60)` : "none",
        }}
      >
        {/* Pulse ring */}
        {hovered && (
          <circle cx="35" cy="35" r="33" fill="none"
            stroke={color} strokeWidth="1.5" opacity="0.3"
            style={{ animation: "donutPulse 0.8s ease-out infinite" }}
          />
        )}
        <circle cx="35" cy="35" r={r} fill="none"
          stroke={hovered ? "#d6d0f4" : "#e8e4f8"} strokeWidth="8"
          style={{ transition: "stroke 0.2s" }}
        />
        <circle cx="35" cy="35" r={r} fill="none"
          stroke={color} strokeWidth={hovered ? "9" : "8"}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 35 35)"
          style={{ transition: "stroke-dashoffset 1s ease, stroke-width 0.2s" }}
        />
        <text x="35" y="39" textAnchor="middle"
          fontSize={hovered ? "12" : "11"}
          fontWeight="700" fill={color}
          style={{ transition: "font-size 0.2s" }}
        >
          {percent}%
        </text>
      </svg>
    </div>
  );
};

// ── Main Modal ───────────────────────────────────────────────────────────────
const StockAnalyticsModal = ({ stock, onClose }) => {
  const [history, setHistory] = useState([]);
  const [intraday, setIntraday] = useState([]);
  const [volumeBars, setVolumeBars] = useState([]);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef();

  const price = parseFloat(stock?.price || 100);
  const isUp = !stock?.isDown;
  const accentColor = isUp ? "#7c6fcd" : "#e05c7a";
  const pct = parseFloat((stock?.percent || "0%").replace(/[^0-9.-]/g, "")) || 0;
  const absPct = Math.abs(pct).toFixed(2);

  const high = (price * 1.015).toFixed(2);
  const low = (price * 0.985).toFixed(2);
  const open = (price * (0.99 + Math.random() * 0.015)).toFixed(2);
  const volume = (Math.floor(Math.random() * 9000) + 1000).toLocaleString();
  const mktCap = price > 100 ? `$${(price * 5.2).toFixed(1)}B` : `$${(price * 80).toFixed(0)}M`;
  const sentiment = isUp
    ? Math.floor(55 + Math.random() * 30)
    : Math.floor(20 + Math.random() * 35);
  const currencySymbol = stock?.symbol === "INFY" || stock?.symbol === "WIT" ? "$" : "₹";

  useEffect(() => {
    setHistory(generateMockHistory(price, 30));
    setIntraday(generateIntraday(price, 18));
    setVolumeBars(Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 10));
    setTimeout(() => setVisible(true), 10);
  }, [price]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };

  return (
    <div
      ref={overlayRef}
      className={`analytics-overlay ${visible ? "visible" : ""}`}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div className={`analytics-modal ${visible ? "visible" : ""}`}>

        {/* Header */}
        <div className="analytics-header">
          <div className="analytics-header-left">
            <div className="analytics-avatar" style={{ background: accentColor }}>
              {stock?.name?.[0] || "S"}
            </div>
            <div>
              <h2 className="analytics-title">{stock?.name}</h2>
              <span className="analytics-symbol">{stock?.symbol || stock?.name}</span>
            </div>
          </div>
          <div className="analytics-header-right">
            <div className="analytics-price-block">
              <span className="analytics-price">{currencySymbol}{price.toFixed(2)}</span>
              <span className="analytics-change-pill" style={{
                background: isUp ? "#ede9fb" : "#fde8ee", color: accentColor,
              }}>
                {isUp ? "▲" : "▼"} {absPct}%
              </span>
            </div>
            <button className="analytics-close-btn" onClick={handleClose} aria-label="Close">✕</button>
          </div>
        </div>

        {/* 30-Day Chart */}
        <div className="analytics-main-chart">
          <div className="analytics-chart-header">
            <span className="analytics-chart-label">30-Day Price Trend</span>
            <span className="analytics-chart-badge" style={{ color: accentColor }}>
              {isUp ? "+" : ""}{absPct}% this month
            </span>
          </div>
          <MainLineChart data={history} color={accentColor} height={110} />
          <div className="analytics-chart-dates">
            {history.length > 0 && (<>
              <span>{history[0]?.date}</span>
              <span>{history[Math.floor(history.length / 2)]?.date}</span>
              <span>{history[history.length - 1]?.date}</span>
            </>)}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="analytics-stats-row">
          {[
            { label: "Open", value: `${currencySymbol}${open}` },
            { label: "High", value: `${currencySymbol}${high}`, color: "#1db954" },
            { label: "Low", value: `${currencySymbol}${low}`, color: "#e05c7a" },
            { label: "Volume", value: volume },
            { label: "Mkt Cap", value: mktCap },
          ].map((s) => (
            <div className="analytics-stat-card" key={s.label}>
              <span className="stat-label">{s.label}</span>
              <span className="stat-value" style={s.color ? { color: s.color } : {}}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="analytics-bottom-row">
          <div className="analytics-card analytics-card-intraday">
            <span className="analytics-card-label">Intraday Movement</span>
            <IntradayChart data={intraday} color={accentColor} height={70} />
          </div>

          <div className="analytics-card analytics-card-volume">
            <span className="analytics-card-label">Weekly Volume</span>
            <VolumeBarChart data={volumeBars} color={accentColor} height={70} />
          </div>

          <div className="analytics-card analytics-card-sentiment">
            <span className="analytics-card-label">Bull Sentiment</span>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <SentimentDonut percent={sentiment} color={accentColor} size={90} />
            </div>
            <div className="analytics-sentiment-label" style={{ color: accentColor }}>
              {sentiment >= 60 ? "Bullish" : sentiment >= 40 ? "Neutral" : "Bearish"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StockAnalyticsModal;