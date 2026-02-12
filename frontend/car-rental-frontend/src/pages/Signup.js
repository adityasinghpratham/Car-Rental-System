// src/pages/Signup.js
import React, { useState } from "react";
import "../App.css";
import API from "../api/api.js";

export function Signup({ showLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", { email, password });
      setSuccess("Signup successful! Please login.");
      setError("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Signup failed. Email may already exist.");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Signup</button>
      </form>
      <p className="toggle-text">
        Already have an account?{" "}
        <span onClick={showLogin} className="toggle-link">
          Login
        </span>
      </p>
    </div>
  );
}
