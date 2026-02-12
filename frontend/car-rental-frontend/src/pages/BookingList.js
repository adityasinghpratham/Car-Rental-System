import React, { useEffect, useState } from "react";
import API from "../api/api";

const BookingList = ({ userEmail }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get(`/bookings/user/${userEmail}`);
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    await API.delete(`/bookings/${id}`);
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.map((b) => (
        <div key={b.id}>
          <p>Car ID: {b.carId} | Booking Date: {new Date(b.bookingDate).toLocaleString()}</p>
          <button onClick={() => cancelBooking(b.id)}>Cancel Booking</button>
        </div>
      ))}
    </div>
  );
};

export default BookingList;
