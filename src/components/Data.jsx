
import { useDispatch, useSelector } from "react-redux";
import { cancelBooking } from "../redux/bookingsSlice";
import "./styles.css";

function Data() {
  const bookings = useSelector((state) => state.bookings.bookings);
  const dispatch = useDispatch();

  function deleteBooking(id) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (confirmed) {
      dispatch(cancelBooking(id));
    }
  }

  return (
    <div className="data-page">
      <div className="data-container">
        <div className="data-header">
          <p>ÉLAN VIE HOSPITALS</p>
          <h1>My Bookings</h1>
          <span>
            View your doctor appointments and room bookings.
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="no-bookings-card">
            <h3>No Bookings Yet</h3>
            <p>
              You haven't made any bookings yet.
              Book an appointment or reserve a room to see it here.
            </p>
          </div>
        ) : (
          <div className="booking-grid">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking.id}>
                <div className="booking-top">
                  <span className="booking-type">
                    {booking.type}
                  </span>
                </div>

                {booking.type === "Room" ? (
                  <>
                    <h3>{booking.room}</h3>

                    <div className="booking-info-rows">
                      <p>
                        <strong>Patient:</strong>{" "}
                        {booking.patientName}
                      </p>

                      <p>
                        <strong>Date:</strong> {booking.date}
                      </p>

                      <p>
                        <strong>Duration:</strong>{" "}
                        {booking.days} Day(s)
                      </p>

                      <p>
                        <strong>Rate:</strong>{" "}
                        ₹{Number(booking.price || 0).toLocaleString("en-IN")}
                        {" / day"}
                      </p>

                      <div className="booking-total">
                        <span>Total Amount</span>
                        <strong>
                          ₹{Number(booking.total || 0).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{booking.doctor}</h3>

                    <div className="booking-info-rows">
                      <p>
                        <strong>Patient:</strong>{" "}
                        {booking.patientName}
                      </p>

                      <p>
                        <strong>Department:</strong>{" "}
                        {booking.department}
                      </p>

                      <p>
                        <strong>Date:</strong> {booking.date}
                      </p>

                      <p>
                        <strong>Time:</strong> {booking.time}
                      </p>

                      <div className="booking-total">
                        <span>Consultation Fee</span>
                        <strong>
                          ₹{Number(booking.price || 0).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>
                  </>
                )}

                {booking.status === "Cancelled" ? (
                  <p className="booking-status">
                    Booking Cancelled
                  </p>
                ) : (
                  <button
                    className="btn-cancel-booking"
                    onClick={() => deleteBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Data;
