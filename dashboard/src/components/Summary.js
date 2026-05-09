

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Summary = () => {
//   const [summary, setSummary]         = useState(null);
//   const [loading, setLoading]         = useState(true);
//   const [error, setError]             = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   // ✅ Read logged in user name
//   const userName = localStorage.getItem("userName") || "User";

//   const fetchSummary = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios.get("http://localhost:3003/api/auth/summary");
//       setSummary(response.data);
//       setLastUpdated(new Date().toLocaleTimeString());
//     } catch (err) {
//       console.error("Summary fetch error:", err.message);
//       setError("Failed to fetch live summary.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary();
//     const interval = setInterval(fetchSummary, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const formatK = (value) => {
//     const num = parseFloat(value);
//     if (num >= 1000) return `${(num / 1000).toFixed(2)}k`;
//     return num.toFixed(2);
//   };

//   if (loading) {
//     return (
//       <div style={{ padding: "24px" }}>
//         {Array(4).fill(0).map((_, i) => (
//           <div key={i} style={{
//             height: "32px",
//             marginBottom: "12px",
//             background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
//             backgroundSize: "200% 100%",
//             animation: "shimmer 1.2s infinite",
//             borderRadius: "8px",
//           }} />
//         ))}
//         <style>{`
//           @keyframes shimmer {
//             0%   { background-position: 200% 0; }
//             100% { background-position: -200% 0; }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ padding: "24px", textAlign: "center" }}>
//         <p style={{ color: "#e53935", fontWeight: 600 }}>❌ {error}</p>
//         <button
//           onClick={fetchSummary}
//           style={{
//             marginTop: "12px",
//             padding: "8px 20px",
//             background: "#387ed1",
//             color: "#fff",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontWeight: 600,
//           }}
//         >
//           ↻ Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* ── Username + refresh ── */}
//       <div className="username" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h6>Hi, {userName}! 👋</h6>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           {lastUpdated && (
//             <span style={{ fontSize: "0.72rem", color: "#888" }}>
//               🟢 {lastUpdated}
//             </span>
//           )}
//           <span
//             onClick={fetchSummary}
//             style={{ cursor: "pointer", color: "#387ed1", fontWeight: 600, fontSize: "0.82rem" }}
//           >
//             ↻ Refresh
//           </span>
//         </div>
//       </div>
//       <hr className="divide" />

//       {/* ── Equity section ── */}
//       <div className="section">
//         <span><p>Equity</p></span>

//         <div className="data">
//           <div className="first">
//             <h3>₹{formatK(summary.equity.marginAvailable)}</h3>
//             <p>Margin available</p>
//           </div>
//           <hr />
//           <div className="second">
//             <p>Margins used <span>₹{summary.equity.marginsUsed}</span></p>
//             <p>Opening balance <span>₹{formatK(summary.equity.openingBalance)}</span></p>
//           </div>
//         </div>
//         <hr className="divide" />
//       </div>

//       {/* ── Holdings section ── */}
//       <div className="section">
//         <span><p>Holdings ({summary.holdings.count})</p></span>

//         <div className="data">
//           <div className="first">
//             <h3 className={summary.holdings.isProfit ? "profit" : "loss"}>
//               ₹{formatK(summary.holdings.pnl)}{" "}
//               <small>{summary.holdings.isProfit ? "+" : ""}{summary.holdings.pnlPercent}%</small>
//             </h3>
//             <p>P&L</p>
//           </div>
//           <hr />
//           <div className="second">
//             <p>Current Value <span>₹{formatK(summary.holdings.currentValue)}</span></p>
//             <p>Investment <span>₹{formatK(summary.holdings.investment)}</span></p>
//           </div>
//         </div>
//         <hr className="divide" />
//       </div>
//     </>
//   );
// };

// export default Summary;



import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

const Summary = ({ refreshKey }) => {
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId");

  const fetchSummary = useCallback(async () => {
    try {
      if (!userId) {
        setMessage("Please login to view your dashboard summary.");
        setSummary(null);
        return;
      }

      const response = await axios.get(`${API_URL}/api/portfolio/summary`, {
        params: {
          userId,
          t: Date.now(),
        },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      setSummary(response.data);
      setMessage("");
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Summary fetch error:", error);
      setMessage(error.response?.data?.message || "Failed to fetch summary.");
      setSummary(null);
    }
  }, [userId]);

  useEffect(() => {
    fetchSummary();

    const interval = setInterval(fetchSummary, 60000);

    const handleVisibilityChange = () => {
      if (!document.hidden) fetchSummary();
    };

    window.addEventListener("focus", fetchSummary);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", fetchSummary);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchSummary]);

  useEffect(() => {
    if (refreshKey) fetchSummary();
  }, [refreshKey, fetchSummary]);

  if (message) {
    return <p style={{ padding: "24px", color: "#e53935" }}>{message}</p>;
  }

  if (!summary) {
    return <p style={{ padding: "24px" }}>Loading your dashboard...</p>;
  }

  const holdings = summary.holdings || {};
  const equity = summary.equity || {};

  return (
    <>
      <div className="username">
        <h6>Hi, {userName}!</h6>
        {lastUpdated && (
          <p style={{ marginTop: "-10px", color: "#777", fontSize: "13px" }}>
            Updated: {lastUpdated}
          </p>
        )}
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{equity.marginAvailable || "0.00"}</h3>
            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Margins used <span>₹{equity.marginsUsed || "0.00"}</span>
            </p>
            <p>
              Opening balance <span>₹{equity.openingBalance || "0.00"}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.count || 0})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={holdings.isProfit ? "profit" : "loss"}>
              {holdings.isProfit ? "+" : "-"}₹{Math.abs(Number(holdings.pnl || 0)).toFixed(2)}
            </h3>
            <p>P&L</p>
            <small>
              {holdings.isProfit ? "+" : "-"}
              {Math.abs(Number(holdings.pnlPercent || 0)).toFixed(2)}%
            </small>
          </div>

          <hr />

          <div className="second">
            <p>
              Current value <span>₹{holdings.currentValue || "0.00"}</span>
            </p>
            <p>
              Investment <span>₹{holdings.investment || "0.00"}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
