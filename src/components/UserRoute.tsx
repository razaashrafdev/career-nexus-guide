import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface UserRouteProps {
  children: React.ReactNode;
}

export const UserRoute = ({ children }: UserRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but is admin, redirect to admin dashboard
  if (user?.RoleName === "Admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <>{children}</>;
};
