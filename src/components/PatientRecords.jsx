

import { useState } from "react";
import { useSelector } from "react-redux";
import "./PatientRecords.css";

function PatientRecords() {
  const bookings = useSelector(
    (state) => state.bookings.bookings
  );

  const [search, setSearch] = useState("");

  // Count only active bookings
  const activeBookings = bookings.filter(
    (booking) => booking.status !== "Cancelled"
  );

  const appointments = activeBookings.filter(
    (booking) => booking.type === "Appointment"
  ).length;

  const roomBookings = activeBookings.filter(
    (booking) => booking.type === "Room"
  ).length;

  // Keep all records visible, including cancelled bookings
  const patients = bookings.filter((booking) =>
    (booking.patientName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="records-page">
      <div className="records-header">
        <p>ÉLAN VIE HOSPITALS</p>
        <h1>Patient Records</h1>
        <span>View patient details and booking history.</span>
      </div>

      <div className="records-summary">
        <div className="records-summary-card">
          <h3>{activeBookings.length}</h3>
          <p>Total Active Bookings</p>
        </div>

        <div className="records-summary-card">
          <h3>{appointments}</h3>
          <p>Active Appointments</p>
        </div>

        <div className="records-summary-card">
          <h3>{roomBookings}</h3>
          <p>Active Room Bookings</p>
        </div>
      </div>

      <input
        className="records-search"
        type="text"
        placeholder="Search by patient name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {patients.length === 0 ? (
        <div className="records-empty">
          <h3>No patient records found</h3>
          <p>
            Patient records will appear here after a booking is made.
          </p>
        </div>
      ) : (
        <div className="records-list">
          {patients.map((booking) => (
            <div className="records-card" key={booking.id}>
              <h3>{booking.patientName || "Unknown Patient"}</h3>

              <p>
                <strong>Booking Type:</strong> {booking.type}
              </p>

              <p>
                <strong>Doctor / Room:</strong>{" "}
                {booking.type === "Room"
                  ? booking.room || "Not specified"
                  : booking.doctor || "Not specified"}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {booking.date || "Not specified"}
              </p>

              {booking.type === "Appointment" && (
                <>
                  <p>
                    <strong>Department:</strong>{" "}
                    {booking.department || "Not specified"}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {booking.time || "Not specified"}
                  </p>
                </>
              )}

              {booking.contact && (
                <p>
                  <strong>Contact:</strong> {booking.contact}
                </p>
              )}

              <p>
                <strong>Status:</strong>{" "}
                {booking.status || "Confirmed"}
              </p>

              {booking.requirements && (
                <p>
                  <strong>Requirements:</strong> {booking.requirements}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientRecords;
