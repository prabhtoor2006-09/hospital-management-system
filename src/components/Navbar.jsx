
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Phone, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./styles.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-badge">
            <Heart size={18} color="#ffffff" fill="#ffffff" />
          </div>
          <div className="navbar-logo-text">
            <p className="navbar-logo-title">ÉLAN VIE</p>
            <p className="navbar-logo-subtitle">HOSPITALS</p>
          </div>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>

          <NavLink to="/booking" className="navbar-link">
            Book Appointment
          </NavLink>

          <NavLink to="/room-book" className="navbar-link">
            Book Room
          </NavLink>

          <NavLink to="/bookings" className="navbar-link">
            My Bookings
          </NavLink>

          {user?.role === "staff" && (
            <>
              <NavLink to="/manage-appointments" className="navbar-link">
                Manage Appointments
              </NavLink>

              <NavLink to="/patient-records" className="navbar-link">
                Patient Records
              </NavLink>
            </>
          )}

          <button
            type="button"
            className="navbar-link"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>

        <div className="navbar-phone">
          <Phone size={16} className="navbar-phone-icon" />
          <span>+91 9876 43210</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
