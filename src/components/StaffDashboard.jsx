
import { Link } from "react-router-dom";
import "./StaffDashboard.css";

function StaffDashboard() {
  return (
    <div className="staff-dashboard">
      <h1>Staff Dashboard</h1>
      <p>Welcome to the ÉLAN VIE Hospital Management System.</p>

      <div className="staff-cards">
        <div className="staff-card">
          <h2>Appointments</h2>
          <p>View and manage hospital appointments.</p>
          <Link to="/manage-appointments">
            Manage Appointments
          </Link>
        </div>

        <div className="staff-card">
          <h2>Patient Records</h2>
          <p>View and search patient booking records.</p>
          <Link to="/patient-records">
            View Patient Records
          </Link>
        </div>

        <div className="staff-card">
          <h2>Room Bookings</h2>
          <p>Access the hospital room booking page.</p>
          <Link to="/room-book">
            View Room Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
