
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBooking } from "../redux/bookingsSlice";
import "./styles.css";

import generalImage from "../assets/general.jpg";
import sharingImage from "../assets/sharing.jpg";
import privateImage from "../assets/private.jpeg";
import acImage from "../assets/acroom.jpeg";
import deluxeImage from "../assets/delux.jpg";

function RoomBook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [roomType, setRoomType] = useState("");
  const [days, setDays] = useState("");
  const [patientName, setPatientName] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [contact, setContact] = useState("");
  const [requirements, setRequirements] = useState("");

  const rooms = {
    general: {
      name: "General Ward",
      image: generalImage,
      description:
        "A comfortable shared ward with essential medical facilities and 24/7 nursing.",
      details: "Shared Room • Basic Facilities",
      price: 1500
    },

    sharing: {
      name: "Sharing Room",
      image: sharingImage,
      description:
        "A comfortable room shared with another patient with curtain privacy.",
      details: "2 Beds • Shared Bathroom",
      price: 2500
    },

    private: {
      name: "Private Room",
      image: privateImage,
      description:
        "A peaceful private room offering seclusion, personal comfort, and quiet recovery.",
      details: "1 Bed • Attached Bathroom",
      price: 4000
    },

    ac: {
      name: "AC Private Room",
      image: acImage,
      description:
        "An air-conditioned private room with modern climate control and amenities.",
      details: "1 Bed • AC • Attached Bathroom",
      price: 6000
    },

    deluxe: {
      name: "Deluxe Suite Room",
      image: deluxeImage,
      description:
        "A premium luxury room with upgraded amenities, attendant lounge, and VIP care.",
      details: "1 Bed • AC • Bathroom • TV • Lounge",
      price: 8000
    }
  };

  const selectedRoom = roomType ? rooms[roomType] : null;

  const daysCount = Number(days) > 0 ? Number(days) : 0;

  const totalPrice =
    selectedRoom && daysCount > 0
      ? selectedRoom.price * daysCount
      : 0;

  function handleRoomSubmit(e) {
    e.preventDefault();

    if (!patientName.trim()) {
      alert("Please enter the patient name.");
      return;
    }

    if (!roomType || !selectedRoom) {
      alert("Please select a room type.");
      return;
    }

    if (!admissionDate) {
      alert("Please select an admission date.");
      return;
    }

    if (!days || Number(days) < 1) {
      alert("Please enter the number of days.");
      return;
    }

    if (!contact.trim()) {
      alert("Please enter a contact number.");
      return;
    }

    const booking = {
      id: Date.now(),
      type: "Room",
      patientName: patientName.trim(),
      room: selectedRoom.name,
      date: admissionDate,
      days: daysCount,
      price: selectedRoom.price,
      total: totalPrice,
      contact: contact.trim(),
      requirements: requirements.trim() || "Standard care",
      status: "Confirmed"
    };

    dispatch(addBooking(booking));

    alert("Room booked successfully!");
    navigate("/bookings");
  }

  return (
    <div className="room-page">
      <div className="room-container">
        <div className="room-header">
          <p className="room-small-title">ÉLAN VIE HOSPITALS</p>
          <h1>Book a Hospital Room</h1>
          <p>
            Choose a room according to your comfort and care requirements.
          </p>
        </div>

        <form className="room-card" onSubmit={handleRoomSubmit}>
          <h2>Room Admission Details</h2>

          <div className="room-field">
            <label htmlFor="room-patient-input">
              Patient Name *
            </label>
            <input
              id="room-patient-input"
              type="text"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>

          <div className="room-field">
            <label htmlFor="room-type-select">
              Select Room Type *
            </label>
            <select
              id="room-type-select"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
            >
              <option value="">Select Room Type</option>
              <option value="general">General Ward</option>
              <option value="sharing">Sharing Room</option>
              <option value="private">Private Room</option>
              <option value="ac">AC Private Room</option>
              <option value="deluxe">Deluxe Suite Room</option>
            </select>
          </div>

          {selectedRoom && (
            <div className="room-preview">
              <div className="room-image">
                <img src={selectedRoom.image} alt={selectedRoom.name} />
              </div>

              <div className="room-preview-info">
                <p className="preview-label">SELECTED ROOM</p>
                <h3>{selectedRoom.name}</h3>
                <p>{selectedRoom.description}</p>
                <span>{selectedRoom.details}</span>

                <div className="room-price">
                  <p>Room Price</p>
                  <h3>
                    ₹{selectedRoom.price.toLocaleString("en-IN")}
                    <span> / day</span>
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="room-row">
            <div className="room-field">
              <label htmlFor="room-date-input">
                Admission Date *
              </label>
              <input
                id="room-date-input"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                required
              />
            </div>

            <div className="room-field">
              <label htmlFor="room-days-input">
                Number of Days *
              </label>
              <input
                id="room-days-input"
                type="number"
                min="1"
                placeholder="Enter days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                required
              />
            </div>
          </div>

          {selectedRoom && daysCount > 0 && (
            <div className="total-price">
              <div>
                <p>Total Payable Amount</p>
                <span>
                  ₹{selectedRoom.price.toLocaleString("en-IN")}
                  {" × "}
                  {daysCount} day{daysCount > 1 ? "s" : ""}
                </span>
              </div>

              <h2>₹{totalPrice.toLocaleString("en-IN")}</h2>
            </div>
          )}

          <div className="room-field">
            <label htmlFor="room-contact-input">
              Contact Number *
            </label>
            <input
              id="room-contact-input"
              type="tel"
              placeholder="Enter phone number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div className="room-field">
            <label htmlFor="room-req-input">
              Special Requirements
            </label>
            <textarea
              id="room-req-input"
              rows="3"
              placeholder="Any dietary preferences or wheelchair assistance..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </div>

          <button type="submit" className="room-book-button">
            Confirm Room Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomBook;
