import React, { useState, useEffect } from "react";
import API from "../api/api.js";

export function CarForm({ car, onSuccess }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Sync form state whenever `car` prop changes
  useEffect(() => {
    setName(car?.name || "");
    setDescription(car?.description || "");
    setPrice(car?.price || "");
    setImageFile(null);
  }, [car]);

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (imageFile) formData.append("image", imageFile);

    const request = car?.id
      ? API.put(`/cars/${car.id}`, formData)
      : API.post("/cars/add", formData);

    request
      .then(() => {
        onSuccess();
        setName("");
        setDescription("");
        setPrice("");
        setImageFile(null);
      })
      .catch(err => alert(err.message));
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <input
        placeholder="Car Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={e => setImageFile(e.target.files[0])}
      />
      <button type="submit">{car?.id ? "Update" : "Add"} Car</button>
    </form>
  );
}
