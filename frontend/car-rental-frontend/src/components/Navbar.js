// src/components/Navbar.js
import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext.js";

export function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1>Car Rental System</h1>
      <div>
        {user ? (
          <>
            <span>{user.email} ({user.role})</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}
