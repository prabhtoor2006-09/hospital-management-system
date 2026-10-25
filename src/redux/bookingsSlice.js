
import { createSlice } from "@reduxjs/toolkit";

function getSavedBookings() {
  try {
    const saved = localStorage.getItem("bookings");
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const initialState = {
  bookings: getSavedBookings()
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,

  reducers: {
    // Add a new appointment or room booking
    addBooking: (state, action) => {
      state.bookings.push({
        status: "Confirmed",
        ...action.payload
      });

      localStorage.setItem(
        "bookings",
        JSON.stringify(state.bookings)
      );
    },

    // Cancel a booking
    cancelBooking: (state, action) => {
      const booking = state.bookings.find(
        (item) => item.id === action.payload
      );

      if (booking) {
        booking.status = "Cancelled";
      }

      localStorage.setItem(
        "bookings",
        JSON.stringify(state.bookings)
      );
    },

    // Update booking status from the staff dashboard
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload;

      const booking = state.bookings.find(
        (item) => item.id === id
      );

      if (booking) {
        booking.status = status;
      }

      localStorage.setItem(
        "bookings",
        JSON.stringify(state.bookings)
      );
    }
  }
});

export const {
  addBooking,
  cancelBooking,
  updateBookingStatus
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
