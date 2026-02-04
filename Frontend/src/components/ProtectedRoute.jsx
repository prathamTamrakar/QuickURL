import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = document.cookie.includes("uid=");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
