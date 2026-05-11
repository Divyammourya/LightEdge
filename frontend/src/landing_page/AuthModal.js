import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AuthModal.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";
const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState("login");
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [showSignupPwd, setShowSignupPwd] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields.");
      return;
    }
    setLoginLoading(true);
    try {
    //   const res = await axios.post(`${API_URL}/login`, {
    const res = await axios.post(`${API_URL}/api/auth/login`, {
        email: loginEmail,
        password: loginPassword,
      });
      //   const { userId, userName, userRole } = res.data;
      //   localStorage.setItem("userId", userId);
      //   localStorage.setItem("userName", userName);
      //   localStorage.setItem("userRole", userRole || "user");
      //   onLoginSuccess({ userId, userName, userRole: userRole || "user" });
      //   handleClose();
      //   const dashUrl = `${DASHBOARD_URL}?userName=${encodeURIComponent(userName)}&userId=${encodeURIComponent(userId)}&userRole=${encodeURIComponent(userRole || "user")}`;
      //   window.location.href = dashUrl;
      const { id, name, role } = res.data.user;
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", name);
      localStorage.setItem("userRole", role || "user");
      onLoginSuccess({ userId: id, userName: name, userRole: role || "user" });
      handleClose();
      const dashUrl = `${DASHBOARD_URL}?userName=${encodeURIComponent(name)}&userId=${encodeURIComponent(id)}&userRole=${encodeURIComponent(role || "user")}`;
      window.location.href = dashUrl;
    } catch (err) {
      setLoginError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupSuccess("");
    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError("Please fill in all fields.");
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters.");
      return;
    }
    setSignupLoading(true);
    try {
    //   await axios.post(`${API_URL}/register`, {
    await axios.post(`${API_URL}/api/auth/register`, {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      setSignupSuccess("Account created! You can now log in.");
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setTimeout(() => setTab("login"), 1800);
    } catch (err) {
      setSignupError(
        err.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`auth-overlay ${visible ? "visible" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={`auth-modal ${visible ? "visible" : ""}`}>
        {/* Shield Icon */}
        <div className="auth-shield">
          <i className="fa fa-shield" />
        </div>

        {/* Close Button */}
        <button className="auth-close" onClick={handleClose} aria-label="Close">
          ✕
        </button>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => {
              setTab("login");
              setLoginError("");
            }}
          >
            Login
          </button>
          <button
            className={`auth-tab ${tab === "signup" ? "active" : ""}`}
            onClick={() => {
              setTab("signup");
              setSignupError("");
              setSignupSuccess("");
            }}
          >
            Sign Up
          </button>
        </div>

        {/* ── LOGIN FORM ── */}
        {tab === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <h2 className="auth-title">SECURE LOGIN</h2>

            <div className="auth-input-wrap">
              <i className="fa fa-user auth-input-icon" />
              <input
                type="email"
                placeholder="Email address"
                className="auth-input"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="auth-input-wrap">
              <i className="fa fa-lock auth-input-icon" />
              <input
                type={showLoginPwd ? "text" : "password"}
                placeholder="Password"
                className="auth-input"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-eye"
                onClick={() => setShowLoginPwd((v) => !v)}
                tabIndex={-1}
              >
                <i className={`fa fa-eye${showLoginPwd ? "-slash" : ""}`} />
              </button>
            </div>

            {loginError && <div className="auth-error">{loginError}</div>}

            <button
              type="submit"
              className="auth-submit"
              disabled={loginLoading}
            >
              {loginLoading ? <span className="auth-spinner" /> : "LOGIN"}
            </button>

            <p className="auth-switch">
              Don't have an account?{" "}
              <span onClick={() => setTab("signup")}>Sign up</span>
            </p>
          </form>
        )}

        {/* ── SIGNUP FORM ── */}
        {tab === "signup" && (
          <form className="auth-form" onSubmit={handleSignup}>
            <h2 className="auth-title">USER REGISTRATION</h2>

            <div className="auth-input-wrap">
              <i className="fa fa-user auth-input-icon" />
              <input
                type="text"
                placeholder="Full name"
                className="auth-input"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="auth-input-wrap">
              <i className="fa fa-envelope auth-input-icon" />
              <input
                type="email"
                placeholder="Email address"
                className="auth-input"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="auth-input-wrap">
              <i className="fa fa-lock auth-input-icon" />
              <input
                type={showSignupPwd ? "text" : "password"}
                placeholder="Password (min 6 chars)"
                className="auth-input"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-eye"
                onClick={() => setShowSignupPwd((v) => !v)}
                tabIndex={-1}
              >
                <i className={`fa fa-eye${showSignupPwd ? "-slash" : ""}`} />
              </button>
            </div>

            {signupError && <div className="auth-error">{signupError}</div>}
            {signupSuccess && (
              <div className="auth-success">{signupSuccess}</div>
            )}

            <button
              type="submit"
              className="auth-submit signup-btn"
              disabled={signupLoading}
            >
              {signupLoading ? (
                <span className="auth-spinner" />
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>

            <p className="auth-switch">
              Already have an account?{" "}
              <span onClick={() => setTab("login")}>Log in</span>
            </p>
          </form>
        )}

        {/* Decorative dots */}
        <span className="auth-dot dot-tl" />
        <span className="auth-dot dot-br" />
      </div>
    </div>
  );
};

export default AuthModal;
