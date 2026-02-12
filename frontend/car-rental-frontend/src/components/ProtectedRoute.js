// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext.js";

export function ProtectedRoute({ children, adminOnly }) {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Please login</p>;
  if (adminOnly && user.role !== "ADMIN") return <p>Access denied</p>;

  return children;
}
