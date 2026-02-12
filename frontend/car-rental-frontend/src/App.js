// src/App.js
import React, { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./auth/AuthContext.js";
import { Navbar } from "./components/Navbar.js";
import { Login } from "./pages/Login.js";
import { Signup } from "./pages/Signup.js";
import { AdminDashboard } from "./pages/AdminDashboard.js";
import { UserDashboard } from "./pages/UserDashboard.js";

function AppContent() {
  const { user } = useContext(AuthContext);
  const [showLoginPage, setShowLoginPage] = useState(false); // Signup first

  if (!user) {
    // Show Signup/Login toggle
    return showLoginPage
      ? <Login showSignup={() => setShowLoginPage(false)} />
      : <Signup showLogin={() => setShowLoginPage(true)} />;
  }

  // User is logged in → show dashboard based on role
  return user.role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppContent />
    </AuthProvider>
  );
}
