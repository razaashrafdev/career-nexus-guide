import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);

  // Additional validation to ensure user object exists and has required properties
  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure auth context has fully initialized
      const timer = setTimeout(() => {
        setIsValidating(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading || isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Strict check: must be authenticated AND have a valid user object
  if (!isAuthenticated || !user || !user.token) {
    // Store the attempted location to redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
