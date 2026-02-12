// src/components/CarCard.js
import React from "react";

export function CarCard({ car, onEdit, onDelete, isAdmin, onBook }) {
  // Ensure image URL has full path

  return (
    <div className="car-card">

<img
  src={car.imageUrl}
  alt="Car"
  style={{ width: "200px", height: "150px", objectFit: "cover" }}
/>
      <h3>{car.name}</h3>
      <p>{car.description}</p>
      <p>Price: ₹{car.price}</p>
      {onBook && <button onClick={() => onBook(car)}>Book</button>}
      {isAdmin && (
        <div className="card-actions">
          <button onClick={() => onEdit(car)}>Edit</button>
          <button onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            if (window.confirm("Delete this car?")) onDelete(car.id);
          }}>Delete</button>
        </div>
      )}
    </div>
  );
}
