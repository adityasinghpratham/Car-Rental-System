// src/pages/Login.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext.js";
import "../App.css";

export function Login({ showSignup }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      email,
      password,
      () => {}, // success handled by AppContent
      (msg) => setError("Invalid credentials")
    );
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p className="toggle-text">
        Don't have an account?{" "}
        <span onClick={showSignup} className="toggle-link">
          Signup
        </span>
      </p>
    </div>
  );
}
