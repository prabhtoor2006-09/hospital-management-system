
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Appointment from "./components/Appointment";
import RoomBook from "./components/RoomBook";
import Data from "./components/Data";
import Login from "./components/Login";
import StaffDashboard from "./components/StaffDashboard";
import ManageAppointments from "./components/ManageAppointments";
import PatientRecords from "./components/PatientRecords";

import "./App.css";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Login page */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Home page */}
      <Route
        path="/"
        element={
          user ? (
            <>
              <Navbar />
              {user.role === "staff" ? (
                <StaffDashboard />
              ) : (
                <Hero />
              )}
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Book appointment */}
      <Route
        path="/booking"
        element={
          user ? (
            <>
              <Navbar />
              <Appointment />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Book hospital room */}
      <Route
        path="/room-book"
        element={
          user ? (
            <>
              <Navbar />
              <RoomBook />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Patient's bookings */}
      <Route
        path="/bookings"
        element={
          user ? (
            <>
              <Navbar />
              <Data />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Staff: manage appointments and room bookings */}
      <Route
        path="/manage-appointments"
        element={
          user?.role === "staff" ? (
            <>
              <Navbar />
              <ManageAppointments />
            </>
          ) : (
            <Navigate to={user ? "/" : "/login"} replace />
          )
        }
      />

      {/* Staff: patient records */}
      <Route
        path="/patient-records"
        element={
          user?.role === "staff" ? (
            <>
              <Navbar />
              <PatientRecords />
            </>
          ) : (
            <Navigate to={user ? "/" : "/login"} replace />
          )
        }
      />

      {/* Redirect unknown URLs */}
      <Route
        path="*"
        element={
          <Navigate
            to={user ? "/" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
