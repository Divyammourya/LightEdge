

// import React, { useState } from "react";

// function TradingAccount() {
//   const [activeTab, setActiveTab] = useState("signup");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [status, setStatus] = useState({ type: "", message: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

//   const handleTabSwitch = (tab) => {
//     setActiveTab(tab);
//     setFormData({ name: "", email: "", password: "" });
//     setStatus({ type: "", message: "" });
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((curr) => ({ ...curr, [name]: value }));
//   };

//   const goHomeWithRefresh = () => {
//     window.location.href = "/";
//   };

//   const saveUser = (user) => {
//     localStorage.setItem("userId", user.id);
//     localStorage.setItem("userName", user.name);
//     localStorage.setItem("userEmail", user.email);
//   };

//   const handleSignup = async () => {
//     if (!formData.name || !formData.email || !formData.password) {
//       setStatus({ type: "error", message: "Please fill in all fields." });
//       return;
//     }

//     if (formData.password.length < 6) {
//       setStatus({
//         type: "error",
//         message: "Password must be at least 6 characters.",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     setStatus({ type: "", message: "" });

//     try {
//       const response = await fetch(`${API_URL}/api/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed.");
//       }

//       saveUser(data.user);

//       setStatus({
//         type: "success",
//         message: "Account created successfully. Redirecting...",
//       });

//       setFormData({ name: "", email: "", password: "" });
//       setTimeout(goHomeWithRefresh, 800);
//     } catch (error) {
//       setStatus({
//         type: "error",
//         message: error.message || "Something went wrong. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleLogin = async () => {
//     if (!formData.email || !formData.password) {
//       setStatus({
//         type: "error",
//         message: "Please enter email and password.",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     setStatus({ type: "", message: "" });

//     try {
//       const response = await fetch(`${API_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed.");
//       }

//       saveUser(data.user);

//       setStatus({
//         type: "success",
//         message: `Welcome back, ${data.user.name}! Redirecting...`,
//       });

//       setFormData({ name: "", email: "", password: "" });
//       setTimeout(goHomeWithRefresh, 800);
//     } catch (error) {
//       setStatus({
//         type: "error",
//         message: error.message || "Something went wrong. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (activeTab === "signup") {
//       handleSignup();
//     } else {
//       handleLogin();
//     }
//   };

//   return (
//     <section className="signup-hero">
//       <div className="container">
//         <h2 className="text-center">
//           Open a free demat and trading account online
//         </h2>

//         <p className="text-center mt-3 fs-5 text-muted signup-hero-copy">
//           Start investing brokerage free and join a community of 1.6+ crore
//           investors and traders
//         </p>

//         <div className="signup-grid">
//           <div className="signup-illustration">
//             <img src="./media/images/account_open.svg" alt="Open account" />
//           </div>

//           <form className="signup-form" onSubmit={handleSubmit}>
//             <div
//               style={{
//                 display: "flex",
//                 borderBottom: "2px solid #e0e0e0",
//                 marginBottom: "24px",
//               }}
//             >
//               <button
//                 type="button"
//                 onClick={() => handleTabSwitch("signup")}
//                 style={{
//                   flex: 1,
//                   padding: "10px",
//                   border: "none",
//                   background: "none",
//                   fontWeight: "600",
//                   fontSize: "1rem",
//                   cursor: "pointer",
//                   color: activeTab === "signup" ? "#387ed1" : "#999",
//                   borderBottom:
//                     activeTab === "signup"
//                       ? "2px solid #387ed1"
//                       : "2px solid transparent",
//                   marginBottom: "-2px",
//                 }}
//               >
//                 Signup
//               </button>

//               <button
//                 type="button"
//                 onClick={() => handleTabSwitch("login")}
//                 style={{
//                   flex: 1,
//                   padding: "10px",
//                   border: "none",
//                   background: "none",
//                   fontWeight: "600",
//                   fontSize: "1rem",
//                   cursor: "pointer",
//                   color: activeTab === "login" ? "#387ed1" : "#999",
//                   borderBottom:
//                     activeTab === "login"
//                       ? "2px solid #387ed1"
//                       : "2px solid transparent",
//                   marginBottom: "-2px",
//                 }}
//               >
//                 Login
//               </button>
//             </div>

//             <p className="signup-subtitle">
//               {activeTab === "signup"
//                 ? "Create your account with email"
//                 : "Welcome back! Login to your account"}
//             </p>

//             {activeTab === "signup" && (
//               <label className="signup-field">
//                 <span>Full Name</span>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Your full name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//             )}

//             <label className="signup-field">
//               <span>Email address</span>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </label>

//             <label className="signup-field">
//               <span>Password</span>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Minimum 6 characters"
//                 value={formData.password}
//                 onChange={handleChange}
//                 minLength="6"
//                 required
//               />
//             </label>

//             {status.message && (
//               <p className={`signup-message ${status.type}`}>
//                 {status.message}
//               </p>
//             )}

//             <button type="submit" disabled={isSubmitting}>
//               {isSubmitting
//                 ? activeTab === "signup"
//                   ? "Creating account..."
//                   : "Logging in..."
//                 : activeTab === "signup"
//                 ? "Create account"
//                 : "Login"}
//             </button>

//             <p style={{ textAlign: "center", marginTop: "16px" }}>
//               {activeTab === "signup" ? (
//                 <>
//                   Already have an account?{" "}
//                   <span
//                     onClick={() => handleTabSwitch("login")}
//                     style={{ color: "#387ed1", cursor: "pointer", fontWeight: 600 }}
//                   >
//                     Login here
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   Don't have an account?{" "}
//                   <span
//                     onClick={() => handleTabSwitch("signup")}
//                     style={{ color: "#387ed1", cursor: "pointer", fontWeight: 600 }}
//                   >
//                     Signup here
//                   </span>
//                 </>
//               )}
//             </p>

//             <p className="signup-terms">
//               By proceeding, you agree to the Zerodha{" "}
//               <a href="/signup">terms</a> &{" "}
//               <a href="/signup">privacy policy</a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TradingAccount;


import React, { useState } from "react";
import './index.css'


function TradingAccount() {
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setFormData({ name: "", email: "", password: "" });
    setStatus({ type: "", message: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((curr) => ({ ...curr, [name]: value }));
  };

  const goHomeWithRefresh = () => {
    window.location.href = "/";
  };

  const saveUser = (user) => {
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userRole", user.role || "user");
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    if (formData.password.length < 6) {
      setStatus({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      saveUser(data.user);

      setStatus({
        type: "success",
        message: "Account created successfully. Redirecting...",
      });

      setFormData({ name: "", email: "", password: "" });
      setTimeout(goHomeWithRefresh, 800);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setStatus({
        type: "error",
        message: "Please enter email and password.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      saveUser(data.user);

      setStatus({
        type: "success",
        message: `Welcome back, ${data.user.name}! Redirecting...`,
      });

      setFormData({ name: "", email: "", password: "" });
      setTimeout(goHomeWithRefresh, 800);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeTab === "signup") {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <section className="signup-hero">
      <div className="container">
        <h2 className="text-center">
          Open a free demat and trading account online
        </h2>

        <p className="text-center mt-3 fs-5 text-muted signup-hero-copy">
          Start investing brokerage free and join a community of 1.6+ crore
          investors and traders
        </p>

        <div className="signup-grid">
          <div className="signup-illustration">
            <img src="./media/images/account_open.svg" alt="Open account" />
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid #e0e0e0",
                marginBottom: "24px",
                // marginRight: "20px",
              }}
            >
              <button
                type="button"
                onClick={() => handleTabSwitch("signup")}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  background: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  cursor: "pointer",
                  color: activeTab === "signup" ? "#387ed1" : "#999",
                  borderBottom:
                    activeTab === "signup"
                      ? "2px solid #387ed1"
                      : "2px solid transparent",
                  marginBottom: "-2px",
                }}
              >
                Signup
              </button>

              <button
                type="button"
                onClick={() => handleTabSwitch("login")}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  background: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  cursor: "pointer",
                  color: activeTab === "login" ? "#387ed1" : "#999",
                  borderBottom:
                    activeTab === "login"
                      ? "2px solid #387ed1"
                      : "2px solid transparent",
                  marginBottom: "-2px",
                }}
              >
                Login
              </button>
            </div>

            <p className="signup-subtitle">
              {activeTab === "signup"
                ? "Create your account with email"
                : "Welcome back! Login to your account"}
            </p>

            {activeTab === "signup" && (
              <label className="signup-field">
                <span>Full Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
            )}

            <label className="signup-field">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="signup-field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </label>

            {status.message && (
              <p className={`signup-message ${status.type}`}>
                {status.message}
              </p>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? activeTab === "signup"
                  ? "Creating account..."
                  : "Logging in..."
                : activeTab === "signup"
                ? "Create account"
                : "Login"}
            </button>

            <p style={{ textAlign: "center", marginTop: "16px" }}>
              {activeTab === "signup" ? (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => handleTabSwitch("login")}
                    style={{
                      color: "#387ed1",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Login here
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={() => handleTabSwitch("signup")}
                    style={{
                      color: "#387ed1",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Signup here
                  </span>
                </>
              )}
            </p>

            <p className="signup-terms">
              By proceeding, you agree to the Zerodha{" "}
              <a href="/signup">terms</a> &{" "}
              <a href="/signup">privacy policy</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TradingAccount;
