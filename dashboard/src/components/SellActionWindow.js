// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import GeneralContext from "./GeneralContext";
// import "./BuyActionWindow.css";

// const SellActionWindow = ({ uid }) => {
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0.0);
//   const [loading, setLoading] = useState(false);

//   const handleSellClick = async () => {
//     try {
//       setLoading(true);
      
//       const response = await axios.post("http://localhost:3003/newOrder", {
//         name: uid,
//         qty: stockQuantity,
//         price: stockPrice,
//         mode: "SELL",
//       });

//       console.log("Order placed successfully:", response.data);
//       alert("Order placed successfully!");
//       GeneralContext.closeBuyWindow();
      
//     }
//      catch (error) {
//       console.error("Error placing order:", error);
//       // alert("Failed to place order. Make sure your backend is running on port 5000");
//       alert("Thank you!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelClick = () => {
//     GeneralContext.closeBuyWindow();
//   };

//   return (
//     <div className="container" id="sell-window" draggable="true">
//       <div className="regular-order">
//         <div className="inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               name="qty"
//               id="qty"
//               onChange={(e) => setStockQuantity(e.target.value)}
//               value={stockQuantity}
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Price</legend>
//             <input
//               type="number"
//               name="price"
//               id="price"
//               step="0.05"
//               onChange={(e) => setStockPrice(e.target.value)}
//               value={stockPrice}
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         <span>Margin required ₹140.65</span>
//         <div>
//           <Link 
//             className="btn btn-blue" 
//             onClick={handleSellClick}
//             // style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.6 : 1 }}
//           >
//             {loading ? "Processing..." : "Sell"}
//             {/* Sell */}
//           </Link>
//           <Link 
//             to="" 
//             className="btn btn-grey" 
//             onClick={handleCancelClick}
//           >
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellActionWindow;






//new file

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const handleSellClick = async () => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3003/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      });

      console.log("Sell order placed successfully:", response.data);
      alert("Sell order placed successfully!");
      GeneralContext.closeSellWindow();

    } catch (error) {
      console.error("Error placing sell order:", error);
      alert("Failed to place sell order. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    GeneralContext.closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link
            className="btn"
            style={{
              background: loading ? "#e57373" : "#e53935",
              color: "#fff",
              pointerEvents: loading ? "none" : "auto",
              opacity: loading ? 0.6 : 1,
            }}
            onClick={handleSellClick}
          >
            {loading ? "Processing..." : "Sell"}
          </Link>
          <Link
            to=""
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;