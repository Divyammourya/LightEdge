



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

  .modern-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(56, 126, 209, 0.08);
    transition: box-shadow 0.3s ease, background 0.3s ease;
    font-family: 'DM Sans', sans-serif;
  }

  .modern-navbar.scrolled {
    box-shadow: 0 4px 24px rgba(56, 126, 209, 0.1);
    background: rgba(255, 255, 255, 0.98);
  }

  .navbar-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar-actions {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    flex-shrink: 0;
  }

  .navbar-logo img:first-child {
    width: 200px;
  }

  // .navbar-logo img:last-child {
  //   width: 20px;
  // }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link-item a {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 13px;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #444;
    text-decoration: none;
    transition: color 0.2s ease, background 0.2s ease;
    white-space: nowrap;
  }

  .nav-link-item a:hover {
    color: #387ed1;
    background: rgba(56, 126, 209, 0.06);
  }

  .btn-dashboard {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    background: #387ed1;
    color: #fff !important;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 8px rgba(56, 126, 209, 0.25);
  }

  .btn-dashboard:hover {
    background: #2f6abf !important;
    color: #fff !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(56, 126, 209, 0.35);
  }

  .user-pill {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px 14px;
    background: #f0f4ff;
    border-radius: 10px;
            border: 1.5px solid rgba(56, 126, 209, 1);

    font-size: 0.85rem;
    font-weight: 600;
    color: #387ed1;
    white-space: nowrap;
  }

  .role-pill {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    margin-left: 6px;
    border-radius: 999px;
    // background: #111827;
    background: transparent;
    // border: 1.5px solid rgba(220, 53, 69, 0.4);
        // border: 1.5px solid rgba(11, 148,73, 1);

    // color: #fff;
        color: #0b9449;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .btn-logout {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    background: transparent;
    border: 1.5px solid rgba(220, 53, 69, 0.4);
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #dc3545;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
    white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
  }

  .btn-logout:hover {
    background: rgba(220, 53, 69, 0.06);
    border-color: #dc3545;
    transform: translateY(-1px);
  }

  .btn-signup {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 15px;
    border: 1.5px solid rgba(56, 126, 209, 0.35);
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #387ed1;
    text-decoration: none;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
    white-space: nowrap;
  }

  .btn-signup:hover {
    background: rgba(56, 126, 209, 0.06);
    border-color: #387ed1;
    color: #387ed1;
    transform: translateY(-1px);
  }

  .nav-divider {
    width: 1px;
    height: 20px;
    background: rgba(0, 0, 0, 0.1);
    margin: 0 6px;
    flex-shrink: 0;
  }

  .mobile-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 1.5px solid rgba(56, 126, 209, 0.25);
    border-radius: 10px;
    width: 38px;
    height: 38px;
    padding: 0;
    cursor: pointer;
    color: #387ed1;
    font-size: 1rem;
    transition: background 0.2s;
  }

  .mobile-toggle:hover {
    background: rgba(56, 126, 209, 0.06);
  }

  .mobile-menu {
    display: none;
    flex-direction: column;
    gap: 4px;
    position: absolute;
    right: 0;
    top: 46px;
    min-width: 220px;
    padding: 10px;
    border: 1px solid rgba(56, 126, 209, 0.12);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  }

  .mobile-menu.open {
    display: flex;
  }

  .mobile-menu a,
  .mobile-menu button {
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #444;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s, color 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .mobile-menu a:hover {
    background: rgba(56, 126, 209, 0.06);
    color: #387ed1;
  }

  .mobile-user-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    background: #f0f4ff;
    margin-bottom: 4px;
  }

  .mobile-user-row span {
    font-weight: 600;
    color: #387ed1;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .navbar-links {
      display: flex;
      gap: 2px;
    }

    .navbar-inner {
      height: 60px;
      padding: 0 12px;
      gap: 8px;
    }

    .navbar-logo img:first-child {
      width: 126px;
    }

    .nav-link-item a {
      width: 36px;
      height: 36px;
      justify-content: center;
      padding: 0;
      border-radius: 10px;
      font-size: 1rem;
    }

    .nav-label,
    .nav-divider,
    .user-pill,
    .btn-signup {
      display: none;
    }

    .mobile-toggle {
      display: inline-flex;
    }

    .mobile-menu {
      position: fixed;
      right: 12px;
      left: 12px;
      top: 68px;
      min-width: 0;
    }
  }
`;

function Navbar() {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "user"
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const dashboardUrl =
    userName && userId
      ? `${DASHBOARD_URL}?userName=${encodeURIComponent(
          userName
        )}&userId=${encodeURIComponent(userId)}&userRole=${encodeURIComponent(
          userRole
        )}`
      : DASHBOARD_URL;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const checkLogin = () => {
      setUserName(localStorage.getItem("userName"));
      setUserId(localStorage.getItem("userId"));
      setUserRole(localStorage.getItem("userRole") || "user");
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("storage", checkLogin);
    window.addEventListener("focus", checkLogin);

    checkLogin();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("focus", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    setUserId(null);
    setUserName(null);
    setUserRole("user");
    setMobileOpen(false);

    navigate("/signup");
  };

  const isLoggedIn = Boolean(userName && userId);
  const isAdmin = userRole === "admin";

  return (
    <>
      <style>{navStyles}</style>

      <nav className={`modern-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <Link className="navbar-logo" to="/">
            <img src="media/myImages/logo11.png" alt="LightEdge" />
            {/* <img src="media/myImages/logo4(2).png" alt="LightEdge mark" /> */}
          </Link>

          <ul className="navbar-links">
            <li className="nav-link-item">
              <Link to="/about">
                <i className="fa fa-info-circle" /> <span className="nav-label">About</span>
              </Link>
            </li>

            <li className="nav-link-item">
              <Link to="/product">
                <i className="fa fa-product-hunt" /> <span className="nav-label">Product</span>
              </Link>
            </li>

            <li className="nav-link-item">
              <Link to="/pricing">
                <i className="fa fa-inr" /> <span className="nav-label">Pricing</span>
              </Link>
            </li>

            <li className="nav-link-item">
              <Link to="/support">
                <i className="fa fa-handshake-o" /> <span className="nav-label">Support</span>
              </Link>
            </li>

            <li>
              <div className="nav-divider" />
            </li>

            {!isLoggedIn ? (
              <li>
                <Link to="/signup" className="btn-signup">
                  <i className="fa fa-sign-in" /> Signup
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <div className="user-pill">
                    <i className="fa fa-user-circle" />
                    {userName}
                    {isAdmin && <span className="role-pill">Admin</span>}
                  </div>
                </li>
              </>
            )}
          </ul>

          <div className="navbar-actions">
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle account menu"
              aria-expanded={mobileOpen}
            >
              <i className={`fa fa-${mobileOpen ? "times" : "bars"}`} />
            </button>

            <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
              {isLoggedIn && (
                <div className="mobile-user-row">
                  <i
                    className="fa fa-user-circle"
                    style={{ color: "#387ed1", fontSize: "1.1rem" }}
                  />
                  <span>
                    {userName}
                    {isAdmin && <span className="role-pill">Admin</span>}
                  </span>
                </div>
              )}

              {!isLoggedIn ? (
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  style={{ color: "#387ed1", fontWeight: 600 }}
                >
                  <i className="fa fa-sign-in" /> Signup
                </Link>
              ) : (
                <>
                  <a href={dashboardUrl} onClick={() => setMobileOpen(false)}>
                    <i className="fa fa-th-large" /> Dashboard
                  </a>

                  <button
                    onClick={handleLogout}
                    style={{
                      color: "#dc3545",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <i className="fa fa-sign-out" /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
