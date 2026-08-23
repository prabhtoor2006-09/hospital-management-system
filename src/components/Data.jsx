import { useState } from "react";
import "./styles.css";

function getSavedBookings() {
  try {
    const savedBookings = localStorage.getItem("bookings");

    if (savedBookings) {
      const parsedBookings = JSON.parse(savedBookings);

      if (Array.isArray(parsedBookings)) {
        return parsedBookings;
      }
    }

    return [];
  } catch (error) {
    console.error("Error loading bookings:", error);
    return [];
  }
}

function Data() {
  const [bookings, setBookings] = useState(getSavedBookings);

  function deleteBooking(id) {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== id
    );

    setBookings(updatedBookings);

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );
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

              <div
                className="booking-card"
                key={booking.id}
              >

                <div className="booking-top">

                  <span className="booking-type">
                    {booking.type}
                  </span>

                </div>

                {/* ROOM BOOKING */}

                {booking.type === "Room" ? (

                  <>

                    <h3>{booking.room}</h3>

                    <div className="booking-info-rows">

                      <p>
                        <strong>Patient:</strong>{" "}
                        {booking.patientName}
                      </p>

                      <p>
                        <strong>Date:</strong>{" "}
                        {booking.date}
                      </p>

                      <p>
                        <strong>Duration:</strong>{" "}
                        {booking.days} Day(s)
                      </p>

                      <p>
                        <strong>Rate:</strong>{" "}
                        ₹
                        {Number(
                          booking.price || 0
                        ).toLocaleString("en-IN")}
                        {" / day"}
                      </p>

                      <div className="booking-total">

                        <span>
                          Total Amount
                        </span>

                        <strong>
                          ₹
                          {Number(
                            booking.total || 0
                          ).toLocaleString("en-IN")}
                        </strong>

                      </div>

                    </div>

                  </>

                ) : (

                  /* APPOINTMENT BOOKING */

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
                        <strong>Date:</strong>{" "}
                        {booking.date}
                      </p>

                      <p>
                        <strong>Time:</strong>{" "}
                        {booking.time}
                      </p>

                      <div className="booking-total">

                        <span>
                          Consultation Fee
                        </span>

                        <strong>
                          ₹
                          {Number(
                            booking.price || 0
                          ).toLocaleString("en-IN")}
                        </strong>

                      </div>

                    </div>

                  </>

                )}

                <button
                  className="btn-cancel-booking"
                  onClick={() =>
                    deleteBooking(booking.id)
                  }
                >
                  Cancel Booking
                </button>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default Data;