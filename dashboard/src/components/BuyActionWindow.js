
// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import GeneralContext from "./GeneralContext";
// import "./BuyActionWindow.css";

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

//       await axios.post("http://localhost:3003/newOrder", {
//         userId,
//         name: uid,
//         qty: Number(stockQuantity),
//         price: Number(stockPrice),
//         mode: "BUY",
//       });

//       alert("Buy order executed successfully!");
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
//         <span>Margin required ₹140.65</span>
//         <div>
//           <Link className="btn btn-blue" onClick={handleBuyClick}>
//             {loading ? "Processing..." : "Buy"}
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

const BuyActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleBuyClick = async () => {
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
        mode: "BUY",
      });

      alert("Buy order placed successfully. Go to Orders to execute or cancel it.");
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
          <Link className="btn btn-blue" onClick={handleBuyClick}>
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
