import { Link } from "react-router-dom";
import "./styles.css";
import heroImage from "../assets/hospital.jpeg";
import backgroundImage from "../assets/background.jpg.avif";

const STATS = [
  { label: "24/7 Emergency", sub: "Always here for you" },
  { label: "300+ Doctors", sub: "Expert & Experienced" },
  { label: "50,000+ Patients", sub: "Trust us every day" },
];

const DEPARTMENTS = [
  { name: "Cardiology", desc: "Advanced heart care you can trust" },
  { name: "Neurology", desc: "Expert care for brain & nerves" },
  { name: "Dental Care", desc: "Healthy smile, better life" },
  { name: "Pediatrics", desc: "Special care for little ones" },
  { name: "Orthopedics", desc: "Stronger bones, better movement" },
  { name: "Ophthalmology", desc: "Care for your precious vision" },
];

function Hero() {
  return (
    <main
      className="home-transition"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 19, 48, 0.92), rgba(11, 19, 48, 0.92)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-badge">Compassionate Care, Inspired by Life.</p>

          <h1 className="hero-title">
            Healing Today,
            <br />
            <span className="hero-title-accent">Brighter Tomorrow.</span>
          </h1>

          <p className="hero-description">
            Élan Vie Hospitals brings world-class medical care with a human touch. Consult top specialists or reserve hospital rooms effortlessly.
          </p>

          <div className="hero-actions">
            <Link to="/booking" className="btn btn-primary">
              Book Appointment
            </Link>
            <Link to="/room-book" className="btn btn-secondary">
              Book Room
            </Link>
          </div>

          <div className="hero-stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-sub">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <img src={heroImage} alt="Élan Vie Hospitals building" />
        </div>
      </section>

      {/* DEPARTMENTS SECTION */}
      <section className="departments-section">
        <div className="departments-header">
          <div>
            <p className="departments-eyebrow">OUR DEPARTMENTS</p>
            <h2 className="departments-title">Care built around you</h2>
          </div>
          <Link to="/booking" className="departments-view-all">
            View All &rarr;
          </Link>
        </div>

        <div className="departments-grid">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.name} className="department-card">
              <h3 className="department-name">{dept.name}</h3>
              <p className="department-desc">{dept.desc}</p>
              <Link to="/booking" className="department-link">
                Book Consultation &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Hero;