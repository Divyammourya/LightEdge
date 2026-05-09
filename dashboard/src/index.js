


// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./index.css";
// import Home from "./components/Home";

// const params = new URLSearchParams(window.location.search);

// const userNameFromFrontend = params.get("userName");
// const userIdFromFrontend = params.get("userId");
// const userRoleFromFrontend = params.get("userRole");

// if (userNameFromFrontend) {
//   localStorage.setItem("userName", userNameFromFrontend);
//   params.delete("userName");
// }

// if (userIdFromFrontend) {
//   localStorage.setItem("userId", userIdFromFrontend);
//   params.delete("userId");
// }

// if (userRoleFromFrontend) {
//   localStorage.setItem("userRole", userRoleFromFrontend);
//   params.delete("userRole");
// }

// if (userNameFromFrontend || userIdFromFrontend || userRoleFromFrontend) {
//   const cleanUrl =
//     window.location.pathname +
//     (params.toString() ? `?${params.toString()}` : "") +
//     window.location.hash;

//   window.history.replaceState({}, "", cleanUrl);
// }

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/*" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./responsive.css";
import Home from "./components/Home";

const params = new URLSearchParams(window.location.search);

const userNameFromFrontend = params.get("userName");
const userIdFromFrontend = params.get("userId");
const userRoleFromFrontend = params.get("userRole");

if (userNameFromFrontend) {
  localStorage.setItem("userName", userNameFromFrontend);
  params.delete("userName");
}

if (userIdFromFrontend) {
  localStorage.setItem("userId", userIdFromFrontend);
  params.delete("userId");
}

if (userRoleFromFrontend) {
  localStorage.setItem("userRole", userRoleFromFrontend);
  params.delete("userRole");
}

if (userNameFromFrontend || userIdFromFrontend || userRoleFromFrontend) {
  const cleanUrl =
    window.location.pathname +
    (params.toString() ? `?${params.toString()}` : "") +
    window.location.hash;

  window.history.replaceState({}, "", cleanUrl);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
