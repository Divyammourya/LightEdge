

// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const menuStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

//   .menu-container {
//     font-family: 'DM Sans', sans-serif !important;
//     background: #ffffff !important;
//     border-bottom: 1px solid rgba(56, 126, 209, 0.1) !important;
//     box-shadow: 0 2px 20px rgba(56, 126, 209, 0.06) !important;
//     padding: 0 20px !important;
//   }

//   .menu-logo-area {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     padding: 12px 0;
//     margin-right: 24px;
//   }

//   .menus {
//     display: flex !important;
//     flex-direction: row !important;
//     align-items: center !important;
//     width: 100% !important;
//   }

//   .menus ul {
//     list-style: none !important;
//     padding: 0 !important;
//     margin: 0 !important;
//     display: flex !important;
//     flex-direction: row !important;
//     align-items: center !important;
//     gap: 2px !important;
//     flex: 1;
//   }

//   .modern-menu-link {
//     display: flex !important;
//     align-items: center !important;
//     gap: 7px !important;
//     padding: 8px 14px !important;
//     border-radius: 10px !important;
//     text-decoration: none !important;
//     color: #555 !important;
//     font-size: 0.88rem !important;
//     font-weight: 500 !important;
//     transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease !important;
//     position: relative;
//     white-space: nowrap;
//   }

//   .modern-menu-link:hover {
//     background: rgba(56, 126, 209, 0.07) !important;
//     color: #387ed1 !important;
//     transform: translateY(-1px) !important;
//     text-decoration: none !important;
//   }

//   .modern-menu-link.active-link {
//     background: rgba(56, 126, 209, 0.1) !important;
//     color: #387ed1 !important;
//     font-weight: 600 !important;
//   }

//   .modern-menu-link.active-link::after {
//     content: '';
//     position: absolute;
//     bottom: -1px;
//     left: 10%;
//     width: 80%;
//     height: 2px;
//     background: #387ed1;
//     border-radius: 2px 2px 0 0;
//   }

//   .dashboard-user-pill {
//     display: inline-flex;
//     align-items: center;
//     gap: 9px;
//     padding: 7px 12px;
//     margin-left: 12px;
//     border-radius: 10px;
//     background: #f0f4ff;
//     color: #387ed1;
//     font-size: 0.86rem;
//     font-weight: 700;
//     white-space: nowrap;
//   }

//   .dashboard-user-avatar {
//     width: 26px;
//     height: 26px;
//     border-radius: 50%;
//     background: #387ed1;
//     color: #fff;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 0.72rem;
//     font-weight: 800;
//   }
// `;

// const menuItems = [
//   { label: "Dashboard", path: "/", icon: "fa-th-large" },
//   { label: "Orders", path: "/orders", icon: "fa-list-alt" },
//   { label: "Holdings", path: "/holdings", icon: "fa-briefcase" },
//   { label: "Positions", path: "/positions", icon: "fa-bar-chart" },
//   { label: "Funds", path: "/funds", icon: "fa-inr" },
//   { label: "Apps", path: "/apps", icon: "fa-th" },
// ];

// const Menu = () => {
//   const location = useLocation();
//   const userName = localStorage.getItem("userName") || "Guest";

//   const initials = userName
//     .split(" ")
//     .filter(Boolean)
//     .map((name) => name[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);

//   return (
//     <>
//       <style>{menuStyles}</style>

//       <div className="menu-container">
//         <div className="menu-logo-area">
//           <img src="logo6.png" style={{ width: "130px" }} alt="Logo" />
//           <img
//             src="logo4(2).png"
//             style={{ width: "16px", marginBottom: "2px" }}
//             alt="Logo"
//           />
//         </div>

//         <div className="menus">
//           <ul>
//             {menuItems.map((item) => (
//               <li key={item.path}>
//                 <Link
//                   className={`modern-menu-link ${
//                     location.pathname === item.path ? "active-link" : ""
//                   }`}
//                   to={item.path}
//                 >
//                   <i className={`fa ${item.icon}`} aria-hidden="true" />
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="dashboard-user-pill">
//             <span className="dashboard-user-avatar">{initials || "U"}</span>
//             {userName}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Menu;



import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

  .menu-container {
    font-family: 'DM Sans', sans-serif !important;
    background: #ffffff !important;
    border-bottom: 1px solid rgba(56, 126, 209, 0.1) !important;
    box-shadow: 0 2px 20px rgba(56, 126, 209, 0.06) !important;
    padding: 0 20px !important;
  }

  .menu-logo-area {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 12px 0;
    margin-right: 24px;
  }

  .menus {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    width: 100% !important;
  }

  .menus ul {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 2px !important;
    flex: 1;
  }

  .modern-menu-link {
    display: flex !important;
    align-items: center !important;
    gap: 7px !important;
    padding: 8px 14px !important;
    border-radius: 10px !important;
    text-decoration: none !important;
    color: #555 !important;
    font-size: 0.88rem !important;
    font-weight: 500 !important;
    transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease !important;
    position: relative;
    white-space: nowrap;
  }

  .modern-menu-link:hover {
    background: rgba(56, 126, 209, 0.07) !important;
    color: #387ed1 !important;
    transform: translateY(-1px) !important;
    text-decoration: none !important;
  }

  .modern-menu-link.active-link {
    background: rgba(56, 126, 209, 0.1) !important;
    color: #387ed1 !important;
    font-weight: 600 !important;
  }

  .modern-menu-link.active-link::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 10%;
    width: 80%;
    height: 2px;
    background: #387ed1;
    border-radius: 2px 2px 0 0;
  }

  .dashboard-user-pill {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 7px 12px;
    margin-left: 12px;
    border-radius: 10px;
    background: #f0f4ff;
    color: #387ed1;
    font-size: 0.86rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .dashboard-user-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #387ed1;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .mobile-watchlist-link {
    display: none !important;
  }

  @media (max-width: 900px) {
    .mobile-watchlist-link {
      display: inline-block !important;
    }
  }
`;

const menuItems = [
  {
    label: "Watchlist",
    path: "/watchlist",
    icon: "fa-eye",
    mobileOnly: true,
  },
  { label: "Dashboard", path: "/", icon: "fa-th-large" },
  { label: "Orders", path: "/orders", icon: "fa-list-alt" },
  { label: "Holdings", path: "/holdings", icon: "fa-briefcase" },
  { label: "Positions", path: "/positions", icon: "fa-bar-chart" },
  { label: "Funds", path: "/funds", icon: "fa-inr" },
  { label: "Apps", path: "/apps", icon: "fa-th" },
];

const Menu = () => {
  const location = useLocation();
  const userName = localStorage.getItem("userName") || "Guest";

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <style>{menuStyles}</style>

      <div className="menu-container">
        <div className="menu-logo-area">
          <img src="logo6.png" style={{ width: "130px" }} alt="Logo" />
          <img
            src="logo4(2).png"
            style={{ width: "16px", marginBottom: "2px" }}
            alt="Logo"
          />
        </div>

        <div className="menus">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={item.mobileOnly ? "mobile-watchlist-link" : ""}
              >
                <Link
                  className={`modern-menu-link ${
                    location.pathname === item.path ? "active-link" : ""
                  }`}
                  to={item.path}
                >
                  <i className={`fa ${item.icon}`} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="dashboard-user-pill">
            <span className="dashboard-user-avatar">{initials || "U"}</span>
            {userName}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
