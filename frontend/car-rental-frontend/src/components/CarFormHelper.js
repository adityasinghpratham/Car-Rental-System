// src/carFormHelper.js
import API from "./api.js";

export function addOrUpdateCar(car, imageFile, onSuccess, onError) {
  const formData = new FormData();
  formData.append("name", car.name);
  formData.append("description", car.description);
  formData.append("price", car.price);
  if (imageFile) formData.append("image", imageFile);

  const request = car.id
    ? API.put(`/cars/${car.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    : API.post("/cars/add", formData, { headers: { "Content-Type": "multipart/form-data" } });

  request
    .then(res => onSuccess(res.data))
    .catch(err => onError(err.message));
}
