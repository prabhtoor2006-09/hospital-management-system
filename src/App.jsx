import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Appointment from "./components/Appointment";
import RoomBook from "./components/RoomBook";
import Data from "./components/Data";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* APPLICATION ROUTES */}
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Hero />} />

        {/* APPOINTMENT BOOKING */}
        <Route path="/booking" element={<Appointment />} />

        {/* ROOM BOOKING */}
        <Route path="/room-book" element={<RoomBook />} />

        {/* ALL BOOKINGS / RECORDS */}
        <Route path="/bookings" element={<Data />} />

        {/* 404 FALLBACK TO HOME */}
        <Route path="*" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;