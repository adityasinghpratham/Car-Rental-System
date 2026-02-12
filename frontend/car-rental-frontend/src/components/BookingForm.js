import React, { useState } from "react";
import API from "../api/api";

const BookingForm = ({ car, onSuccess }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await API.post("/bookings/book", {
        carId: car.id,
        userName,
        userEmail,
      });
      alert("Booking successful!");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Booking failed!");
    }
  };

  return (
    <form onSubmit={handleBooking}>
      <h3>Book {car.name}</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
