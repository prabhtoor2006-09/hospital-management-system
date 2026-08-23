import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Appointment() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const [showDoctors, setShowDoctors] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const departments = [
    {
      name: "Cardiology",
      image: "/departments/cardiology.jpeg",
      description: "Heart and cardiovascular care",
      doctors: [
        {
          name: "Dr. Sarah Sharma",
          image: "/doctors/doctor1.jpg",
          experience: "12 Years Experience",
          speciality: "Heart & Vascular Specialist",
          price: 1200,
        },
        {
          name: "Dr. Rahul Mehta",
          image: "/doctors/doctor2.jpg",
          experience: "9 Years Experience",
          speciality: "Cardiac Care Specialist",
          price: 1000,
        },
      ],
    },
    {
      name: "Neurology",
      image: "/departments/neurology.jpeg",
      description: "Brain and nervous system care",
      doctors: [
        {
          name: "Dr. Arjun Kapoor",
          image: "/doctors/doctor3.jpg",
          experience: "15 Years Experience",
          speciality: "Neurology Specialist",
          price: 1500,
        },
        {
          name: "Dr. Ananya Singh",
          image: "/doctors/doctor4.jpg",
          experience: "8 Years Experience",
          speciality: "Brain & Spine Specialist",
          price: 1200,
        },
      ],
    },
    {
      name: "Dental Care",
      image: "/departments/dentist.jpeg",
      description: "Complete dental and oral care",
      doctors: [
        {
          name: "Dr. Riya Malhotra",
          image: "/doctors/doctor5.jpg",
          experience: "10 Years Experience",
          speciality: "Dental Specialist",
          price: 900,
        },
        {
          name: "Dr. Karan Verma",
          image: "/doctors/doctor6.jpg",
          experience: "7 Years Experience",
          speciality: "Oral & Maxillofacial Specialist",
          price: 1000,
        },
      ],
    },
    {
      name: "Pediatrics",
      image: "/departments/pediatric.jpeg",
      description: "Specialized care for children",
      doctors: [
        {
          name: "Dr. Neha Gupta",
          image: "/doctors/doctor7.jpg",
          experience: "11 Years Experience",
          speciality: "Child Specialist",
          price: 1000,
        },
        {
          name: "Dr. Aditya Khanna",
          image: "/doctors/doctor8.jpg",
          experience: "9 Years Experience",
          speciality: "Pediatric Care Specialist",
          price: 900,
        },
      ],
    },
    {
      name: "Orthopedics",
      image: "/departments/orthopedic.jpeg",
      description: "Bone, joint and muscle care",
      doctors: [
        {
          name: "Dr. Vikram Singh",
          image: "/doctors/doctor9.jpg",
          experience: "14 Years Experience",
          speciality: "Bone & Joint Specialist",
          price: 1400,
        },
        {
          name: "Dr. Meera Arora",
          image: "/doctors/doctor10.jpg",
          experience: "10 Years Experience",
          speciality: "Orthopedic & Sports Specialist",
          price: 1200,
        },
      ],
    },
    {
      name: "Ophthalmology",
      image: "/departments/ophtalmology.jpeg",
      description: "Complete eye care",
      doctors: [
        {
          name: "Dr. Priya Kapoor",
          image: "/doctors/doctor11.jpg",
          experience: "10 Years Experience",
          speciality: "Eye Care Specialist",
          price: 1100,
        },
        {
          name: "Dr. Rohan Bhatia",
          image: "/doctors/doctor12.jpg",
          experience: "8 Years Experience",
          speciality: "Vision & Eye Care Specialist",
          price: 1000,
        },
      ],
    },
  ];

  function selectDepartment(dept) {
    setDepartment(dept);
    setDoctor(null);
    setShowDoctors(true);
    setShowForm(false);
  }

  function selectDoctor(doc) {
    setDoctor(doc);
    setShowDoctors(false);
    setShowForm(true);
  }

  function closePopup() {
    setShowDoctors(false);
    setShowForm(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!patientName.trim() || !date || !time) {
      alert("Please fill all required fields.");
      return;
    }

    if (!doctor || !department) {
      alert("Please select a doctor first.");
      return;
    }

    const bookingId = new Date().getTime();
    const booking = {
      id: bookingId,
      type: "Appointment",
      patientName: patientName.trim(),
      doctor: doctor.name,
      department: department.name,
      date: date,
      time: time,
      reason: reason.trim() || "General Checkup",
      price: Number(doctor.price),
    };

    let bookings = [];
    try {
      const savedBookings = localStorage.getItem("bookings");
      if (savedBookings) {
        bookings = JSON.parse(savedBookings);
        if (!Array.isArray(bookings)) {
          bookings = [];
        }
      }
    } catch (error) {
      console.error("Error reading bookings:", error);
      bookings = [];
    }

    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Appointment booked successfully!");
    navigate("/bookings");
  }

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        {/* HEADER */}
        <div className="appointment-header">
          <p className="appointment-small-title">ÉLAN VIE HOSPITALS</p>
          <h1>Book an Appointment</h1>
          <p>Choose a department and find the right doctor for your care.</p>
        </div>

        {/* DEPARTMENT SELECTION */}
        <div className="department-selection">
          <h2>Select a Department</h2>
          <p className="section-description">
            Choose the medical department you need.
          </p>

          <div className="appointment-departments">
            {departments.map((dept) => (
              <div
                className="appointment-department"
                key={dept.name}
                onClick={() => selectDepartment(dept)}
              >
                <div className="department-image">
                  <img src={dept.image} alt={dept.name} />
                </div>
                <div className="department-info">
                  <h3>{dept.name}</h3>
                  <p>{dept.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= DOCTOR POPUP ================= */}
      {showDoctors && department && (
        <div className="appointment-overlay" onClick={closePopup}>
          <div
            className="doctors-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <div>
                <p className="popup-small-title">AVAILABLE DOCTORS</p>
                <h2>{department.name}</h2>
                <p>Select a doctor to book your appointment.</p>
              </div>
              <button
                type="button"
                className="close-button"
                onClick={closePopup}
                aria-label="Close popup"
              >
                ×
              </button>
            </div>

            <div className="doctor-list">
              {department.doctors.map((doc) => (
                <div className="doctor-card" key={doc.name}>
                  <div className="doctor-image">
                    <img src={doc.image} alt={doc.name} />
                  </div>
                  <div className="doctor-details">
                    <p className="doctor-speciality">{department.name}</p>
                    <h3>{doc.name}</h3>
                    <p>{doc.speciality}</p>
                    <span>{doc.experience}</span>
                    <div className="doctor-price">
                      ₹{doc.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="doctor-book-button"
                    onClick={() => selectDoctor(doc)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= APPOINTMENT FORM ================= */}
      {showForm && doctor && department && (
        <div className="appointment-overlay" onClick={closePopup}>
          <div
            className="appointment-form-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="form-heading">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="selected-doctor-image"
              />
              <div>
                <p>APPOINTMENT DETAILS</p>
                <h2>Book with {doctor.name}</h2>
                <span>{department.name}</span>
                <div className="selected-doctor-price">
                  ₹{doctor.price.toLocaleString("en-IN")}
                </div>
              </div>
              <button
                type="button"
                className="close-button"
                onClick={closePopup}
                aria-label="Close popup"
              >
                ×
              </button>
            </div>

            <form className="appointment-form" onSubmit={handleFormSubmit}>
              <div className="form-field">
                <label htmlFor="patient-name-input">Patient Name *</label>
                <input
                  id="patient-name-input"
                  type="text"
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="appt-date-input">Appointment Date *</label>
                  <input
                    id="appt-date-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="appt-time-select">Appointment Time *</label>
                  <select
                    id="appt-time-select"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="appt-reason-input">Reason for Visit</label>
                <textarea
                  id="appt-reason-input"
                  rows="4"
                  placeholder="Describe the reason for your appointment..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div className="appointment-total">
                <span>Consultation Fee</span>
                <strong>₹{doctor.price.toLocaleString("en-IN")}</strong>
              </div>

              <button type="submit" className="confirm-appointment">
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointment;