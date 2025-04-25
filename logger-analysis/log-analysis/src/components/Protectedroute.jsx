import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { email, token } = useSelector((state) => state.user);
  const location = useLocation();

  console.log("Current user:", { email });
  console.log("Current path:", location.pathname);

  // Show loading while waiting for state to initialize
  if (email === null && token === null) {
    return <div>Loading...</div>;
  }

  // Get admin email from environment or fallback
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'kavindugunasekara2000@gmail.com';

  // If accessing /main-admin, validate admin access
  if (location.pathname === "/main-admin") {
    const isAdmin = email === ADMIN_EMAIL && token;

    if (!isAdmin) {
      console.log("Not authorized as admin. Redirecting...");
      return <Navigate to="/" replace />;
    }

    // ✅ Admin access is valid — render children
    return children;
  }

  // For all other routes — validate token and email
  if (!email || !token) {
    console.log("Redirecting to login due to missing credentials...");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
