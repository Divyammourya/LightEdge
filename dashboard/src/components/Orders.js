// import React from "react";
// import { Link } from "react-router-dom";

// const Orders = () => {
//   return (
//     <div className="orders">
//       <div className="no-orders">
//         <p>You haven't placed any orders today</p>

//         <Link to={"/"} className="btn">
//           Get started
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Orders;


// import React, {useState, useEffect} from "react";
// import axios from "axios";

// import { Model } from "../data/data";

// const Models = () => {
//   const [allModels, setAllModels] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3003/allModels").then((res) => {
//       console.log(res.data);
//       setAllModels(res.data);
//     });
//   });

//   return (
//     <>
//       <h3 className="title">Model ({allModels.length})</h3>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Product</th>
//             {/* <th>Instrument</th> */}
//             <th>Qty.</th>
//             <th>Price</th>
//             <th>Mode</th>
//             {/* <th>P&L</th>
//             <th>Chg.</th> */}
//           </tr>

//           {allModels.map((stock, index) => {
//             const name = stock.name;
//             const qty = stock.qty;
//             const mode = stock.mode;
//             // const curValue = stock.price * stock.qty;
//             // const isProfit = curValue - stock.avg * stock.qty >= 0.0;
//             // const profClass = isProfit ? "profit" : "loss";
//             // const dayClass = stock.isLoss ? "loss" : "profit";

//             return (
//               <tr key={index}>
//                 {/* <td>{stock.product}</td> */}
//                 <td>{stock.name}</td>
//                 <td>{stock.qty}</td>
//                 {/* <td>{stock.avg.toFixed(2)}</td> */}
//                 <td>{stock.mode}</td>
//                 {/* <td className={profClass}>
//                   {(curValue - stock.avg * stock.qty).toFixed(2)}
//                 </td>
//                 <td className={dayClass}>{stock.day}</td> */}
//               </tr>
//             );
//           })}
//         </table>
//       </div>
//     </>
//   );
// };

// export default Models;



import React, {useState, useEffect} from "react";
import axios from "axios";

import { Model } from "../data/data";

const Models = () => {
  const [allModels, setAllModels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/allOrders").then((res) => {
      console.log(res.data);
      setAllModels(res.data);
    });
  }, []); // Added empty dependency array to prevent infinite loop

  return (
    <>
      <h3 className="title">Orders ({allModels.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Mode</th>
          </tr>

          {allModels.map((stock, index) => {
            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.price}</td>
                <td>{stock.mode}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Models;