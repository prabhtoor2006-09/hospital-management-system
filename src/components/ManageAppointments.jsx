
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBookingStatus } from "../redux/bookingsSlice";
import "./ManageAppointments.css";

function ManageAppointments() {
  const bookings = useSelector((state) => state.bookings.bookings);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function updateStatus(id, status) {
    dispatch(updateBookingStatus({ id, status }));
  }

  const filteredBookings = bookings.filter((booking) =>
    (booking.patientName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="manage-page">
      <div className="manage-header">
        <p>ÉLAN VIE HOSPITALS</p>
        <h1>Manage Appointments</h1>
        <span>View and manage hospital bookings.</span>
      </div>

      <input
        className="manage-search"
        type="text"
        placeholder="Search by patient name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredBookings.length === 0 ? (
        <div className="manage-empty">
          <h3>No bookings found</h3>
          <p>
            Bookings will appear here when patients make reservations.
          </p>
        </div>
      ) : (
        <div className="manage-list">
          {filteredBookings.map((booking) => (
            <div className="manage-card" key={booking.id}>
              <div className="manage-card-top">
                <span className="manage-type">{booking.type}</span>

                <span
                  className={
                    booking.status === "Cancelled"
                      ? "manage-status cancelled"
                      : "manage-status"
                  }
                >
                  {booking.status || "Confirmed"}
                </span>
              </div>

              <h3>
                {booking.type === "Room"
                  ? booking.room
                  : booking.doctor}
              </h3>

              <p>
                <strong>Patient:</strong> {booking.patientName}
              </p>

              <p>
                <strong>Date:</strong> {booking.date}
              </p>

              {booking.type === "Appointment" && (
                <>
                  <p>
                    <strong>Department:</strong>{" "}
                    {booking.department}
                  </p>
                  <p>
                    <strong>Time:</strong> {booking.time}
                  </p>
                </>
              )}

              {booking.type === "Room" && (
                <p>
                  <strong>Duration:</strong> {booking.days} day(s)
                </p>
              )}

              <div className="manage-actions">
                <button
                  type="button"
                  onClick={() =>
                    updateStatus(booking.id, "Confirmed")
                  }
                  disabled={booking.status === "Confirmed"}
                >
                  Confirm
                </button>

                <button
                  type="button"
                  className="manage-cancel"
                  onClick={() =>
                    updateStatus(booking.id, "Cancelled")
                  }
                  disabled={booking.status === "Cancelled"}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageAppointments;
