import { Link, NavLink } from "react-router-dom";
import { Phone, Heart } from "lucide-react";
import "./styles.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-badge">
            <Heart size={18} color="#ffffff" fill="#ffffff" />
          </div>
          <div className="navbar-logo-text">
            <p className="navbar-logo-title">ÉLAN VIE</p>
            <p className="navbar-logo-subtitle">HOSPITALS</p>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar-link navbar-link-active" : "navbar-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/booking"
            className={({ isActive }) =>
              isActive ? "navbar-link navbar-link-active" : "navbar-link"
            }
          >
            Book Appointment
          </NavLink>
          <NavLink
            to="/room-book"
            className={({ isActive }) =>
              isActive ? "navbar-link navbar-link-active" : "navbar-link"
            }
          >
            Book Room
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              isActive ? "navbar-link navbar-link-active" : "navbar-link"
            }
          >
            My Bookings
          </NavLink>
        </nav>

        {/* PHONE / EMERGENCY */}
        <div className="navbar-phone">
          <Phone size={16} className="navbar-phone-icon" />
          <span>+91 9876 43210</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;