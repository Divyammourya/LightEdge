


// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import GeneralContext from "./GeneralContext";
// import "./BuyActionWindow.css";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

// const BuyActionWindow = ({ uid }) => {
//   const generalContext = useContext(GeneralContext);
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const handleBuyClick = async () => {
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
//         mode: "BUY",
//       });

//       alert("Buy order placed successfully. Go to Orders to execute or cancel it.");
//       generalContext.closeBuyWindow();
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to place buy order.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container" id="buy-window" draggable="true">
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
//           <Link className="btn btn-blue" onClick={handleBuyClick}>
//             {loading ? "Placing..." : "Buy"}
//           </Link>

//           <Link className="btn btn-grey" onClick={generalContext.closeBuyWindow}>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyActionWindow;



import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const MAX_QTY = 10;
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

const BuyActionWindow = ({ uid, stockPrice }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [qtyWarning, setQtyWarning] = useState("");

  const price = parseFloat(stockPrice) || 0;
  const totalPrice = (price * stockQuantity).toFixed(2);

  const handleQtyChange = (e) => {
    let val = parseInt(e.target.value, 10);

    if (isNaN(val) || val < 1) {
      val = 1;
      setQtyWarning("");
    } else if (val > MAX_QTY) {
      val = MAX_QTY;
      setQtyWarning(`Max ${MAX_QTY} quantity allowed per order.`);
    } else {
      setQtyWarning("");
    }

    setStockQuantity(val);
  };

  const isValid = stockQuantity >= 1 && stockQuantity <= MAX_QTY && price > 0;

  const handleBuyClick = async () => {
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
        mode: "BUY",
      });

      alert(`Buy order placed! ${stockQuantity} × ${uid} @ ₹${price} = ₹${totalPrice}\nGo to Orders to execute it.`);
      generalContext.closeBuyWindow();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place buy order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
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
            color: "#387ed1", background: "#eaf2ff",
            padding: "3px 10px", borderRadius: "8px"
          }}>
            ₹{price.toFixed(2)}
          </span>
        </div>

        <div className="inputs">
          <fieldset>
            <legend>Qty. (max {MAX_QTY})</legend>
            <input
              type="number"
              min="1"
              max={MAX_QTY}
              value={stockQuantity}
              onChange={handleQtyChange}
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
        <div style={{
          marginTop: "10px", padding: "8px 12px",
          background: "#eaf2ff", borderRadius: "8px",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{ fontSize: "0.82rem", color: "#555" }}>Total Amount</span>
          <span style={{ fontWeight: 800, color: "#387ed1", fontSize: "1rem" }}>
            ₹{totalPrice}
          </span>
        </div>

      </div>

      <div className="buttons">
        <span style={{ fontSize: "0.75rem", color: "#888" }}>
          {stockQuantity} × ₹{price.toFixed(2)} = ₹{totalPrice}
        </span>
        <div>
          <Link
            className="btn btn-blue"
            onClick={handleBuyClick}
            style={{
              opacity: (!isValid || loading) ? 0.5 : 1,
              pointerEvents: (!isValid || loading) ? "none" : "auto",
              cursor: (!isValid || loading) ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Placing..." : "Buy"}
          </Link>
          <Link className="btn btn-grey" onClick={generalContext.closeBuyWindow}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;