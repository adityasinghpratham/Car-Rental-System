// src/auth/AuthContext.js
import React, { createContext, useState } from "react";
import API from "../api/api.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password, onSuccess, onError) => {
    API.get("/cars", {  // dummy request to validate credentials via session auth
      auth: { username: email, password }
    })
      .then(() => {
        const role = email === "admin@carrental.com" ? "ADMIN" : "USER";
        setUser({ email, role });
        onSuccess();
      })
      .catch(err => onError(err.message));
  };

  const logout = () => {
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
