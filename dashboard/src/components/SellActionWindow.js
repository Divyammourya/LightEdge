


// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import GeneralContext from "./GeneralContext";
// import "./BuyActionWindow.css";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

// const SellActionWindow = ({ uid }) => {
//   const generalContext = useContext(GeneralContext);
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const handleSellClick = async () => {
//     try {
//       const userId = localStorage.getItem("userId");

//       if (!userId) {
//         alert("Please login first.");
//         return;
//       }

//       setLoading(true);

//       await axios.post(`${API_URL}/newOrder`, {
//         userId,
//         name: uid,
//         qty: Number(stockQuantity),
//         price: Number(stockPrice),
//         mode: "SELL",
//       });

//       alert("Sell order placed successfully. Go to Orders to execute or cancel it.");
//       generalContext.closeSellWindow();
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to place sell order.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container" id="sell-window" draggable="true">
//       <div className="regular-order">
//         <div className="inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               min="1"
//               value={stockQuantity}
//               onChange={(e) => setStockQuantity(e.target.value)}
//             />
//           </fieldset>

//           <fieldset>
//             <legend>Price</legend>
//             <input
//               type="number"
//               min="0"
//               step="0.05"
//               value={stockPrice}
//               onChange={(e) => setStockPrice(e.target.value)}
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         <span>Status: Pending after placement</span>
//         <div>
//           <Link
//             className="btn"
//             style={{ background: "#e53935", color: "#fff" }}
//             onClick={handleSellClick}
//           >
//             {loading ? "Placing..." : "Sell"}
//           </Link>

//           <Link className="btn btn-grey" onClick={generalContext.closeSellWindow}>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellActionWindow;




import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

const SellActionWindow = ({ uid, stockPrice }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [qtyWarning, setQtyWarning] = useState("");

  // Holdings check
  const [ownedQty, setOwnedQty] = useState(null); // null = loading
  const [holdingsLoading, setHoldingsLoading] = useState(true);
  const [holdingsError, setHoldingsError] = useState("");

  const price = parseFloat(stockPrice) || 0;
  const totalPrice = (price * stockQuantity).toFixed(2);

  // Fetch user's holding for this stock on mount
  useEffect(() => {
    const fetchHolding = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setOwnedQty(0);
        setHoldingsError("Not logged in.");
        setHoldingsLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${API_URL}/api/portfolio/holdings?userId=${userId}`
        );
        const holdings = res.data || [];
        const match = holdings.find(
          (h) => h.name?.toUpperCase() === uid?.toUpperCase()
        );
        const qty = match ? Number(match.qty) : 0;
        setOwnedQty(qty);
        if (qty === 0) {
          setHoldingsError(`You don't own any ${uid} shares.`);
        }
      } catch (err) {
        setOwnedQty(0);
        setHoldingsError("Could not fetch holdings.");
      } finally {
        setHoldingsLoading(false);
      }
    };

    fetchHolding();
  }, [uid]);

  const handleQtyChange = (e) => {
    let val = parseInt(e.target.value, 10);
    const maxQty = ownedQty || 0;

    if (isNaN(val) || val < 1) {
      val = 1;
      setQtyWarning("");
    } else if (val > maxQty) {
      val = maxQty;
      setQtyWarning(`You only own ${maxQty} qty of ${uid}.`);
    } else {
      setQtyWarning("");
    }

    setStockQuantity(val);
  };

  const canSell = !holdingsLoading && ownedQty > 0;
  const isValid = canSell && stockQuantity >= 1 && stockQuantity <= ownedQty && price > 0;

  const handleSellClick = async () => {
    if (!isValid) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/newOrder`, {
        userId,
        name: uid,
        qty: Number(stockQuantity),
        price: Number(price),
        mode: "SELL",
      });

      alert(`Sell order placed! ${stockQuantity} × ${uid} @ ₹${price} = ₹${totalPrice}\nGo to Orders to execute it.`);
      generalContext.closeSellWindow();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place sell order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">

        {/* Stock name + live price */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "10px",
          padding: "6px 2px"
        }}>
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a2e" }}>
            {uid}
          </span>
          <span style={{
            fontWeight: 700, fontSize: "0.95rem",
            color: "#e53935", background: "#fff5f5",
            padding: "3px 10px", borderRadius: "8px"
          }}>
            ₹{price.toFixed(2)}
          </span>
        </div>

        {/* Holdings status */}
        {holdingsLoading ? (
          <div style={{
            padding: "8px 12px", background: "#f5f5f5",
            borderRadius: "8px", fontSize: "0.82rem", color: "#888",
            marginBottom: "10px"
          }}>
            Checking your holdings...
          </div>
        ) : (
          <div style={{
            padding: "8px 12px",
            background: canSell ? "#e8f5e9" : "#fff5f5",
            borderRadius: "8px", fontSize: "0.82rem",
            color: canSell ? "#2e7d32" : "#e53935",
            fontWeight: 600, marginBottom: "10px",
            border: `1px solid ${canSell ? "#c8e6c9" : "#ffcdd2"}`
          }}>
            {canSell
              ? `✓ You own ${ownedQty} qty of ${uid} — max sell: ${ownedQty}`
              : `✗ ${holdingsError}`}
          </div>
        )}

        <div className="inputs">
          <fieldset>
            <legend>Qty. {canSell ? `(max ${ownedQty})` : ""}</legend>
            <input
              type="number"
              min="1"
              max={ownedQty || 1}
              value={stockQuantity}
              onChange={handleQtyChange}
              disabled={!canSell}
              style={!canSell ? { background: "#f5f5f5", color: "#aaa", cursor: "not-allowed" } : {}}
            />
          </fieldset>

          <fieldset>
            <legend>Price (auto)</legend>
            <input
              type="number"
              value={price.toFixed(2)}
              readOnly
              style={{ background: "#f5f5f5", color: "#888", cursor: "not-allowed" }}
            />
          </fieldset>
        </div>

        {/* Qty warning */}
        {qtyWarning && (
          <div style={{
            color: "#e53935", fontSize: "0.78rem",
            marginTop: "6px", fontWeight: 600,
            background: "#fff5f5", padding: "5px 8px",
            borderRadius: "6px", border: "1px solid #ffcdd2"
          }}>
            ⚠ {qtyWarning}
          </div>
        )}

        {/* Live total */}
        {canSell && (
          <div style={{
            marginTop: "10px", padding: "8px 12px",
            background: "#fff5f5", borderRadius: "8px",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span style={{ fontSize: "0.82rem", color: "#555" }}>Total Amount</span>
            <span style={{ fontWeight: 800, color: "#e53935", fontSize: "1rem" }}>
              ₹{totalPrice}
            </span>
          </div>
        )}

      </div>

      <div className="buttons">
        <span style={{ fontSize: "0.75rem", color: "#888" }}>
          {canSell
            ? `${stockQuantity} × ₹${price.toFixed(2)} = ₹${totalPrice}`
            : "No holdings to sell"}
        </span>
        <div>
          <Link
            className="btn"
            style={{
              background: isValid ? "#e53935" : "#ccc",
              color: "#fff",
              opacity: (!isValid || loading) ? 0.6 : 1,
              pointerEvents: (!isValid || loading) ? "none" : "auto",
              cursor: (!isValid || loading) ? "not-allowed" : "pointer",
            }}
            onClick={handleSellClick}
          >
            {holdingsLoading ? "Loading..." : loading ? "Placing..." : "Sell"}
          </Link>
          <Link className="btn btn-grey" onClick={generalContext.closeSellWindow}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;