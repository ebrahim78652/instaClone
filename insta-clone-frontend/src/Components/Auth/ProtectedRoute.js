import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, user }) {
  return <>{user ? children : <Navigate to="/login" replace />}</>;
}
