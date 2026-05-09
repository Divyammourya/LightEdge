
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

// const Positions = () => {
//   const [positions, setPositions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const fetchPositions = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get(`${API_URL}/api/auth/positions`, {
//         params: { t: Date.now() },
//       });

//       const data = Array.isArray(response.data) ? response.data : [];
//       setPositions(data);

//       const liveCount = data.filter((position) => position.isLive).length;

//       if (data.length === 0) {
//         setMessage("No positions returned.");
//       } else if (liveCount === 0) {
//         setMessage("Finnhub is connected, but no live position prices returned. Check FINNHUB_API_KEY or symbol support.");
//       } else if (liveCount < data.length) {
//         setMessage(`${liveCount}/${data.length} position prices are live from Finnhub. Others are fallback.`);
//       } else {
//         setMessage("Live from Finnhub.");
//       }
//     } catch (error) {
//       console.error("Positions fetch error:", error);
//       setMessage("Unable to connect to backend server.");
//       setPositions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPositions();
//     const interval = setInterval(fetchPositions, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const formatAmount = (value) => {
//     return Number(value || 0).toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   const getCurrency = (symbol) => {
//     return symbol === "INFY" || symbol === "WIT" ? "$" : "₹";
//   };

//   if (loading) {
//     return <p style={{ padding: "24px" }}>Loading positions...</p>;
//   }

//   return (
//     <div className="positions">
//       <div className="title">
//         <h3>Positions ({positions.length})</h3>
//         <button className="refresh-btn" onClick={fetchPositions}>
//           Refresh
//         </button>
//       </div>

//       {message && <div className="positions-message">{message}</div>}

//       {positions.length === 0 ? (
//         <div className="no-positions">
//           <p>No positions found.</p>
//         </div>
//       ) : (
//         <div className="order-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Instrument</th>
//                 <th>Qty.</th>
//                 <th>Avg.</th>
//                 <th>LTP</th>
//                 <th>P&L</th>
//                 <th>Day</th>
//               </tr>
//             </thead>

//             <tbody>
//               {positions.map((stock) => {
//                 const currency = getCurrency(stock.symbol);
//                 const pnl =
//                   Number(stock.price || 0) * Number(stock.qty || 0) -
//                   Number(stock.avg || 0) * Number(stock.qty || 0);

//                 return (
//                   <tr key={stock.name}>
//                     <td>{stock.product}</td>
//                     <td>{stock.name}</td>
//                     <td>{stock.qty}</td>
//                     <td>{currency}{formatAmount(stock.avg)}</td>
//                     <td>{currency}{formatAmount(stock.price)}</td>
//                     <td className={pnl < 0 ? "loss" : "profit"}>
//                       {pnl < 0 ? "-" : "+"}{currency}{formatAmount(Math.abs(pnl))}
//                     </td>
//                     <td className={stock.isLoss ? "loss" : "profit"}>
//                       {stock.day}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <style>{`
//         .positions .title {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 12px;
//           margin-bottom: 16px;
//         }

//         .positions .title h3 {
//           margin: 0;
//         }

//         .refresh-btn {
//           border: none;
//           border-radius: 6px;
//           background: #387ed1;
//           color: #fff;
//           padding: 8px 12px;
//           font-weight: 600;
//           cursor: pointer;
//         }

//         .positions-message {
//           margin-bottom: 14px;
//           padding: 10px 12px;
//           border: 1px solid #d6e9ff;
//           background: #f0f7ff;
//           color: #275f9d;
//           border-radius: 8px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .no-positions {
//           padding: 24px;
//           text-align: center;
//           color: #777;
//         }

//         .profit {
//           color: #1f9d55;
//         }

//         .loss {
//           color: #e53935;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Positions;



import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

const freshAxiosConfig = () => ({
  params: { t: Date.now() },
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

const Positions = ({ refreshKey }) => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchPositions = useCallback(async () => {
    try {
      setRefreshing(true);

      const response = await axios.get(
        `${API_URL}/api/auth/positions`,
        freshAxiosConfig()
      );

      const data = Array.isArray(response.data) ? response.data : [];
      setPositions(data);

      const newestTime =
        data.find((stock) => stock.lastUpdated)?.lastUpdated ||
        new Date().toISOString();

      setLastUpdated(new Date(newestTime).toLocaleTimeString());

      const liveCount = data.filter((position) => position.isLive).length;

      if (data.length === 0) {
        setMessage("No positions returned.");
      } else if (liveCount === 0) {
        setMessage("Showing fallback prices. Check FINNHUB_API_KEY or symbol support.");
      } else if (liveCount < data.length) {
        setMessage(`${liveCount}/${data.length} position prices live from Finnhub.`);
      } else {
        setMessage("Live from Finnhub.");
      }
    } catch (error) {
      console.error("Positions fetch error:", error);
      setMessage("Unable to connect to backend server.");
      setPositions([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPositions();

    // const interval = setInterval(fetchPositions, 30000);
    const interval = setInterval(fetchPositions, 60000);


    const handleVisibilityChange = () => {
      if (!document.hidden) fetchPositions();
    };

    window.addEventListener("focus", fetchPositions);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", fetchPositions);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchPositions]);

  useEffect(() => {
    if (refreshKey) fetchPositions();
  }, [refreshKey, fetchPositions]);

  const formatAmount = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getCurrency = (symbol) => {
    return ["INFY", "WIT", "HDB", "IBN"].includes(symbol) ? "$" : "₹";
  };

  if (loading) {
    return <p style={{ padding: "24px" }}>Loading live positions...</p>;
  }

  return (
    <div className="positions">
      <div className="title">
        <div>
          <h3>Positions ({positions.length})</h3>
          <p>
            {refreshing ? "Refreshing..." : message}
            {lastUpdated ? ` | Updated: ${lastUpdated}` : ""}
          </p>
        </div>

        <button className="refresh-btn" onClick={fetchPositions} disabled={refreshing}>
          Refresh
        </button>
      </div>

      {positions.length === 0 ? (
        <div className="no-positions">
          <p>No positions found.</p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Day</th>
              </tr>
            </thead>

            <tbody>
              {positions.map((stock) => {
                const currency = getCurrency(stock.symbol);
                const qty = Number(stock.qty || 0);
                const avg = Number(stock.avg || 0);
                const price = Number(stock.price || 0);
                const pnl = price * qty - avg * qty;

                return (
                  <tr key={`${stock.name}-${price}-${stock.lastUpdated || ""}`}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{qty}</td>
                    <td>{currency}{formatAmount(avg)}</td>
                    <td>{currency}{formatAmount(price)}</td>
                    <td className={pnl < 0 ? "loss" : "profit"}>
                      {pnl < 0 ? "-" : "+"}{currency}{formatAmount(Math.abs(pnl))}
                    </td>
                    <td className={stock.isLoss ? "loss" : "profit"}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .positions .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .positions .title h3 {
          margin: 0;
        }

        .positions .title p {
          margin: 4px 0 0;
          color: #777;
          font-size: 13px;
        }

        .refresh-btn {
          border: none;
          border-radius: 6px;
          background: #387ed1;
          color: #fff;
          padding: 8px 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .refresh-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .no-positions {
          padding: 24px;
          text-align: center;
          color: #777;
        }

        .profit {
          color: #1f9d55;
        }

        .loss {
          color: #e53935;
        }
      `}</style>
    </div>
  );
};

export default Positions;
