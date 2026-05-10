

// import React, { useEffect, useState } from "react";
// import { Link, Route, Routes } from "react-router-dom";

// import Apps from "./Apps";
// import Funds from "./Funds";
// import Holdings from "./Holdings";
// import Orders from "./Orders";
// import Positions from "./Positions";
// import Summary from "./Summary";
// import WatchList from "./WatchList";
// import AdminPanel from "./AdminPanel";
// import { GeneralContextProvider } from "./GeneralContext";

// const Dashboard = () => {
//   const [refreshKey, setRefreshKey] = useState(Date.now());
//   const userRole = localStorage.getItem("userRole");

//   useEffect(() => {
//     const refresh = () => setRefreshKey(Date.now());
//     const interval = setInterval(refresh, 60000);

//     const handleVisibilityChange = () => {
//       if (!document.hidden) refresh();
//     };

//     window.addEventListener("focus", refresh);
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("focus", refresh);
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="desktop-watchlist">
//         <GeneralContextProvider>
//           <WatchList refreshKey={refreshKey} />
//         </GeneralContextProvider>
//       </div>

//       <div className="content">
//         {userRole === "admin" && (
//           <div style={{ display: "flex", justifyContent: "flex-end" }}>
//             <Link
//               to="/admin"
//               style={{
//                 textDecoration: "none",
//                 background: "#111827",
//                 color: "#fff",
//                 padding: "8px 13px",
//                 borderRadius: "8px",
//                 fontSize: "12px",
//                 fontWeight: 700,
//                 marginBottom: "14px",
//               }}
//             >
//               Admin Panel
//             </Link>
//           </div>
//         )}

//         <Routes>
//           <Route path="/" element={<Summary refreshKey={refreshKey} />} />

//           <Route
//             path="/watchlist"
//             element={
//               <div className="mobile-watchlist-page">
//                 <GeneralContextProvider>
//                   <WatchList refreshKey={refreshKey} />
//                 </GeneralContextProvider>
//               </div>
//             }
//           />

//           <Route path="/orders" element={<Orders refreshKey={refreshKey} />} />
//           <Route path="/holdings" element={<Holdings refreshKey={refreshKey} />} />
//           <Route path="/positions" element={<Positions refreshKey={refreshKey} />} />
//           <Route path="/funds" element={<Funds />} />
//           <Route path="/apps" element={<Apps />} />
//           <Route path="/admin" element={<AdminPanel />} />
//         </Routes>
//       </div>

//       <style>{`
//         .desktop-watchlist {
//           flex-basis: 32%;
//           height: 100%;
//           min-width: 0;
//         }

//         .desktop-watchlist .watchlist-container {
//           width: 100%;
//           height: 100%;
//           flex-basis: auto;
//         }

//         .mobile-watchlist-page {
//           display: none;
//         }

//         @media (max-width: 900px) {
//           .desktop-watchlist {
//             display: none;
//           }

//           .mobile-watchlist-page {
//             display: block;
//           }

//           .mobile-watchlist-page .watchlist-container {
//             width: 100%;
//             max-height: none;
//             height: auto;
//             box-shadow: none;
//             border-bottom: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import AdminPanel from "./AdminPanel";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const refresh = () => setRefreshKey(Date.now());
    const interval = setInterval(refresh, 60000);

    const handleVisibilityChange = () => {
      if (!document.hidden) refresh();
    };

    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="desktop-watchlist">
        <GeneralContextProvider>
          <WatchList refreshKey={refreshKey} />
        </GeneralContextProvider>
      </div>

      <div className="content">
        {userRole === "admin" && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              to="/admin"
              style={{
                textDecoration: "none",
                background: "#111827",
                color: "#fff",
                padding: "8px 13px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "14px",
              }}
            >
              Admin Panel
            </Link>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Summary refreshKey={refreshKey} />} />

          <Route
            path="/watchlist"
            element={
              <div className="mobile-watchlist-page">
                <GeneralContextProvider>
                  <WatchList refreshKey={refreshKey} />
                </GeneralContextProvider>
              </div>
            }
          />

          <Route path="/orders" element={<Orders refreshKey={refreshKey} />} />
          <Route path="/holdings" element={<Holdings refreshKey={refreshKey} />} />
          <Route path="/positions" element={<Positions refreshKey={refreshKey} />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>

      <style>{`
        .desktop-watchlist {
          flex-basis: 32%;
          height: 100%;
          min-width: 0;
        }

        .desktop-watchlist .watchlist-container {
          width: 100%;
          height: 100%;
          flex-basis: auto;
        }

        .mobile-watchlist-page {
          display: none;
        }

        @media (max-width: 900px) {
          .desktop-watchlist {
            display: none;
          }

          .mobile-watchlist-page {
            display: block;
          }

          .mobile-watchlist-page .watchlist-container {
            width: 100%;
            max-height: none;
            height: auto;
            box-shadow: none;
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
