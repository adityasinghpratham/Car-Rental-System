// src/pages/UserDashboard.js
import React, { useEffect, useState, useContext } from "react";
import API from "../api/api.js";
import { AuthContext } from "../auth/AuthContext.js";
import { CarCard } from "../components/CarCard.js";
import "../App.css";

export function UserDashboard() {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState("");
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false); // toggle view
  const { user } = useContext(AuthContext);

  // Fetch cars
  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    }
  };

  // Fetch current user's bookings
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings"); // backend should return bookings for current user
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  // Book a car
  const handleBook = async (carId) => {
    try {
      await API.post(`/cars/book/${carId}`);
      setMessage("Car booked successfully!");
      fetchBookings(); // refresh bookings
    } catch (err) {
      setMessage("Failed to book car.");
      console.error(err);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  // Cancel a booking
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await API.delete(`/bookings/${bookingId}`);
      setMessage("Booking cancelled!");
      fetchBookings();
    } catch (err) {
      setMessage("Failed to cancel booking.");
      console.error(err);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    fetchCars();
    fetchBookings();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>

      {user && (
        <div className="user-info">
          Logged in as: <strong>{user.email}</strong>
        </div>
      )}

      {message && <div className="success">{message}</div>}

      <nav className="user-nav">
        <button onClick={() => setShowBookings(false)}>Available Cars</button>
        <button onClick={() => setShowBookings(true)}>My Bookings</button>
      </nav>

      {!showBookings ? (
        <div className="cars-grid horizontal-scroll">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onBook={() => handleBook(car.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.length === 0 && <p>No bookings yet.</p>}
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <h3>{b.id}</h3>
              <p>Booking Date: {new Date(b.startDate).toLocaleDateString()}</p>
              <p>Status: {b.status}</p>
              <button onClick={() => handleCancel(b.id)}>Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
