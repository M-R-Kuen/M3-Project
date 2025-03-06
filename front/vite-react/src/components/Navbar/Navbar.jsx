import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navBar}`}>
      <div className={`container-fluid ${styles.containerNav}`}>
        <Link className={`navbar-brand ${styles.navbarBrand}`} to="/">
          PadelPro
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className={`navbar-nav ms-auto ${styles.navUl}`}>
            <li
              className={`nav-item ${styles.navItem} ${
                selectedTab === "/" ? styles.active : ""
              }`}
            >
              <Link
                className={`nav-link ${styles.navLink}`}
                to="/"
                onClick={() => setSelectedTab("/")}
              >
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${styles.navItem} ${
                selectedTab === "/courts" ? styles.active : ""
              }`}
            >
              <Link
                className={`nav-link ${styles.navLink}`}
                to="/courts"
                onClick={() => setSelectedTab("/courts")}
              >
                Courts
              </Link>
            </li>
            <li
              className={`nav-item ${styles.navItem} ${
                selectedTab === "/pricing" ? styles.active : ""
              }`}
            >
              <Link
                className={`nav-link ${styles.navLink}`}
                to="/pricing"
                onClick={() => setSelectedTab("/pricing")}
              >
                Pricing
              </Link>
            </li>
            <li
              className={`nav-item ${styles.navItem} ${
                selectedTab === "/bookings" ? styles.active : ""
              }`}
            >
              <Link
                className={`nav-link ${styles.navLink}`}
                to="/bookings"
                onClick={() => setSelectedTab("/bookings")}
              >
                Bookings
              </Link>
            </li>
            <li
              className={`nav-item ${styles.navItem} ${
                selectedTab === "/users" ? styles.active : ""
              }`}
            >
              <Link
                className={`nav-link ${styles.navLink}`}
                to="/users"
                onClick={() => setSelectedTab("/users")}
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
