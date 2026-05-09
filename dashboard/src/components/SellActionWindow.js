

// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import GeneralContext from "./GeneralContext";
// import "./BuyActionWindow.css";

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

//       await axios.post("http://localhost:3003/newOrder", {
//         userId,
//         name: uid,
//         qty: Number(stockQuantity),
//         price: Number(stockPrice),
//         mode: "SELL",
//       });

//       alert("Sell order executed successfully!");
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
//         <span>Margin required ₹140.65</span>
//         <div>
//           <Link
//             className="btn"
//             style={{ background: "#e53935", color: "#fff" }}
//             onClick={handleSellClick}
//           >
//             {loading ? "Processing..." : "Sell"}
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



import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSellClick = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first.");
        return;
      }

      setLoading(true);

      await axios.post("http://localhost:3003/newOrder", {
        userId,
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "SELL",
      });

      alert("Sell order placed successfully. Go to Orders to execute or cancel it.");
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
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              min="0"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Status: Pending after placement</span>
        <div>
          <Link
            className="btn"
            style={{ background: "#e53935", color: "#fff" }}
            onClick={handleSellClick}
          >
            {loading ? "Placing..." : "Sell"}
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
