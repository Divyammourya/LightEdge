

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Orders = () => {
//   const [allOrders, setAllOrders] = useState([]);
//   const [message, setMessage] = useState("");
//   const [processingId, setProcessingId] = useState("");

//   const userId = localStorage.getItem("userId");

//   const fetchOrders = async () => {
//     try {
//       if (!userId) {
//         setMessage("Please login to view orders.");
//         return;
//       }

//       const response = await axios.get(
//         `http://localhost:3003/allOrders?userId=${userId}`
//       );

//       setAllOrders(response.data);
//       setMessage("");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to fetch orders.");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const executeOrder = async (orderId) => {
//     try {
//       setProcessingId(orderId);

//       const response = await axios.post(
//         `http://localhost:3003/orders/${orderId}/execute`,
//         { userId }
//       );

//       alert(response.data.message || "Order executed successfully.");
//       fetchOrders();
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to execute order.");
//       fetchOrders();
//     } finally {
//       setProcessingId("");
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       setProcessingId(orderId);

//       const response = await axios.post(
//         `http://localhost:3003/orders/${orderId}/cancel`,
//         { userId }
//       );

//       alert(response.data.message || "Order cancelled successfully.");
//       fetchOrders();
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to cancel order.");
//       fetchOrders();
//     } finally {
//       setProcessingId("");
//     }
//   };

//   const getStatusStyle = (status) => {
//     if (status === "PENDING") {
//       return {
//         background: "#fff7e6",
//         color: "#b26a00",
//       };
//     }

//     if (status === "EXECUTED") {
//       return {
//         background: "#eaf7ee",
//         color: "#1f7a3a",
//       };
//     }

//     if (status === "CANCELLED") {
//       return {
//         background: "#f1f3f5",
//         color: "#5f6368",
//       };
//     }

//     return {
//       background: "#fdecec",
//       color: "#c62828",
//     };
//   };

//   if (message) {
//     return <p style={{ padding: "24px", color: "#e53935" }}>{message}</p>;
//   }

//   return (
//     <>
//       <div className="orders-header">
//         <div>
//           <h3 className="title">Orders ({allOrders.length})</h3>
//           <p>Manage pending, executed, cancelled, and rejected orders</p>
//         </div>

//         <button onClick={fetchOrders}>Refresh</button>
//       </div>

//       <div className="order-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Instrument</th>
//               <th>Qty.</th>
//               <th>Price</th>
//               <th>Mode</th>
//               <th>Status</th>
//               <th>Reason</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {allOrders.length === 0 ? (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center", padding: "24px" }}>
//                   No orders found.
//                 </td>
//               </tr>
//             ) : (
//               allOrders.map((order) => {
//                 const isPending = order.status === "PENDING";
//                 const statusStyle = getStatusStyle(order.status);

//                 return (
//                   <tr key={order._id}>
//                     <td>{order.name}</td>
//                     <td>{order.qty}</td>
//                     <td>₹{Number(order.price).toFixed(2)}</td>
//                     <td>
//                       <span className={order.mode === "BUY" ? "buy-pill" : "sell-pill"}>
//                         {order.mode}
//                       </span>
//                     </td>
//                     <td>
//                       <span className="status-pill" style={statusStyle}>
//                         {order.status}
//                       </span>
//                     </td>
//                     <td>{order.rejectionReason || "-"}</td>
//                     <td>{new Date(order.createdAt).toLocaleString()}</td>
//                     <td>
//                       {isPending ? (
//                         <div className="order-actions">
//                           <button
//                             className="execute-btn"
//                             disabled={processingId === order._id}
//                             onClick={() => executeOrder(order._id)}
//                           >
//                             Execute
//                           </button>

//                           <button
//                             className="cancel-btn"
//                             disabled={processingId === order._id}
//                             onClick={() => cancelOrder(order._id)}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       ) : (
//                         <span style={{ color: "#999" }}>Done</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       <style>{`
//         .orders-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 16px;
//           margin-bottom: 18px;
//         }

//         .orders-header p {
//           margin: 4px 0 0;
//           color: #777;
//           font-size: 13px;
//         }

//         .orders-header button {
//           border: none;
//           background: #387ed1;
//           color: #fff;
//           padding: 9px 14px;
//           border-radius: 8px;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         .status-pill,
//         .buy-pill,
//         .sell-pill {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           min-width: 76px;
//           padding: 5px 9px;
//           border-radius: 999px;
//           font-size: 11px;
//           font-weight: 800;
//         }

//         .buy-pill {
//           background: #eaf3ff;
//           color: #1f65b7;
//         }

//         .sell-pill {
//           background: #fff0ed;
//           color: #e53935;
//         }

//         .order-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 8px;
//         }

//         .order-actions button {
//           border: none;
//           border-radius: 7px;
//           padding: 7px 10px;
//           color: #fff;
//           font-size: 12px;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         .order-actions button:disabled {
//           opacity: 0.65;
//           cursor: not-allowed;
//         }

//         .execute-btn {
//           background: #1f9d55;
//         }

//         .cancel-btn {
//           background: #e53935;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Orders;


import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

const freshAxiosConfig = (userId) => ({
  params: { userId, t: Date.now() },
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

const Orders = ({ refreshKey }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [processingId, setProcessingId] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchOrders = useCallback(async () => {
    try {
      if (!userId) {
        setMessage("Please login to view orders.");
        return;
      }

      const response = await axios.get(
        `${API_URL}/allOrders`,
        freshAxiosConfig(userId)
      );

      setAllOrders(Array.isArray(response.data) ? response.data : []);
      setLastUpdated(new Date().toLocaleTimeString());
      setMessage("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to fetch orders.");
    }
  }, [userId]);

  useEffect(() => {
    fetchOrders();

    // const interval = setInterval(fetchOrders, 30000);
    const interval = setInterval(fetchOrders, 60000);


    const handleVisibilityChange = () => {
      if (!document.hidden) fetchOrders();
    };

    window.addEventListener("focus", fetchOrders);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", fetchOrders);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchOrders]);

  useEffect(() => {
    if (refreshKey) fetchOrders();
  }, [refreshKey, fetchOrders]);

  const executeOrder = async (orderId) => {
    try {
      setProcessingId(orderId);

      const response = await axios.post(
        `${API_URL}/orders/${orderId}/execute?t=${Date.now()}`,
        { userId },
        { headers: { "Cache-Control": "no-cache" } }
      );

      alert(response.data.message || "Order executed successfully.");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to execute order.");
      fetchOrders();
    } finally {
      setProcessingId("");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      setProcessingId(orderId);

      const response = await axios.post(
        `${API_URL}/orders/${orderId}/cancel?t=${Date.now()}`,
        { userId },
        { headers: { "Cache-Control": "no-cache" } }
      );

      alert(response.data.message || "Order cancelled successfully.");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel order.");
      fetchOrders();
    } finally {
      setProcessingId("");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "PENDING") return { background: "#fff7e6", color: "#b26a00" };
    if (status === "EXECUTED") return { background: "#eaf7ee", color: "#1f7a3a" };
    if (status === "CANCELLED") return { background: "#f1f3f5", color: "#5f6368" };
    return { background: "#fdecec", color: "#c62828" };
  };

  if (message) {
    return <p style={{ padding: "24px", color: "#e53935" }}>{message}</p>;
  }

  return (
    <>
      <div className="orders-header">
        <div>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <p>
            Manage pending, executed, cancelled, and rejected orders
            {lastUpdated ? ` | Updated: ${lastUpdated}` : ""}
          </p>
        </div>

        <button onClick={fetchOrders}>Refresh</button>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allOrders.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "24px" }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              allOrders.map((order) => {
                const isPending = order.status === "PENDING";
                const statusStyle = getStatusStyle(order.status);

                return (
                  <tr key={`${order._id}-${order.status}-${order.updatedAt || ""}`}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{Number(order.price).toFixed(2)}</td>
                    <td>
                      <span className={order.mode === "BUY" ? "buy-pill" : "sell-pill"}>
                        {order.mode}
                      </span>
                    </td>
                    <td>
                      <span className="status-pill" style={statusStyle}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.rejectionReason || "-"}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      {isPending ? (
                        <div className="order-actions">
                          <button
                            className="execute-btn"
                            disabled={processingId === order._id}
                            onClick={() => executeOrder(order._id)}
                          >
                            Execute
                          </button>

                          <button
                            className="cancel-btn"
                            disabled={processingId === order._id}
                            onClick={() => cancelOrder(order._id)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "#999" }}>Done</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .orders-header p {
          margin: 4px 0 0;
          color: #777;
          font-size: 13px;
        }

        .orders-header button {
          border: none;
          background: #387ed1;
          color: #fff;
          padding: 9px 14px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .status-pill,
        .buy-pill,
        .sell-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 76px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
        }

        .buy-pill {
          background: #eaf3ff;
          color: #1f65b7;
        }

        .sell-pill {
          background: #fff0ed;
          color: #e53935;
        }

        .order-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .order-actions button {
          border: none;
          border-radius: 7px;
          padding: 7px 10px;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .order-actions button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .execute-btn {
          background: #1f9d55;
        }

        .cancel-btn {
          background: #e53935;
        }
      `}</style>
    </>
  );
};

export default Orders;
