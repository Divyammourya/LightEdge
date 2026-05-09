


// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { VerticalGraph } from "./VerticalGraph";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

// const freshAxiosConfig = () => ({
//   params: { t: Date.now() },
//   headers: {
//     "Cache-Control": "no-cache",
//     Pragma: "no-cache",
//     Expires: "0",
//   },
// });

// const Holdings = ({ refreshKey }) => {
//   const [allHoldings, setAllHoldings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [message, setMessage] = useState("");
//   const [lastUpdated, setLastUpdated] = useState("");

//   const fetchHoldings = useCallback(async () => {
//     try {
//       setRefreshing(true);

//       const response = await axios.get(
//         `${API_URL}/api/auth/holdings`,
//         freshAxiosConfig()
//       );

//       const data = Array.isArray(response.data) ? response.data : [];
//       setAllHoldings(data);

//       const newestTime =
//         data.find((stock) => stock.lastUpdated)?.lastUpdated ||
//         new Date().toISOString();

//       setLastUpdated(new Date(newestTime).toLocaleTimeString());

//       const liveCount = data.filter((stock) => stock.isLive).length;

//       if (data.length === 0) {
//         setMessage("No holdings returned.");
//       } else if (liveCount === 0) {
//         setMessage("Showing fallback prices. Check FINNHUB_API_KEY or symbol support.");
//       } else if (liveCount < data.length) {
//         setMessage(`${liveCount}/${data.length} holding prices live from Finnhub.`);
//       } else {
//         setMessage("Live from Finnhub.");
//       }
//     } catch (error) {
//       console.error("Holdings fetch error:", error);
//       setMessage("Unable to connect to backend server.");
//       setAllHoldings([]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchHoldings();

//     // const interval = setInterval(fetchHoldings, 30000);
//     const interval = setInterval(fetchHoldings, 60000);


//     const handleVisibilityChange = () => {
//       if (!document.hidden) fetchHoldings();
//     };

//     window.addEventListener("focus", fetchHoldings);
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("focus", fetchHoldings);
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [fetchHoldings]);

//   useEffect(() => {
//     if (refreshKey) fetchHoldings();
//   }, [refreshKey, fetchHoldings]);

//   const formatAmount = (value) => {
//     return Number(value || 0).toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   const getCurrency = (symbol) => {
//     return ["INFY", "WIT", "HDB", "IBN"].includes(symbol) ? "$" : "₹";
//   };

//   const totals = useMemo(() => {
//     const totalInvestment = allHoldings.reduce(
//       (sum, stock) => sum + Number(stock.avg || 0) * Number(stock.qty || 0),
//       0
//     );

//     const currentValue = allHoldings.reduce(
//       (sum, stock) => sum + Number(stock.price || 0) * Number(stock.qty || 0),
//       0
//     );

//     const totalPnL = currentValue - totalInvestment;
//     const pnlPercent = totalInvestment
//       ? ((totalPnL / totalInvestment) * 100).toFixed(2)
//       : "0.00";

//     return { totalInvestment, currentValue, totalPnL, pnlPercent };
//   }, [allHoldings]);

//   const chartData = useMemo(
//     () => ({
//       labels: allHoldings.map((stock) => stock.name),
//       datasets: [
//         {
//           label: "Stock Price",
//           data: allHoldings.map((stock) => Number(stock.price) || 0),
//           backgroundColor: "rgba(56, 126, 209, 0.5)",
//         },
//       ],
//     }),
//     [allHoldings]
//   );

//   if (loading) {
//     return <p style={{ padding: "24px" }}>Loading live holdings...</p>;
//   }

//   return (
//     <>
//       <div className="holdings-header">
//         <div>
//           <h3 className="title">Holdings ({allHoldings.length})</h3>
//           <p>{refreshing ? "Refreshing..." : message}</p>
//         </div>

//         <div className="holdings-actions">
//           {lastUpdated && <span>Updated: {lastUpdated}</span>}
//           <button onClick={fetchHoldings} disabled={refreshing}>
//             Refresh
//           </button>
//         </div>
//       </div>

//       <div className="order-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Instrument</th>
//               <th>Qty.</th>
//               <th>Avg. cost</th>
//               <th>LTP</th>
//               <th>Cur. val</th>
//               <th>P&L</th>
//               <th>Day chg.</th>
//               <th>Product</th>
//             </tr>
//           </thead>

//           <tbody>
//             {allHoldings.length === 0 ? (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center", padding: "24px" }}>
//                   No holdings found.
//                 </td>
//               </tr>
//             ) : (
//               allHoldings.map((stock) => {
//                 const currency = getCurrency(stock.symbol);
//                 const qty = Number(stock.qty || 0);
//                 const avg = Number(stock.avg || 0);
//                 const price = Number(stock.price || 0);
//                 const curValue = price * qty;
//                 const pnl = curValue - avg * qty;
//                 const isProfit = pnl >= 0;

//                 return (
//                   <tr key={`${stock.name}-${price}-${stock.lastUpdated || ""}`}>
//                     <td>{stock.name}</td>
//                     <td>{qty}</td>
//                     <td>{currency}{formatAmount(avg)}</td>
//                     <td>{currency}{formatAmount(price)}</td>
//                     <td>{currency}{formatAmount(curValue)}</td>
//                     <td className={isProfit ? "profit" : "loss"}>
//                       {isProfit ? "+" : "-"}{currency}{formatAmount(Math.abs(pnl))}
//                     </td>
//                     <td className={stock.isLoss ? "loss" : "profit"}>{stock.day}</td>
//                     <td>{stock.product}</td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="row" style={{ marginTop: "20px" }}>
//         <div className="col">
//           <h5>₹{formatAmount(totals.totalInvestment)}</h5>
//           <p>Total investment</p>
//         </div>

//         <div className="col">
//           <h5>₹{formatAmount(totals.currentValue)}</h5>
//           <p>Current value</p>
//         </div>

//         <div className="col">
//           <h5 className={totals.totalPnL >= 0 ? "profit" : "loss"}>
//             {totals.totalPnL >= 0 ? "+" : "-"}₹{formatAmount(Math.abs(totals.totalPnL))} (
//             {totals.totalPnL >= 0 ? "+" : "-"}
//             {Math.abs(Number(totals.pnlPercent)).toFixed(2)}%)
//           </h5>
//           <p>P&L</p>
//         </div>
//       </div>

//       {allHoldings.length > 0 && <VerticalGraph data={chartData} />}

//       <style>{`
//         .holdings-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 16px;
//           margin-bottom: 18px;
//         }

//         .holdings-header p {
//           margin: 4px 0 0;
//           color: #777;
//           font-size: 13px;
//         }

//         .holdings-actions {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           color: #777;
//           font-size: 12px;
//         }

//         .holdings-actions button {
//           border: none;
//           background: #387ed1;
//           color: #fff;
//           padding: 9px 14px;
//           border-radius: 8px;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         .holdings-actions button:disabled {
//           opacity: 0.65;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Holdings;




import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

const Holdings = ({ refreshKey }) => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchHoldings = useCallback(async () => {
    try {
      setRefreshing(true);

      const userId = localStorage.getItem("userId");

      if (!userId) {
        setMessage("Please login to view holdings.");
        setAllHoldings([]);
        return;
      }

      const response = await axios.get(`${API_URL}/api/portfolio/holdings`, {
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

      const data = Array.isArray(response.data) ? response.data : [];
      setAllHoldings(data);
      setLastUpdated(new Date().toLocaleTimeString());

      if (data.length === 0) {
        setMessage("No holdings found. Buy and execute an order first.");
      } else {
        setMessage("Showing your executed portfolio holdings.");
      }
    } catch (error) {
      console.error("Holdings fetch error:", error);
      setMessage(error.response?.data?.message || "Unable to connect to backend server.");
      setAllHoldings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHoldings();

    const interval = setInterval(fetchHoldings, 60000);

    const handleVisibilityChange = () => {
      if (!document.hidden) fetchHoldings();
    };

    window.addEventListener("focus", fetchHoldings);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", fetchHoldings);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchHoldings]);

  useEffect(() => {
    if (refreshKey) fetchHoldings();
  }, [refreshKey, fetchHoldings]);

  const formatAmount = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const totals = useMemo(() => {
    const totalInvestment = allHoldings.reduce(
      (sum, stock) => sum + Number(stock.avg || 0) * Number(stock.qty || 0),
      0
    );

    const currentValue = allHoldings.reduce(
      (sum, stock) => sum + Number(stock.price || 0) * Number(stock.qty || 0),
      0
    );

    const totalPnL = currentValue - totalInvestment;
    const pnlPercent = totalInvestment
      ? ((totalPnL / totalInvestment) * 100).toFixed(2)
      : "0.00";

    return { totalInvestment, currentValue, totalPnL, pnlPercent };
  }, [allHoldings]);

  const chartData = useMemo(
    () => ({
      labels: allHoldings.map((stock) => stock.name),
      datasets: [
        {
          label: "Holding Value",
          data: allHoldings.map(
            (stock) => Number(stock.price || 0) * Number(stock.qty || 0)
          ),
          backgroundColor: "rgba(56, 126, 209, 0.5)",
        },
      ],
    }),
    [allHoldings]
  );

  if (loading) {
    return <p style={{ padding: "24px" }}>Loading your holdings...</p>;
  }

  return (
    <>
      <div className="holdings-header">
        <div>
          <h3 className="title">Holdings ({allHoldings.length})</h3>
          <p>{refreshing ? "Refreshing..." : message}</p>
        </div>

        <div className="holdings-actions">
          {lastUpdated && <span>Updated: {lastUpdated}</span>}
          <button onClick={fetchHoldings} disabled={refreshing}>
            Refresh
          </button>
        </div>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Day chg.</th>
              <th>Product</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "24px" }}>
                  No holdings found.
                </td>
              </tr>
            ) : (
              allHoldings.map((stock) => {
                const qty = Number(stock.qty || 0);
                const avg = Number(stock.avg || 0);
                const price = Number(stock.price || 0);
                const curValue = price * qty;
                const pnl = curValue - avg * qty;
                const isProfit = pnl >= 0;

                return (
                  <tr key={`${stock._id || stock.name}-${qty}-${price}`}>
                    <td>{stock.name}</td>
                    <td>{qty}</td>
                    <td>₹{formatAmount(avg)}</td>
                    <td>₹{formatAmount(price)}</td>
                    <td>₹{formatAmount(curValue)}</td>
                    <td className={isProfit ? "profit" : "loss"}>
                      {isProfit ? "+" : "-"}₹{formatAmount(Math.abs(pnl))}
                    </td>
                    <td className={stock.isLoss ? "loss" : "profit"}>
                      {stock.day || "+0.00%"}
                    </td>
                    <td>{stock.product || "CNC"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col">
          <h5>₹{formatAmount(totals.totalInvestment)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>₹{formatAmount(totals.currentValue)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={totals.totalPnL >= 0 ? "profit" : "loss"}>
            {totals.totalPnL >= 0 ? "+" : "-"}₹{formatAmount(Math.abs(totals.totalPnL))} (
            {totals.totalPnL >= 0 ? "+" : "-"}
            {Math.abs(Number(totals.pnlPercent)).toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>

      {allHoldings.length > 0 && <VerticalGraph data={chartData} />}

      <style>{`
        .holdings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .holdings-header p {
          margin: 4px 0 0;
          color: #777;
          font-size: 13px;
        }

        .holdings-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #777;
          font-size: 12px;
        }

        .holdings-actions button {
          border: none;
          background: #387ed1;
          color: #fff;
          padding: 9px 14px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .holdings-actions button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default Holdings;
