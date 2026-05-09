
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function OpenAccount() {
//   const navigate = useNavigate();

//   return (
//     <div className="container p-5 mb-5">
//       <div className="row text-center">
//         <h1 className="mt-5 fs-4">Open a <b>LightEdge</b> account</h1>
//         <p className="mt-3">
//           Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
//           F&O trades.
//         </p>
//         <button
//           className="p-2 btn btn-primary fs-5 mt-3"
//           style={{ width: "20%", margin: "0 auto" }}
//           onClick={() => navigate("/signup")}
//         >
//           Sign up Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default OpenAccount;

import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleSignupClick = () => {
    if (userName) {
      // ✅ Already logged in — do nothing
      return;
    }
    navigate("/signup");
  };

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5 fs-4">Open a <b>LightEdge</b> account</h1>
        <p className="mt-3">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>

        <button
          className="p-2 btn fs-5 mt-3"
          style={{
            width: "20%",
            margin: "0 auto",
            backgroundColor: userName ? "#aaa" : "#387ed1",
            color: "#fff",
            cursor: userName ? "not-allowed" : "pointer",
            border: "none",
            borderRadius: "8px",
            opacity: userName ? 0.6 : 1,
            transition: "all 0.2s ease",
          }}
          onClick={handleSignupClick}
          title={userName ? `You are already logged in as ${userName}` : "Sign up now"}
          disabled={!!userName}
        >
          {userName ? `Logged in as ${userName}` : "Sign up Now"}
        </button>

      </div>
    </div>
  );
}

export default OpenAccount;