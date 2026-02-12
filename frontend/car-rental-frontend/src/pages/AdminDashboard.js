// src/pages/AdminDashboard.js
import React, { useState, useEffect } from "react";
import API from "../api/api.js";
import { CarCard } from "../components/CarCard.js";
import { CarForm } from "../components/CarForm.js";

export function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  const fetchCars = () => {
    API.get("/cars").then(res => setCars(res.data));
  };

  const handleDelete = id => {
    if (!window.confirm("Delete this car?")) return;
    API.delete(`/cars/${id}`).then(fetchCars);
  };

  useEffect(() => { fetchCars(); }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <CarForm car={editingCar} onSuccess={() => { setEditingCar(null); fetchCars(); }} />
      <div className="car-list horizontal-scroll">
        {cars.map(car =>
          <CarCard key={car.id} car={car} isAdmin={true} onEdit={setEditingCar} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
