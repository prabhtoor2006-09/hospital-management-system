
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (
      role === "patient" &&
      email === "patient@elanvie.com" &&
      password === "patient123"
    ) {
      login({ email: email, role: "patient" });
      navigate("/");
    } else if (
      role === "staff" &&
      email === "staff@elanvie.com" &&
      password === "staff123"
    ) {
      login({ email: email, role: "staff" });
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">+</div>

        <h1>ÉLAN VIE</h1>
        <p className="login-subtitle">HOSPITAL MANAGEMENT SYSTEM</p>

        <h2>Welcome Back</h2>
        <p className="login-description">
          Please log in to continue.
        </p>

        <div className="login-roles">
          <button
            type="button"
            className={role === "patient" ? "role-active" : ""}
            onClick={() => {
              setRole("patient");
              setError("");
            }}
          >
            Patient / User
          </button>

          <button
            type="button"
            className={role === "staff" ? "role-active" : ""}
            onClick={() => {
              setRole("staff");
              setError("");
            }}
          >
            Hospital Staff
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit">
            Log In
          </button>
        </form>

        <div className="login-credentials">
          <p><strong>Patient:</strong> patient@elanvie.com</p>
          <p><strong>Password:</strong> patient123</p>
          <p><strong>Staff:</strong> staff@elanvie.com</p>
          <p><strong>Password:</strong> staff123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
